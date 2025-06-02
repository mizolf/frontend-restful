import React, { useState, useEffect } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostUpdated: () => void;
    post: {
        _id: string;
        title: string;
        body: string;
        category: string;
    } | null;
}

function EditPostModal({ isOpen, onClose, onPostUpdated, post }: EditPostModalProps) {
    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [category, setCategory] = useState<string>('Lost');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (post) {
            setTitleValue(post.title);
            setDescriptionValue(post.body);
            setCategory(post.category);
        }
    }, [post]);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newCategory: string,
    ) => {
        if (newCategory !== null) {
            setCategory(newCategory);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionValue(e.target.value);
    }

    const handleSubmit = async () => {
        if (!post) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5500/user/posts/${post._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: titleValue,
                    body: descriptionValue,
                    category: category
                })
            });

            if (response.ok) {
                onPostUpdated();
                handleClose();
            } else {
                console.error("Failed to update post");
            }
        } catch (error) {
            console.error("Server error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        onClose();
        setTitleValue("");
        setDescriptionValue("");
        setCategory("Lost");
    }

    if (!post) return null;

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-2xl h-2xl space-y-4 shadow-lg shadow-gray rounded-xl bg-white p-12">
                    <DialogTitle className="font-bold text-gray text-xl">Edit Post</DialogTitle>
                    <Description className='text-gray'>Edit your lost/found post</Description>
                    
                    <form method='dialog' className='flex flex-col gap-2'>
                        <input 
                            type="text" 
                            placeholder="Title"
                            onChange={handleTitleChange}
                            value={titleValue}
                            className='form-info'
                        />

                        <textarea
                            name="description" 
                            placeholder="Description" 
                            className='form-info h-32'
                            onChange={handleDescriptionChange}
                            value={descriptionValue}
                        />

                        <ToggleButtonGroup
                            color="primary"
                            value={category}
                            exclusive
                            onChange={handleChange}
                            aria-label="Category"
                        >
                            <ToggleButton value="Lost" color='error'>Lost</ToggleButton>
                            <ToggleButton value="Found" color='success'>Found</ToggleButton>
                        </ToggleButtonGroup>
                    </form>
                    
                    <div className="flex gap-4 justify-end">
                        <button 
                            onClick={handleClose} 
                            className='cursor-pointer'
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            className='primary-button'
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default EditPostModal