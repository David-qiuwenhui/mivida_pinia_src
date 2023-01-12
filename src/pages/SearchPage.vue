<template>
    <div>
        <h2 class="searchTitle">搜索结果：{{ postStore.searchText }}</h2>
    </div>
    <PostList>
        <PostItem
            v-for="post in searchResult"
            :key="post.id"
            :post="post"
        ></PostItem>
    </PostList>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { computed } from "vue";
import { usePostStore } from "../piniaStores/post";

const postStore = usePostStore();
const searchResult = computed(() => postStore.searchResult);
</script>

<style scoped>
.searchTitle {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
}
</style>
