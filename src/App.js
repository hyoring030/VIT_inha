import Intro from "./pages/Intro";
import PickStamp from "./pages/PickStamp";
import DetailPage from "./pages/DetailPage";
import WalletPage from "./pages/WalletPage";
import OwnStampPage from "./pages/OwnStampPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import AboutPlace from "./pages/AboutPlace";
function App() {
  const [account, setAccount] = useState("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, [account]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/pickStamp/:id" element={<PickStamp />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/walletPage" element={<WalletPage />} />
        <Route path="/ownStampPage" element={<OwnStampPage />} />
        <Route path="/aboutplace/:id" element={<AboutPlace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
