import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/LoginPage";
import { getCookie } from "./shared/Cookie";

import Start from "./pages/StartPage";
import MyPage from "./pages/MyPage";

import { useEffect, useState } from "react";
import Detail from "./pages/DetailPage";
import SubMyPage from "./pages/SubMyPage";
import ChatRoomPage from "./pages/ChatroomPage";

import SigninPage from "./pages/SigninPage";
import AlarmPage from "./pages/AlarmPage";
import Test from "./pages/Test";
import EditdetailPage from "./pages/EditdetailPage";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const [cookieState, setCookieState] = useState();
  const ChangeCookie = (cookie) => {
    setCookieState(cookie);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookie = getCookie("accessToken");

  //상태관리 로직 사용 (issue 등록);리듀서 , usecontext
  // useefftect 에서 쿠키 유무를 알 수 있게
  useEffect(() => {
    // cookie = getCookie("accessToken");

    if (cookie === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cookieState]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="start"
            element={!isLoggedIn ? <Start /> : <Navigate replace to="/" />}
          />
          <Route
            path="login"
            element={
              !isLoggedIn ? (
                <Login ChangeCookie={ChangeCookie} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="signin"
            element={!isLoggedIn ? <SigninPage /> : <Navigate replace to="/" />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <MainPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/searchpage"
            element={
              isLoggedIn ? <SearchPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/alarmpage"
            element={
              isLoggedIn ? <AlarmPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/detail/:postid"
            element={isLoggedIn ? <Detail /> : <Navigate replace to="/start" />}
          />
          <Route
            path="/detail-edit/:postid"
            element={
              isLoggedIn ? <EditdetailPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/postpage"
            element={
              isLoggedIn ? <PostPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/mypage"
            element={isLoggedIn ? <MyPage /> : <Navigate replace to="/start" />}
          />
          <Route
            path="/submypage:id"
            element={
              isLoggedIn ? <SubMyPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/mychat"
            element={
              isLoggedIn ? <ChatRoomPage /> : <Navigate replace to="/start" />
            }
          />
          <Route
            path="/chatdetail/:roomId"
            element={isLoggedIn ? <Test /> : <Navigate replace to="/start" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
