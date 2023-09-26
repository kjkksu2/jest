const getPeoplePromise = (fetch = global.fetch) => {
  return fetch("https://swapi.py4e.com/api/people")
    .then((response) => response.json())
    .then((json) => {
      return {
        count: json.count,
        results: json.results,
      };
    });
};

const getPeople = async (fetch = global.fetch) => {
  const response = await fetch("https://swapi.py4e.com/api/people");
  const json = await response.json();
  return {
    count: json.count,
    results: json.results,
  };
};

module.exports = { getPeoplePromise, getPeople };
