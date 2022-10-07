import { Container, createTheme, ThemeProvider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { getCookie } from "../shared/Cookie";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Start() {
  const navigate = useNavigate();

  const images = useRef([
    {
      src: "default-image.jpg",
    },
    {
      src: "Untitled_1.png",
    },
    {
      src: "Untitled_2.png",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [click, setClick] = useState(false);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const imgSize = useRef(images.current.length);

  // 3초에 한번식 자동으로 이미지 넘김
  const ImageSlideTimer = () => {
    let nextIndex = current + 1;

    if (nextIndex >= imgSize.current) {
      nextIndex = 0;
    }

    setCurrent(nextIndex);
  };
  useInterval(
    () => {
      setCurrent((current) => current + 1);
      if (current >= imgSize.current - 1) {
        setCurrent(0);
      }
    },
    click ? null : 3000
  );
  useEffect(() => {
    setTimeout(() => {
      click && setClick(false);
    }, 2000);
  }, [click]);
  // setTImeout

  // 이미지 버튼으로 넘김
  const moveSlide = (i) => {
    setClick(true);
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = imgSize.current - 1;
    else if (nextIndex >= imgSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  const cookie = getCookie("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookie === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cookie]);

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
      <Container
        style={{
          display: "block",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "80vh",
          marginTop: "30vw",
          // userSelect: "none",
        }}
      >
        <div style={{ transition: "all 1.5s ease-out" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="slide"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <BtnLeft
                className="btn"
                onClick={() => {
                  moveSlide(-1);
                }}
              >
                &lt;
              </BtnLeft>
              <div
                className="window"
                style={{
                  // background: "coral",
                  width: "90vw",
                  height: "50vh",

                  overflow: "hidden",
                }}
              >
                <div className="flexbox" style={style}>
                  {images.current.map((img, i) => (
                    <div
                      key={i}
                      className="img"
                      style={{
                        backgroundImage: `url(${img.src})`,
                        width: "90vw",
                        height: "50vh",
                        backgroundPosition: "50% 50%",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        flex: "none",
                        float: "left",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <BtnRight
                className="btn"
                onClick={() => {
                  moveSlide(1);
                }}
              >
                &gt;
              </BtnRight>
            </div>
            <div
              className="position"
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {images.current.map((x, i) => (
                <Dot key={i} className={i === current ? "current" : "dots"} />
              ))}
            </div>
          </div>
        </div>
        <br />
        <p />
        <div style={{ display: "grid" }}>
          <Button
            variant="contained"
            color="warning"
            style={{ marginTop: "5vw", height: "9vh", fontSize: "x-large" }}
            onClick={() => {
              isLoggedIn ? navigate("/") : navigate("/login");
            }}
          >
            시작하기
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

const BtnLeft = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: #dcdcdc;
  padding: 0 10px;
`;

const BtnRight = styled.div`
  position: absolute;
  right: 7.5%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: #dcdcdc;
  padding: 0 10px;
`;

const Dot = styled.div`
  &.current {
    background: gray;
    border-radius: 100%;
    height: 10px;
    width: 10px;
    margin-left: 20px;
  }
  &.dots {
    background: lightgray;
    border-radius: 100%;
    height: 10px;
    width: 10px;
    margin-left: 20px;
  }
`;
