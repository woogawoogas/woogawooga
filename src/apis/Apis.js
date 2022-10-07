import axios from "axios";
import { useEffect } from "react";
import { getCookie, deleteCookie, setCookie } from "../shared/Cookie";

// 1. Axios instance생성

const deafultURL = "https://bondyuu.shop:8080";

const api = axios.create({
  baseURL: deafultURL,
  credentials: true,
});
// headers에 content-type을 정하게 되면,
// 프리플라이트가 날아가지 않아서 로그인 실패

export const apiJson = axios.create({
  baseURL: deafultURL,
  credentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiForm = axios.create({
  baseURL: deafultURL,
  credentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 2. request interceptor
// 인증이 필요한 요청을 중간에 가로채서 헤더에 토큰 소매넣기 해주기

// apiJson이나 apiForm 별도로 만든 api 요청으로 필요할 경우
// apiJson.interceptors.request.use(
// apiForm.interceptors.request.use(
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["Refresh-token"] = refreshToken;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

apiForm.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["Refresh-token"] = refreshToken;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 3. response interceptor // Q. 어떤 경우에 쓰이는지?
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      apis
        .loginRefresh()
        .then((response) => {
          // refreshToken 삭제

          console.log(response);
          // 새로운 Token 저장
          setCookie(
            "accessToken",
            response.data.data.accessToken,
            response.data.data.accessTokenExpiresIn
          );
          deleteCookie("refreshToken");
          setCookie("refreshToken", response.data.data.refreshToken);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  }
);

// 4.
const apis = {
  emailCheck: (payload) => api.post("/users/check/email", payload),
  emailSend: (payload) => api.post("/mail/send", payload),
  certification: (payload) => api.post("users/certification", payload),
  nicknameCheck: (payload) => api.post("/users/check/nickname", payload),
  registerUser: (payload) => api.post("/users/signup", payload),
  loginUser: (payload) => api.post("/users/login", payload),
  writePost: (payload) => apiForm.post("posts", payload),
  getAllPostList: (payload) =>
    api.get(`posts?searchValue=&category=&page=${payload}`),
  postDetail: (payload) => api.get(`posts/${payload}`),
  getProfile: () => api.get("/mypage"),
  editProfile: (payload) => apiForm.put("/users", payload),
  myWritepost: () => api.get("/mypage/posts"),
  logOutUser: () => api.delete("users/logout"),
  loginRefresh: () => api.get("users/refresh"),

  addBookMark: (payload) => api.post(`/posts/${payload}/pick`, payload),
  myBookMarkList: () => api.get("/mypage/picks"),
  searchList: (payload) =>
    api.get(`posts?searchValue=${payload.title}&category=${payload.category}`),
  deleteDetail: (payload) => api.put(`/posts/${payload}/delete`, payload),
  editDetail: (payload) =>
    apiForm.put(`/posts/${payload.postid}`, payload.data),

  // 채팅

  chatRooms: (payload) => api.get(`/chat/rooms/${payload}`, payload),
  chatDetilRooms: (payload) => api.get(`/chat/room/${payload}`),
  chatCreate: (payload) => api.post(`/chat/room/${payload}`, payload),
  dealComplete: (payload) => api.put(`/posts/${payload}/deal`, payload),

  //알림
  readNotification: (payload) => api.put(`/notification/${payload}`),
  checkAlarm: () => api.get("/notifications"),
  alarmAllRead: () => api.put("/notification/read"),
};

export default apis;
