import React from 'react'
import '../src/app/index.css'
import '../src/app/app.scss'
import Sidebar from '../components/Sidebar'

const SkillsPage = () => {
  return (
    <div id="root">
      <Sidebar />
      <div className="App">
        <h2>WHAT I HAVE</h2>
        <ul>
          <li>基本情報技術者試験</li>
          <li>応用情報技術者試験</li>
          <li>Ruby Association Certified Ruby Programmer Gold version 2.1</li>
          <li>実用数学技能検定1級</li>
        </ul>
        <h2>WHAT I KNOW</h2>
        <ul>
          <li>Ruby on Rails</li>
          <li>TypeScript</li>
          <li>JavaScript</li>
          <li>React.js</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsPage;