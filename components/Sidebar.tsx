import React from 'react';
import Link from 'next/link';
import Title from './Title';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="flex">
        <Title />
      </div>
      <ul>
        <li>
          <Link href="/">トップ</Link>
        </li>
        <li>
          <Link href="/profile">プロフィール</Link>
        </li>
        <li>
          <Link href="/histories">経歴</Link>
        </li>
        <li>
          <Link href="/skills">スキル</Link>
        </li>
        <li>
          <Link href="/archives">成果物</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
