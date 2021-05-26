
export default  function fetchCountries(searchQuery) {
    const resource = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(resource).then(response => {
    return response.json();
  }).catch(error => {
            console.log('This is error:', error)
        });
}
