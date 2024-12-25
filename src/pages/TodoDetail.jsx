import { useLoaderData } from "react-router";

function TodoDetail() {
  const todo = useLoaderData();
  return (
    <div>
      <h1 className="text-3xl">{todo.title}</h1>
      <div>{todo.description} </div>
</div>
  );
}
export default TodoDetail;
