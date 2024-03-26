import { Link, Navigate, Outlet } from "@tanstack/react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/contextAPI";
const Header = () => {
  const { setIsAuthFunction,isAuthFunction } = useAppContext();
  const handleLogout = async()=>{
    try{
      await axios.get(`/user/logout`,{withCredentials:true})
      toast.success("Logged Out")
      setIsAuthFunction(() => {
        localStorage.setItem("auth", "false");
        return false;
      });
    }catch(e:Error | any){
      setIsAuthFunction(() => {
        localStorage.setItem("auth", "false");
        return false;
      });
      toast.error("something went wrong!")
    }
  }
  if(!isAuthFunction)return <Navigate to="/login" />
  const linksClass = " font-extrabold text-[rgb(19,115,153)] underline-offset-8 underline decoration-2 duration-200"
    return (
      <>
        <nav className="sticky z-20 top-0 w-full flex flex-col sm:flex-row justify-between items-center px-16 bg-gradient-to-r from-[#f6a2f6] to-[#b0f7f4] shadow-xl">
          <h1 className="lg:text-5xl md:text-3xl text-2xl text-center font-bold italic text-sky-800 ">Contact App</h1>
          <ul className="flex sm:mx-0 mx-auto py-2 sm:gap-16 gap-8">
            <li>
              <Link
                to="/contacts"
                activeProps={() => ({
                  className:linksClass ,
                })}
                className= "lg:text-3xl text-xl font-medium"
                >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                activeProps={() => ({
                  className: linksClass,
                })}
                className= "lg:text-3xl text-xl font-medium"
              >
                Profile
              </Link>
            </li>
            <li>
              <button className= "text-rose-700 lg:text-3xl text-xl font-medium" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className="min-h-[90vh] flex justify-center pt-11 bg-gradient-to-r from-[#ffacff7d] to-[#8aceff9c] ">
          <Outlet />
        </div>
      </>
    );
  };
export default Header;