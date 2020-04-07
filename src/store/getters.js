const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.names,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes // 添加的权限路由值
}
export default getters
