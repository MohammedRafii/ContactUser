import { Link, useNavigate, useParams } from "@tanstack/react-router";
import axios from "axios";
import { useRef } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Delete = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams({ from: "/staticGlobalPage/contacts/$id/delete" });
  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete(`/contact/${id}`);
      toast.success(data.message);
      navigate({ to: "/contacts" });
    } catch (e: Error | any) {
      toast.error(e.response.data.message);
    }
  };

  const queryClient =  useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteHandler,
    onSuccess:(data, variables, context) =>{
      queryClient.invalidateQueries({
        queryKey:["contacts"],exact:true
      })
      // queryClient.setQueryData(["contacts"],(old:Contact) => [data,...old])
    }
  })

  useClickOutSide(ref, () => navigate({ to: "/contacts" }));
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[12px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 w-[80%] backdrop-blur-xl bg-gradient-to-tl from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            mutate()
          }}
          method="POST"
          className="flex flex-col bg-blue-100 p-3 rounded-md gap-6"
        >
          <p className="sm:text-2xl text-xl mx-auto">Are You Sure ?</p>
          <div className="flex justify-evenly sm:w-[70%] w-full mx-auto mt-3 sm:text-xl ">
            <Link
              to="/contacts"
              className="px-4 py-2 border active:bg-black/20 active:text-white border-black"
              autoFocus
            >
              Cancel
            </Link>
            <button
              className="px-4 py-2 border border-red-500 active:bg-red-400 active:text-white text-red-600"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Delete;