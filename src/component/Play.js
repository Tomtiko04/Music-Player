import rplay1 from "../assets/images/rplay-1.png";
import rplay2 from "../assets/images/rplay-2.png";
//import playImg from "../assets/images/play.png";
import Audio from "./Audio";
const recentlyPlay = [
  { id: 1, img: rplay1, artist: "Dr Sharaff", title: "Ablution", time: "6.06" },
  {
    id: 2,
    img: rplay1,
    artist: "Prof Alaro",
    title: "Kitabu Solalh",
    time: "5.54",
  },
  {
    id: 3,
    img: rplay2,
    artist: "Ustaadh Amubieya",
    title: "Kukut Shiata",
    time: "5.39",
  },
];

export default function Play() {
  return (
    <>
      <div className="col-span-2">
        <div className="flex flex-col">
          <Audio />
          <div>
            <div className="flex flex-row justify-between items-center mb-4">
              <p className="text-xl text-white font-semibold font-sans leading-10">
                Recently Played
              </p>
              <button className="border border-[#14DD94] text-[#14DD94] text-center font-medium leading-6 px-4 py-1 rounded-lg">
                Listen more
              </button>
            </div>
            {recentlyPlay.map((data) => (
              <div
                key={data.id}
                className="flex flex-row justify-between items-center recently-play rounded-2xl px-3 py-2 mb-5 cursor-pointer"
              >
                <div className="flex flex-row items-center gap-x-5">
                  <div className="w-[70px] h-[70px]">
                    <img className="block max-w-full" src={data.img} alt="" />
                  </div>
                  <div className="flex sm:flex-row flex-col  gap-x-[90px] sm:items-center">
                    <h1 className="text-white text-lg font-semibold">
                      {data.artist}
                    </h1>
                    <p className="text-sm font-medium">{data.title}</p>
                  </div>
                </div>
                <span className="text-white font-medium text-sm leading-8 text-center">
                  {data.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
