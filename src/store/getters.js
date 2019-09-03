const getters = {
  token: state => state.user.token,
  username: state => state.user.name,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  siderBarRouters: state => state.permission.siderbar_routers,
};
export default getters
