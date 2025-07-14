import {Trash2Icon, PenSquareIcon} from 'lucide-react'
import { Link } from "react-router-dom";
import { formatDate } from '../lib/utils'
import React from 'react'
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note. Please try again later.")
    }
  };

  return (
    <Link to={`/note/${note._id}`} data-theme="forest" className='card bd-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
      <div className='card-body'>
        <h2 className='card-title text-base-content'>{note.title}</h2>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
              {formatDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
              <PenSquareIcon className='size-4' />
              <button className='byn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                  <Trash2Icon className='size-4' />
              </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard