import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatPost from "../components/ChatPost";
import Footer from "../components/Footer";
import apis from "../apis/Apis";
import { getCookie } from "../shared/Cookie";
export default function ChatRoomPage() {
  const navigate = useNavigate();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    apis
      .chatRooms(getCookie("id"))
      .then((response) => {
        setChatList(response.data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Header>
        <div>채팅 </div>
      </Header>
      <Box sx={{ width: "100vw", height: "80vh", overflow: "auto" }}>
        {chatList.reverse().map((post, idx) => {
          return <ChatPost post={post} key={idx} />;
        })}
      </Box>
      <Footer />
    </>
  );
}
