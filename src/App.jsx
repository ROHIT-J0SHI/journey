import './App.css'
import Hero from './components/custom/Hero'
import HowItWorks from './components/custom/HowItWorks'
import About from './components/custom/AboutUs' 
import { useState } from 'react'
import ChatBot from './components/custom/ChatBot'

function App() {
  const [showChatBot, setShowChatBot] = useState(true)
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <About />

      {showChatBot && <ChatBot/>}
    </div>
  )
}

export default App
