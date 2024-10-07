import { Avatar } from "../components/BlogsCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { BlogSkeleton } from "../components/Skeleton"
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) {
    return <div>
        <Appbar/>
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
}
  //@ts-ignore
  const capitalizeFirstLetterOfEachWord = (str) => {
    return (
      str
        .split(" ") // Split the string into words
        //@ts-ignore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(" ")
    ); // Join the words back into a single string
  };

  const capitalisedTitle = capitalizeFirstLetterOfEachWord(blog?.title);

  return (
    <div>
      <Appbar/>
    <div className="flex items-center justify-between p-[5rem] ">
      <div className="w-[1020px]">
        <div className="font-extrabold text-5xl w-[700px]">
          {capitalisedTitle}
        </div>
        <div className="font-semibold text-slate-500 mt-5">{`Posted on 10 October 2024`}</div>
        <div className="mt-8 w-[780px]">{blog?.content}</div>
      </div>
      <div className="">
        <h1 className="font-normal  text-lg">Author</h1>
        <div className="flex items-center justify-center mt-4">
          <div>
            <Avatar name="Anonymous" />
          </div>
          <div className="ml-4">
            <div className=" text-2xl font-bold">
              {blog?.author.name || "Govind"}
            </div>
            <h3 className="mt-2 text-base font-medium text-slate-600 w-[300px] ">
              Master of myth and the funiest person in the kingdom
            </h3>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
