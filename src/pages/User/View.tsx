import { Link, useLoaderData, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { LiaEdit } from "react-icons/lia";
import { useClickOutSide } from "../../hooks/useClickOutside";
const View = () => {
  const user = useLoaderData({ from: "/staticGlobalPage/contacts/$id/view" });
  const { _id, name, email, phone } = user;
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  useClickOutSide(ref, () => navigate({ to: "/contacts" }));
  return (
    <div className="fixed z-20 flex justify-center items-center w-full h-screen top-0 left-0 backdrop-blur-[10px]">
      <div
        ref={ref}
        className="relative rounded-xl p-4 sm:w-[50%] w-[90%] backdrop-blur-xl bg-gradient-to-tr from-[rgba(43,45,45,0.5)] to-[rgba(58,246,227,0.5)] max-w-xl"
      >
        <figure className="bg-blue-100 text-black p-3 rounded-md  flex flex-col justify-around">
          <figcaption className="flex  pb-2 justify-between px-3 items-center">
            <div className="flex items-center">
              <label className="sm:text-2xl underline underline-offset-[8px]">
                Name{" "}
              </label>{" "}
              <span className="text-3xl ml-1">:</span>
              <h2 className="sm:text-2xl text-sm italic mt-2 ml-3 uppercase w-[80%]">
                {name}
              </h2>
            </div>
            <Link to={"/contacts/$id/update"} params={{ id: _id }}>
              <LiaEdit size={30} />
            </Link>
          </figcaption>
          <div className="flex justify-center px-8 py-6 text-4xl mx-auto rounded-full bg-green-400  items-center ">
            {name.charAt(0).toUpperCase()}
          </div>
          <figcaption className="pt-3 pb-4 w-full px-3 flex flex-col justify-between ">
            <div className="sm:text-xl text-sm w-[80%]">
              <div className="flex gap-2">
                <label className="underline underline-offset-[2px] sm:underline-offset-[8px]">
                  Email{" "}
                </label>{" "}
                <span className="ml-2">:</span>
                <p className="font-medium text-sm sm:text-lg">{email}</p>
              </div>
              <div className="flex gap-2">
                <label className="underline underline-offset-[2px] sm:underline-offset-[8px]">
                  Phone{" "}
                </label>{" "}
                <span>:</span>
                <p className="text-gray-700 text-sm sm:text-lg">{phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-evenly sm:pt-6 pt-3 mx-auto">
              <button
                className="border px-4 py-2 border-black active:bg-black/20"
                onClick={() => navigate({ to: "/contacts" })}
              >
                Close
              </button>
              <Link
                to={"/contacts/$id/delete"}
                params={{ id: _id }}
                className="bg-red-500 sm:w-[50%] active:bg-red-600 px-4 py-2 ml-2 border border-red-500 text-white"
              >
                Delete
              </Link>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
export default View;