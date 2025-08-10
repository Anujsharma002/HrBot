import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatBox from '../Components/ChatBox';
import Header from '../Components/Header';
import SearchBox from '../Components/SearchBox';

const App = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isChat, setIsChat] = useState(true);

  async function handleClick() {
    const text = document.getElementById("keyword")?.value.trim();
    if (!text) return;
    // your fetch logic here...
  }

  useEffect(() => {
    if (!vantaEffect && window.VANTA && window.VANTA.GLOBE) {
      setVantaEffect(
        window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xa70b80,
          size: 0.90,
          backgroundColor: 0xefefef
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
<div ref={vantaRef} className="Main-container">
  <div className="overlay">
    <div className="button-container">
      <button onClick={() => setIsChat(true)}>Chat</button>
      <button onClick={() => setIsChat(false)}>Search</button>
    </div>
    <div className="content-area">
      {isChat ? <ChatBox /> : <SearchBox handleClick={handleClick} />}
    </div>
  </div>
</div>

  );
};

export default App;
