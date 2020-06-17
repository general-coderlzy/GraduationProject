const state = {
    personInfo: localStorage["person_info"] ? JSON.parse(localStorage["person_info"]) : [],
    Address: localStorage["address"] ? JSON.parse(localStorage["address"]) : [],
    EditItem: localStorage["editItem"] ? JSON.parse(localStorage["editItem"]) : [],
}
const mutations = {
    //登录时候保存的数据，不需要判断是否已经储存到本地
    SAVE_PERSONINFO(state, payload) {
        if (payload) {
            state.personInfo = JSON.parse(payload);
            localStorage.setItem("person_info", payload);
        }
    },
    //删除个人信息
    REMOVE_PERSONINFO(state) {
        state.personInfo = [];
        localStorage.removeItem("person_info");
    },
    //修改个人信息
    UPDATE_USERINFO(state, payload) {
        //先删除原来存储的信息
        if (localStorage["person_info"]) {
            localStorage.removeItem("person_info");
        }
        if (payload) {
            state.personInfo = JSON.parse(payload);
            localStorage.setItem("person_info", payload);
        }
    },
    //修改密码
    UPDATE_PASSWORD(state, payload) {
        if (payload) {
            //新改变state里面的password
            state.personInfo.password = payload;
            //再对修改密码后的数据重新保存
            var news = JSON.parse(localStorage["person_info"]);
            news.password = payload;
            localStorage.removeItem("person_info");
            localStorage.setItem("person_info", JSON.stringify(news));
        }
    },
    //保存我的收货地址中的数据
    SAVE_ADDRESS(state, payload) {
        state.Address = JSON.parse(payload);
        localStorage.setItem("address", payload);
    },
    //保存需要编辑的地址的数据
    EDIT_ADDRESS(state, payload) {
        state.EditItem = JSON.parse(payload);
        localStorage.setItem("editItem", payload);
    }
}

const actions = { //异步分发mutations
    //保存和删除用户操作
    save_peronInfo: (context, data) => {
        context.commit("SAVE_PERSONINFO", data)
    },
    remove_personInfo: context => {
        context.commit("REMOVE_PERSONINFO")
    },
    //更新用户信息操作
    update_userinfo: (context, data) => {
        context.commit("UPDATE_USERINFO", data);
    },
    //修改密码后刷新密码操作
    update_password: (context, data) => {
        context.commit("UPDATE_PASSWORD", data);
    },
    //保存我的收货地址中的数据
    save_address: (context, data) => {
        context.commit("SAVE_ADDRESS", data);
    },
    //保存需要编辑的地址的数据
    edit_address: (context, data) => {
        context.commit("EDIT_ADDRESS", data)
    }
}

const getters = {}

export default {
    namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}