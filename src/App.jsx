
import {Route, Routes} from 'react-router-dom'
import {Home} from './pages/Home'
import { useEffect } from 'react';

import './App.css'

function App() {

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

      document.documentElement.style.setProperty('--mouse-x', `${mouseXpercentage}%`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseYpercentage}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
      </div>

  )
}

export default App
