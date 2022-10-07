import { useState } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ title: "", category: "" });
  const [searchList, setSearchList] = useState([]);
  const onSearch = (e) => {
    setSearch({ ...search, title: e.target.value });
  };

  const onCategory = (e) => {
    setSearch({ ...search, category: e.target.value });
  };

  // 엔터 눌렀을 때
  const onEnter = (e) => {
    if (e.key === "Enter") {
      Click();
    }
  };

  console.log(search);
  const Click = () => {
    apis
      .searchList(search)
      .then((response) => {
        setSearchList(response.data.data.content);
      })

      .catch((error) => {});
  };

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        ></ArrowBackIcon>
        <InputSt
          id="outlined-basic"
          placeholder="검색어를 입력해주세요"
          variant="outlined"
          onChange={onSearch}
          onKeyUp={onEnter}
        />
        <SearchIcon onClick={Click} fontSize="large" />
      </Header>

      {/* 검색 영역 */}
      <Box sx={{ padding: "0 5vw 0 5vw" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        ></Box>
        <FormControl
          variant="standard"
          sx={{ width: "70%", textAlign: "center" }}
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="선택"
            value={search.category}
            onChange={onCategory}
            displayEmpty
          >
            <MenuItem value="">카테고리 선택</MenuItem>
            <MenuItem value="DEVICE">디지털기기</MenuItem>
            <MenuItem value="APPLANCE">생활가전</MenuItem>
            <MenuItem value="KITCHEN">생활/주방</MenuItem>
            <MenuItem value="WOMEN">여성의류/잡화</MenuItem>
            <MenuItem value="MEN">남성의류/잡화</MenuItem>
            <MenuItem value="BEAUTY">뷰티/미용</MenuItem>
            <MenuItem value="GAME">취미/게임</MenuItem>
            <MenuItem value="BOOK">도서</MenuItem>
            <MenuItem value="TICKET">티켓</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 검색 결과 영역  */}
      <Box sx={{ height: "70vh", overflow: "auto", padding: "20px" }}>
        {searchList[0] === undefined && (
          <div style={emptyCss}>
            <SearchRoundedIcon
              sx={{ width: "150px", height: "150px", color: "gray" }}
            />
            <p>검색어를 입력해주세요 : )</p>
          </div>
        )}
        {searchList.map((post, idx) => {
          return <Post post={post} key={idx}></Post>;
        })}
      </Box>
    </>
  );
}

const emptyCss = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const InputSt = styled.input`
  border: none;

  width: 70vw;
  height: 7vh;
  text-indent: 8px;

  &:focus {
    outline: 1px solid gray;
  }
`;
