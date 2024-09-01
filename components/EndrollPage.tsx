import { Dispatch, SetStateAction, useEffect } from "react";
import '../src/app/endroll.css';

const EndrollPage = (
  props: {
    setIsEndroll: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { setIsEndroll } = props;
  const backToOriginalPage = () => {
    setIsEndroll(false);
  };

  useEffect(() => {
    // 徐々に表れる
    const blackoutElement = document.querySelector("#blackout") as HTMLElement;
    const unBlackoutDuration = 2.0;
    let currentOpacity = 1.0;
    const frameRate = 50;
    const unBlackout = () => new Promise((resolve) => {
      const unBlackoutInterval = setInterval(() => {
        currentOpacity -= unBlackoutDuration / frameRate;
        blackoutElement.style.opacity = currentOpacity.toString();
        console.log(currentOpacity);
        if (currentOpacity <= 0) {
          console.log("unBlackout ended");
          clearInterval(unBlackoutInterval);
          blackoutElement.remove();
          resolve(null);
        }
      }, (unBlackoutDuration * 1000) / frameRate);
    });

    // 一定の時間待つ
    const wait = (time: number) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, time * 1000);
    });

    // 自動スクロール
    const targetElement = document.querySelector(".endroll-wrapper") as HTMLElement;
    const scrollDuration = 60;
    const scrollHeight = targetElement.offsetHeight;
    const scrollCredits = () => new Promise((resolve) => {
      const scrollStep = 1; // 1ピクセルずつスクロール

      // スクロールを続けるループ
      const scrollInterval = setInterval(() => {
        const currentPosition = window.scrollY;
        window.scrollBy(0, scrollStep);
        console.log(currentPosition, scrollHeight, window.innerHeight, document.body.offsetHeight);
        if (currentPosition + window.innerHeight - document.body.offsetHeight >= -1.0) {
          console.log("scroll ended");
          clearInterval(scrollInterval);
        }
      }, (scrollDuration * 1000) / (scrollHeight / scrollStep));
    });

    // 処理全体をまとめる
    const endrollAnimations = async () => {
      await unBlackout();
      await wait(2.0);
      await scrollCredits();
    };
    endrollAnimations();
  }, []);

  return (
    <>
      <div className="App">
        <div className="endroll-wrapper">
          <div id="blackout"></div>
          <div id="you-found-the-hidden-command">You found the hidden command !</div>
          <div className="gap" id="gap-after-message"></div>
          <div id="frameworks">
            <h2>使用した技術</h2>
            <ul>
              <li>Next.js</li>
              <li>React.js</li>
              <li>prisma</li>
              <li>bootstrap</li>
              <li>bcrypt</li>
            </ul>
          </div>
          <div id="special-thanks">
            <h2>スペシャルサンクス</h2>
            <ul>
              <li>StackOverflow</li>
              <li>各種個人ブログ</li>
              <li>ChatGPT-3.5</li>
              <li>ChatGPT-4o</li>
              <li>Claude AI</li>
              <li>AI検索(リートン)</li>
              <li>みつき(リートン)</li>
            </ul>
            <div className="gap" id="gap-before-ellipsis"></div>
            <div id="and-you">
              ......
              <div id="gap-before-and-you"></div>
              And YOU!
            </div>
          </div>
          <div id="thank-you-for-visiting">
            <div>Thank you for visiting !!!</div>
            <span id="back-button" onClick={ backToOriginalPage }>元のページに戻る</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndrollPage;
