import React from "react";
import Link from "next/link";
import Title from "./Title";
import AccessCounterBox from "./AccessCounterBox";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import "./Sidebar.css";

const Sidebar = () => {
  const count = useSelector((state: RootState) => state.access_counters.count);

  return (
    <div className="sidebar">
      <div className="flex left-top-box title">
        <Title />
      </div>
      <div className="flex left-top-box access-counter-box">
        <AccessCounterBox count={ count } />
      </div>
      <ul>
        <li>
          <Link href="/">トップ</Link>
        </li>
        <li>
          <Link href="/profile">プロフィール</Link>
        </li>
        <li>
          <Link href="/histories">経歴</Link>
        </li>
        <li>
          <Link href="/skills">スキル</Link>
        </li>
        <li>
          <Link href="/archives">成果物</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
