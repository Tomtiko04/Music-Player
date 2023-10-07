import Navbar from "./Navbar";
import PlayList from "./PlayList";

export default function Home() {
  return (
    <>
      <div className="home w-[90%] mx-auto my-9 bg-[#27323E] border-0 rounded-[40px] lg:px-8 px-4 py-4">
        <Navbar />
        <PlayList />
      </div>
    </>
  );
}
