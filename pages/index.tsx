import { Dispatch, SetStateAction, useState } from "react";
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';
import NormalIndexPage from '../components/NormalIndexPage';
import EndrollPage from '../components/EndrollPage';

type commandType = "normal" | "vim";

const IndexPage = () => {
  const [successCount, setSuccessCount]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  // TODO: ここのanyを正確な型にする
  const [currentCommand, setCurrentCommand]: [commandType, any] = useState("normal");
  const [isEndroll, setIsEndroll]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  return (
    <div id="root">
      {
        isEndroll ? 
        <EndrollPage
          setIsEndroll={setIsEndroll}
        /> :
        <NormalIndexPage
          successCount={successCount}
          setSuccessCount={setSuccessCount}
          currentCommand={currentCommand}
          setCurrentCommand={setCurrentCommand}
          setIsEndroll={setIsEndroll}
        />
      }
    </div>
  );
}

export default IndexPage;
