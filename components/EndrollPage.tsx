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

  // 1秒後に自動スクロールを開始する
  useEffect(() => {
    const targetElement = document.querySelector(".endroll-wrapper") as HTMLElement;
    const scrollDuration = 60;
    const scrollHeight = targetElement.offsetHeight;
    const scrollCredits = () => {
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
    }

    // スクロールを開始
    scrollCredits();
  }, []);

  return (
    <>
      <div className="App">
        <div className="endroll-wrapper">
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
