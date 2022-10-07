import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import apis from "../apis/Apis";
import { setCookie } from "../shared/Cookie";
import { Box } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

export default function Login({ ChangeCookie }) {
  const navigate = useNavigate();

  // 아이디, 비밀번호 등
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // 조건 오류 메시지
  const [errorMessage, setErrorMessage] = useState("");

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [logining, setLoginig] = useState(false);
  const [count, setCount] = useState(0);

  // MUI
  const state = {
    open: false,
    errorMessage,
    vertical: "top",
    horizontal: "center",
  };

  const [snackOpen, setsnackOpen] = useState(false);

  const handleClose = () => {
    setsnackOpen(false);
  };

  // 엔터 눌렀을 때
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = (e) => {
    setCount(count + 1);
    if (!isUserId) {
      setErrorMessage("이메일을 확인해주세요");
      setsnackOpen(true);
      return;
    } else if (!isPassword) {
      setErrorMessage("비밀번호를 확인해주세요");
      setsnackOpen(true);
      return;
    } else {
      const UserData = {
        email: userId,
        password: password,
      };
      if (count >= 1) {
        setErrorMessage("요청을 보냈어요\n잠시만 기다려주세요");
        setsnackOpen(true);
      }

      apis
        .loginUser(UserData)
        .then((response) => {
          if (!response.data.success) {
            setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
            setsnackOpen(true);
            return;
          } else if (response.data.success) {
            setErrorMessage("로그인이 성공하였습니다");
            setsnackOpen(true);
            setCookie(
              "accessToken",
              response.data.data.token.accessToken,
              response.data.data.token.accessTokenExpiresIn
            );

            setCookie("refreshToken", response.data.data.token.refreshToken);

            setCookie(
              "nickname",
              response.data.data.nickname,
              response.data.data.token.accessTokenExpiresIn
            );

            setCookie(
              "id",
              response.data.data.id,
              response.data.data.token.accessTokenExpiresIn
            );

            //스낵바가 나타나고 화면전환을 위해 인터벌을 줌
            setTimeout(() => {
              ChangeCookie(response.data.data.token.accessToken);
            }, 1300);
          }
        })
        .catch((error) => {
          setCount(0);
          if (error.message === "Request failed with status code 500") {
            setErrorMessage(
              "서버와 통신에 실패하였습니다\n잠시후 다시 시도해주세요"
            );
            setsnackOpen(true);
          } else {
            setErrorMessage("이메일 또는 비밀번호를 확인해주세요");
            setsnackOpen(true);
          }
        });
    }
  };

  // 이메일 값 가져오기
  const onChangeUserId = (e) => {
    const idRegex =
      /^[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+@+[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+\.+[a-zA-Z]{2,10}$/;
    const idCurrent = e.target.value;
    setUserId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setIsUserId(false);
    } else {
      setIsUserId(true);
    }
  };

  // 비밀번호 값 가져오기
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  const localTheme = createTheme({
    palette: {
      warning: {
        main: "#BCBCBF",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={localTheme}>
      <Box
        sx={{
          padding: "7vw",
          marginTop: "20vh",
        }}
      >
        <h2>로그인</h2>
        <form>
          <p>이메일</p>
          <Input
            fullWidth
            placeholder="이메일을 입력하세요"
            color="warning"
            inputProps={ariaLabel}
            onChange={onChangeUserId}
            onKeyUp={onEnter}
          />
          <p>비밀번호</p>
          <Input
            fullWidth
            type="password"
            placeholder="비밀번호를 입력하세요"
            color="warning"
            onChange={onChangePassword}
            onKeyUp={onEnter}
          />

          <div style={{ marginTop: "1vh" }}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={(e) => {
                onSubmitHandler(e);
              }}
            >
              로그인
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={snackOpen}
              autoHideDuration={2000}
              message={errorMessage}
              onClose={handleClose}
              key={state.vertical + state.horizontal}
            ></Snackbar>
          </div>
        </form>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button
            variant="text"
            color="warning"
            onClick={() => {
              navigate("/signin");
            }}
          >
            회원가입하러 가기
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
}
