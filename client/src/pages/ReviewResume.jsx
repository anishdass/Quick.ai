import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const ReviewResume = () => {
  const { loading, setLoading, axios, getToken } = useAppContext();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
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
          {!fileName ? (
            <span id='file-name' className='text-sm text-gray-600'>
              No file chosen
            </span>
          ) : (
            <div>{fileName}</div>
          )}
          <input
            id='file-upload'
            type='file'
            className='hidden'
            accept='application/pdf'
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0]?.name);
            }}
            required
          />
        </div>

        {/* Button */}
        <button className=' w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00da83] to-[#009bb3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {!loading ? (
            <FileText className=' w-5' />
          ) : (
            <div className=' w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></div>
          )}
          Review Resume
        </button>
      </form>

      {/* right col */}
      <div className=' w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className=' flex items-center gap-3'>
          <FileText className=' w-5 h-5 text-[#00da83]' />
          <h1 className=' text-xl font-semibold'>Processed Image</h1>
        </div>
        {!content ? (
          <div className=' flex flex-1 justify-center items-center'>
            <div className=' text-sm flex flex-col items-center gap-5 text-gray-400'>
              <FileText className=' w-9 h-9 ' />
              <p>Enter a topic and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className=' mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className='.reset-tw'>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
