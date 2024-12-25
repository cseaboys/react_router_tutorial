import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import LoadingCupGif from "../components/LoadingCup";

function RootLayout() {
  const navigaton = useNavigation();
  const isLoading = navigaton.state === "loading";
  return (
    <div className="text-white bg-slate-600 h-screen w-screen grid grid-rows-[auto_1fr]">
      <Navbar />
      {isLoading && <LoadingCupGif />}
      <main className="p-2 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
