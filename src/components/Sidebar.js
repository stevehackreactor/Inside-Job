import { useState } from 'react';

const Sidebar = () => {

  const handleHome = () => {
    console.log('home clicked')
  }

  const handleSave = () => {
    console.log('Save clicked')
  }

  const handleLoad = () => {
    console.log('Load clicked')
  }

  return (
    <div className="sidebar">
      <span onClick={ handleHome }>
        Home
      </span>
      <span onClick={ handleSave }>
        Save
      </span>
      <span onClick={ handleLoad }>
        Load
      </span>
    </div>
  )
}

export default Sidebar;