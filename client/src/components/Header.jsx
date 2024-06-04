import { useState } from 'react';
import { SearchOutlined, BarsOutlined } from '@ant-design/icons';
import '../scss/Header.scss';

function Header({ onSearch, onReset }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleMenuClick = () => {
    setSearchQuery('');
    onReset();
  };

  return (
    <div className="header">
      <div className="menu-icon" onClick={handleMenuClick}><BarsOutlined /></div>
      <div className="title">
        <p>MOVIE</p>
        <div className="title-circle">
          <p>UI</p>
        </div>
      </div>
      <div className={`search-icon ${isSearchExpanded ? 'expanded' : ''}`}>
        <SearchOutlined onClick={handleSearchClick} />
        <form onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search Movies"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => setIsSearchExpanded(true)} 
            onBlur={() => {
              if (!isSearchExpanded) return;
              setIsSearchExpanded(false);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Header;
