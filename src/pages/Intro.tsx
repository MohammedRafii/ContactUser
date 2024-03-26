import { Link } from "@tanstack/react-router";
import MyLogo from "../assets/MyLogo.svg";
const Intro = () => {
  const classP="text-gray-200  first-letter:text-6xl  first-letter:underline first-letter:underline-offset-4"
  return (
    <>
      <div className="flex flex-col bg-gradient-to-t from-[#3578ff] to-[#00aaff] backdrop-blur-sm justify-center items-center h-screen w-full">
        <img src={MyLogo} alt="My Logo" />
        <div className="my-8 text-[2rem] gap-10 flex">
          <p className={`${classP}  first-letter:text-[rgb(86,255,86)]`}>C reate </p>
          <p className={`${classP} first-letter:text-[rgb(232,255,86)]`}>R ead </p>
          <p className={`${classP} first-letter:text-[rgb(86,187,255)]`}>U pdate </p>
          <p className={`${classP} first-letter:text-[rgb(227,86,255)]`}>D elete</p>
        </div>
        <Link className="py-2 my-7 px-8 rounded-3xl text-[1.3rem] outline-none bg-gradient-to-l from-[rgb(130,255,159)] to-[rgb(116,255,234)]" to="/login">
          Click Me
        </Link>
      </div>
    </>
  );
};

export default Intro;
