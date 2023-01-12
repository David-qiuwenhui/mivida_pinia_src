import { defineStore } from "pinia";
import { reqLoadPostsByMe, reqLoadPostsLikedOrFavoredByMe } from "../apis/post";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
    const myPostsList = ref([]);
    const likedPostsList = ref([]);
    const favoredPostsList = ref([]);

    // 请求获取我的帖子数据
    async function loadPostsByMe() {
        let response = await reqLoadPostsByMe();
        // 保存我的帖子数据
        myPostsList.value = response;
    }

    // 请求获取我点赞的帖子数据
    async function postsLikedPostsByMe(type) {
        let response = await reqLoadPostsLikedOrFavoredByMe(type);
        // 保存我点赞的帖子数据
        likedPostsList.value = response;
    }

    // 请求获取我收藏的帖子的数据
    async function postsFavoredByMe(type) {
        let response = await reqLoadPostsLikedOrFavoredByMe(type);
        // 保存我收藏的帖子数据
        favoredPostsList.value = response;
    }

    return {
        myPostsList,
        likedPostsList,
        favoredPostsList,
        loadPostsByMe,
        postsLikedPostsByMe,
        postsFavoredByMe,
    };
});
