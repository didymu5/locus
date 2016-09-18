
const defaultOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
}
const getCoordinates =
(options = defaultOptions) => {
  return new Promise((resolve, reject) => {
    if(!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      return reject(new Error("geolocation is not supported in your browser"));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
const rejectLocation = (err) => {
  const ERROR_TYPE_CODES = [
    'Unknown error',
    'Permission denied by user',
    'Position is not available',
    'Request timed out'
  ];
}

export default getCoordinates;