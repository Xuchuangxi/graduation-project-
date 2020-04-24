const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  className: state => state.user.className,
  roles: state => state.user.roles,
  id: state => state.user.id,
  permission_routes: state => state.permission.routes // 添加的权限路由值
}
export default getters
