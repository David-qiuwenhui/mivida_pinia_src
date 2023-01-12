import { reqLoadComments, reqCreateComment } from "../apis/comment";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usePostStore } from "./post";

export const useCommentStore = defineStore("comment", () => {
    const commentList = ref([]);
    // 加载某个帖子的所有评论数据
    async function loadAllComments({ id }) {
        const comments = await reqLoadComments(id);
        commentList.value = comments;
    }

    // 请求发布对某个帖子的新评论
    async function addComments({ content, postId }) {
        await reqCreateComment(content, postId);
        loadAllComments({ postId });

        // 客户端本地增加某个帖子的评论数量
        const postStore = usePostStore();
        postStore.increaseCommentCount(postId);
    }

    return { commentList, loadAllComments, addComments };
});
