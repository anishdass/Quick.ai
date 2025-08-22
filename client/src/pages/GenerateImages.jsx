import React, { useState } from "react";
import { Image, Sparkles } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const GenerateImages = () => {
  const { loading, setLoading, axios, getToken } = useAppContext();
  const imageStyles = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Cartoon",
    "Fantasy",
    "3D",
    "Portrait",
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const prompt = `Create a ${selectedStyle} image of ${input}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setImageUrl(data.content);
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
          <Sparkles className=' w-6 text-[#00ad25]' />
          <h1 className=' text-xl font-semibold'>AI Image Generator</h1>
        </div>

        {/* Input */}
        <p className=' mt-6 text-sm font-medium'>Describe your Image</p>
        <textarea
          className='w-full h-32 px-4 mt-2 outline-none text-base rounded-md border border-gray-300'
          onChange={(e) => setInput(e.target.value)}
          placeholder='Describe what you want to see in the image'
          required
          value={input}
          rows={4}
        />

        <p className=' mt-4 text-sm font-medium'>Style</p>

        {/* Length Choice */}
        <div className=' mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageStyles.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? " bg-green-50 text-green-700"
                  : " text-gray-500 border-gray-300"
              }`}>
              {item}
            </span>
          ))}
        </div>

        {/* Toggle to make the image public */}
        <div className=' my-6 flex items-center gap-2'>
          <label className=' relative cursor-pointer'>
            <input
              type='checkbox'
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className=' sr-only peer'
            />
            <div className=' w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className=' absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className=' text-sm'>Make this image public</p>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className=' w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00ad25] to-[#04ff50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {!loading ? (
            <Image className=' w-5' />
          ) : (
            <div className=' w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></div>
          )}
          Generate Image
        </button>
      </form>

      {/* right col */}
      <div className=' w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className=' flex items-center gap-3'>
          <Image className=' w-5 h-5 text-[#00ad25]' />
          <h1 className=' text-xl font-semibold'>Generated Image</h1>
        </div>
        {!imageUrl ? (
          <div className=' flex flex-1 justify-center items-center'>
            <div className=' text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Image className=' w-9 h-9 ' />
              <p>Enter a topic and click "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          <div>
            <img
              src={imageUrl}
              alt='Generated Image'
              className=' w-full h-full'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
