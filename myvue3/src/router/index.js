import Vue from 'vue'
import Router from 'vue-router'
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
import HelloWorld from '@/components/HelloWorld'

const Home = () => import('../pages/home/Home')
const Category = () => import('../pages/category/Category')
const Cart = () => import('../pages/cart/Cart')
const Profile = () => import('../pages/profile/Profile')
// const Detail = () => import('../pages/home/childrencomponents/Detail')
const Detail = () => import('../pages/detail/Detail')
const SearchResult = () => import('../pages/search/SearchResult')


const Order = () => import('../pages/order/Order')


const Login = () => import('@/Login/Login.vue')
const Register = () => import('../pages/profile/register/Register.vue')
const PersonInfo = () => import('../pages/profile/children/PersonInfo.vue')
const EditInfo = () => import('../pages/profile/children/Edit.vue')
const Update_Pwd = () => import('../pages/profile/children/UpdatePwd.vue')
const Collect = () => import('../pages/profile/collect/Collect.vue')
const InputCode = () => import('../pages/profile/collect/InputCode.vue')
const ChargeMoeny = () => import('../pages/profile/collect/ChargeMoney.vue')
const MyMessage = () => import("@/pages/profile/ProfileList/myMessage.vue")
const HarvestAddress = () => import("../pages/profile/ProfileList/mymessage/HarvestAddress.vue")
const AddAddress = () => import("../pages/profile/ProfileList/mymessage/AddAddress.vue")
const EditAddress = () => import("../pages/profile/ProfileList/mymessage/EditAddress.vue")
const Integral = () => import("../pages/profile/ProfileList/Integral")
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/Home",
      meta: {
        title: 'Home',
        keepAlive: true
      }
    },
    {
      path: '/Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Category',
      component: Category,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Cart',
      component: Cart
    },
    {
      path: '/Profile',
      component: Profile,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Detail',
      component: Detail

    },
    {
      path: '/SearchResult',
      component: SearchResult,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Order',
      component: Order
    },
    /************************志豪**************************************************/
    {
      path: "/login",
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: "/personInfo",
      component: PersonInfo,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: "/editInfo",
      component: EditInfo,
      meta: {
        title: '编辑信息'
      }
    },
    {
      path: "/update_pwd",
      component: Update_Pwd,
      meta: {
        title: '修改密码'
      }
    },
    {
      path: "/collect",
      component: Collect,
      meta: {
        title: '收藏'
      }
    },
    {
      path: "/inputcode",
      component: InputCode,
      meta: {
        title: '绑定邮箱'
      }
    },
    {
      path: "/chargemoney",
      component: ChargeMoeny,
      meta: {
        title: '账号充值'
      }
    },
    {
      path: "/mymessage",
      component: MyMessage,
      meta: {
        title: '我的消息'
      }
    },
    {
      path: "/harvestaddress",
      component: HarvestAddress,
      meta: {
        title: '收货地址'
      }
    },
    {
      path: "/addaddress",
      component: AddAddress,
      meta: {
        title: '添加收货地址'
      }
    },
    {
      path: "/editaddress",
      component: EditAddress,
      meta: {
        title: '编辑收货地址'
      }
    },
    {
      path: "/integral",
      component: Integral,
      meta: {
        title: '积分商城'
      }
    }
    /*************************************************************************/
  ],
  mode: "history",
  // 从详情页返回列表页时返回到上次滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
