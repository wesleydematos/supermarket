import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header className="flex flex-row justify-around items-center bg-header text-white h-[40px] lg:h-[75px] w-full">
      <div>
        <p className="text-tertiary font-semibold">SuperMarket</p>
      </div>
      <div className="flex flex-row gap-3">
        <Link to={"/"}>Products</Link>
        <Link to={"/packs"}>Packs</Link>
      </div>
    </header>
  );
};
