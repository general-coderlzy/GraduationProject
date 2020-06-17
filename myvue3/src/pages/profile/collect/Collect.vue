<!--  -->
<template>
  <div id="Collect">
    <nav-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" />
      </div>
      <div slot="center">{{$route.meta.title}}({{collection.length}})</div>
      <div slot="right" v-if="Edit_selected" @click="Edit_didClick">编辑</div>
      <div slot="right" v-else @click="cancel_didClick">取消</div>
    </nav-bar>
    <!-- 商品列表 -->
    <div class="collect-goods" v-for="(item,index) in collection" :key="index">
      <van-swipe-cell>
        <template slot="default">
          <div class="goods">
            <div class="left_checkbox" v-if="!Edit_selected">
              <van-checkbox class="goods_checkbox" v-model="item.selected" @click="selected(index)"></van-checkbox>
            </div>
            <div class="right_card">
              <van-card
                :title="item.name"
                :price="formatPrice(item.price)"
                :thumb="imgSrc + item.pcode+'/'+ item.img"
              ></van-card>
            </div>
          </div>
        </template>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="onDel(index)" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="footer" v-if="!Edit_selected">
      <van-checkbox :value="did_selected" class="all_check" @click="selectedAll()">全选</van-checkbox>
      <van-button type="danger" size="mini" @click="d_selected">删除选中</van-button>
    </div>
    <div class="hidden" v-else></div>
    <div class="nothing" v-if="collection.length == 0">
      <span>亲，赶紧把你喜欢的商品收藏呦~~~</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  Card,
  Checkbox,
  CheckboxGroup,
  Icon,
  Toast,
  Button,
  Dialog
} from "vant";
import NavBar from "@/components/navbar/NavBar";
export default {
  data() {
    return {
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/",
      checked: true,
      int: true,
      Edit_selected: true
    };
  },
  name: "Cart",
  components: {
    NavBar,
    Card,
    Checkbox,
    CheckboxGroup,
    Icon,
    Toast,
    Button,
    Dialog
  },
  created() {
    // console.log(this.collection);
  },

  computed: {
    ...mapState({
      collection: state => state.collectionList.collectionList
    }),
    ...mapGetters("collectionList", ["did_selected"])
  },
  methods: {
    ...mapActions("collectionList", [
      "delCollection",
      "selected",
      "selectedAll",
      "delete_selected"
    ]),
    //钱的格式
    formatPrice(price) {
      return price.toFixed(2);
    },
    //删除商品
    onDel(index) {
      Dialog.confirm({
        message: "确定删除吗？"
      })
        //确定按钮的事件
        .then(() => {
          this.delCollection(index);
        })
        //取消按钮的事件
        .catch(() => {
          return;
        });
    },
    //点击编辑处理事件
    Edit_didClick() {
      if (this.collection.length == 0) {
        Toast("亲，您还没有添加任何商品哟！");
      } else {
        this.Edit_selected = !this.Edit_selected;
      }
    },
    //点击取消处理事件
    cancel_didClick() {
      this.Edit_selected = !this.Edit_selected;
    },
    //删除选中处理事件
    d_selected() {
      this.delete_selected();
      if (this.collection.length == 0) {
        this.Edit_selected = !this.Edit_selected;
      }
    }
  }
};
</script>
<style scoped>
#Collect {
  margin-top: 44px;
  /* height: 100%; */
  /* background-color: #ccc; */
}
#Collect:nth-last-child(2) {
  margin-bottom: 110px;
}
.collect-goods {
  width: 100%;
  background-color: #fff;
  display: flex;
  /* position: relative; */
  margin: 10px 0;
}
.goods {
  display: flex;
}
.left_checkbox {
  width: 10%;
}
.right_card {
  flex: 1;
}
.van-button {
  height: 100%;
  font-size: 20px;
  border: none;
}
.goods_checkbox {
  height: 100%;
  padding-left: 20%;
}
/* 底部 */
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  background-color: rgb(250, 242, 242);
  z-index: 99;
}
.footer .van-checkbox {
  position: fixed;
  bottom: 15px;
  left: 20px;
}
.footer .van-button {
  height: 40px;
  width: 80px;
  font-size: 14px;
  position: fixed;
  bottom: 5px;
  right: 20px;
}
.footer .van-checkbox__label {
  width: 50px;
  height: 20px;
}
.footer .all_check {
  width: 100px;
}
.hidden {
  width: 100%;
  height: 51px;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  z-index: 99;
}
/* 没有任何商品显示 */
.nothing {
  width: 80%;
  height: 80px;
  line-height: 80px;
  background-color: #ffffff;
  margin: 0 auto;
  text-align: center;
}
.nothing span {
  color: rgb(240, 130, 130);
}
</style>