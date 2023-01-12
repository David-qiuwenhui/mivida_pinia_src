import { request } from "../utils/request";
import { getJwtToken, getUser, saveUser } from "./auth";

// 请求将用户上传的头像发送到服务端 并返回上传头像的url
export async function uploadFile(file) {
    const formDate = new FormData();
    formDate.append("files", file);
    const response = await fetch("/api/upload", {
        method: "POST",
        body: formDate,
        headers: {
            authorization: `Bearer ${getJwtToken()}`,
        },
    });
    // 解析response结果
    const result = await response.json();
    return result[0].url;
}

// 请求更新用户的数据
export async function reqUpdateUser(userDate) {
    const response = await request(`/api/users/${getUser().id}`, {
        method: "PUT",
        body: userDate,
    });
    saveUser(response);
    return response;
}
