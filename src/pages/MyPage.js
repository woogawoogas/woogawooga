import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Modal from "../components/Modal";
import apis from "../apis/Apis";
import { deleteCookie } from "../shared/Cookie";
import Footer from "../components/Footer";
import ScreenSize from "../shared/ScreenSize";
import { Box } from "@mui/material";

export default function MyPage() {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [myNick, setMyNick] = useState("");
  const imgfile = useRef();
  const [isNickname, setIsNickName] = useState(false);
  const [tmpNick, setTmpNick] = useState(myNick);
  const [myImage, setMyImage] = useState(
    "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
  );
  const [tmpImage, setTmpImage] = useState(myImage);

  const Open = () => {
    setEditProfile(true);
  };
  const ChangeNick = (e) => {
    setTmpNick(e.target.value);
  };
  const close = () => {
    setEditProfile(false);
  };

  // 엔터 눌렀을 때
  const onEnter = (e) => {
    console.log("1");
    if (e.key === "Enter") {
      ClickHandler();
    }
  };

  const checkNickname = { nickname: tmpNick };

  useEffect(() => {
    apis
      .getProfile()
      .then((response) => {
        setTmpNick(response.data.data.nickname);
        setTmpImage(response.data.data.profileUrl);
        setMyNick(response.data.data.nickname);
        setMyImage(response.data.data.profileUrl);
      })
      .catch((error) => {});
  }, []);

  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const url = URL.createObjectURL(imgSelectList[0]);
    setTmpImage(url);
  };

  const ClickHandler = (e) => {
    if (e.target.name === "edit") {
      const postData = new FormData();

      //이미지 append
      if (imgfile.current.files[0] === undefined) {
        postData.append("imageFile", "");
      } else {
        postData.append("imageFile", imgfile.current.files[0]);
      }
      //닉네임 append(닉네임 변경했을 때 )
      if (myNick != tmpNick) {
        apis.nicknameCheck(checkNickname).then((response) => {
          if (response.data.success == true) {
            postData.append(
              "requestDto",
              new Blob([JSON.stringify({ nickname: tmpNick })], {
                type: "application/json",
              })
            );
            apis
              .editProfile(postData)
              .then((response) => {
                alert("변경되었습니다.");
                setMyNick(tmpNick);
                setMyImage(tmpImage);
              })
              .catch((error) => {})
              .then(() => {
                setEditProfile(false);
              });
          } else if (response.data.success == false) {
            return alert("이미 사용중인 닉네임입니다");
          }
        });
      } else {
        apis
          .editProfile(postData)
          .then((response) => {
            alert("변경되었습니다.");
            setMyNick(tmpNick);
            setMyImage(tmpImage);
          })
          .catch((error) => {})
          .then(() => {
            setEditProfile(false);
          });
      }
    }
  };
  const LogOutAction = () => {
    apis
      .logOutUser()
      .then((response) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("id");
        deleteCookie("nickname");
        window.location.reload();
      })
      .catch((error) => {});
  };

  return (
    <>
      <Header>
        <div>프로필</div>
      </Header>
      {/* 유저 프로필 */}
      <Div>
        <Image src={myImage} />
        <NickName>{myNick}</NickName>
      </Div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "3vh",
          height: "10vh",
        }}
      >
        <Edit onClick={Open}>프로필 수정</Edit>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "15vh",
            borderTop: "0.5px solid  #dcdcdc",
          }}
          onClick={() => navigate("/submypage:mywrite")}
        >
          <Setting>내가 작성한 게시글</Setting>
          <ArrowForwardIosRoundedIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "15vh",
            borderTop: "0.5px solid  #dcdcdc",
          }}
          onClick={() => navigate("/submypage:mybookmark")}
        >
          <Setting>내가 찜한 게시글</Setting>
          <ArrowForwardIosRoundedIcon />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "15vh",
            borderTop: "0.5px solid  #dcdcdc",
          }}
          onClick={LogOutAction}
        >
          <Setting>로그아웃</Setting>
        </Box>
      </div>

      <Modal visible={editProfile}>
        <Header>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ArrowBackIcon onClick={close} />
            <div>프로필 수정</div>
          </Box>
        </Header>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <label onChange={AddImage}>
            <ChangeImage src={tmpImage} />
            <input
              type="file"
              accept="image/*"
              encType="multipart/form-data"
              hidden
              ref={imgfile}
            />
          </label>
        </Box>
        <div style={{ display: "flex" }}>
          <InputSt
            type="text"
            onChange={ChangeNick}
            placeholder={tmpNick}
            onKeyUp={onEnter}
            maxLength="6"
          />
        </div>

        <div style={{ textAlign: "center", alignItems: "center" }}>
          <Button
            style={{
              fontSize: "20px",
              backgroundColor: "gainsboro",
              marginRight: "20PX",
              borderRadius: "5px",
            }}
            variant="contained"
            component="label"
            onClick={ClickHandler}
            name="edit"
          >
            수정하기
          </Button>
        </div>
      </Modal>
      <Footer />
    </>
  );
}

const Image = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  background-size: cover;
  border: 1px solid gainsboro;
  margin-right: 5vw;
  border-radius: 50%;
`;
const NickName = styled.div`
  width: 10rem;
  height: 1.5rem;
  font-size: 1em;
  font-weight: bold;
  margin-top: 1vh;
`;

const Edit = styled.button`
  text-align: center;
  vertical-align: middle;
  color: gray;
  width: 90vw;
  height: 5vh;
  border: none;
  border-radius: 5px;
  background-color: gainboro;
`;

const Setting = styled.div`
  cursor: pointer;
  text-indent: 2vw;
  font-weight: 300;
justify-content: space-between;
   &:hover {
    background-color: gainsboro;
`;

const Button = styled.button`
  font-size: 15px;
  display: inline-block;
  border: none;
  margin-top: 2vh;
  background-color: transparent;
  color: white;
  &:hover {
    background-color: gray;
    border-radius: 10px;
  }
`;

const InputSt = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
  margin-top: 4vh;
  margin-left: 20vw;
  width: 50%;
  height: 30px;
  text-indent: 8px;
  &:focus {
    outline: 1px solid gray;
  }
`;

const Div = styled.div`
  display: flex;
  height: 10vh;
  margin: 5vh 4vw 0 5vw;
  align-items: center;
`;

const ChangeImage = styled.img`
  width: 10rem;
  height: 10rem;
  background-size: cover;
  border: 1px solid gainsboro;
  margin: 2vh;
  border-radius: 50%;
`;
