import { useState } from 'react';

const Sidebar = () => {

  const handleHome = () => {
    console.log('home clicked')
  }
  return (
    <div className="sidebar">
      <span onClick={ handleHome }>
        Home
      </span>
      <span>
        Save
      </span>
      <span>
        Load
      </span>
    </div>
  )
}

export default Sidebar;