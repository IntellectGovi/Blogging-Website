import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({id} : {id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
  
    useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
              Authorization:localStorage.getItem("token")
          },
        })
        .then((response) => {
        //   console.log(response.data.post)
          setBlog(response.data.post), setLoading(false);
        });
    }, []);
  
    return { loading, blog };
  };

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
            Authorization:localStorage.getItem("token")
        },
      })
      .then((response) => {
        // console.log(response.data.posts)
        setBlogs(response.data.posts), setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
