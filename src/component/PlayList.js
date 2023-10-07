import Popular from "./Popular";
import Play from "./Play";

export default function PlayList() {
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-10 mt-8">
        <Play />
        <Popular />
      </div>
    </>
  );
}
