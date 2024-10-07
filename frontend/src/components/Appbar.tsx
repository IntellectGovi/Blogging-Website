import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center p-4">
      <Link to={"/blogs"}><div className="font-extrabold">Medium</div></Link>
      <div className="flex items-center justify-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New Blog
          </button>
        </Link>
        <Avatar2 name="Govind" />
      </div>
    </div>
  );
};

function Avatar2({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full dark:bg-gray-600">
      <div className="text-lg">{name[0]}</div>
    </div>
  );
}
