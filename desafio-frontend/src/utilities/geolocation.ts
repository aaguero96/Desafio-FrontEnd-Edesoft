// TODO: Imlement that
const geolocation = (zipCode: string) => {
  const geocoder = new google.maps.Geocoder();
  let lat: string = '';
  let long: string = '';
  geocoder.geocode({
    'address': zipCode,
  }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results === null) {
        lat = '';
        long = '';
      } else {
        lat = results[0].geometry.location.lat().toString();
        long = results[0].geometry.location.lng().toString();
      }
    } else {
      lat = '';
      long = '';
    }
  });
  console.log(lat, long);
  return [lat, long];
}

export {
  geolocation,
};