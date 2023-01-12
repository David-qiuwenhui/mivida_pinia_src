<template>
    <div class="postCard">
        <div class="imageBox">
            <img
                :src="post.image"
                @click="postStore.showPostDetails(post.id)"
            />
        </div>
        <div class="cardBody">
            <div class="postInfo">
                <div class="avatar">
                    <TheAvatar :src="post?.user?.avatar"></TheAvatar>
                </div>
                <div class="name">{{ post?.user?.name }}</div>
                <PostActions
                    class="actions"
                    :likes="post.liked_bies"
                    :comments="post.comments"
                    :favors="post.favored_bies"
                    :likedByMe="post.likedByMe"
                    :favoredByMe="post.favoredByMe"
                    @likeClick="postStore.toggleLike(post.id)"
                    @favorClick="postStore.toggleFavor(post.id)"
                    @commentClick="postStore.showPostDetails(post.id)"
                ></PostActions>
                <div class="pubDate">
                    {{ dateToRelative(post.publishedAt) }}
                </div>
            </div>
            <div class="description">
                <p>{{ post.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { dateToRelative } from "../utils/date.js";
import PostActions from "./PostActions.vue";
import { ElMessage } from "element-plus";
import TheAvatar from "./TheAvatar.vue";
import { usePostStore } from "../piniaStores/post";

const postStore = usePostStore();
defineProps({
    post: {
        type: Object,
        default: {},
    },
});
</script>

<style scoped>
.postCard {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.imageBox > img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
}

.cardBody {
    padding: 18px;
}

.postInfo {
    display: grid;
    grid-template-areas:
        "avatar name actions"
        "pubDate pubDate actions";
    grid-template-columns: 42px 1fr 3fr;
    row-gap: 6px;
}

.avatar {
    grid-area: avatar;
}

.name {
    align-self: center;
    font-size: 16px;
}

.actions {
    grid-area: actions;
    justify-self: end;
}

.pubDate {
    grid-area: pubDate;
    font-size: 16px;
    color: #9f9f9f;
}

.description {
    margin-top: 28px;
    white-space: pre-line;
    line-height: 28px;
}
</style>
