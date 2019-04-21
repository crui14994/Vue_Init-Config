import utils from "./../utils/index";

const state = {
  //token
  token: utils.storage.get("token")
};
const mutations = {
  setToken(state, data) {
    state.token = data;
  }
};
export default {
  state,
  mutations
};