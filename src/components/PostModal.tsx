
import React from 'react'
import { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function PostModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [alignment, setAlignment] = useState<string>('lost');

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };
      
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionValue(e.target.value);
    }


  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className='primary-button'>Upload a post</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-2xl h-2xl space-y-4 shadow-lg shadow-gray rounded-xl bg-white p-12">
            <DialogTitle className="font-bold text-gray text-xl">Report lost/found</DialogTitle>
            <Description className='text-gray'>Report something you've lost or found</Description>
            <form method='dialog' className='flex flex-col gap-2'>
                <input type="text" 
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

                <input type="image" src="" alt="" />

                <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="lost" color='error'>Lost</ToggleButton>
                <ToggleButton value="found" color='success'>Found</ToggleButton>
                </ToggleButtonGroup>

            </form>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setIsOpen(false)} className='cursor-pointer'>Cancel</button>
              <button onClick={() => setIsOpen(false)} className='primary-button'>Upload</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default PostModal
