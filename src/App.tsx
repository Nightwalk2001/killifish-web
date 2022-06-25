import {getValue} from "@/libs"
import {Homepage, NotFound, Recordings, Routine, SignIn, Tanks, Todos, Workspace} from "@/pages"
import {profileAtom} from "@/stores"
import {TopBar} from "@/widgets"
import React, {useEffect} from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import {useRecoilState} from "recoil"

const App = () => {
  const [profile, setProfile] = useRecoilState(profileAtom)

  useEffect(() => {
    (async () => {
      const prev = await getValue<Profile>("profile")

      if (prev && prev != profile) setProfile(prev)
    })()
  }, [])

  const index = profile ? <Homepage/> : <SignIn/>

  return <Router>
    <TopBar/>

    <div className={"w-screen"}>
      <Routes>
        <Route path={"/"} element={index}/>
        <Route path={"/workspace"} element={<Workspace/>}/>
        <Route path={"/routine"} element={<Routine/>}/>
        <Route path={"/todos"} element={<Todos/>}/>
        <Route path={"/tanks/:name"} element={<Tanks/>}/>
        <Route path={"/recordings/:id"} element={<Recordings/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    </div>

    <ToastContainer autoClose={900} draggable position={"top-right"}/>
  </Router>
}

export default App
