import axios from "axios";
export const fetchUserProfile = async()=>{
  const auth = localStorage.getItem("auth")==="true";
  if(!auth){
    return null
  }
  const {data} = await axios(`/user/me`,{withCredentials:true})
  return data.user
}

export const fetchContacts = async()=>{
  const {data} = await axios(`/contact/all`,{withCredentials:true})
  return data.user
}