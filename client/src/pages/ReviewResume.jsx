import React from "react";
import { FileText, Sparkles } from "lucide-react";

const ReviewResume = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className=' h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className=' w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        {/* Heading */}
        <div className=' flex items-center gap-3'>
          <Sparkles className=' w-6 text-[#00da83]' />
          <h1 className=' text-xl font-semibold'>Background Removal</h1>
        </div>

        {/* Input */}
        <p className=' mt-6 text-sm font-medium'>Upload Image</p>
        <div className='flex items-center gap-4 mt-4'>
          <label
            htmlFor='file-upload'
            className='px-4 py-2 bg-teal-400 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-teal-600 transition duration-200'>
            Choose File
          </label>
          <span id='file-name' className='text-sm text-gray-600'>
            No file chosen
          </span>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            accept='application/pdf'
            onChange={(e) => {
              const fileName = e.target.files[0]?.name || "No file chosen";
              document.getElementById("file-name").textContent = fileName;
            }}
            required
          />
        </div>

        <p className=' text-xs text-gray-500 font-light mt-1'>
          Supports JPG, PNG, and other image formats
        </p>

        {/* Button */}
        <button className=' w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00da83] to-[#009bb3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          <FileText className=' w-5' />
          Remove Background
        </button>
      </form>

      {/* right col */}
      <div className=' w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className=' flex items-center gap-3'>
          <FileText className=' w-5 h-5 text-[#00da83]' />
          <h1 className=' text-xl font-semibold'>Processed Image</h1>
        </div>
        <div className=' flex flex-1 justify-center items-center'>
          <div className=' text-sm flex flex-col items-center gap-5 text-gray-400'>
            <FileText className=' w-9 h-9 ' />
            <p>Enter a topic and click "Generate Title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
