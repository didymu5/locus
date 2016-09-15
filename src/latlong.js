
function getLatLong() {
  if(!navigator.geolocation) {
    console.error('your browser does not support Geolocation');
    return false;
  }
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  let success = (pos) => {
    const coord = pos.coords;
    console.log(coord.latitude, coord.longitude);
    console.log(coord.accuracy);
    return {lat: coord.latitude, long: coord.longitude, accuracy: coord.accuracy};
  }
  
  let error = (err) => console.warn(err.code, err.message);

  return navigator.geolocation.getCurrentPosition(success, error, options);
}

export default getLatLong;