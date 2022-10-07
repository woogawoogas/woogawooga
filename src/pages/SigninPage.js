import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import apis from "../apis/Apis";
import { Box, createTheme, ThemeProvider } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

const guList = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

export default function Signin() {
  const navigate = useNavigate();

  // 아이디, 비밀번호 등
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [region, setRegion] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  // 조건 오류 메시지
  const [userIdMessege, setUserIdMessege] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickname, setIsNickName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  // 회원 가입 여부
  const [isAuth, setIsAuth] = useState(false);

  // 클릭 횟수
  const [mailCount, setMailCount] = useState(0);
  const [nickCount, setNickCount] = useState(0);

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

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // 최종 회원 가입 버튼 클릭시 호출
  const onSubmitHandler = (e) => {
    if (!isAuth) {
      setErrorMessage("이메일 인증을 진행해주세요");
      setsnackOpen(true);
      return;
    } else if (!isPasswordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      setsnackOpen(true);
      return;
    } else if (nickName.length === 0) {
      setErrorMessage("닉네임을 입력해주세요");
      setsnackOpen(true);
      return;
    } else if (passwordConfirm.length === 0) {
      setErrorMessage("비밀번호 확인을 입력해주세요");
      setsnackOpen(true);
      return;
    } else if (!isNickname) {
      setErrorMessage("닉네임 중복확인을 해주세요");
      setsnackOpen(true);
      return;
    } else {
      const UserData = {
        email: userId,
        password: password,
        passwordConfirm: passwordConfirm,
        nickname: nickName,
        location: region,
      };

      apis
        .registerUser(UserData)
        .then((response) => {
          setErrorMessage("회원가입 성공");
          setsnackOpen(true);
          setTimeout(() => {
            navigate("/login");
          }, 1300);
        })
        .catch((error) => {
          setErrorMessage("다시 시도해주세요");
          setsnackOpen(true);
          return;
        });
    }
  };

  // 이메일 조건 확인
  const onChangeUserId = (e) => {
    const idRegex =
      /^[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+@+[0-9a-zA-Z]([+=-_.]?[0-9a-zA-Z])+\.+[a-zA-Z]{2,10}$/;
    const idCurrent = e.target.value;
    setUserId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setUserIdMessege("이메일 형식이 아닙니다.");
      setIsUserId(false);
    } else {
      setUserIdMessege("올바른 이메일 형식입니다.");
      setIsUserId(true);
    }
  };

  // 비밀번호 조건 확인
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "알파벳+숫자+특수문자 조합으로 8자리 이상 15자리 이하로 입력해주세요"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 형식입니다");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 일치 확인
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);
  };

  useEffect(() => {
    if (passwordConfirm.length > 0) {
      if (password === passwordConfirm) {
        setIsPasswordConfirm(true);
        setPasswordConfirmMessage("비밀번호 확인 완료");
      } else {
        setIsPasswordConfirm(false);
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      }
    }
  }, [password, passwordConfirm]);

  // 값 가져오기
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  const onAuthNumber = (e) => {
    setAuthNumber(e.target.value);
  };

  // 메일 인증
  const idSend = { address: userId };
  const idCheck = { email: userId };

  const onDoublingHandler = (e) => {
    e.preventDefault();
    setMailCount(mailCount + 1);
    if (!isUserId) {
      setErrorMessage("이메일을 확인해주세요");
      setsnackOpen(true);
      setMailCount(0);
    } else {
      apis
        .emailCheck(idCheck)
        .then((response) => {
          //중복된 이메일로 가입했는지 체크
          if (response.data.success === false) {
            setErrorMessage(response.data.errorCode.message);
            setUserIdMessege(response.data.errorCode.message);
            setsnackOpen(true);
            setIsUserId(false);
            setMailCount(0);
            return;
          }
          //중복된 이메일로 가입안했다면
          else {
            // 인증 메일 발송
            setErrorMessage("인증번호를 입력해주세요");
            setsnackOpen(true);
            setIsEmail(true);

            apis
              .emailSend(idSend)
              .then((response) => {})
              .catch((error) => {});

            setMailCount(0);
          }
        })
        .catch((error) => {
          setMailCount(0);
        });
    }
  };

  const buttonsEmail = (
    <>
      {isEmail || mailCount >= 1 ? (
        <Button
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          disabled
          variant="outlined"
          color="warning"
          onClick={(e) => {
            onDoublingHandler(e);
          }}
        >
          발송 완료
        </Button>
      ) : (
        <Button
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          variant="outlined"
          color="warning"
          onClick={(e) => {
            setsnackOpen(true);
            onDoublingHandler(e);
          }}
        >
          메일 인증
        </Button>
      )}
    </>
  );

  const certification = {
    email: userId,
    certificationNum: authNumber,
  };
  const onAuthNumberHandler = (e) => {
    e.preventDefault();
    setNickCount(nickCount + 1);
    if (authNumber.length === 0) {
      setErrorMessage("인증번호를 입력해주세요");
      snackOpen(true);
      setNickCount(0);
    } else {
      apis
        .certification(certification)
        .then((response) => {
          if (!response.data.success) {
            setErrorMessage("인증번호를 확인해주세요");
            snackOpen(true);
            setNickCount(0);
          }
          setErrorMessage("인증이 완료되었습니다");
          setNickCount(0);
          setIsAuth(true);
        })
        .catch((error) => {
          setNickCount(0);
        });
    }
  };

  const buttonsAuthNumber = (
    <>
      {isAuth ? (
        <Button
          disabled
          color="warning"
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          variant="outlined"
          onClick={(e) => {
            setsnackOpen(true);
            onAuthNumberHandler(e);
          }}
        >
          제출 완료
        </Button>
      ) : (
        <Button
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          variant="outlined"
          color="warning"
          onClick={(e) => {
            setsnackOpen(true);
            onAuthNumberHandler(e);
          }}
        >
          제출
        </Button>
      )}
    </>
  );

  // 닉네임 중복 확인
  const checkNickname = { nickname: nickName };
  const onDoublingNickHandler = (e) => {
    e.preventDefault();
    if (nickName.length === 0) {
      return setErrorMessage("닉네임을 입력해주세요");
    } else {
      apis
        .nicknameCheck(checkNickname)
        .then((response) => {
          if (response.data.success) {
            setIsNickName(true);
            setsnackOpen(true);
            setErrorMessage("사용 가능한 닉네임입니다");
          } else {
            setsnackOpen(true);
            setErrorMessage("이미 사용중인 닉네임입니다");
          }
        })
        .catch((error) => {});
    }
  };

  const buttonsNickname = (
    <>
      {isNickname ? (
        <Button
          disabled
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          color="warning"
          variant="outlined"
          onClick={(e) => {
            setsnackOpen(true);
            onDoublingNickHandler(e);
          }}
        >
          중복 확인
        </Button>
      ) : (
        <Button
          style={{ marginLeft: "4%", fontSize: "x-small" }}
          variant="outlined"
          color="warning"
          onClick={(e) => {
            setsnackOpen(true);
            onDoublingNickHandler(e);
          }}
        >
          중복 확인
        </Button>
      )}
    </>
  );

  const localTheme = createTheme({
    palette: {
      warning: {
        main: "#dcdcdc",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={localTheme}>
      <Box
        style={{
          margin: "auto",
          height: "100%",
          padding: "7vw",
        }}
      >
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
        <h2>회원가입</h2>
        <form>
          <p>이메일</p>
          {isEmail ? (
            <Input
              disabled
              defaultValue="Disabled"
              style={{ width: "68%" }}
              placeholder="이메일을 입력하세요"
              inputProps={ariaLabel}
              onChange={onChangeUserId}
            />
          ) : (
            <Input
              style={{ width: "68%" }}
              color="warning"
              placeholder="이메일을 입력하세요"
              inputProps={ariaLabel}
              onChange={onChangeUserId}
            />
          )}
          {buttonsEmail}
          {isEmail && (
            <>
              {isAuth ? (
                <Input
                  disabled
                  defaultValue="Disabled"
                  color="warning"
                  style={{ width: "68%" }}
                  placeholder="인증번호를 입력하세요"
                  inputProps={ariaLabel}
                  onChange={onAuthNumber}
                />
              ) : (
                <Input
                  style={{ width: "68%" }}
                  color="warning"
                  placeholder="인증번호를 입력하세요"
                  inputProps={ariaLabel}
                  onChange={onAuthNumber}
                />
              )}
              {buttonsAuthNumber}
            </>
          )}
          {userId.length > 1 && isUserId ? (
            <>
              {isAuth ? (
                <>
                  <br />
                  <span style={{ color: "green" }}>
                    이메일 인증이 완료되었습니다
                  </span>
                </>
              ) : (
                <>
                  <br />
                  <span style={{ color: "green" }}>{userIdMessege}</span>
                </>
              )}
            </>
          ) : (
            <>
              <br />
              <span style={{ color: "red" }}>{userIdMessege}</span>
            </>
          )}

          <p>비밀번호</p>
          <Input
            fullWidth
            color="warning"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChangePassword}
          />
          <br />
          {isPassword ? (
            <span style={{ color: "green" }}>{passwordMessage}</span>
          ) : (
            <span style={{ color: "red" }}>{passwordMessage}</span>
          )}

          <p>비밀번호 확인</p>
          <Input
            fullWidth
            color="warning"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            onChange={onChangePasswordConfirm}
          />
          <br />
          {passwordConfirm.length > 0 && !isPasswordConfirm ? (
            <span style={{ color: "red" }}>{passwordConfirmMessage}</span>
          ) : (
            <span style={{ color: "green" }}>{passwordConfirmMessage}</span>
          )}
          <p />

          <p>닉네임</p>
          {isNickname ? (
            <Input
              disabled
              color="warning"
              defaultValue="Disabled"
              style={{ width: "68%" }}
              type="text"
              placeholder="닉네임을 입력하세요"
              onChange={onChangeNickName}
            />
          ) : (
            <Input
              color="warning"
              style={{ width: "68%" }}
              type="text"
              placeholder="닉네임을 입력하세요"
              onChange={onChangeNickName}
            />
          )}

          {buttonsNickname}

          <FormControl
            variant="standard"
            sx={{ width: "100%", paddingBottom: "10px", marginTop: "1.5rem" }}
          >
            <InputLabel id="demo-simple-select-standard-label" color="warning">
              관심 지역
            </InputLabel>
            <Select
              color="warning"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={region}
              onChange={handleChange}
              label="region"
              MenuProps={MenuProps}
            >
              <MenuItem value="">
                <em>---지역 선택---</em>
              </MenuItem>
              {guList.map((item, idx) => {
                return (
                  <MenuItem value={item} key={idx}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <div>
            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={(e) => {
                onSubmitHandler(e);
              }}
              sx={{ marginTop: "0.7rem" }}
            >
              회원가입
            </Button>
          </div>
        </form>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button
            color="warning"
            variant="text"
            onClick={() => {
              navigate("/login");
            }}
          >
            뒤로가기
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
}
