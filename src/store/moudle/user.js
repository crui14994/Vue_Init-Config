//user.js
import { login, getInfo } from '@/api/user'

const types = {
    SET_USERNAME: 'SET_USERNAME', // 用户名称
    SET_TOKEN: 'SET_TOKEN', // 用户token
    SET_ROLES: 'SET_ROLES' //用户权限
}

const state = {
    username: "",
    token: sessionStorage.getItem('web-Token'),
    roles: []
}

const mutations = {
    [types.SET_USERNAME](state, username) {
        state.username = username;
    },
    [types.SET_TOKEN](state, token) {
        state.token = token;
    },
    [types.SET_ROLES](state, roles) {
        state.roles = roles;
    },
};

const getters = {

};

const actions = {
    //登录
    userLogin: ({ commit }, userInfo) => {
        const { name, pass } = userInfo;
        return new Promise((resolve, reject) => {
            login(name, pass).then(res => {
                const { token } = res.data;
                if (token) {
                    commit(types.SET_TOKEN, token);
                    sessionStorage.setItem('web-Token', token);
                }
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    //获取用户信息
    getUserInfo: ({ commit, state }) => {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(res => {
                commit(types.SET_USERNAME, res.data.name);
                commit(types.SET_ROLES, res.data.role);
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    //退出
    LogOut: ({ commit, state }) => {
        return new Promise((resolve, reject) => {
            commit(types.SET_TOKEN, '');
            commit(types.SET_ROLES, []);
            sessionStorage.clear();
            resolve();
        })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};