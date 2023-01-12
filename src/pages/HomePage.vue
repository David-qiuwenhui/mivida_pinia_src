<template>
    <div>
        <PostList>
            <PostItem
                v-for="post in postsList"
                :key="post.id"
                :post="post"
            ></PostItem>
        </PostList>
        <PostDetails v-if="showPostDetails"></PostDetails>
        <PostUpload v-if="showPostUpload"></PostUpload>
    </div>
</template>

<script setup>
import PostItem from "../components/PostItem.vue";
import PostDetails from "../components/PostDetails.vue";
import PostUpload from "../components/PostUpload.vue";
import PostList from "../components/PostList.vue";
import { computed, onMounted } from "vue";
import { useShowStore } from "../piniaStores/show";
import { usePostStore } from "../piniaStores/post";

let showStore = useShowStore();
let postStore = usePostStore();
let showPostDetails = computed(() => showStore.showPostDetails);
let showPostUpload = computed(() => showStore.showPostUpload);

const postsList = computed(() => postStore.list);

onMounted(() => {
    postStore.loadAllPosts();
});
</script>

<style scoped></style>
