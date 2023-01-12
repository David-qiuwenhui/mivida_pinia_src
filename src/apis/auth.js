import { request } from "../utils/request";

export function getJwtToken() {
    return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
    localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// 请求注册新用户
export async function reqRegister(email, username, password) {
    const result = await request("/api/auth/local/register", {
        method: "POST",
        auth: false,
        body: {
            email,
            username,
            password,
            name: username,
        },
    });

    setJwtToken(result.jwt);
    saveUser(result.user);
    return result.user;
}

// 请求用户登录
export async function reqLogin(email, password) {
    const result = await request("/api/auth/local", {
        method: "POST",
        auth: false,
        body: {
            identifier: email,
            password,
        },
    });
    setJwtToken(result.jwt);
    saveUser(result.user);
    return result.user;
}

// 请求退出登录
export async function reqLogout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
}
