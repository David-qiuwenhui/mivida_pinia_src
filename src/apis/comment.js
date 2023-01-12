import { request } from "../utils/request";

// 请求加载帖子详情的评论
export async function reqLoadComments(postId) {
    if (!postId) return [];
    const response = await request(
        "/api/comments?populate=*&filters[post][id][$eq]=" + postId
    );
    return response.data.map((comment) => {
        const result = comment?.attributes;

        return {
            id: comment?.id,
            content: result?.content,
            pubDate: result?.publishedAt,
            user: {
                id: result?.user?.data?.id,
                ...result?.user?.data?.attributes,
            },
        };
    });
}

// 请求发布帖子详情的评论
export async function reqCreateComment(content, postId) {
    await request("/api/comments", {
        method: "POST",
        body: {
            data: {
                content,
                post: postId,
            },
        },
    });
}
