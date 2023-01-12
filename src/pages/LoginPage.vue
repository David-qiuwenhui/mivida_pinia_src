<template>
    <div class="loginPage">
        <img class="phoneImage" src="../assets/phone.png" />
        <div class="loginForm">
            <img src="../assets/logo.svg" />
            <form class="form" @submit.prevent>
                <input type="text" placeholder="邮箱" v-model="email" />
                <input
                    v-if="!isLogin"
                    type="text"
                    placeholder="用户名"
                    v-model="username"
                />
                <div class="passwardDiv">
                    <input
                        :type="passwordWatch ? 'text' : 'password'"
                        placeholder="密码"
                        v-model="password"
                    />
                    <svg
                        v-if="!passwordWatch"
                        @click="passwordWatch = !passwordWatch"
                        t="1665133794914"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2547"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M93.866667 322.773333a8.533333 8.533333 0 0 1 6.613333 3.114667c5.589333 6.848 10.261333 12.373333 14.058667 16.64 97.664 109.056 239.552 177.706667 397.482666 177.706667 162.752 0 308.48-72.917333 406.314667-187.84 1.493333-1.792 3.242667-3.882667 5.184-6.272a8.533333 8.533333 0 0 1 15.146667 5.376v9.813333l0.021333 8.32v51.754667a8.533333 8.533333 0 0 1-2.517333 6.037333 599.893333 599.893333 0 0 1-99.584 81.002667l82.474666 98.261333a8.533333 8.533333 0 0 1-1.066666 12.010667l-35.946667 30.165333a8.533333 8.533333 0 0 1-12.010667-1.045333l-89.813333-107.050667a593.045333 593.045333 0 0 1-145.450667 50.837333l44.074667 121.024a8.533333 8.533333 0 0 1-5.098667 10.944l-44.096 16.042667a8.533333 8.533333 0 0 1-10.944-5.098667l-48.448-133.098666a604.586667 604.586667 0 0 1-130.88-1.557334L390.4 714.517333a8.533333 8.533333 0 0 1-10.944 5.12l-44.096-16.064a8.533333 8.533333 0 0 1-5.12-10.944l45.184-124.096a593.066667 593.066667 0 0 1-131.584-47.744l-89.813333 107.029334a8.533333 8.533333 0 0 1-12.032 1.066666L106.026667 598.677333a8.533333 8.533333 0 0 1-1.066667-12.010666l82.474667-98.261334a599.872 599.872 0 0 1-80.981334-62.976c-4.352-4.032-10.56-10.026667-18.602666-18.005333A8.533333 8.533333 0 0 1 85.333333 401.386667v-70.101334c0-4.693333 3.84-8.533333 8.533334-8.533333z"
                            fill="#333333"
                            p-id="2548"
                        ></path>
                    </svg>
                    <svg
                        v-if="passwordWatch"
                        @click="passwordWatch = !passwordWatch"
                        t="1665134753321"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3159"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M512 283.456c-165.248 0-299.392 74.304-408.128 228.864 107.2 154.112 241.28 228.224 408.128 228.224 166.848 0 300.928-74.112 408.128-228.224C811.392 357.76 677.248 283.52 512 283.52zM512 832c-213.888 0-384.512-106.688-512-320 129.408-213.312 300.032-320 512-320 211.968 0 382.592 106.688 512 320-127.488 213.312-298.112 320-512 320z m0-137.152a182.848 182.848 0 1 0 0-365.696 182.848 182.848 0 0 0 0 365.696zM512 576a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                            fill="#262626"
                            p-id="3160"
                        ></path>
                    </svg>
                </div>

                <button
                    class="loginButton"
                    @click="isLogin ? userLogin() : userRegister()"
                >
                    {{ isLogin ? "登录" : "注册" }}
                </button>
                <p class="loginInfo" @click="isLogin = !isLogin">
                    {{
                        isLogin
                            ? "还没有账号？点击注册"
                            : "已经有账号？点击登录"
                    }}
                </p>
                <div v-if="!isLogin" class="agreement">
                    <input
                        type="checkbox"
                        v-model="agreementChecked"
                    />勾选表示同意隐私协议和使用规范
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "../piniaStores/user";

let isLogin = ref(true);
let email = ref("");
let username = ref("");
let password = ref("");
let passwordWatch = ref(false);
let agreementChecked = ref(false);

let router = useRouter();
// pinia store
let userStore = useUserStore();

// 注册新用户的回调函数
async function userRegister() {
    if (!agreementChecked.value) {
        ElMessage({
            type: "info",
            message: "请先阅读并同意隐私协议和使用规范",
        });
        return;
    }
    // pinia action
    await userStore.registerUser({
        email: email.value,
        username: username.value,
        password: password.value,
    });
    router.replace("/");
    ElMessage({
        type: "success",
        message: "注册成功",
    });
}

// 登录用户的回调函数
async function userLogin() {
    await userStore.loginUser({
        email: email.value,
        password: password.value,
    });
    router.replace("/");
    ElMessage({
        type: "success",
        message: "登录成功",
    });
}
</script>

<style scoped>
.loginPage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    gap: 5vw;
    padding: 0 10vw;
    align-items: center;
    background-color: #f8f9fb;
}

.phoneImage {
    max-width: 400px;
    position: relative;
    top: 36px;
    justify-self: end;
}

.loginForm {
    justify-self: start;
    box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
    background-color: white;
    border-radius: 32px;
    padding: 80px 60px;

    display: grid;
    justify-items: center;
    align-items: center;
    row-gap: 56px;
    width: 380px;
}

.form {
    display: grid;
    row-gap: 24px;
    width: 100%;
    height: 100%;
}

input {
    background: #fafafa;
    border-radius: 4px;
    border: none;
}

input::placeholder {
    color: #9e9e9e;
}

.loginButton {
    width: 100%;
    padding: 12px 0;
    background: #3f9eff;
    color: white;
    border: none;
}

.loginInfo {
    color: #1da0ff;
    text-align: center;
    cursor: pointer;
}

.agreement {
    color: #a1a1a1;
    display: flex;
    align-items: center;
    gap: 6px;
}

.passwardDiv {
    display: grid;
    grid-template-columns: 5fr 1fr;
    background-color: #fafafa;
}

svg {
    align-self: center;
    justify-self: start;
    cursor: pointer;
}
</style>
