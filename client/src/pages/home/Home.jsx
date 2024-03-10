import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const { blogList, setBlogList, pending, setPending, t } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  async function fetchblogList() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;
    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }
  async function handelDelete(getcurrentId) {
    // console.log(getcurrentId);
    const responce = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getcurrentId}`
    );
    const result = await responce.data;
    if (result?.message) {
      fetchblogList();
    }
  }
  const handelEdit = (getCurrentBlogItem) => {
    navigate("/addblog", { state: { getCurrentBlogItem } });
  };

  useEffect(() => {
    fetchblogList();
  }, []);
  return (
    <div className=" p-9     ">
      {pending ? (
        <h1 className=" font-bold text-3xl">Loading Blogs ! Please wait</h1>
      ) : (
        <div className="grid     gap-2  md:grid-cols-2 relative sm:grid-cols-1 lg:grid-cols-3       ">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div
                key={blogItem._id}
                className=" flex flex-col justify-between   border-solid border-2 border-sky-500 p-4 rounded-xl  shadow-lg shadow-blue-500/50 "
              >
                <div className="relative">
                  <p className="text-lg uppercase font-semibold mb-1 border-b-2 border-blue-300">
                    {blogItem.title}
                  </p>
                  <p className="  ">{blogItem.description}</p>
                </div>
                <div className="flex gap-5  mt-5  justify-end  ">
                  {" "}
                  <FaEdit
                    className="cursor-pointer hover:scale-150 duration-100"
                    onClick={() => handelEdit(blogItem)}
                    size={25}
                  />
                  <FaTrash
                    className="cursor-pointer hover:scale-150 duration-100"
                    onClick={() => handelDelete(blogItem._id)}
                    size={25}
                  />
                </div>
              </div>
            ))
          ) : (
            <h1 className=" font-bold text-3xl">NO Blog Added</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
