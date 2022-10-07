import { useState, useEffect } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AlarmCard from "../components/AlarmCard";
import { Container } from "@mui/material";

export default function AlarmPage() {
  const navigate = useNavigate();
  const [alarmList, setAlarmList] = useState([]);
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    apis
      .checkAlarm()
      .then((response) => {
        setAlarmList(response.data.data);
      })
      .catch((error) => {});
  }, []);

  const allRead = () => {
    apis
      .alarmAllRead()
      .then((res) => {
        setIsCheck(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Container>알림</Container>
        <button style={ButtonCss} onClick={allRead}>
          모두 읽음
        </button>
      </Header>
      {alarmList.map((alarm, idx) => {
        return (
          <AlarmCard alarm={alarm} key={idx} isCheck={isCheck}></AlarmCard>
        );
      })}
    </>
  );
}
const ButtonCss = {
  color: "gray",
  backgroundColor: "gainsboro",
  borderRadius: "10px",
  border: "1px solid gainsboro",
  width: "30vw",
  height: "5vh",
};
