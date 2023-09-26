const swapi = require("./script2");

it("calls swapi to get people", (done) => {
  expect.assertions(1);
  swapi.getPeople().then((json) => {
    expect(json.count).toEqual(87);
    done();
  });
});
// 같은 방법 -> done 대신 return 사용
// it("calls swapi to get people", () => {
//   expect.assertions(1);
//   return swapi.getPeople().then((json) => {
//     expect(json.count).toEqual(87);
//   });
// });

it("calls swapi to get people with a promise", () => {
  expect.assertions(2);
  return swapi.getPeoplePromise().then((json) => {
    expect(json.count).toEqual(87);
    expect(json.results.length).toBeGreaterThan(5);
  });
});

it("getPeople returns count and results", () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 87,
          results: [0, 1, 2, 3, 4, 5],
        }),
    })
  );

  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then((json) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith("https://swapi.py4e.com/api/people");
    expect(json.count).toEqual(87);
    expect(json.results.length).toBeGreaterThan(5);
  });
});