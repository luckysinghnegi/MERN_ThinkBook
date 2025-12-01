import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import api from "../LIbe/Axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/")
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("You coressed the limit, Try after some time", {
          duration: 4000,
          icon: "@"
        })
      } else {
        toast.error("Failed to create note!");
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Back Button */}
        <Link
          to={"/"}
          className="btn btn-ghost mb-6 flex items-center gap-2 w-fit hover:bg-base-300 transition"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        {/* Card */}
        <div className="card bg-base-100 shadow-lg border border-base-300 rounded-xl">
          <div className="card-body p-6 space-y-6">

            <h2 className="text-2xl font-semibold text-center">Create New Note</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring focus:ring-primary/20"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40 rounded-lg resize-none focus:outline-none focus:ring focus:ring-primary/20"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn btn-primary px-8 rounded-lg shadow-md hover:shadow-lg transition"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CreatePage;