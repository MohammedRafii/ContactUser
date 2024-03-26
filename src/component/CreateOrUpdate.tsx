import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useClickOutSide } from "../hooks/useClickOutside";
import useDebounce, { debounceColor } from "../hooks/useDebounce";
type Contact = {
  name?:string,
  email?:string,
  phone?:string
}
const CreateOrUpdate = ({isEditable=false}) => {
  const user=isEditable ? useLoaderData({from:"/staticGlobalPage/contacts/$id/update"}):""
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
  const [name, setName] = useState<string>(isEditable ? user.name : "");
  const [email, setEmail] = useState<string>(isEditable ? user.email : "");
  const [phone, setPhone] = useState<string>(isEditable ? user.phone : "");
    
  useClickOutSide(ref, () => navigate({ to: "/contacts" }));
  const nameLogo: string = useDebounce(name, 300);
  
  const bgColor = debounceColor(name,500)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const addContact = async (contact:Contact) => {
    try {
      const response = isEditable ? await axios.put(`/contact/${user._id}`, contact, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }):await axios.post(`/contact/add`, contact, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      setName("");
      setEmail("");
      setPhone("");
      navigate({to:"/contacts"})
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const queryClient =  useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addContact,
    onSuccess:() =>{
      queryClient.invalidateQueries({
        queryKey:["contacts"],exact:true
      })
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
      const name= String(formData.get("name"))!
        const email= String(formData.get("email")).toLowerCase()!
        const phone= String(formData.get("phone"))!
    await mutate({name,email,phone});
  };

  const inputClass = "bg-inherit pb-1 tracking-[1px] border-b px-4 outline-none w-full ml-2 border-black"

  return (
    <main className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 bg-gradient-to-tr from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.1)] backdrop-blur-[10px]">
      <section ref={ref} className="relative bg-gradient-to-tr from-[rgba(115,244,226,0.3)] to-[rgba(110,55,198,0.1)] backdrop-blur-sm rounded-xl p-2 w-[90%]">
        <div className="flex flex-col bg-[#c2c2f3] justify-around h-[60vh] rounded-xl">
          <h1 className="mx-auto px-1 pt-1">{isEditable ? 'Updating':'Creating'} User</h1>
          <div className="flex items-center justify-center mt-3 mx-auto px-6 py-3 text-5xl rounded-full"
            style={
              nameLogo.length > 0
                ? { backgroundColor: bgColor }
                : { backgroundColor: "transparent" }
            }
          >
            {nameLogo}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2 items-center justify-evenly " method="post" encType="multipart/form-data">
            <div className="flex px-3 py-2">
              <label htmlFor="name">Name: </label>
              <input
                className={inputClass}
                autoFocus
                type="text"
                name="name"
                value={name}
              autoComplete="name"
                required
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex px-3 py-2">
              <label htmlFor="email">Email: </label>
              <input
                className={inputClass}
                type="email"
                name="email"
                value={email}
              autoComplete="email"
                required
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex px-3 py-2">
              <label htmlFor="phone">Phone: </label>
              <input
                className={inputClass}
                type="number"
                name="phone"
                value={phone}
                required
                id="phone"
              autoComplete="mobile tel"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="text-right mt-3 pb-6 px-6">
              <button
                onClick={() => navigate({ to: "/contacts" })}
                className="rounded-lg bg-black mx-2 font-semibold text-white px-6 py-2"
              >
                Cancel
              </button>
              <button type="submit" className={`rounded-lg mx-2 font-semibold text-white px-6 py-2 ${isEditable ? 'bg-[rgb(1,117,1)]':' bg-[rgb(1,78,117)]'}`}>
              {isEditable ? 'Update':'Create'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
export default CreateOrUpdate;