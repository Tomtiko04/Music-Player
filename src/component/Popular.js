import Artist1 from "../assets/images/Artist1.png";
import Cover1 from "../assets/images/cover-1.png";
import Cover2 from "../assets/images/cover-2.png";
// import Cover3 from "../assets/images/cover-3.png";

const popularDetails = [
  { id: 1, cover: Cover1, tittle: "Haneef", time: "5.18" },
  { id: 2, cover: Cover1, tittle: "Sulaiman", time: "6.09" },
  { id: 3, cover: Cover2, tittle: "Shuraim", time: "5.15" },
  { id: 4, cover: Cover2, tittle: "Gwani Sadiq", time: "5.04" },
  { id: 5, cover: Cover1, tittle: "Swani Dahir", time: "5.22" },
];
export default function Popular() {
  return (
    <>
      <div className="popular h-full lg:pb-3 pb-8 lg:col-span-1 col-span-2 lg:rounded-[40px] md:rounded-[100px] rounded-[50px]">
        {/* 60 */}
        <img src={Artist1} className="w-full" alt="Artist cover.png" />
        <h1 className="text-xl font-bold text-white leading-9 my-3 lg:w-[90%] md:w-[92%] w-[87%] mx-auto">
          Popular
        </h1>
        {popularDetails.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-row justify-between items-center mb-1 cursor-pointer hover:bg-red-900 lg:px-3 md:px-7 sm:px-10 px-5 py-1"
            >
              <div className="flex flex-row gap-x-1 items-center text-center">
                <div className="w-[60px] h-[60px]">
                  <img
                    className="max-w-full"
                    src={data.cover}
                    alt="cover.png"
                  />
                </div>
                <p className="text-white font-medium text-base leading-8">
                  {data.tittle}
                </p>
              </div>
              <span className="text-white font-medium text-sm leading-8 text-center">
                {data.time}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
