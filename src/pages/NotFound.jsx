import { useParams } from "react-router";

function NotFound() {
  const params = useParams();
  return (
    <div className="grid place-items-center">
      <h3 className=" text-3xl">Error: Not Found</h3>
      <h4 className="text-2xl">No content found for: {params["*"]}</h4>
    </div>
  );
}
export default NotFound;
