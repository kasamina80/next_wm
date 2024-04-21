import Sidebar from "../components/Sidebar";
import "../src/app/app.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const renderTooltip = (props: { className: string, content: string }) => (
  <Tooltip id="tooltip" className={ props.className }>
    <span dangerouslySetInnerHTML={ { __html: props.content } } />
  </Tooltip>
);

const ProfilePage = () => {
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
