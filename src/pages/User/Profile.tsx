import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../fetchingFunc/fetches";
import { useAppContext } from "../../context/contextAPI";
const Profile = () => {
  const { setIsAuthFunction } = useAppContext();
  const { data,isLoading,isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 10,
  });
  if (isLoading) {
    return <div className="flex place-content-center text-3xl">Loading...</div>;
  }
  if(isError){
    setIsAuthFunction(()=>{
      localStorage.setItem("auth","false")
        return false
    })
  }
  return (
    <>
      <div className="mx-auto sm:w-[80%] px-1 bg-white h-[35vh] sm:text-3xl text-xl rounded-xl py-6 flex flex-col justify-center items-center gap-6 ">
        <h1 className="text-3xl underline underline-offset-4 text-sky-600">User Profile</h1>
        <p className="sm:text-4xl text-2xl">Name: {data?.name}</p>
        <p>Email: {data?.email}</p>
      </div>
    </>
  );
};
export default Profile;