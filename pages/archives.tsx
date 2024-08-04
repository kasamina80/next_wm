import Sidebar from "../components/Sidebar";
import "../src/app/app.scss";

const ProfilePage = () => {
  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <h2>成果物</h2>
        <dl>
          <dt>アクセスカウンター</dt>
          <dd>左に出ている数字です。</dd>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
