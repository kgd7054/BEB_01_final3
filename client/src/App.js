import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './components/LandingPgae/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UploadPage from './components/UploadPage/UploadPage';
import Bar from './components/NavBar/Bar';
import VideoDetailPage from './components/VideoDetailPage/VideoDetailPage';
import Auth from './hoc/auth';
import SearchNft from './components/Search/SearchNft';
import CreateNFT from './components/NFTcreate/CreateNFT';
import FixedNftList from './components/NFTcreate/FixedNftList';
import AuctionNftList from './components/NFTcreate/AuctionNftList';
import MyPage from './components/MyPage/MyPage';
import ExchangePage from './components/ExchangePage/ExchangePage';
import SearchContent from "./components/Search/SearchContent";
import DeveloperPage from "./components/DeveloperPage/DeveloperPage";
import CounterPage from "./components/VideoDetailPage/CounterPage/CounterPage";
import SearchFail from "./components/Search/SearchFail";
import LikeNft from "./components/MyPage/Like/LikeNft";
import LikeConTent from "./components/MyPage/Like/LikeConTent";
import Batting from "./components/batting/Batting"
import UserUpload from './components/UploadPage/UserUpload'
import UserVideoDetailPage from './components/VideoDetailPage/UserVideoDetailPage'
import channel from "./components/Channel/Channel";
import AuctionDetailPage from "./components/NFTcreate/AuctionDetailPage/AuctionDetailPage";
import Footer from './components/Footer/Footer'

// const express = require("express");
// const app = express();
// const cors = require("cors");

function App(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


	const isAuthenticated = () => {
		if (userInfo) {
			console.log('have userInfo');
			setIsLogin(true);
		}
	};

  const handleLogin = (req) => {
    const addr = req.address;
    console.log(addr);
    setUserInfo(addr);
    isAuthenticated();
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Bar isLogin={isLogin} />
        <div className="content-wrap">
        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
	  	
        <Routes>
          <Route exact path="/" element={Auth(LandingPage, null)} />
          <Route exact path="/login" element={Auth(LoginPage, false)} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />

          <Route exact path="/video/upload" element={Auth(UploadPage, true, true)} />
          <Route exact path="/video/userupload" element={Auth(UserUpload, true)} />
          
          <Route exact path="/video/:videoId" element={Auth(VideoDetailPage, null)} />
          <Route exact path="/videos/:videoId" element={Auth(UserVideoDetailPage, null)} />
          
          <Route exact path="/nft/create" element={Auth(CreateNFT, true, true)} />
          <Route exact path="/Developer" element={Auth(DeveloperPage, true, true)} />
          <Route exact path="/nft/fixedlist" element={Auth(FixedNftList, null)} />
          <Route exact path="/nft/auctionlist" element={Auth(AuctionNftList, null)} />
          <Route exact path="/nft/:tokenId" element={Auth(AuctionDetailPage, null)} />
          <Route exact path="/user/mypage" element={Auth(MyPage, true)} />
          <Route exact path="/exchange" element={Auth(ExchangePage, true)} />
          <Route exact path='/SearchNft' element={Auth(SearchNft, null)} />
          <Route exact path='/SearchFail' element={Auth(SearchFail, null)} />
	    	  <Route exact path='/SearchContent' element={Auth(SearchContent, null)} />
          <Route exact path="/video/:videoId/counterpage" element={Auth(CounterPage, true)} />
          <Route exact path="/user/mypage/Like/LikeNft" element={Auth(LikeNft, true)} />
          <Route exact path="/user/mypage/Like/LikeConTent" element={Auth(LikeConTent, true)} />
          <Route exact path="/Developer/batting" element={Auth(Batting, true)} />

          <Route exact path="/channel" element={Auth(channel, null)} />

        </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
// true, true => 관리자 페이지
//  null    =>  아무나 출입이 가능한 페이지
//     true    =>  로그인한 유저만 출입이 가능한 페이지
//     false   =>  로그인한 유저는 출입 불가능한 페이지
 
				


// app.use(cors());


export default App;
