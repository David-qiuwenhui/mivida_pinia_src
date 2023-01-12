import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
    reqCreatePost,
    reqLoadPosts,
    reqLikePost,
    reqFavorPost,
} from "../apis/post.js";
import { useShowStore } from "./show";
import { useCommentStore } from "./comment";

export const usePostStore = defineStore("post", () => {
    const list = ref([]);
    const searchResult = ref([]);
    const searchText = ref("");
    const currentId = ref(null);

    const showStore = useShowStore();
    // 请求上传新帖子
    async function uploadPosts({ image, description }) {
        await reqCreatePost(image, description);
        // 重新加载所有帖子的数据
        await loadAllPosts();
        // 关闭上传帖子的窗口
        showStore.changeShowPostUpload(false);
    }

    // 加载首页所有的帖子数据
    async function loadAllPosts() {
        const posts = await reqLoadPosts();
        list.value = posts;
    }

    // 处理单个帖子的点赞事件
    async function toggleLike(id) {
        const isLike = await reqLikePost(id);
        const post = list.value.find((post) => post.id === id);
        if (isLike) {
            post.liked_bies = (post.liked_bies || 0) + 1;
        } else {
            post.liked_bies--;
        }
        post.likedByMe = isLike;
    }

    // 处理单个帖子的收藏事件
    async function toggleFavor(id) {
        const isFavor = await reqFavorPost(id);
        const post = list.value.find((post) => post.id === id);
        if (isFavor) {
            post.favored_bies = (post.favored_bies || 0) + 1;
        } else {
            post.favored_bies--;
        }
        post.favoredByMe = isFavor;
    }

    // 请求获取搜索结果的帖子数据
    async function searchPosts(search) {
        const posts = await reqLoadPosts(
            "filters[description][$contains]=" + search
        );
        // 更新搜索的结果
        searchResult.value = posts;
        searchText.value = search;
    }

    const commentStore = useCommentStore();
    // 请求展示帖子详情页
    async function showPostDetails(id) {
        // 设置展示详情页的帖子id
        currentId.value = id;
        await commentStore.loadAllComments({ id });
        showStore.changeShowPostDetails(true);
    }

    // 请求隐藏帖子详情页
    async function hidePostDetails() {
        showStore.changeShowPostDetails(false);
        currentId.value = null;
    }

    // 根据点击的帖子提取帖子详情数据 getter
    const postDetails = computed(() => {
        return list.value.find((post) => post.id === currentId.value);
    });

    // 客户端本地增加某个帖子的评论数量
    function increaseCommentCount(id) {
        const post = list.value.find((post) => post.id === id);
        post.comments++;
    }

    return {
        list,
        searchResult,
        searchText,
        currentId,
        postDetails,
        uploadPosts,
        loadAllPosts,
        toggleLike,
        toggleFavor,
        searchPosts,
        showPostDetails,
        hidePostDetails,
        increaseCommentCount,
    };
});
