<template>
    <TheModal @close="postStore.hidePostDetails()">
        <div class="postDetails">
            <img :src="post.image" />
            <div class="postMeta">
                <div class="author">
                    <TheAvatar
                        :src="post?.user?.avatar"
                        size="42px"
                    ></TheAvatar>
                    <span>{{ post?.user?.name }}</span>
                </div>
                <pre class="postDesc"
                    >{{ post.description }}
                </pre>
                <div class="comments">
                    <div
                        class="comment"
                        v-for="comment in comments"
                        :key="comment.id"
                    >
                        <TheAvatar :src="comment?.user?.avatar"></TheAvatar>
                        <span class="user">{{ comment.user?.name }}</span>
                        <span class="commentDate">{{
                            dateToRelative(comment.pubDate)
                        }}</span>
                        <p class="commentContent">{{ comment.content }}</p>
                    </div>
                </div>
                <div class="actions">
                    <PostActions
                        class="postActions"
                        :likes="post.liked_bies"
                        :comments="post.comments"
                        :favors="post.favored_bies"
                        @likeClick="postStore.toggleLike(post.id)"
                        @favorClick="postStore.toggleFavor(post.id)"
                        :likedByMe="post.likedByMe"
                        :favoredByMe="post.favoredByMe"
                    ></PostActions>
                    <span class="postPubDate">{{
                        dateToRelative(post.publishedAt)
                    }}</span>
                    <input
                        type="text"
                        name="comment"
                        class="commentInput"
                        placeholder="写一条评论吧"
                        v-model="commentText"
                    />
                    <button class="commentPubBtn" @click="publishComment">
                        发布
                    </button>
                </div>
            </div>
        </div>
    </TheModal>
</template>

<script setup>
import TheModal from "./TheModal.vue";
import PostActions from "./PostActions.vue";
import { dateToRelative } from "../utils/date";
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import TheAvatar from "./TheAvatar.vue";
import { usePostStore } from "../piniaStores/post";
import { useCommentStore } from "../piniaStores/comment";
// import { useShowStore } from "../piniaStores/show";

const postStore = usePostStore();
const commentStore = useCommentStore();
let post = computed(() => postStore.postDetails);
let comments = computed(() => commentStore.commentList);
let commentText = ref("");

// 发布评论的回调函数
async function publishComment() {
    await commentStore.addComments({
        content: commentText.value,
        postId: post.value.id,
    });
    ElMessage({
        type: "success",
        message: "评论成功",
    });
    commentText.value = "";

    let id = postStore.currentId;
    await commentStore.loadAllComments({ id });
}
</script>

<style scoped>
.postDetails {
    display: grid;
    grid-template-columns: 1fr minmax(auto, 300px);
    grid-template-rows: minmax(0, 1fr);
    width: 80vw;
    height: 80vh;
}

.postDetails > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.postMeta {
    padding: 24px;
    padding-top: 36px;
    display: grid;
    align-items: start;
    grid-template-rows: max-content max-content 1fr max-content;
    max-height: 100%;
    max-width: 100%;
}

.author {
    display: flex;
    align-items: center;
    gap: 10px;
}

.postDesc {
    width: 100%;
    white-space: pre-wrap;
    margin-top: 24px;
}

.comments {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 28px;
    align-items: start;
    overflow-y: auto;
    height: 100%;
}

.comment {
    display: grid;
    grid-template-areas:
        "avatar name date"
        "comment comment comment";
    grid-template-columns: 34px 1fr 1fr;
    align-items: center;
    column-gap: 12px;
    row-gap: 12px;
}

.commentDate {
    grid-area: date;
    justify-self: start;
    color: #a7a7a7;
}

.commentContent {
    grid-area: comment;
    padding-left: 5px;
}

.actions {
    border-top: 1px solid #eaeaea;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    margin: 20px -24px 0 -24px;
    padding: 20px 24px 0 24px;
    row-gap: 16px;
}

.postActions > :deep(div) {
    transform: scale(0.8125);
}

.postPubDate {
    color: #9f9f9f;
    grid-column: 2 / 6;
    justify-self: end;
    font-size: 14px;
}

.commentInput {
    background-color: #f7f7f7;
    border-radius: 16px;
    border: none;
    grid-column: 1 / 4;
}

.commentPubBtn {
    color: #1da0ff;
    border: none;
    background: none;
    font-size: 16px;
    margin-left: 20px;
    grid-column: 4 / 6;
}
</style>
