import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Addblog() {
  const { formData, setFormData, setIsEdit, isEdit } =
    useContext(GlobalContext);
  const nevigate = useNavigate();
  const location = useLocation();
  // console.log(formData);
  async function handleSaveBLoge() {
    const res = isEdit
      ? await axios.put(
          `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:5000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });
    const result = await res.data;
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      nevigate("/");
    }
    // console.log(result);
  }
  useEffect(() => {
    // console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);
  return (
    <div className="flex  items-center justify-center mt-8   ">
      <div
        className="flex  border-2 border-blue-600  w-[600px]
   flex-col  rounded-2xl  "
      >
        <h1 className="text-xl font-bold  text-blue-600 text-center uppercase">
          {isEdit ? "edit a blog" : "Add a new Blog."}{" "}
        </h1>
        <div className="flex flex-col ml-4  gap-3  ">
          <p className="text-blue-600 font-semibold ">Title :</p>
          <input
            className="outline-none border-2 border-black px-2 rounded-lg mr-2"
            type="text"
            name="title"
            id="title"
            placeholder="enter Blog Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <p className="text-blue-600 font-semibold ">Description:</p>
          <textarea
            className="outline-none border-2  mr-2 border-black px-2 rounded-lg"
            name="description"
            id="description"
            placeholder="enter Blog  Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <button
            onClick={() => handleSaveBLoge()}
            className="bg-blue-500 w-36 ml-52 mb-2 text-white rounded-xl "
          >
            {isEdit ? "Edit Blog" : " Add New Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addblog;
