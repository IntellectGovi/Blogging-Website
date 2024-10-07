import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish =  () => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create a New Post
          </h2>
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the description"
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={async () => {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/blog`,
                    {
                      title,
                      content,
                    },
                    {
                      headers: {
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  navigate(`/blog/${response.data.id}`)
                }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
              >
                Publish Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
