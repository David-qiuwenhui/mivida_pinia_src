import { getUser, reqRegister, reqLogin, reqLogout } from "../apis/auth.js";
import { reqUpdateUser } from "../apis/profile";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
    // 用户数据
    const user = ref(getUser() || {});

    // 注册新用户
    async function registerUser({ email, username, password }) {
        const userInfo = await reqRegister(email, username, password);
        user.value = userInfo;
    }

    // 登录用户
    async function loginUser({ email, password }) {
        const userInfo = await reqLogin(email, password);
        user.value = userInfo;
    }

    // 退出登录
    async function logoutUser() {
        reqLogout();
        user.value = {};
    }

    // 请求更新用户数据
    async function updateUser(userData) {
        const response = await reqUpdateUser(userData);
        user.value = response;
    }

    return {
        user,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
    };
});
