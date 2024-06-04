// src/components/Header.js
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { BarsOutlined } from '@ant-design/icons';
import '../scss/Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="menu-icon"><BarsOutlined /></div>
      <div className="title">
        <p>MOVIE</p>
        <div className="title-circle">
          <p>UI</p>
        </div>
      </div>
      <div className="search-icon"><SearchOutlined /></div>
    </div>
  );
}

export default Header;
