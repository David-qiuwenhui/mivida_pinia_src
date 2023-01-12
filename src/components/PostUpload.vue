<template>
    <TheModal @close="closeShowUpload">
        <div class="postUpload">
            <label class="upload">
                <img
                    v-if="imageObjUrl"
                    class="imagePreview"
                    :src="imageObjUrl"
                />
                <div class="uploadIcon" v-else>
                    <svg
                        t="1665152865212"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3496"
                        width="200"
                        height="200"
                    >
                        <path
                            d="M1024 896v128H0v-320h128v192h768v-192h128v192zM576 234.688V768H448V234.688L213.312 469.312 128 384l384-384 384 384-85.312 85.312L576 234.688z"
                            fill="#262626"
                            p-id="3497"
                        ></path>
                    </svg>
                    <div class="uploadText">点击上传图片</div>
                </div>

                <input
                    class="fileChooser"
                    type="file"
                    accept="image/*"
                    @change="resolveImageUpload"
                />
            </label>
            <div class="postContent">
                <textarea
                    class="postContentInput"
                    placeholder="写点什么吧~"
                    v-model="description"
                ></textarea>
                <el-button
                    class="uploadButton"
                    type="primary"
                    size="large"
                    @click="publishPost"
                    >发布</el-button
                >
            </div>
        </div>
    </TheModal>
</template>

<script setup>
import TheModal from "./TheModal.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useShowStore } from "../piniaStores/show";
import { usePostStore } from "../piniaStores/post";

const postStore = usePostStore();
const showStore = useShowStore();
let image = ref(null);
let imageObjUrl = ref("");
let description = ref("");

// 上传图片的回调函数
async function resolveImageUpload(e) {
    const imageFile = e.target.files[0];
    if (imageFile) {
        // 设置图片文件
        image.value = imageFile;
        // 设置预览文件
        imageObjUrl.value = URL.createObjectURL(imageFile);
    }
}

// 发布上传内容的回调函数
async function publishPost() {
    await postStore.uploadPosts({
        image: image.value,
        description: description.value,
    });
    ElMessage({
        type: "success",
        message: "发布成功",
    });
}

function closeShowUpload() {
    showStore.changeShowPostUpload(false);
}
</script>

<style scoped>
.postUpload {
    width: 50vw;
    height: 70vh;
    display: grid;
    grid-template-rows: 4fr 1fr;
}
.imagePreview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 0;
}

.upload {
    display: grid;
    place-items: center;
    cursor: pointer;
    min-height: 0;
}

.fileChooser {
    opacity: 0;
    position: absolute;
}

.postContent {
    display: grid;
}

.postContentInput {
    border-bottom: none;
    resize: none;
    padding: 12px 24px;
}

.uploadButton {
    justify-self: end;
    align-self: end;
    position: relative;
    right: 60px;
    bottom: 10px;
    width: 100px;
}

.uploadText {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.6);
}
</style>
