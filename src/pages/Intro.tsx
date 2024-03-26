import { Link } from "@tanstack/react-router";
import MyLogo from "../assets/MyLogo.svg";
const Intro = () => {
  const classP="text-gray-200 first-letter:text-3xl first-letter:sm:text-4xl first-letter:md:text-5xl first-letter:lg:text-7xl first-letter:xl:text-8xl  first-letter:underline first-letter:underline-offset-4"
  return (
    <>
      <div className="flex flex-col bg-gradient-to-t from-[#3578ff] to-[#00aaff] backdrop-blur-sm justify-center items-center h-screen w-full">
        <img src={MyLogo} alt="My Logo" />
      <h1 className="text-2xl my-8 sm:text-4xl md:text-5xl underline underline-offset-8  lg:text-6xl xl:text-7xl text-[#91ffc2e8]">Creator: Mohammed Rafi T S</h1>
        <div className="my-8 gap-10 flex lg:text-5xl sm:text-xl md:text-4xl">
          <p className={`${classP} italic first-letter:text-[rgb(86,255,86)]`}>Create </p>
          <p className={`${classP} italic first-letter:text-[rgb(232,255,86)]`}>Read </p>
          <p className={`${classP} italic first-letter:text-[rgb(86,187,255)]`}>Update </p>
          <p className={`${classP} italic first-letter:text-[rgb(227,86,255)]`}>Delete</p>
        </div>
        <Link className="py-2 my-7 px-8 rounded-3xl sm:text-xl md:text-2xl lg:text-3xl outline-none bg-gradient-to-l from-[rgb(130,255,159)] to-[rgb(116,255,234)]" to="/login">
          Click Me
        </Link>
        <p className="font-style text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl">Save Contacts</p>
      </div>
    </>
  );
};

export default Intro;
