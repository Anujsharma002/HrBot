import React, { useState } from 'react'
import ChatBox from './ChatBox';
import SearchBox from './SearchBox';
import './Header.css'
const Header = () => {
    const [chat,chatFlag] = useState(true);
  return (
    <div className='container-header'>
      {/* {chatFlag?<ChatBox/>:<SearchBox/>} */}
    </div>
  )
}

export default Header
