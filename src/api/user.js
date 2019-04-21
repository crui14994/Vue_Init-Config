import service from "./../utils/axios";


export function mock(apiRouter) {
  return service({
    url: "https://easy-mock.com/mock/5c9c8e9ba0feb92705bf12b7/example/"+apiRouter,
    method: "get",
  });
}