import moment from 'moment';
import {
  ready,
  getParamByName,
  getAllParams,
  toggleLoader
} from './util';
import getCoordinates from "./latlong";

ready(() => {
  let $latitude_txt = document.getElementById('latitude-txt'),
    $longtitude_txt = document.getElementById('longitude-txt'),
    $timestamp_txt = document.getElementById('timestamp-txt'),
    $loading_indicator = document.getElementById('loading-indicator'),
    $coordinates_block = document.getElementById('coordinates-block'),
    $button__mark_this = document.getElementById('button--mark-this');

    toggleLoader('show', $loading_indicator, $coordinates_block);

  let locationParams = getAllParams().loc;
  let coord_regex =  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  if(locationParams != null && coord_regex.test(locationParams)) {
    $latitude_txt.innerHTML = locationParams.split(',')[0];
    $longtitude_txt.innerHTML = locationParams.split(',')[1];
    toggleLoader('hide', $loading_indicator, $coordinates_block);
    return false;
  }

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let locator = new getCoordinates(options);

  locator.then((res) => {
    toggleLoader('hide', $loading_indicator, $coordinates_block);

    let query_loc_string =  `?loc=${res.coords.latitude},${res.coords.longitude}`;

    window.history.pushState({loc: res.coords.latitude+','+res.coords.longitude}, res.coords.latitude+','+res.coords.longitude, query_loc_string)
    $latitude_txt.innerHTML = res.coords.latitude;
    $longtitude_txt.innerHTML = res.coords.longitude;
    $timestamp_txt.innerHTML = moment(res.timestamp);
  }).catch((reason) => {
    console.log('(' + reason.code, reason.message + ')');
    if (reason.code == 1) {
      alert('https://support.google.com/chrome/answer/142065?hl=en');
      //display dialog to allow for geolocation and instructions to reset
    }
  });
});