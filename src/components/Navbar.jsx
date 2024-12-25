import { NavLink } from "react-router";
import { router } from "../routes";
import { useMemo } from "react";

function Navbar() {
  // Only gets the first level of routes
  const routes = useMemo(() => router.routes[0].children, []);

  return (
    <nav className="flex justify-around items-center border-b border-black">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `p-4 flex items-center justify-center h-full
           ${isActive ? "text-cyan-500 font-bold" : "hover:font-semibold"}`
          }
        >
          {route.path === "/" ? "Home" : route.path.slice(1).toUpperCase()}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
