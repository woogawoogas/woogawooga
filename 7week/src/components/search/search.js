import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (data, user) => {},
  logout: () => {},
  user: {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("accessToken");

  const [accessToken, setAccessToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState();
  //!! 참거짓 값을 부울로 바꿔줌
  //토큰이 빈 문자열이면 fasle를
  //토큰이 빈 문자열이 아니면 true를

  const userIsLoggedIn = !!accessToken;

  const loginHandler = (data, user) => {
    //참고로 여기서 token은 백에서 받아온거지만
    // 백에서는 토큰만 주기때문에 user는 내가 넣은값임
    const expireTime = data.accessTokenExpiresIn - 10000;
    console.log(typeof expireTime);
    console.log(data);
    console.log(expireTime);
    setUser(user);
    localStorage.setItem("username", user);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isLoggedIn", !!data.accessToken);
    //fleshtoken활성화하기
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    const fetchDate = async (localaccessToken, localrefreshToken) => {
      axios
        .post("http://13.209.76.88/auth/reissue", {
          accessToken: localaccessToken,
          refreshToken: localrefreshToken,
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then((data) => {
          console.log(data);
          // localStorage.removeItem("accessToken", accessToken);
          // localStorage.removeItem("refreshToken", refreshToken);
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          localStorage.setItem("username", user);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("isLoggedIn", !!data.accessToken);
        });
    };
    console.log("loveyou");
    setInterval(() => {
      const localaccessToken = localStorage.getItem("accessToken");
      const localrefreshToken = localStorage.getItem("refreshToken");
      console.log(localaccessToken, localrefreshToken);
      if (contextValue.isLoggedIn) {
        fetchDate(localaccessToken, localrefreshToken);
      }
    }, 1800000);
  };
  const logoutHandler = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
  };

  const contextValue = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    //일단 임시로 treu로 해놓음
    //isLoggedIn: true,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user: user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
