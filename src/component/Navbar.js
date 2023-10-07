import userImg from "../assets/images/user.png";
import {
  BsSearch,
  BsHeartFill,
  BsFillGearFill,
  BsBellFill,
} from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="navbar rounded-full shadow-lg flex justify-between items-center xl:px-12 md:px-9 sm:px-5 px-3 py-2">
      <div className="flex lg:flex-row gap-x-1 items-center">
        <img className="sm:w-16 w-12" src={userImg} alt="user.png" />
        <div className="users-details">
          <h1 className="sm:text-xl text-sm font-extrabold text-white">
            Yusadolat
          </h1>
          <p className="sm:text-lg text-xs font-bold text-[#14DD94]">Premium</p>
        </div>
      </div>
      <div className="md:flex hidden items-center rounded-full bg-[#BFBFBF] py-3 px-4 w-[40%]">
        <input
          type="text"
          placeholder="Search"
          className="outline-none focus:outline-none flex-1 bg-transparent text-black font-normal"
        />
        <button className="flex items-center justify-center text-black text-2xl font-black">
          <BsSearch />
        </button>
      </div>
      <div className="flex justify-between gap-x-4 icons">
        <BsHeartFill className="sm:bg-[#BFBFBF] text-[#14DD94] rounded-full sm:p-3 sm:text-[3rem] text-[1.3rem] cursor-pointer" />
        <BsFillGearFill className="sm:bg-[#BFBFBF] rounded-full sm:p-3 sm:text-[3rem] text-[1.3rem] cursor-pointer" />
        <BsBellFill className="sm:bg-[#BFBFBF] rounded-full sm:p-3 sm:text-[3rem] text-[1.3rem] cursor-pointer" />
      </div>
    </div>
  );
}
