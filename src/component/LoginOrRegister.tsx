import { FormEvent, useState } from "react";
import { useAppContext } from "../context/contextAPI";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "@tanstack/react-router";

const LoginOrRegister = ({isRegister=false}) => {
  const {  setIsAuthFunction } = useAppContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showPassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let sendData = isRegister?{name,email, password}:{email, password}
      const response = await axios.post(`/user/${isRegister?'new':'login'}`, sendData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setIsAuthFunction(()=>{
        localStorage.setItem("auth","true")
        return true
      })
      setTimeout(() => {
        setIsAuthFunction(()=>{
          localStorage.setItem("auth","false")
          return false
        })
      }, 15*60*1000);
      setName("");
      setEmail("");
      setPassword("");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const inputClass = "sm:text-2xl text-lg pr-5 pl-2 py-2 w-full border-b-2 border-black  outline-none bg-transparent placeholder:text-[rgba(59,58,58,0.843)]"
  return (
    <div className="flex justify-center w-full items-center bg-gradient-to-br from-[rgb(246,193,246)] to-[#09726d] h-screen">
        <section className="sm:w-auto w-[80%] shadow-xl border-2 border-[#86fdf3] rounded-2xl sm:py-[3rem] sm:px-[5rem] py-3 px-[3rem] bg-[#a1f9f1]">
          <h1 className="text-center underline underline-offset-8 my-4 text-4xl pb-8">{isRegister?'Register':'Login'}</h1>
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            {isRegister && (<input
              className={inputClass}
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
            />)}
            <input
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus ={!isRegister&&true}
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
            />
            <div className="relative">
            <input
            className={inputClass}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              />
              <span className="absolute right-0 z-10 cursor-pointer top-3" onClick={showPassword}>
              {passwordVisible ? <IoMdEyeOff size={22} /> : <IoMdEye size={22} />}
              </span>
            </div>
            <button className="mt-2 py-1 px-2 rounded-md bg-transparent cursor-pointer border-2 border-black sm:text-[1.2rem] text-[1rem] duration-200 hover:bg-[#2ccbbe] hover:text-white hover:font-semibold hover:border-transparent hover:shadow-md" type="submit">
              {isRegister ?'Sign Up' :'Login'}
            </button>
            <div className="flex justify-center items-center gap-2">
              <hr className="w-[22%] h-[1px] bg-black border-none rounded-[3rem]"/>
              <span>OR</span>
              <hr className="w-[22%] h-[1px] bg-black border-none rounded-[3rem]" />
            </div>
            <Link className="py-1 px-8 bg-transparent rounded-[10rem] text-purple-800 border-x-2  border-black border-y-transparent border-y-2 text-[1rem] mx-auto flex justify-center duration-200 hover:bg-[#67fff2] sm:mb-0 mb-4 hover:shadow-md hover:border-black hover:border-y-2" to={isRegister?"/login": "/register"}>
            {isRegister ?'Login' :'Sign Up'}
            </Link>
          </form>
        </section>
      </div>
  )
}

export default LoginOrRegister