import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import MyLogo from "../../assets/MyLogo.svg";
import UsersData from "../../component/UsersData";
import { useAppContext } from "../../context/contextAPI";
import { fetchContacts } from "../fetchingFunc/fetches";
import Pagination from "../../component/Pagination";
type DataContacts = { _id: string; name: string; email: string; phone: number };
const Contacts = () => {
  const { isAuthFunction,setIsAuthFunction } = useAppContext();
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
    staleTime: 3 * 1000,
  });  
  const selectPageHandler = (selectedPage:number) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(data.length / 7) && selectedPage !== page) {
      setPage(selectedPage)
    }
  }
  if (isError) {
    setIsAuthFunction(()=>{
      localStorage.setItem("auth","false")
      return false
    })
    return <div>Something went wrong!{error.message}</div>;
  }

  if(!isAuthFunction)return <Navigate to="/login" />

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
      <main className={`max-w-[80%] min-h-[90vh] flex flex-col items-center gap-3 relative`}>
      <a
        href="https://mohammedrafi.vercel.app"
        target="_blank"
        title="My_Portfolio"
        className="fixed bottom-[12rem] sm:bottom-[14rem] right-2 z-10 sm:p-3 p-1 lg:right-16 sm:right-4 duration-300 bg-gradient-to-tl from-[#5f6967] to-[#3e1885] shadow-lg rounded-full text-white  font-bold text-4xl"
      >
        <img src={MyLogo} className="w-10 h-10" alt="github logo" />
      </a>
        <Link to={"/contacts/create"} className="fixed bottom-[8rem] sm:bottom-[9rem] right-2 z-10 sm:p-3 p-1 lg:right-16 sm:right-4 backdrop-blur-[10px] bg-gradient-to-r from-[rgba(13,231,49,0.71)] to-[rgba(89,241,84,0.75)] duration-300  shadow-lg rounded-full text-white  font-bold text-4xl">
          <IoMdPersonAdd />
          </Link>
          <Link
        to={"/"}
        className="fixed bottom-[4rem] sm:bottom-16 right-2 z-10 sm:p-3 p-1 lg:right-16 sm:right-4 backdrop-blur-[10px] bg-gradient-to-r from-[#9e659e46] to-[#177a1759] duration-300  shadow-lg rounded-full  font-bold text-4xl"
      >
        <IoArrowBack  />
      </Link>
      <div className="flex flex-wrap justify-center gap-6">

        {data.length > 0 ? (data.length>=1&&data.slice(page*7-7,page*7).map(({ _id, email, name, phone }: DataContacts) => (
            <UsersData key={_id} allData={{_id,email,name,phone}}/>
            ))
            ) : (
              <div className="text-2xl text-center">There is no contact, you can add it</div>
              )}
              </div>
        <div>

        {data.length>7 &&<Pagination page={page} data={data} selectPageHandler={selectPageHandler} />}
        </div>
        <Outlet />
      </main>
    </>
  );
};
export default Contacts;