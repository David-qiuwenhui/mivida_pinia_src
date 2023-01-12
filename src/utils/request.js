import { getJwtToken } from "../apis/auth.js";

export async function request(
    url,
    { method = "GET", body, headers, auth = true } = {}
) {
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    const result = await res.json();
    return result;
}
