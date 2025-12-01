import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast'
import axios from "../LIbe/Axios"
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from 'lucide-react';

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // FIXED ROUTE
        const res = await axios.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Unable to fetch note details");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      // FIXED DELETE ROUTE
      if (!window.confirm("Are you sure to Delete this note?s")) return;
        await axios.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveNote = async (e) => {
    setSaving(true);
    try {
      await axios.put(`/notes/${id}`,note);
      toast.success("Note updated successfully");
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return <div className="text-center py-10">Note not found</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="w-full max-w-xl bg-base-100 p-6 rounded-xl shadow">

        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>

          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5" />
          </button>
        </div>

        {/* Title Input */}
        <div className="min-h-screen flex justify-center items-center bg-gray-100 max-h-[50px]">
          <div className="w-full max-w-md bg-white shadow-lg border border-gray-200 rounded-xl p-6">

            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>

              <input
                type="text"
                value={note.title}
                placeholder="Note title"
                className="input input-bordered w-full"
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            {/* Content */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>

              <textarea
                value={note.content}
                placeholder="Write your note here..."
                className="textarea textarea-bordered w-full h-40"
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              ></textarea>
            </div>

            {/* save note */}
            <div className="card-action justify-end">
              <button onClick={handleSaveNote} className='btn btn-primary bg-gray-600'>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default NoteDetailPage;
