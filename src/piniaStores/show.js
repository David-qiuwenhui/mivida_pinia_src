import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowStore = defineStore("show", () => {
    // 显示详情信息页
    let showPostDetails = ref(false);
    // 显示上传信息页
    let showPostUpload = ref(false);

    // 控制显示详情信息页
    function changeShowPostDetails(show) {
        showPostDetails.value = show;
    }

    // 控制显示上传信息页
    function changeShowPostUpload(show) {
        showPostUpload.value = show;
    }

    return {
        showPostDetails,
        showPostUpload,
        changeShowPostDetails,
        changeShowPostUpload,
    };
});
