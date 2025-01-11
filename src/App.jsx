
import Body from "./components/Body"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Feed from "./components/Feed"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from "./components/Signup"
import { NextUIProvider } from "@nextui-org/react"
function App() {
  

  return (
    <>
    <NextUIProvider>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Body/>} >
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/feed" element={<Feed/>} />
        {/* <Route path="/logout" element={<Feed/>} /> */}


     </Route>
     </Routes>
     </BrowserRouter>
     </NextUIProvider>
    </>
  )
}

export default App
