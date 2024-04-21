import Sidebar from "../components/Sidebar";
import Link from 'next/link';
import '../src/app/index.css';
import '../src/app/app.scss';
import '../src/app/home.scss';

const ProfilePage = () => {
  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <div className="top-links-wrapper">
          <div className="link-wrapper" data-linkto="profile">
            <Link href="/profile">プロフィール</Link>
          </div>
          <div className="link-wrapper" data-linkto="histories">
            <Link href="/histories">経歴</Link>
          </div>
          <div className="link-wrapper" data-linkto="skills">
            <Link href="/skills">スキル</Link>
          </div>
          <div className="link-wrapper" data-linkto="archives">
            <Link href="/archives">成果物</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
