import { Link } from "react-router-dom";

interface BlogsCardInputs {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id:number;
}

export const BlogsCard = ({
  id,
  authorName,
  publishedDate,
  title,
  content,
}: BlogsCardInputs) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-12 border-b-2 border-slate-200 w-[1000px]">
        <div className="flex justify-center items-center w-fit">
          <div>
            <Avatar name={"Anonymus"} />
          </div>
          <div className="ml-2 text-slate-700">{authorName}</div>
          <span className="flex w-1 h-1 me-3 bg-gray-900 rounded-full dark:bg-gray-700 ml-2"></span>
          <div className="text-slate-500">{publishedDate}</div>
        </div>

        <div className="font-extrabold mt-4 text-2xl">{title}</div>
        <div className="text-slate-600 text-lg mt-3">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="text-slate-500 text-sm mt-3">{`${Math.ceil(
          content.length / 1000
        )} Minute(s)`}</div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="w-6 h-6  bg-gray-100 rounded-full dark:bg-gray-600">
      <div className="ml-1">{name[0]}</div>
    </div>
  );
}
