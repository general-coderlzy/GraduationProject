<template>
  <div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-row>
        <van-col span="12" v-for="(item,index) in goods" :key="index">
          <div class="listItem" @click.stop="goGoodsDetail(item.pid)">
            <div class="listItem_img">
              <van-image fit="cover" :src="imgSrc + item.pcode+'/'+ item.img" />
            </div>
            <div class="listItem_text">
              <p>{{item.name}}</p>
              <span class="new_price">￥{{item.pprice}}</span>
              <span class="old_price">￥{{item.cprice}}</span>
            </div>
          </div>
        
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, Card, Image, Row, Col } from "vant";
import localStotage from "../../localStorage/localStorage";
import { getSwipeImg, getDetailImg, getSku } from "../../network/home";
export default {
  data() {
    return {
      swipeImg: [],
      detailImg: [],
      loading: false,
      finished: true,
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/",
      skuData: [],
      index: 0
    };
  },
  created() {
    // 详情轮播图
    getSwipeImg().then(res => {
      // console.log(res);
      this.swipeImg = res;
    });
    // 详情图片
    getDetailImg().then(res => {
      // console.log(res);
      this.detailImg = res;
    });
    //sku
    getSku().then(res => {
      // console.log(res);
      this.skuData = res;
    });
  },
  components: {},
  props: {
    goods: {
      type: Array,
      default: null
    }
  },
  computed: {},

  methods: {
    onLoad() {
      // // 异步更新数据
      // setTimeout(() => {
      //   let DataItem = [this.goods.slice(5 * this.index, 5 * (this.index + 1))];
      //   for (let i = 0; i < DataItem.length; i++) {
      //     for (let j = 0; j < DataItem[i].length; j++) {
      //       this.showgoods.push(DataItem[i][j]);
      //     }
      //   }
      //   this.index++; // 页数递增
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   // if (this.goods.length) {
      //   //   this.finished = true;
      //   // }
      //   if (this.showgoods.length === this.goods.length) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    // 过滤数组重复的对象
    deteleObject(obj) {
      var uniques = [];
      var stringify = {};
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
          return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      uniques = uniques;
      return uniques;
    },
    goGoodsDetail(id) {
      // console.log(this.goods);
      // console.log(this.skuData);
      // console.log(id);

      var sku = this.skuData;
      var choose_sku = []; //得到选中的sku
      for (let i = 0; i < sku.length; i++) {
        if (sku[i].pid == id) {
          choose_sku.push(sku[i]);
        }
      }
      // sku颜色
      var color = choose_sku.map(r => {
        return {
          id: r.color,
          name: r.color
        };
      });
      // sku尺寸
      var size = choose_sku.map(r => {
        return {
          id: r.size,
          name: r.size
        };
      });
      //sku.list
      var skulist = choose_sku.map(r => {
        return {
          sid: r.sid,
          price: r.pprice * 100,
          s1: r.color,
          s2: r.size,
          stock_num: r.num
        };
      });
      var v_color = this.deteleObject(color);
      var v_size = this.deteleObject(size);

      let choose_goods = {};
      for (let i = 0; i < this.goods.length; i++) {
        if (this.goods[i].pid == id) {
          // console.log(this.swipeImg[id - 1]);

          choose_goods = this.goods[i];
          choose_goods.sImg = this.swipeImg[id - 1];
          choose_goods.dImg = this.detailImg[id - 1];

          // choose_goods.sImg = Object.values(this.swipeImg[id - 1]);
          // choose_goods.dImg = Object.values(this.detailImg[id - 1]);
        }
      }
      var sku = {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: v_color,
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: v_size,
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        list: skulist,
        price: choose_goods.pprice + ".00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      };
      choose_goods.sku = sku;
      // console.log(choose_goods);
      localStotage.save("choose_goods", choose_goods);
      this.$router.push({
        path: "/Detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped>
.listItem {
  padding: 5px;
}
.listItem_text p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.listItem_text .new_price {
  color: orangered;
}
.listItem_text .old_price {
  font-size: 12px;
  color: gray;
  text-decoration: line-through;
}
</style>