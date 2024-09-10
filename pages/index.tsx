import { useState } from "react";
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';
import NormalIndexPage from '../components/NormalIndexPage';
import EndrollPage from '../components/EndrollPage';

type commandType = "normal" | "vim";

const IndexPage = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [currentCommand, setCurrentCommand] = useState<commandType>("normal");
  const [isEndroll, setIsEndroll] = useState(false);

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
