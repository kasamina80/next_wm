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

  return (
    <>
      <div className="App">
        <div className="endroll-wrapper">
          <div id="you-found-the-hidden-command">You found the hidden command !</div>
          <span id="back-button" onClick={ backToOriginalPage }>元のページに戻る</span>
        </div>
      </div>
    </>
  );
}

export default EndrollPage;
