import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./components/myPage/MyPage";
import Main from "./components/main/Main";
import Detail from "./components/detail/Detail";
import Join from "./components/join/Join";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
