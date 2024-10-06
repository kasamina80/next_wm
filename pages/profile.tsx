import Sidebar from "../components/Sidebar";
import "../src/app/app.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect } from "react";

const renderTooltip = (props: { className: string, content: string }) => (
  <Tooltip id="tooltip" className={ props.className }>
    <span dangerouslySetInnerHTML={ { __html: props.content } } />
  </Tooltip>
);

const ProfilePage = () => {

  // ツールチップが最初に表示されるときに一瞬正しくないところに表示されるので、
  // それを回避する目的で別のところに表示されている間はツールチップを透明にする
  useEffect(() => {
    // ミューテーションを監視する対象
    const targetNode = document.getElementsByTagName("body")[0];

    // ミューテーション監視に使う設定
    const config = { attributes: true, childList: true, subtree: true };
    
    // 処理の本体
    const callback = (mutationList: MutationRecord[]) => {
      const tooltipElement = document.getElementById("tooltip");
      for (const mutation of mutationList) {
        // ツールチップ要素が追加されたら
        // 直後は正しくない位置にあるので透明にする
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            // nodeはNode型でありDOM以外の要素(たとえばText)も内包しているためHTMLElementに変換する
            const targetElement = node as HTMLElement;
            if (targetElement.id === "tooltip") {
              targetElement.style.opacity = "0";
            }
          }
        } else if (mutation.type === "attributes") {
          // mutation.targetはNode型でありDOM以外の要素(たとえばText)も内包しているためHTMLElementに変換する
          const targetElement = mutation.target as HTMLElement;
          const tooltipPosition = tooltipElement?.getBoundingClientRect().left;
          // 正しくない位置は横座標0なので
          // それ以外であれば正しい位置に来たと判断し透明化を解除する
          if (targetElement.id === "tooltip" && tooltipPosition) {
            tooltipElement!.style.opacity = "1";
          }
        }
      }
    };

    // observerを作成する
    const observer = new MutationObserver(callback);

    // observerを起動する
    observer.observe(targetNode, config);
  }, []);

  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <dl>
          <dt>名前:</dt>
          <dd>
            笠波湊帆(かさなみみなほ)<br />
            <OverlayTrigger
              placement="right"
              overlay={renderTooltip({ className: "acronym-tooltip", content: "イントネーションは「日野森」「暁山」と同じで<br />「青柳」「草薙」とは異なります。" })}
            >
              <span>(愛称: かさみな)</span>
            </OverlayTrigger>
          </dd>
          <dt>GitHub:</dt>
          <dd>@kasamina80</dd>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
