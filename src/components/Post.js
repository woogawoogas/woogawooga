import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function Post({ post, injRef }) {
  const navigate = useNavigate();
  const onerrorImage = (e) => {
    e.target.src = "default-image.jpg";
  };
  return (
    <Box
      sx={{
        Width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={injRef}
      onClick={() => navigate(`/detail/${post.id}`)}
    >
      <div style={CardCss}>
        <div
          style={{
            border: "0.5px solid gainsboro",
            borderRadius: "5px",
            width: "5rem",
            height: "5rem",
          }}
        >
          <img
            style={ImgCss}
            onError={onerrorImage}
            src={post.postImageUrl}
            alt=""
          />
        </div>
        <div style={TextCss}>
          <div
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: "700",
              color: "gray",
              display: "block",
              width: "60vw",
              overflow: "hidden",
              whiteSpace: " normal ",
              textOverflow: "ellipsis",
            }}
          >
            {post.title}
          </div>
          <p style={{ fontSize: "8px", color: "gray" }}>
            {post.category} &nbsp; {post.createdAt}
          </p>
          <div style={{ display: "flex", float: "right" }}>
            <Box
              sx={{
                display: "flex",

                fontSize: "8px",
                alignItems: "center",
                color: "gray",
              }}
            >
              <BookmarkIcon sx={{ fontSize: "small" }} />
              {post.postPickCount}
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
}

const CardCss = {
  display: "flex",
  width: "90vw",
  height: "2vh",
  padding: "8vh 0 8vh 0",
  alignItems: "center",

  borderBottom: "0.5px solid gainsboro",
};
const TextCss = {
  paddingLeft: "5vw",
  width: "100%",
  display: "block",
};
const ImgCss = {
  objectFit: "contain",
  objectPosition: "50% 50%",
  width: "5rem",
  height: "5rem",
  borderRadius: "5px",
};
