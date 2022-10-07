import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  IconButton,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import apis from "../apis/Apis";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../shared/Cookie";
export default function Detail() {
  const navigate = useNavigate();
  const param = useParams();

  const [myId, setMyId] = useState(getCookie("id"));

  // 캐로셀 넘버링
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef();
  const [tt, setTT] = useState(false);

  const [postData, setPostData] = useState([]);
  const [imageList, setImageList] = useState(["default-image.jpg"]);
  const [isBookMark, setIsBookMark] = useState(false);

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Bookmarking = () => {
    apis
      .addBookMark(param.postid)
      .then((response) => {
        if (response.data.success === true) {
          setIsBookMark(!isBookMark);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    apis
      .postDetail(param.postid)
      .then((response) => {
        setPostData(response.data.data);
        setImageList((preList) => [...response.data.data.imageUrl]);
        setIsBookMark(response.data.data.postPicked);
      })
      .catch((error) => {});
  }, [param]);

  // 게시물 수정
  const PutHandler = () => {
    navigate(`/detail-edit/${param.postid}`);
  };

  // 게시물 삭제
  const DeleteHandler = () => {
    apis
      .deleteDetail(param.postid)
      .then((response) => {
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  // 캐로셀
  const TOTAL_SLIDES = imageList.length - 1;

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const PreveSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  // 채팅방 생성
  const CreateChat = () => {
    apis
      .chatCreate(param.postid)
      .then((response) => {
        navigate(`/chatdetail/${response.data.data.roomId}`);
      })
      .catch((error) => {});
  };
  const onerrorImage = (e) => {
    e.target.src = "/default-image.jpg";
  };
  return (
    <>
      <Box sx={{ height: "90vh", overflow: "auto" }}>
        <div style={ImgContainer}>
          <div style={Slide} ref={slideRef}>
            {imageList.map((images, index) => (
              <img
                key={index}
                style={imgCss}
                src={images}
                alt=""
                onError={onerrorImage}
              />
            ))}
          </div>

          <IconButton
            style={IconCss}
            size="large"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeftRoundedIcon fontSize="large" />
          </IconButton>
          <ArrowBackIosIcon style={ButtonLeft} onClick={PreveSlide} />
          <ArrowForwardIosIcon style={ButtonRight} onClick={NextSlide} />
          <div
            style={{
              position: "absolute",
              display: "flex",
              marginTop: "19rem",
              marginLeft: "37%",
            }}
          >
            {imageList.map((x, i) => (
              <div
                key={i}
                style={
                  i === currentSlide
                    ? {
                        background: "white",
                        borderRadius: "100%",
                        height: "10px",
                        width: "10px",
                        marginLeft: "20px",
                      }
                    : {
                        background: "gray",
                        borderRadius: "100%",
                        height: "10px",
                        width: "10px",
                        marginLeft: "20px",
                      }
                }
              />
            ))}
          </div>
        </div>
        <Card
          sx={{
            borderRadius: "0",
            boxShadow: "0",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: "red" }}
                aria-label="recipe"
                src={postData.userImageUrl}
              >
                {postData.userImageUrl}
              </Avatar>
            }
            action={
              <div style={{ display: "flex" }}>
                {postData.dealState === "ONGOING" ? (
                  <div
                    style={{
                      margin: "8.5px 10px 0 0",
                      color: "green",
                    }}
                  >
                    거래중
                  </div>
                ) : (
                  <div
                    style={{
                      margin: "8.5px 10px 0 0",
                      color: "gray",
                    }}
                  >
                    거래완료
                  </div>
                )}
                {/* 자신의 게시글에서만 보여야함 */}
                {myId === postData.userId && (
                  <>
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
                      <MenuItem onClick={PutHandler}>수정</MenuItem>
                      <MenuItem onClick={DeleteHandler}>삭제</MenuItem>
                    </Menu>
                  </>
                )}
              </div>
            }
            title={postData.nickname}
            subheader={postData.location}
          />
          <CardContent>
            <Typography variant="h5" color="text.main">
              {postData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postData.category}&nbsp;&nbsp;{postData.postDate}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {postData.content}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              fontSize: "5px",
              alignItems: "center",
              textIndent: "15px",
              color: "gray",
            }}
          >
            관심: {postData.postPickCount} · 조회: {postData.postVisitCount}
          </Box>
        </Card>
      </Box>

      {/* 자신의 게시글은 사라지게 해야함 */}
      {myId != postData.userId && postData.dealState === "ONGOING" ? (
        <Box
          sx={{
            height: "7vh",
            marginTop: "10px",
            padding: "5px",
            display: "flex",
            gap: "5vw",
          }}
        >
          <IconButton aria-label="add to favorites" onClick={Bookmarking}>
            {isBookMark ? <BookmarkIcon /> : <TurnedInNotRoundedIcon />}
          </IconButton>

          <Button style={ButtonCss} fullWidth onClick={CreateChat}>
            1:1 채팅
          </Button>
        </Box>
      ) : null}
    </>
  );
}

const IconCss = {
  position: "absolute",
  color: "white",
  top: "5px",
};

const ImgContainer = {
  display: "flex",
  width: "100%",
  height: "50vh",
  overflow: "hidden",
  alignItems: "center",
};

const Slide = {
  width: "100%",
  height: "100%",
  display: "flex",
};

const ButtonLeft = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#fffefe",
  padding: "0 10px",
  left: "5px",
  top: "28%",
};

const imgCss = {
  minWidth: "100%",
  minHeight: "100%",
  backgroundColor: "#dcdcdc",
  objectFit: "fill",
  display: "flex",
};

const ButtonRight = {
  position: "absolute",
  right: "0",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "2rem",
  color: "#fffefe",
  padding: "0 10px",
  top: "28%",
};
const ButtonCss = {
  display: "flex",
  color: "white",
  backgroundColor: "gray",
  height: "6vh",
  alignItems: "center",
};
