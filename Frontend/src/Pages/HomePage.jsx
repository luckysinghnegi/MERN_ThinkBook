import React, { useEffect, useState } from 'react'
import api from '../LIbe/Axios';
import toast from 'react-hot-toast';
import RateLimitedUI from '../Component/RateLimited';
import NoteCard from '../Component/NoteCard'
import NotesNotFound from '../Component/NotesNotFound';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);      // FIXED
      } catch (error) {
        // Always check error.response before accessing status
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch Notes!");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl p-4 mt-6">

        {isRateLimited && <RateLimitedUI />}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}


        {notes.length > 0 && !isRateLimited && (
          <div className="flex flex-wrap justify-center gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setnotes={setNotes} />
            ))}
          </div>
        )}

      </div>
    </div>
  );



}
