import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../LIbe/ulits'
import api from '../LIbe/Axios'
import toast from 'react-hot-toast'


function NoteCard({ note, setnotes }) {

    const deleteNoteHandler = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure to delete this note!")) return;
        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note Deleted Successfully!")
            setnotes((prev) => prev.filter((note) => note._id !== id));
        } catch (err) {
            console.error('Failed to delete note', err)
            alert('Unable to delete note. Check console for details.')
        }
    }
    return (
        <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-transform duration-200 transform hover:-translate-y-1">

            <Link to={`/note/${note._id}`} className="block p-4 hover:bg-gray-50">
                <div className="card-body p-0">
                    <h3 className="card-title text-base-content text-lg font-semibold mb-1">{note.title}</h3>
                    <p className="text-base-content/70 line-clamp-3 text-sm">{note.content}</p>
                </div>
            </Link>

            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
                <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600" aria-label="Edit note">
                        <PenSquareIcon size={18} />
                    </button>
                    <button
                        className="flex items-center justify-center p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        onClick={(e) => deleteNoteHandler(e, note._id)}
                        aria-label="Delete note"
                    >
                        <Trash2Icon size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteCard