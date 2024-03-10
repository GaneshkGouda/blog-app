import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex px-10 py-4 text-white     bg-blue-500 w-full   justify-between">
      <div className="font-bold text-2xl">
        {" "}
        <Link to={"/"}>BLOG APP</Link>
      </div>
      <div>
        <ul className="flex font-semibold gap-5 justify-between  text-lg ">
          <Link to={"/"}>
            <li className="hover:underline duration-100">Home</li>
          </Link>
          <Link to={"/addblog"}>
            <li className="hover:underline duration-100">Add blog</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
