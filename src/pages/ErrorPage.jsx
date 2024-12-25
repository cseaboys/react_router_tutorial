import { useNavigate, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="grid place-items-center">
      <h3 className=" text-3xl">
        {error.status} | {error.statusText}
      </h3>
      <h4 className="text-xl">{error.data}</h4>
      <div className="mt-10 flex gap-5">
        <button
          className="border-2 text-white  bg-slate-600  rounded-lg text-sm px-5 py-2.5 mb-2"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <button
          className="border-2 text-white  bg-slate-900  rounded-lg text-sm px-5 py-2.5 mb-2"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
export default ErrorPage;
