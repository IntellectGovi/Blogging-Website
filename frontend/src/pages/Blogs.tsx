import { Appbar } from "../components/Appbar";
import { BlogsCard } from "../components/BlogsCard";
import { BlogSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading , blogs} = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
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
  return (
    <div>
        <Appbar/>
      <div className="flex flex-col items-center justify-center w-max-xl">
        {blogs.length > 0 ? (
                blogs.map(blog => (
                    <BlogsCard
                        id={blog.id} // Ensure to provide a unique key for each blog card
                        authorName={blog.author.name}
                        publishedDate={"10 October 2024"} // Format date as needed
                        title={blog.title}
                        content={blog.content}
                    />
                ))
            ) : (
                <p>No blogs available.</p> // Fallback UI when there are no blogs
            )}
        
      </div>
    </div>
  );
};
