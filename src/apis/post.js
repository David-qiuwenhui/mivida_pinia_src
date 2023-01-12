import { getJwtToken, getUser } from "./auth.js";
import { request } from "../utils/request";

// 请问发送上传的帖子信息
export async function reqCreatePost(image, description) {
    const formData = new FormData();
    formData.append("files.image", image);
    formData.append("data", JSON.stringify({ description }));

    // 后端协商不需要"Content-Type" 不需要将body转化成JSON字符串
    // 自定义上传帖子信息的fetch
    await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
        },
    });
}

// 请求获取首页帖子的数据
export async function reqLoadPosts(filters = "") {
    const response = await request(
        "/api/posts?populate=*" + (filters && `&${filters}`)
    );
    return response.data.map((post) => ({
        id: post?.id,
        ...post?.attributes,
        image: post?.attributes?.image?.data?.[0]?.attributes?.url,
        user: {
            id: post?.attributes?.user?.data?.id,
            ...post?.attributes?.user?.data?.attributes,
        },
    }));
}

// 请求获取我赞过的或者收藏的帖子数据
export async function reqLoadPostsLikedOrFavoredByMe(type = "likes") {
    const response = await request(
        `/api/users/me?populate[${type}][populate][0]=image`
    );
    return response[type].map((post) => ({
        ...post,
        image: post?.image?.[0].url,
    }));
}

// 请求点赞某个帖子
export async function reqLikePost(id) {
    const response = await request(`/api/posts/${id}/like`, {
        method: "PUT",
    });
    return response.data;
}

// 请求收藏某个帖子
export async function reqFavorPost(id) {
    const response = await request(`/api/posts/${id}/favor`, {
        method: "PUT",
    });
    return response.data;
}

// 请求获取我的帖子数据
export async function reqLoadPostsByMe() {
    const response = reqLoadPosts(`filters[user][id][$eq]=${getUser().id}`);
    return response;
}
