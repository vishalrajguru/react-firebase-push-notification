import { useState } from 'react'
import './App.css'
import './firebase'
import Notification from './notification'
import Signup from './components/signup'


function App() {

  return (
    <>
      <div >
        <Signup />
        <Notification />
      </div>

    </>
  )
}

export default App
