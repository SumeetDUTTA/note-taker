import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from "../components/RateLimitedUI"
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true)
  const [notes, setnotes] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes")
        console.log(res.data)
        setnotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.error("Error fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    };

    fetchnotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {Loading && <div className='text-center text-primary'>Loading Notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id || note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage