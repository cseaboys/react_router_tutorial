import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import { createBrowserRouter } from "react-router";
import { Todos } from "./pages/Todos/Todos";
import { TODO_API } from "./API_STORE";
import { TodosErrorBoundary } from "./pages/Todos/TodosErrorBoundary";
import TodoDetail from "./pages/Todos/TodoDetail.jsx";
import LoadingCupGif from "./components/LoadingCup";

export const router = createBrowserRouter([
  // These routes are also used in Navbar.jsx for routing
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movie />,
      },
      {
        path: "/todos",
        loader: async () => {
          const response = await fetch(`${TODO_API}/todos_info`);
          const todo_info = await response.json();
          return todo_info;
        },
        element: <Todos />,
        HydrateFallback: LoadingCupGif,
        errorElement: <TodosErrorBoundary />,
        children: [
          {
            path: ":id",
            loader: async ({ params }) => {
              const response = await fetch(`${TODO_API}/todo?id=${params.id}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch todo with id ${params.id}`);
              }
              const todo = await response.json();
              return todo;
            },
            element: <TodoDetail />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);
