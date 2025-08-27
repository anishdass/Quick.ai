import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { loading, setLoading, axios, token } = useAppContext();
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-user-creations", {
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
    getDashboardData();
  }, []);

  return !loading ? (
    <div className=' h-full overflow-y-scroll p-6'>
      <div className=' flex justify-start gap-4 flex-wrap'>
        {/* Total creations card */}
        <div className=' flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className=' text-slate-600'>
            <p className=' text-sm'>Total creations</p>
            <h2 className=' text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className=' w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588f2] to-[#0bb0d7] text-white flex justify-center items-center'>
            <Sparkles className=' w-5 text-white' />
          </div>
        </div>

        {/* Acitve plan card */}
        <div className=' flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className=' text-slate-600'>
            <p className=' text-sm'>Active Plan</p>
            <h2 className=' text-xl font-semibold'>
              <Protect plan={"premium"} fallback='Free'>
                Premium
              </Protect>
            </h2>
          </div>
          <div className=' w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff61c5] to-[#9e53ee] text-white flex justify-center items-center'>
            <Gem className=' w-5 text-white' />
          </div>
        </div>
      </div>

      {loading ? (
        <div className=' flex justify-center items-center h-3/4'>
          <div className=' animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
        </div>
      ) : (
        <div className=' space-y-3'>
          <p className=' mt-6 mb-4'>Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-12 h-12 my-1 rounded-full border-4 border-t-transparent animate-spin'></div>
    </div>
  );
};

export default Dashboard;
