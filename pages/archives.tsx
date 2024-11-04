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
          <dt><Link href="https://fraction-visualizer.vercel.app/">分数ビジュアライザ</Link></dt>
          <dd>小学生向け: 分数の大きさを直感的に理解するためのサイトです。<br />※注意: 音が出ます</dd>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
