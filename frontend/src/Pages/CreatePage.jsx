import { ArrowLeftIcon, LoaderIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate()

	if(loading) {
    return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='size-10 animate-spin text-primary' />
    </div>
  }

	const handleSubmit = async (e) => {
		e.preventDefault()
		if(!title.trim() || !content.trim()) {
			toast.error("All fields are required")
			return;
		}

		setLoading(true);
		try {
			const res = await api.post("/notes", {
				title,
				content
			})
			toast.success("Note created successfuly")
			navigate("/", { state: { newNote: res.data } });
		} catch (error) {
			console.error("Error creating note:", error)
			if(error.response.status === 429) {
				toast.error("Slow down! You're making too many requests.", {
					duration: 5000,
					icon: "☠️"
				})
			} else {
				toast.error("Failed to create note. Please try again later.")
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='min-h-screen bg-transparent'>
			<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto'>
					<Link to={"/"} className="btn btn-ghost mb-6">
						<ArrowLeftIcon className='size-5' />
						Back to Notes
					</Link>

					<div className='card bg-base-100'>
						<div className='card-body'>
							<h2 className='card-title text-2xl mb-4'>Create New Note</h2>
							<form onSubmit={handleSubmit}>
								<div className='form-control mb-4'>
									<label className="label">
										<span className='label-text'>Title</span>
									</label>
									<input type="text" 
										placeholder='Note Title' 
										className='input input-bordered'
										value={title}
										onChange={(e) => setTitle(e.target.value)} 
									/>
								</div>

								<div className='form-control mb-4'>
									<label className='label'>
										<span className='label-text'>Content</span>
									</label>
									<textarea 
										placeholder='Write your note here'
										className='textarea textarea-bordered h-32'
										value={content}
										onChange={(e) => setContent(e.target.value)} 
									/>
								</div>

								<div className="card-actions justify-end">
									<button type='submit' className='btn btn-primary' disabled={loading}>
										{loading ? "Creating..." : "Create Note"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePage;