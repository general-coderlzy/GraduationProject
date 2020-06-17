 <template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">潮牌商城</div>
      <div slot="right" class="setting">
        <van-icon name="setting-o" size="20px" @click="show_selected">
          <!-- 在父组件当中如果想要给子组件添加一个原生事件，需要加.native，不然是没有效果的 -->
          <options :show="show" @logout="logout" @click.native="example" />
        </van-icon>
      </div>
    </nav-bar>
    <scroll class="scroll-height">
      <login
        :cur-login="isLogin"
        :phone="phone"
        :username="username"
        @goLogin="goLogin"
        ref="login"
      ></login>
      <collection />
      <div class="line"></div>
      <profile-list />
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import Login from "@/pages/profile/children/Login";
import Scroll from "@/components/scroll/Scroll";
import Collection from "./children/Collection";
import ProfileList from "./children/profileList";
import Options from "./children/Options";
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      isLogin: false,
      username: "",
      phone: "",
      show: false
    };
  },
  components: {
    NavBar,
    Login,
    Scroll,
    Collection,
    ProfileList,
    Options,
    Toast,
    mapState,
    mapActions
  },
  computed: {
    ...mapState({
      Get_image: state => state.Profile.personInfo.photo
    })
  },

  methods: {
    ...mapActions("collectionList", ["delete_allcollectgoods"]),
    goLogin() {
      this.$router.push("/login");
    },
    show_selected() {
      this.show = !this.show;
    },
    example() {
      //这个方法暂停没用到
    },
    //退出当前用户按钮点击事件
    logout() {
      //退出当前账号
      if (this.$store.state.Profile.personInfo.length == 0) {
        Toast("请您先登录账号！");
      } else {
        this.$store.dispatch("Profile/remove_personInfo");
        this.isLogin = false;
        //退出当前头像图片
        this.$refs.login.defaultPic = require("@/assets/img/profile/user.png");
        Toast("已经退出当前账号！");
        //删除本地的存储的收藏商品
        if (localStorage["collectionList"]) {
          this.delete_allcollectgoods();
        }
        //删除本地收货地址
        if (localStorage["address"]) {
          localStorage.removeItem("address");
        }
        if (localStorage["editItem"]) {
          localStorage.removeItem("editItem");
        }
      }
    }
  },
  //只有使用keep-alive才能使用此函数
  activated() {
    //保存原先的图片，退出时把头像改为原来的图片
    let original_image = this.$refs.login.defaultPic;

    if (this.Get_image) {
      let user_image =
        "http://127.0.0.1:3000/public/uploads/headSculpture/" + this.Get_image;
      this.$refs.login.defaultPic = user_image;
    } else {
      this.$refs.login.defaultPic = original_image;
    }

    //通过personInfo的长度判断是否有用户登录
    let shop_login = this.$store.state.Profile.personInfo;
    if (shop_login.length != 0) {
      this.username = shop_login.name;
      this.phone = shop_login.phone;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.show = false;
  }
};
</script>
<style scoped>
#profile {
  width: 100%;
}
#profile .nav-bar {
  font-weight: 600;
  background-color: #ff8198;
  color: white;
  position: relative;
}
.setting .van-icon-setting-o {
  position: absolute;
  top: 12px;
  right: 20px;
}
#profile .scroll-height {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>


