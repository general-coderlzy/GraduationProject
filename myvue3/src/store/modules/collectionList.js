import Axios from "axios";
import { Toast } from "vant";


const state = {
    collectionList: localStorage["collectionList"] ? JSON.parse(localStorage["collectionList"]) : [], //初始化收藏数组

}

const mutations = { //改变state 逻辑
    ADDCOLLECTION: (state, data) => {
        state.collectionList = JSON.parse(data);
        localStorage.setItem("collectionList", data);
    },
    DELCOLLECTION: (state, id) => {
        state.collectionList.splice(id, 1);
        localStorage.setItem("collectionList", JSON.stringify(state.collectionList));
        // console.log(state.collectionList[id].collectId);
        Axios.post("/delete_collect_goods", {
            collectId: state.collectionList[id].collectId
        }).then(res => {
            if (res.data) {
                Toast("真遗憾，没能让您喜欢！")
            }
        })

    },
    //单选
    SELECTED: (state, id) => {
        state.collectionList[id].selected = !state.collectionList[id].selected;
        localStorage.setItem("collectionList", JSON.stringify(state.collectionList));
        // console.log(state.collectionList[id].collectId);
        Axios.post('/is_goods_selected', {
            collectId: state.collectionList[id].collectId,
            select: Number(state.collectionList[id].selected)
        }).then(res => {
            if (res.data == true) {
                //修改后的操作

            }
        })

    },
    //全选
    SELECTEDALL: () => {
        //查询selected为false的数据，返回一个数组
        var unselect_arr = state.collectionList.filter(item => {
            return item.selected == false;
        })

        //如果有selected为false的数据，遍历数组，将select改为false
        if (unselect_arr.length > 0) {
            unselect_arr.forEach(item => {
                item.selected = true;
            });
        } else {
            state.collectionList.forEach(item => {
                item.selected = false;
            })
        }
        localStorage.setItem("collectionList", JSON.stringify(state.collectionList));

        //进行数据库操作
        if (unselect_arr.length > 0) {
            unselect_arr.forEach(item => {
                // console.log(item.collectId);
                Axios.post('/is_goods_selected', {
                    collectId: item.collectId,
                    select: 1
                }).then(res => {
                    if (res.data == true) {
                        //修改后的操作
                    }
                })
            });
        } else {
            state.collectionList.forEach(item => {
                Axios.post('/is_goods_selected', {
                    collectId: item.collectId,
                    select: 0
                }).then(res => {
                    if (res.data == true) {
                        //修改后的操作
                    }
                })
            })
        }

    },
    //删除选中
    DELECT_SELECTED: state => {
        //进行数据库操作
        //筛选被选中的
        var delete_selected_goods = state.collectionList.filter(item => {
            return item.selected == true;
        })
        delete_selected_goods.forEach(item => {
            Axios.post("/delete_collect_goods", {
                collectId: item.collectId
            }).then(res => {
                if (res.data) {
                    Toast("真遗憾，没能让您喜欢！")
                }
            })

        })

        //筛选没有被选中的商品重新赋值给state.collectionList
        var arr = state.collectionList.filter(item => {
            return item.selected == false;
        })
        state.collectionList = arr;
        localStorage.setItem("collectionList", JSON.stringify(arr));
    },
    //当当前用户退出账号，删除本地用户存储的收藏商品
    DELETE_ALLCOLLECTGOODS: state => {
        state.collectionList = [];
        localStorage.removeItem("collectionList")
    }
}
const actions = {  //异步分发mutations
    addCollection: (context, data) => {
        context.commit('ADDCOLLECTION', data)
    },
    delCollection: (context, id) => {
        context.commit('DELCOLLECTION', id);
    },
    //单选
    selected: (context, id) => {
        context.commit('SELECTED', id);
    },
    //全选
    selectedAll: (context) => {
        context.commit('SELECTEDALL');
    },
    //删除选中
    delete_selected: context => {
        context.commit('DELECT_SELECTED');
    },
    //当当前用户退出账号，删除本地用户存储的收藏商品
    delete_allcollectgoods: context => {
        context.commit('DELETE_ALLCOLLECTGOODS');
    }
}

const getters = {
    did_selected: state => {
        if (state.collectionList.length != 0) {
            //查询selected为false的数据，返回一个数组
            var arr = state.collectionList.filter(item => {
                return item.selected == false
            })
            //如果有一个商品的selelcted值为flase，全选就不勾
            if (arr.length > 0) {
                return false
            } else {
                return true
            }
        } else {
            return false;
        }

    }
}
export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    mutations,
    actions,
    getters
}