const Home = resolve => {
  require.ensure(['../pages/home/index.vue'], () => { resolve(require('../pages/home/index.vue')) })
}

const Login = resolve => {
  require.ensure(['../pages/login/index.vue'], () => { resolve(require('../pages/login/index.vue')) })
}

const Msg = resolve => {
  require.ensure(['../pages/msg/index.vue'], () => { resolve(require('../pages/msg/index.vue')) })
}

const Find = resolve => {
  require.ensure(['../pages/find/index.vue'], () => { resolve(require('../pages/find/index.vue')) })
}

const Person = resolve => {
  require.ensure(['../pages/person/index.vue'], () => { resolve(require('../pages/person/index.vue')) })
}

const Topic = resolve => {
  require.ensure(['../pages/topic/index.vue'], () => { resolve(require('../pages/topic/index.vue')) })
}

const User = resolve => {
  require.ensure(['../pages/user/index.vue'], () => { resolve(require('../pages/user/index.vue')) })
}

const routers = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, {
    path: '/msg',
    name: 'msg',
    component: Msg,
    meta: {
      title: '消息'
    }
  }, {
    path: '/find',
    name: 'find',
    component: Find,
    meta: {
      title: '发现'
    }
  }, {
    path: '/person',
    name: 'person',
    component: Person,
    meta: {
      title: '我的'
    }
  }, {
    path: '/topic/:id',
    name: 'topic',
    component: Topic,
    meta: {
      title: '主题'
    }
  }, {
    path: '/user/:name',
    name: 'user',
    component: User,
    meta: {
      title: '用户'
    }
  }, {
    path: '*',
    component: Home
  }
]

export default routers
