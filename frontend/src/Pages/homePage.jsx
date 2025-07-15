import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import RateLimitedUI from "../components/RateLimitedUI"
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'
import { LoaderIcon } from 'lucide-react'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log("Fetched notes:", res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if ([401, 403].includes(error.response?.status)) {
          localStorage.removeItem("token");
          api.defaults.headers.common["Authorization"] = "";
          return navigate("/login");
        }
        toast.error("Failed to load notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchnotes();
  }, [navigate]);

  useEffect( () => {
    const newNote = location.state?.newNote;
    if (newNote) {
      console.log("New note added:", newNote);
      setNotes(prev => [newNote, ...prev]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  if(Loading) {
    return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='size-10 animate-spin text-primary' />
    </div>
  }

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {Loading && <div className='text-center text-primary'>Loading Notes...</div>}

        {notes.length === 0 && !isRateLimited && !Loading && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage