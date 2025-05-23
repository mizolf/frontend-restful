import React, { useState } from 'react';

const KebabMenu: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);

  const toggleMenu = () => {
    setActive((prev) => !prev);
  };

  return (
<div className="kebab" onClick={toggleMenu}>
      <figure></figure>
      <figure className={`middle ${active ? 'active' : ''}`}></figure>
      <figure></figure>
      <ul className={`dropdown ${active ? 'active' : ''}`}>
        <li><a href="#">Edit post</a></li>
        <li><a href="#">Delete post</a></li>
      </ul>
    </div>
  );
};

export default KebabMenu;
