import { useLoaderData, Outlet, NavLink } from "react-router";
import LoadingCircleSmall from "./../../components/LoadingCircleSmall";

export function Todos() {
  const todos_info = useLoaderData();

  return (
    <div className="flex">
      <aside className="w-1/4 p-4">
        <h2 className="text-3xl">Todos</h2>
        <LoadingCircleSmall />
        {todos_info.length === 0 ? (
          <div>No Todos Found</div>
        ) : (
          <div className="space-y-2 divide-y-2 divide-white border-r-2">
            {todos_info.map((todo) => (
              <div key={todo.id} className="">
                <NavLink
                  to={`/todos/${todo.id}`}
                  className={({ isActive, isPending }) =>
                    `${
                      isActive
                        ? "text-cyan-500 font-bold"
                        : "hover:font-semibold"
                    }
                    ${isPending ? "" : ""}`
                  }
                >
                  <h4 className="text-lg">{todo.title}</h4>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </aside>
      <main className="w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
}
