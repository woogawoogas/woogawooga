import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../apis/Apis";
import Header from "../components/Header";
import ChatForm from "../components/ChatForm";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../shared/Cookie";
import { Box, Button, Typography, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  const [confirmationState, setConfirmationState] = useState(false);
  const [postData, setPostData] = useState();
  const navigate = useNavigate();

  // 스크롤을 맨밑으로
  const messagesEndRef = useRef(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  };

  // 엔터 눌렀을 때
  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  const t = useRef();
  const [username, setUserName] = useState("");
  const param = useParams();

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 메뉴버튼 ClickEvent
  const DealComplete = () => {
    apis
      .dealComplete(postData.postId)
      .then((response) => {
        if (
          window.confirm(
            "거래완료로 변경하시겠습니까?\n완료 후에는 거래중으로 변경할 수 없습니다."
          )
        ) {
          navigate(`/detail/${postData.postId}`, { replace: true });
        }
      })
      .catch((error) => {});
  };

  //이전 메시지 목록 불러오기
  useEffect(() => {
    apis
      .chatDetilRooms(param.roomId, param.nickname)
      .then((response) => {
        setPostData(response.data.data);
        const preTalk = response.data.data.messageList;
        setUserName(response.data.data.nickname);
        preTalk.map((item) => {
          setChatList((prev) => [
            ...prev,
            {
              sender: item.sender,
              senderId: item.senderId,
              message: item.message,
              createdAt: item.createdAt,
            },
          ]);
        });
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [chatList]);

  // 연결을 관리해보자
  const isConnected = useRef(false);
  const stomp = useRef();

  useEffect(() => {
    const socketJs = new SockJS("https://bondyuu.shop:8080/ws-stomp");
    stomp.current = Stomp.over(socketJs);

    stomp.current.connect(headers, () => {
      console.log("연결 성공!");
      stomp.current.subscribe(`/sub/chat/room/${param.roomId}`, (e) => {
        const newMessage = JSON.parse(e.body);
        console.log("adfsdfad", newMessage);
        setChatList((prev) => [
          ...prev,
          {
            sender: newMessage.sender,
            senderId: newMessage.senderId,
            message: newMessage.message,
            createdAt: newMessage.createdAt,
          },
        ]);
      });
    });

    return () => {
      if (isConnected.current) {
        //연결되어 있으면 끊어
        stomp.current.disconnect(() => {
          isConnected.current = false;
        });
      }
    };
  }, []);

  const handleEnter = () => {
    if (t.current.value === "") {
      return;
    }

    stomp.current.send(
      `/pub/chat/message/${param.roomId}`,
      headers,
      JSON.stringify({
        type: "TALK",
        roomId: param.roomId,
        message: t.current.value,
      })
    );
    t.current.value = "";
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {/* 헤더 */}
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate(-1);
          }}
        ></ArrowBackIcon>
        <Box>{postData?.nickname}</Box>
        <IconButton
          aria-label="settings"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {postData?.dealState === "거래중" &&
          postData?.userId == getCookie("id") ? (
            <MenuItem onClick={DealComplete}>거래완료</MenuItem>
          ) : null}
          <MenuItem>채팅삭제</MenuItem>
        </Menu>
      </Header>

      <Box
        sx={{
          height: "10%",
          backgroundColor: "#D2B48C",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "20px",

          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <img
          style={{ borderRadius: "10px", width: "3rem", height: "3rem" }}
          src={postData == null ? "default-image.jpg" : postData.postImage}
          alt=""
          onClick={() => {
            navigate(`/detail/${postData.postId}`);
          }}
        />

        <Box sx={{ marign: "auto" }}>
          <div style={TextCss}>{postData?.postTitle}</div>
          <Typography variant="body" color="text.secondary" component="div">
            {postData?.nickname}
          </Typography>
        </Box>
        {postData?.dealState === "거래중" ? (
          <div
            style={{ position: "absolute", right: "1.5rem", color: "green" }}
          >
            거래중
          </div>
        ) : (
          <div style={{ position: "absolute", right: "1.5rem", color: "gray" }}>
            거래완료
          </div>
        )}
      </Box>
      {/* 메세지 내용 */}
      <Box
        sx={{
          height: "55vh",
          overflow: "auto",
          padding: "20px",
          verticalAlign: "baseline",
          // display: "flex",
        }}
      >
        {chatList.map((item, index) => {
          return <ChatForm item={item} key={index} />;
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={messagesEndRef}
        ></div>
      </Box>

      {/* 메세지 입력 */}

      <Box
        sx={{
          boxShadow: "0 -0.5px 5px 0 rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "15%",
          padding: "0 10px",
          position: "absolute",
          verticalAlign: "baseline",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "S-CoreDream-3Light",
        }}
      >
        {confirmationState ? (
          <input
            placeholder="거래가 완료된 게시물입니다."
            type="text"
            ref={t}
            style={{
              width: "70%",
              height: "30px",
              border: "solid 1px gray",
              borderRadius: "10px",
              fontSize: "large",
              padding: "5px 10px",
            }}
            disabled
          />
        ) : (
          <input
            placeholder="메세지를 입력하세요"
            onKeyUp={onEnter}
            type="text"
            ref={t}
            style={{
              width: "70%",
              height: "30px",
              border: "solid 1px gray",
              borderRadius: "10px",
              fontSize: "large",
              padding: "5px 10px",
              fontFamily: "S-CoreDream-3Light",
            }}
          />
        )}
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              width: "20%",
              color: "black",
              fontFamily: "S-CoreDream-3Light",
            }}
            onClick={handleEnter}
          >
            전송
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const TextCss = {
  width: "50vw",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default Chat;
