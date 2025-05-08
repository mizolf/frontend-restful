
import React from 'react'
import { useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function PostModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [titleValue, setTitleValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [category, setCategory] = useState('Lost');
    const [image, setImage] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState(null);

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newCategory: string,
    ) => {
      setCategory(newCategory);
    };
      
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionValue(e.target.value);
    }

    const setFileToBase64 = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(!file) return;
      setImage(file);
      setFileToBase64(file);
    };

    const handleSubmit = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5500/user/post", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: titleValue, 
              body: descriptionValue, 
              category: category, 
              image: imageBase64
            })
        })
    
        const json = await response.json()
        
        if(response.ok){
            setLoading(false)
            setData(json)
            setTitleValue("");
            setDescriptionValue("");
            setCategory("Lost");
            setImage(null);
            setImageBase64("");
        }
        
      } catch (error) {
        setLoading(false)
        console.error("Server error:", error)
      }
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

              <div>
   
                <label
                    htmlFor="profile_image"
                    className="block font-medium text-gray mb-2">
                    Upload image
                </label>

                <input
                    name="image"
                    className="border cursor-pointer w-fit rounded-lg border-gray-200 p-3 text-sm mb-2"
                    placeholder="Image"
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleImage}
                />
                </div>

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
              <button onClick={() => setIsOpen(false)} className='cursor-pointer'>Cancel</button>
              <button onClick={() => {
                handleSubmit();
                setIsOpen(false);
              }} className='primary-button'>Upload</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default PostModal
