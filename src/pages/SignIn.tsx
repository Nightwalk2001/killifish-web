import LoginAnimation from "@/assets/login.json"
import {useModal} from "@/hooks"
import {persist, poster} from "@/libs"
import {ModalEnum, profileAtom} from "@/stores"
import {Illustration, Input, Modal} from "@/widgets"
import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useSetRecoilState} from "recoil"

const inputStyle = "pl-4 pr-3 py-1.5 rounded-md bg-gray-100 ring-inset duration-100 " +
  "focus:outline-none focus:border-0 focus:ring-1.5 focus:ring-indigo-300 " +
  "focus:bg-white focus:text-gray-700 focus:placeholder-gray-500 focus:caret-gray-600"

export const SignIn = () => {
  const navigate = useNavigate()
  const setProfile = useSetRecoilState(profileAtom)
  const {setModalStore} = useModal()

  const [name, setName] = useState<string>(""),
    [password, setPassword] = useState<string>("")

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

  const handleSignIn = async () => {
      const res = await poster("/signin", {name, password})

      await persist("profile", res)
      setProfile(res!)

      navigate("/")
    },
    handleForget = () => {

    },
    handleSignUp = () => {
      setModalStore({type: ModalEnum.SignUp})
    }

  return <div className={"flex-center justify-center space-x-10 mt-10"}>
    <Illustration animation={LoginAnimation} className={"w-96 h-96"}/>
    <div className={"flex-col-center space-y-3"}>
      <Input
        value={name}
        placeholder={"输入用户名"}
        onChange={handleName}
      />
      <Input value={password} placeholder={"输入密码"} onChange={handlePassword} password/>
      <button
        className={"w-full py-1.25 rounded-md tracking-widest text-white bg-cyan-400 " +
          "transition-transform transition-color hover:bg-cyan-300 active:scale-95"}
        onClick={handleSignIn}
      >
        确认登录
      </button>
      <div className={"flex justify-between w-full"}>
        <button
          className={"self-start text-sm text-gray-500 transition-transform active:scale-95"}
          onClick={handleForget}
        >
          忘记密码?
        </button>
        <button
          className={"self-start text-sm text-gray-500 transition-transform active:scale-95"}
          onClick={handleSignUp}
        >
          注册新账号
        </button>
      </div>
    </div>

    <Modal name={ModalEnum.SignUp} title={"注册新用户"} className={"text-center w-80"}>
      <div className={"flex flex-col items-center space-y-2.5 w-fit"}>
        <input
          type="text"
          placeholder={"输入用户名"}
          className={inputStyle}
        />
        <input
          type="email"
          placeholder={"输入邮箱"}
          className={inputStyle}
        />
        <input
          type="password"
          placeholder={"输入密码"}
          className={inputStyle}
        />
        <button
          className={"w-full py-1.25 rounded-md tracking-widest text-white bg-cyan-400 " +
            "transition-transform transition-color hover:bg-cyan-300 active:scale-95"}
        >
          确认注册
        </button>
      </div>
    </Modal>
  </div>
}
