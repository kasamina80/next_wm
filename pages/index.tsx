import Sidebar from "../components/Sidebar";
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';

type commandType = "normal" | "vim";

const commands: { [key in commandType]: string[] } = {
  normal: ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
  vim: ["k", "j", "k", "j", "h", "l", "h", "l", "b", "a"]
}

const IndexPage = () => {
  const [successCount, setSuccessCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  // TODO: ここのanyを正確な型にする
  const [currentCommand, setCurrentCommand]: [commandType, any] = useState("normal");
  const handleKeyDownEnter = (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === commands[currentCommand][successCount]) {
      const newSuccessCount = successCount + 1;
      setSuccessCount(newSuccessCount);
      console.log(newSuccessCount);
      if (newSuccessCount == commands[currentCommand].length) {
        console.log("do something")
      }
    } else {
      const nextCommandTypePair = Object.entries(commands).find(([commandType, commands]) => commands[0] === event.key);
      if (nextCommandTypePair) {
        setCurrentCommand(nextCommandTypePair[0]);
        setSuccessCount(1);
        console.log(1);
      } else {
        setSuccessCount(0);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEnter);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCount]);

  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <div className="top-links-wrapper">
          <div className="link-wrapper" data-linkto="profile">
            <Link href="/profile">プロフィール</Link>
          </div>
          <div className="link-wrapper" data-linkto="histories">
            <Link href="/histories">経歴</Link>
          </div>
          <div className="link-wrapper" data-linkto="skills">
            <Link href="/skills">スキル</Link>
          </div>
          <div className="link-wrapper" data-linkto="archives">
            <Link href="/archives">成果物</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
