<template>
    <div class="navbar">
        <div class="leftBox">
            <router-link to="/">
                <img src="../assets/logo.svg" />
            </router-link>
        </div>
        <div class="middleBox">
            <input
                type="text"
                @change="resolveSearchPosts"
                v-model="searchText"
            />
            <span>
                <el-button
                    type="info"
                    size="large"
                    :icon="Search"
                    :circle="true"
                    :round="true"
                    @click="resolveSearchPosts"
                ></el-button
            ></span>
        </div>
        <div class="rightBox">
            <router-link to="/"
                ><el-icon :size="38" color="black"><HomeFilled /></el-icon
            ></router-link>
            <div class="publish" @click="publishPost" style="cursor: pointer">
                <svg
                    t="1665233878142"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="17960"
                    id="mx_n_1665233878144"
                    width="38"
                    height="38"
                >
                    <path
                        d="M832 192 512 192c0-52.928-43.072-96-96-96l-64 0C299.072 96 256 139.072 256 192L160 192C107.072 192 64 235.072 64 288l0 512c0 52.928 43.072 96 96 96l417.888 0c9.088 0 17.792-3.872 23.84-10.656s8.96-15.84 7.968-24.864c-0.928-8.416-1.568-16.864-1.568-25.536 0-141.664 132.192-254.688 279.904-216.672 9.568 2.4 19.744 0.352 27.584-5.728C923.424 606.496 928 597.152 928 587.296L928 288C928 235.072 884.928 192 832 192zM480 736c-105.888 0-192-86.112-192-192s86.112-192 192-192 192 86.112 192 192S585.888 736 480 736zM784 416c-26.496 0-48-21.504-48-48s21.504-48 48-48 48 21.504 48 48S810.496 416 784 416z"
                        p-id="17961"
                    ></path>
                    <path
                        d="M832 673.984c-88.384 0-160 71.616-160 160s71.616 160 160 160 160-71.616 160-160S920.384 673.984 832 673.984zM896 864l-32 0 0 32c0 17.696-14.304 32-32 32s-32-14.304-32-32l0-32-32 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l32 0 0-32c0-17.696 14.304-32 32-32s32 14.304 32 32l0 32 32 0c17.696 0 32 14.304 32 32S913.696 864 896 864z"
                        p-id="17962"
                    ></path>
                </svg>
            </div>
            <el-dropdown>
                <TheAvatar
                    :src="user.avatar"
                    size="42px"
                    @click="showDropDown = !showDropDown"
                    style="cursor: pointer"
                ></TheAvatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            style="font-size: 16px; font-weight: bold"
                            @click="$router.push({ name: 'profile' })"
                            >个人主页</el-dropdown-item
                        >
                        <el-dropdown-item
                            @click="userLogout"
                            style="font-size: 16px; font-weight: bold"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import TheAvatar from "./TheAvatar.vue";

import { useShowStore } from "../piniaStores/show";
import { useUserStore } from "../piniaStores/user";
import { usePostStore } from "../piniaStores/post";

const showStore = useShowStore();
const userStore = useUserStore();
const postStore = usePostStore();
let showDropDown = ref(false);
let router = useRouter();
let user = computed(() => userStore.user);
let searchText = ref("");

// 用户退出登录的事件回调
async function userLogout() {
    await userStore.logoutUser();
    router.replace("/login");
}

// 新建帖子的事件回调
function publishPost() {
    router.push({ name: "home" });
    showStore.changeShowPostUpload(true);
}

// 自定义搜索的回调函数
async function resolveSearchPosts() {
    if (searchText.value.length) {
        await postStore.searchPosts(searchText.value);
        router.push({
            name: "search_result",
        });
        searchText.value = "";
    } else {
        router.push({ name: "home" });
    }
}
</script>

<style scoped>
.navbar {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.middleBox {
    width: 480px;
}

.rightBox {
    width: 180px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.middleBox {
    background-color: #f1f1f1;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.middleBox input {
    width: 90%;
    padding: auto 0;
    border: none;
    border-radius: 20px;
    background-color: #f1f1f1;
}
</style>
