import React from "react";
import { autocompleteClasses, CardActionArea } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PanoramaSharp } from "@mui/icons-material";

export default function ChatPost({ post }) {
  const navigate = useNavigate();
  const param = useParams();

  return (
    <CardActionArea onClick={() => navigate(`/chatdetail/${post.roomId}`)}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          height: "100%",
          borderBottom: "1px solid #f4f4f4",
        }}
      >
        <div style={CardCss}>
          <div style={{ width: "2rem", height: "2rem" }}>
            <img
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "contain",
                borderRadius: "50%",
                objectPosition: "50% 50%",
                border: "1px solid gainsboro",
              }}
              src={post.profileUrl}
              alt=""
            />
          </div>

          <div style={TextCss}>
            <label
              style={{ diaply: "flex", fontWeight: "600", fontSize: "15px" }}
            >
              {post.nickname}
            </label>
            <label
              style={{
                diaply: "flex",
                marginLeft: "4px",
                fontSize: "0.5rem",
                color: "gray",
                margin: "auto",
              }}
            >
              {post.time}
            </label>
            <label
              style={{
                diaply: "flex",
                marginLeft: "4px",
                fontSize: "0.5rem",
                color: "gray",
                margin: "auto",
              }}
            >
              · {post.location}
            </label>
            <p style={{ marginTop: "0.5rem" }}>{post.lastMessage}</p>
          </div>
        </div>
        {/* 오른쪽에 이미지 만들기 위해 새로 작성*/}

        <div
          style={{
            width: "3rem",
            height: "3rem",
            padding: "12px",
          }}
        >
          <img
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "contain",
              borderRadius: "5px",
              objectPosition: "50% 50%",
              border: "1px solid gainsboro",
            }}
            src={post.postImage !== null ? post.postImage : "logo.jpg"}
            alt=""
          />
        </div>
      </div>
    </CardActionArea>
  );
}

const CardCss = {
  display: "flex",
  width: "100%",
  height: "3rem",
  padding: "1em",

  // alignItems: "center",
};
const TextCss = {
  paddingLeft: "2em",
  width: "60vw",
};
const ImageCss = {
  // maxWidth: "100px",
  // maxHeight: "100px",
  // minWidth: "100px",
  // minHeight: "100px",
  width: "100px",
  height: "100px",
  aspectRatio: "auto",
  borderRadius: "5px",
  backgroundColor: "#c3d0d8",
  objectFit: "fill",
};
