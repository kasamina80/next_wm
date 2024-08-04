import Sidebar from "../components/Sidebar";
import Link from "next/link";
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
          <dt><Link href="/bbs">簡易BBS</Link></dt>
          <dd>キリ番をgetした時に書き込む場所です。踏み逃げ禁止！</dd>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
