import axios from 'axios';
const state = {
    cartList: localStorage["cartList"] ? JSON.parse(localStorage["cartList"]) : [], //初始化购物车数组
}

const getters = { //过滤
    allPrice: (state) => {
        var total = 0;
        state.cartList.forEach((item) => {
            if (item.isCheck) {
                total += item.pprice * item.buynum;
            }
        })
        return total;
    },
    //全选状态
    selectAll: () => {
        if (state.cartList.length === 0) return false;
        return !state.cartList.find(item => !item.isCheck);
    }

}

const mutations = { //改变state 逻辑
    ADDGOODS: (state, data) => {
        // console.log(data);

        // //找到商品的索引
        // var index = state.cartList.findIndex(item => item.pid == data.pid);
        // //判断商品是否存在，有就数量加，没有就加入cartlist
        // if (index === -1) {
        //     // console.log("还没有");
        //     state.cartList.push(data);
        //     localStorage.setItem("cartList", JSON.stringify(state.cartList));
        // } else {
        //     // console.log("有了");
        //     state.cartList[index].skudata.selectedNum += data.skudata.selectedNum;
        //     localStorage.setItem("cartList", JSON.stringify(state.cartList));
        // }
    },
    DELGOODS: (state, id) => {
        axios.post("/delCartGoods", { ccid: state.cartList[id].ccid });
        state.cartList.splice(id, 1);
    },
    ADDNUMBER: (state, id) => {
        state.cartList[id].buynum++;
        var form = {
            ccid: state.cartList[id].ccid,
            buynum: state.cartList[id].buynum,
        }
        axios.post("/addNum", { form: form });
    },
    DELNUMBER: (state, id) => {
        state.cartList[id].buynum--;
        var form = {
            ccid: state.cartList[id].ccid,
            buynum: state.cartList[id].buynum,
        }
        axios.post("/delNum", { form: form });
    },
    //单选
    SELECTED: (state, id) => {
        state.cartList[id].isCheck = !state.cartList[id].isCheck;
        var form = {
            ccid: state.cartList[id].ccid,
            isCheck: state.cartList[id].isCheck
        }
        axios.post("/updateIsCheck", { form: form });

    },
    //全选
    SELECTEDALL: () => {
        var arr = [];
        arr = state.cartList.map(item => item.isCheck == 1);
        var brr = state.cartList.map(item => item.ccid);
        // console.log(brr);

        //判断数组如果有一个false，就全部selected改为true
        // console.log(arr);
        var a = arr.indexOf(false);
        // console.log(a);//返回值为-1全是true
        if (a === -1) {
            // console.log("全选为false");
            state.cartList.forEach(item => {
                item.isCheck = false;
            });
            //保存到数据库
            for (let i = 0; i < brr.length; i++) {
                console.log(brr[i]);//ccid
                var form = {
                    ccid: brr[i],
                    isCheck: false
                }
                // console.log(form);
                axios.post("/updateIsCheck", { form: form });
            }
        } else {
            // console.log("全选为true");
            state.cartList.forEach(item => {
                item.isCheck = true;
            });
            //保存到数据库
            for (let i = 0; i < brr.length; i++) {
                console.log(brr[i]);//ccid
                var form = {
                    ccid: brr[i],
                    isCheck: true
                }
                // console.log(form);
                axios.post("/updateIsCheck", { form: form });
            }
        }






    }
}

const actions = {  //异步分发mutations
    addGoods: (context, data) => {
        context.commit('ADDGOODS', data)
    },
    delGoods: (context, id) => {
        context.commit('DELGOODS', id)
    },
    addNumber: (context, id) => {
        context.commit('ADDNUMBER', id)
    },
    delNumber: (context, id) => {
        context.commit('DELNUMBER', id)
    },
    selected: (context, id) => {
        context.commit('SELECTED', id)
    },
    selectedAll: (context) => {
        context.commit('SELECTEDALL')
    }
}
export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
