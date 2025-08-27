import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Community = () => {
  const { loading, setLoading, axios, token } = useAppContext();
  const [creations, setCreations] = useState();
  const { user } = useUser();

  const fetchCreations = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCreations(data.content);
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  const toggleLikeClick = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-likes",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    creations && (
      <div className='flex-1 h-full flex flex-col gap-4 p-6'>
        Creations
        <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
          {creations.map((creation, index) => (
            <div
              key={index}
              className='relative group inline-block pl-3 pt-3 w-full sm:w-1/2 lg:w-1/3'>
              <img
                src={creation.content}
                alt=''
                className='w-full h-full object-cover rounded-lg'
              />
              <div className='absolute inset-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>
                  {creation.prompt}
                </p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => toggleLikeClick(creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Community;
