<template>
    <img class="avatar" :src="src || avatarDefault" />
</template>

<script setup>
import avatarDefault from "../assets/avatarDefault.png";

defineProps({
    src: String,
    size: {
        type: String,
        default: "36px",
    },
});
</script>

<style scoped>
.avatar {
    width: v-bind(size);
    height: v-bind(size);
    border-radius: 50%;
    background: #eee;
    object-fit: cover;
    object-position: top center;
}
</style>
