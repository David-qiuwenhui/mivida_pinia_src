<template>
    <div>
        <div class="profileContainer">
            <TheAvatar
                class="avatar"
                size="200px"
                :src="user.avatar"
            ></TheAvatar>
            <div class="profile">
                <p class="name">
                    <span>{{ user.name }}</span>
                    <router-link to="/profile/edit">编辑个人资料</router-link>
                </p>
                <p class="username">@{{ user.username }}</p>
                <div class="description">
                    <pre>{{ user.intro }}</pre>
                </div>
                <p class="website">{{ user.email }}</p>
            </div>
        </div>
        <div class="tabs">
            <div
                class="tab"
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: index === currentIndex }"
                @click="currentIndex = index"
            >
                <TheIcon :icon="tab.icon"></TheIcon>
                <p>{{ tab.label }}</p>
            </div>
        </div>
        <div class="tabContet">
            <p>{{ myPosts[currentIndex].length }}</p>
            <div class="posts">
                <img
                    v-for="imageData in myPosts[currentIndex]"
                    :key="imageData.id"
                    :src="imageData.image"
                    class="postImage"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import TheAvatar from "../components/TheAvatar.vue";
import TheIcon from "../components/TheIcon.vue";
import { ref, computed, watch, reactive } from "vue";
import { useUserStore } from "../piniaStores/user";
import { useProfileStore } from "../piniaStores/profile";

const userStore = useUserStore();
const useProfile = useProfileStore();
const tabs = ref([
    {
        label: "我的",
        icon: "posts",
    },
    {
        label: "赞过",
        icon: "like",
    },
    {
        label: "收藏",
        icon: "favorite",
    },
]);

// 获取登录用户的数据
let user = computed(() => userStore.user);

let currentIndex = ref(0);
const myPosts = reactive({
    0: [],
    1: [],
    2: [],
});

watch(
    currentIndex,
    async () => {
        switch (currentIndex.value) {
            case 0:
                // 请求获取我的帖子数据
                await useProfile.loadPostsByMe();
                myPosts[0] = useProfile.myPostsList;
                break;

            case 1:
                // 请求获取点赞帖子数据
                await useProfile.postsLikedPostsByMe("likes");
                myPosts[1] = useProfile.likedPostsList;
                break;

            case 2:
                // 请求获取收藏帖子数据
                await useProfile.postsFavoredByMe("favors");
                myPosts[2] = useProfile.favoredPostsList;
                break;
            default:
                return;
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.profileContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8vw;
}

.avatar {
    justify-self: end;
}

.profile {
    align-self: center;
}

.profile .name {
    display: flex;
    align-items: center;
    font-size: 24px;
}

.profile .name > a {
    color: #1da0ff;
    text-decoration: none;
    margin-left: 30px;
    font-size: 18px;
}

.profile .username {
    margin-top: 5px;
    color: #848484;
}

.profile .description {
    margin-top: 24px;
    margin-bottom: 24px;
}

.tabs {
    display: grid;
    grid-template-columns: repeat(3, 88px);
    column-gap: 4vw;
    justify-content: center;

    margin-top: 5vmin;
    margin-bottom: 20px;
}

.tab {
    text-align: center;
    cursor: pointer;
}

.tab > svg {
    width: 32px;
    height: 32px;
    stroke: #8a9194;
    fill: #8a9194;
}

.tab.active {
    background: #f6f9fb;
    border-radius: 18px;
}

.tab.active > svg {
    stroke: #1787d9;
    fill: #1787d9;
}

.tab.active > p {
    color: #1787d9;
}

.tabContet > p {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 32px;
}

.posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
}

.postImage {
    width: 100%;
    height: 321px;
    background: #eee;
    object-fit: cover;
}
</style>
