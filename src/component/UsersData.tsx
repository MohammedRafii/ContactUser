import { Link } from "@tanstack/react-router";
import { FaStreetView } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
type DataContacts = {
  _id:string;
  name: string;
  email: string;
  phone: number;
}
const UsersData = ({ allData}: { allData: DataContacts}) => {
  const { _id, name } = allData;
  const BgArr =["#FFE5B4","#87CEEB","#FFE4E1","#66FF66" ,"#D2B48C" ,"#FFFFFF"]  
const  logoBgArr=["#4B0082","#8B4513","#006400","#800000","#2E8B57","#E6E6FA"]
const getRandomElement=(arr:string[])=>{
  const randomIndex = Math.floor(Math.random()*arr.length)
  return arr[randomIndex]
}
  return (
    <figure className={`shadow-lg backdrop-blur-xl text-black p-3 rounded-md w-[300px] mt-3 mb-2 sm:h-[300px] h-[280px] flex flex-col justify-around  justify-self-center`}
    style={
      { backgroundColor: getRandomElement(BgArr) }}
    >
              <figcaption
               className="flex border-b border-black  justify-between px-3  items-center"
              >
                <h3 className="text-2xl italic uppercase w-[80%]">
                  {name.slice(0, 10)}
                  {name.length > 10 ? "..." : ""}
                </h3>
                <Link className="cursor-pointer" to={"/contacts/$id/view"} params={{ id: _id }}>
                  <FaStreetView size={23} />
                </Link>
              </figcaption>
               <div className='mx-auto rounded-full px-8 py-6 text-4xl flex justify-center items-center '
               style={
                 {  backgroundColor: getRandomElement(logoBgArr),color:getRandomElement(BgArr) }}
               >

                {name.charAt(0).toUpperCase()}
              </div>
              <figcaption className="border-t w-[80%] mx-auto border-black gap-6 pt-1 px-3 flex justify-between ">
                  <Link className="cursor-pointer" to={"/contacts/$id/update"} params={{ id: _id }}>
                    <LiaEdit size={23} />
                  </Link>
                  <Link className="cursor-pointer" to={"/contacts/$id/delete"} params={{ id: _id }}>
                    <IoTrashOutline size={23} />
                  </Link>
              </figcaption>
            </figure>
  )
}

export default UsersData