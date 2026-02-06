import React from 'react';

const ListItem = ({ item, onRemove }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
      <span style={{ marginRight: '10px' }}>{item}</span>
      <button onClick={onRemove} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '2px 6px', cursor: 'pointer' }}>
        Remove
      </button>
    </div>
  );
};

export default ListItem;
