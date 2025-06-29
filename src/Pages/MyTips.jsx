import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { GardenContext } from '../provider/GardenContext';
import Loading from './Loading';

const MyTips = () => {
    const mytips = useLoaderData()
    const { loading } = use(GardenContext)
    const [allTips, setAllTips] = useState(mytips)
    // console.log(allTips);
    if (loading) {
        return <Loading></Loading>
    }
    const handleTipsDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://garden-guidance-server.vercel.app/api/sharetips/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount) {
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,

                            })

                            const remainingTips = allTips.filter(tips => tips._id !== id)
                            setAllTips(remainingTips)
                        }
                    })
            }
        });
    }
    return (
       <div className="p-8 overflow-x-auto">
  <table className="table-auto w-full border border-collapse text-center">
    {/* head */}
    <thead className="bg-gray-100">
      <tr>
        <th className="border-r border-b border-gray-300 px-4 py-2">No</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Title</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Category</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Topic</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Difficulty</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Image</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Update</th>
        <th className="border-r border-b border-gray-300 px-4 py-2">Delete</th>
      </tr>
    </thead>

    {/* body */}
    <tbody>
      {
        allTips.map((tips, index) => (
          <tr key={tips._id} className="hover:bg-gray-50">
            <td className="border-r border-b border-gray-300 px-4 py-2">{index + 1}</td>
            <td className=" border-r  border-b border-gray-300 px-4 py-2">{tips.title}</td>
            <td className=" border-r border-b border-gray-300 px-4 py-2">{tips.category}</td>
            <td className=" border-r border-b border-gray-300 px-4 py-2">{tips.topic}</td>
            <td className=" border-r border-b border-gray-300 px-4 py-2">{tips.difficulty}</td>
            <td className=" border-r border-b border-gray-300 px-4 py-2 text-center">
              <img
                className="w-12 h-12 object-cover mx-auto rounded-full"
                src={tips?.imageUrl}
                alt={tips.title}
              />
            </td>
            <td className=" border-r border-b border-gray-300 px-4 py-2 text-center">
              <Link to={`/updatetips/${tips._id}`}>
                <button className='btn btn-ghost btn-xs'>Update</button>
              </Link>
            </td>
            <td className="border-r border-b border-gray-300 px-4 py-2 text-center">
              <button onClick={() => handleTipsDelete(tips._id)} className="btn btn-ghost btn-xs">Delete</button>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
</div>

    );
};

export default MyTips;