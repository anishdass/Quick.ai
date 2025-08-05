import React, { useState } from "react";
import { Scissors, Sparkles } from "lucide-react";

const RemoveObject = () => {
  const [input, setInput] = useState("");

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
          <Sparkles className=' w-6 text-[#4a7aff]' />
          <h1 className=' text-xl font-semibold'>Object Removal</h1>
        </div>

        {/* Input */}
        <p className=' mt-6 text-sm font-medium'>Upload Image</p>
        <div className='flex items-center gap-4 mt-4'>
          <label
            htmlFor='file-upload'
            className='px-4 py-2 bg-indigo-400 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-indigo-600 transition duration-200'>
            Choose File
          </label>
          <span id='file-name' className='text-sm text-gray-600'>
            No file chosen
          </span>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={(e) => {
              const fileName = e.target.files[0]?.name || "No file chosen";
              document.getElementById("file-name").textContent = fileName;
            }}
            required
          />
        </div>

        <p className=' mt-6 text-sm font-medium'>Describe Object to remove</p>
        <textarea
          className='w-full h-32 px-4 mt-2 outline-none text-base rounded-md border border-gray-300'
          placeholder='eg. Car in the background'
          required
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className=' text-xs text-gray-500 font-light mt-1'>
          Be specific about what you want to remove
        </p>

        {/* Button */}
        <button className=' w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417df6] to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          <Scissors className=' w-5' />
          Remove Object
        </button>
      </form>

      {/* right col */}
      <div className=' w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className=' flex items-center gap-3'>
          <Scissors className=' w-5 h-5 text-[#4a7aff]' />
          <h1 className=' text-xl font-semibold'>Processed Image</h1>
        </div>
        <div className=' flex flex-1 justify-center items-center'>
          <div className=' text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Scissors className=' w-9 h-9 ' />
            <p>Enter a topic and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
