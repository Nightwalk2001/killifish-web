import React from "react"
import ReactDOM from "react-dom/client"
import {RecoilRoot} from "recoil"
import App from "./App"
import "virtual:svg-icons-register"
import "./styles/index.css"

const root = document.getElementById("root") as HTMLDivElement

ReactDOM.createRoot(root).render(
    <RecoilRoot><App/></RecoilRoot>
)
