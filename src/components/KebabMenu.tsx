import React, { useState } from 'react';

interface KebabMenuProps {
  onDelete?: () => void;  
  onEdit?: () => void;
}

const KebabMenu: React.FC<KebabMenuProps> = ({onDelete, onEdit}) => {
  const [active, setActive] = useState<boolean>(false);

  const toggleMenu = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="kebab" onClick={toggleMenu}>
      <figure></figure>
      <figure className={`middle ${active ? 'active' : ''}`}></figure>
      <figure></figure>
      <ul className={`dropdown ${active ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <li>
          <button
            onClick={() => {
              if (onEdit) onEdit();
              setActive(false);
            }}
            className="dropdown-item"
          >
            Edit post
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (onDelete) onDelete();
              setActive(false);
            }}
            className="dropdown-item"
          >
            Delete post
          </button>
        </li>
      </ul>
    </div>
  );
};

export default KebabMenu;
