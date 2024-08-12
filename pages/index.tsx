import Sidebar from "../components/Sidebar";
import Link from 'next/link';
import { useEffect, useState } from "react";
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';

const command = ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const IndexPage = () => {
  const [successCount, setSuccessCount] = useState(0);
  const handleKeyDownEnter = (event: KeyboardEvent) => {
    console.log(event.key);
    if (event.key === command[successCount]) {
      console.log(successCount);
      const newSuccessCount = successCount + 1;
      setSuccessCount(newSuccessCount);
      if (newSuccessCount == command.length) {
        console.log("do something")
      }
    } else {
      setSuccessCount(0);
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
