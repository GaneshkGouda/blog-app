import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Addblog from "./pages/add-blog/Add-blog";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/addblog" element={<Addblog />}></Route>
      </Routes>
    </>
  );
}

export default App;
