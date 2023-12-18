import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import './App.css'


import Home from "./pages/Home";
import Works from './pages/Works'


//主檔內容 html
function App() {

  return (
    <HelmetProvider context={{}}>
      {/* 設定頁面title */}
      <BrowserRouter>
        {/* 設定Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="works/:school/:semester" element={<Works />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}


export default App
