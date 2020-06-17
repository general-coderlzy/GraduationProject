<template>
  <div class="collection">
    <div class="collection-item" @click="to_recharge">
      <p>
        {{Get_Moeny | numFilter}}
        <span>元</span>
      </p>
      <p>我的余额</p>
    </div>
    <div class="collection-item">
      <p>
        {{Get_integral}}
        <span>分</span>
      </p>
      <p>我的积分</p>
    </div>
    <div class="collection-item" @click="go_Collect">
      <p>
        {{this.$store.state.collectionList.collectionList.length}}
        <span>个</span>
      </p>
      <p>我的收藏</p>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  name: "Collection",
  data() {
    return {};
  },
  filters: {
    //对我的余额进行保留小数点两位数操作
    numFilter(value) {
      let realVal = "";
      if (value) {
        // 截取当前数据到小数点后三位
        let tempVal = parseFloat(value).toFixed(3);
        realVal = tempVal.substring(0, tempVal.length - 1);
      } else {
        realVal = "0";
      }
      return realVal;
    }
  },
  methods: {
    ...mapActions("collectionList", ["addCollection"]),
    go_Collect() {
      this.$axios;
      // .get("/get_collect_data", {
      //   params: {
      //     cid: this.Get_Cid
      //   }
      // })
      // .then(res => {
      //   if (res.data) {
      //     this.addCollection(JSON.stringify(res.data));
      //     this.$router.push("/collect");
      //   } else {
      //     Toast("获取数据失败！");
      //   }
      // });
      this.$router.push("/collect");
    },
    //充钱方法
    to_recharge() {
      //判断是否有用户登录
      if (this.Get_personInfo.length != 0) {
        //判断是否已经绑定过了
        if (this.Get_bindEmail == 0) {
          Dialog.confirm({
            title: "邮箱验证",
            message: "需要通过QQ邮箱验证，是否继续？"
          })
            .then(() => {
              this.$axios
                .post("/postSendEmail", {
                  email: this.Get_Email
                })
                .then(res => {
                  if (res.data == true) {
                    Toast("请留意QQ邮箱！");
                    setTimeout(() => {
                      this.$router.push("/inputcode");
                    }, 1000);
                  }
                })
                .catch(err => {});
            })
            .catch(() => {
              // on cancel
            });
        } else {
          //已经绑定了邮箱后的操作
          this.$router.push("/chargemoney");
        }
      } else {
        Toast("请先登录！！！");
      }
    }
  },
  components: { Dialog },
  computed: {
    ...mapState({
      Get_Cid: state => state.Profile.personInfo.cid,
      Get_Email: state => state.Profile.personInfo.email,
      Get_Moeny: state => state.Profile.personInfo.balance,
      Get_bindEmail: state => state.Profile.personInfo.bindEmail,
      Get_personInfo: state => state.Profile.personInfo,
      Get_integral: state => state.Profile.personInfo.integral
    })
  }
};
</script>

<style scoped>
.collection {
  width: 100%;
  display: flex;
}

.collection .collection-item {
  flex: 1;
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.collection .collection-item:nth-of-type(1),
.collection .collection-item:nth-of-type(2) {
  border-right: 1px solid #eeeeee;
}

.collection .collection-item p:first-child {
  font-size: 18px;
  font-weight: 700;
  color: #ff5f3e;
  margin-bottom: 3px;
}

.collection .collection-item p:first-child span {
  font-size: 14px;
  color: #666666;
  font-weight: normal;
  margin-left: 3px;
}

.collection .collection-item p:last-child {
  font-size: 14px;
  color: #666666;
}
</style>
