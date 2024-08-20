import Sidebar from "../components/Sidebar";
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect } from "react";
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';

type commandType = "normal" | "vim";

const commands: { [key in commandType]: string[] } = {
  normal: ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
  vim: ["k", "j", "k", "j", "h", "l", "h", "l", "b", "a"]
}

const NormalIndexPage = (
  props: {
    successCount: number,
    setSuccessCount: Dispatch<SetStateAction<number>>,
    currentCommand: commandType,
    setCurrentCommand: any,
    setIsEndroll: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { successCount, setSuccessCount, currentCommand, setCurrentCommand, setIsEndroll } = props;
  // TODO: ここのanyを正確な型にする
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === commands[currentCommand][successCount]) {
      const newSuccessCount = successCount + 1;
      setSuccessCount(newSuccessCount);
      console.log(newSuccessCount);
      if (newSuccessCount == commands[currentCommand].length) {
        setSuccessCount(0);
        setIsEndroll(true);
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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCount]);

  return (
    <>
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
    </>
  );
}

export default NormalIndexPage;
