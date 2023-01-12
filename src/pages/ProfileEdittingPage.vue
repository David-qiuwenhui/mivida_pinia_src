<template>
    <div>
        <h2 class="title">编辑个人资料页</h2>
        <div class="changeAvatar">
            <TheAvatar size="60px" :src="profileData.avatar"></TheAvatar>
            <TheButton class="changeAvatarBtn">修改头像</TheButton>
            <input
                type="file"
                accept="image/*"
                class="inputFile"
                @change="uploadAvatar"
            />
        </div>
        <form class="profileForm" @submit.prevent="updateUser">
            <label for="username">用户名：</label>
            <input type="text" v-model="profileData.username" />
            <label for="name">昵称：</label>
            <input type="text" v-model="profileData.name" />
            <label class="intro" for="intro">简介：</label>
            <textarea rows="12" v-model="profileData.intro"></textarea>
            <label for="mobilePhone">手机号：</label>
            <input type="text" v-model="profileData.mobilePhone" />
            <label>性别：</label>
            <div class="genderRadios">
                <input
                    type="radio"
                    name="gender"
                    id="M"
                    value="M"
                    v-model="profileData.gender"
                />男
                <input
                    type="radio"
                    name="gender"
                    id="F"
                    value="F"
                    v-model="profileData.gender"
                />女
            </div>
            <label for="website">网站：</label>
            <input type="text" v-model="profileData.website" />
            <div class="actions">
                <TheButton
                    :reverse="true"
                    type="reset"
                    @click.prevent="cancelUpdate"
                    >取消</TheButton
                >
                <TheButton type="submit">确认</TheButton>
            </div>
        </form>
    </div>
</template>

<script setup>
import TheAvatar from "../components/TheAvatar.vue";
import TheButton from "../components/TheButton.vue";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { uploadFile } from "../apis/profile";
import { ElMessage } from "element-plus";
import { useUserStore } from "../piniaStores/user";

const userStore = useUserStore();
const router = useRouter();
const user = computed(() => userStore.user);

const profileData = reactive({
    avatar: user.value.avatar,
    username: user.value.username,
    name: user.value.name,
    intro: user.value.intro,
    mobilePhone: user.value.mobilePhone,
    gender: user.value.gender,
    website: user.value.website,
});

// 将上传的头像发送给服务器获取url
async function uploadAvatar(e) {
    const file = e.target.files[0];
    const url = await uploadFile(file);
    profileData.avatar = url;
}

// 请求上传修改的用户数据
async function updateUser() {
    await userStore.updateUser(profileData);
    router.push("/profile");
    ElMessage({
        type: "success",
        message: "个人资料修改成功",
    });
}

function cancelUpdate() {
    router.push("/profile");
    ElMessage("已取消修改");
}
</script>

<style scoped>
.title {
    margin-bottom: 28px;
    font-size: 28px;
    font-weight: 600;
}

.changeAvatar {
    display: flex;
    align-items: center;
    position: relative;
}

.changeAvatarBtn {
    margin-left: 36px;
}

.inputFile {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    width: 240px;
}

.profileForm {
    display: grid;
    grid-template-columns: max-content 1fr;
    row-gap: 32px;
    column-gap: 10px;
    margin-top: 40px;
    margin-left: 5px;
    align-items: center;
}

.profileForm > label {
    grid-column: 1 / 2;
    justify-self: end;
}

.profileForm .actions {
    grid-column: 1 / 3;
    justify-self: end;
    display: flex;
    gap: 24px;
}

.genderRadios {
    display: flex;
    gap: 6px;
}

.intro {
    padding-top: 6px;
    align-self: start;
}
</style>
