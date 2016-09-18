import moment from 'moment';
import { ready, sayAwesome } from './util';
import getCoordinates from "./latlong";

ready(() => {
  let $latitude_txt = document.getElementById('latitude-txt'),
    $longtitude_txt = document.getElementById('longitude-txt'),
    $timestamp_txt = document.getElementById('timestamp-txt'),
    $loading_indicator = document.getElementById('loading-indicator'),
    $coordinates_block = document.getElementById('coordinates-block');

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let locator = new getCoordinates(options);

  $coordinates_block.style.display = 'none';
  $loading_indicator.style.display = 'block';

  locator.then((res) => {
    $loading_indicator.style.display = 'none';
    $coordinates_block.style.display = 'block';
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