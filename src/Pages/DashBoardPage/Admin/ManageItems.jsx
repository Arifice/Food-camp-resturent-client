
import SectionTitle from "../../../Components/SectionTitle";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../../../Hooks/UseMenu";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu,refetch]=useMenu();
    const axiosSecure=useAxiosSecure();   

    const handleDelete=(item)=>{
        console.log(item);
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

                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res=>{
                        console.log(res.data);
                        if(res.data?.deletedCount>0){
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item.name} has been deleted.`,
                                icon: "success",
                                timer:'1500',
                              });
                        }
                    })
             
            }
          });

    }
    return (
        <div>
            <div>
                <SectionTitle heading={'Manage All Items'} subHeading={'Hurry Up'}></SectionTitle>
            </div>
            <h1 className="text-5xl text-center font-Cinzel mt-20 ">Total Items :  {menu.length} </h1>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra-zebra m-10">
                        {/* head */}
                        <thead>
                        <tr className="bg-orange-400 text-3xl font-Cinzel">
                            <th>SL</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item,idx)=><tr className="hover onc text-2xl" key={item._id}>
                                <th>{idx+1}</th>
                                <td><img className="w-20 h-20 rounded-full" src={item.image} alt="" /></td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.category}</td>
                                <td className="text-right">{item.price}</td>
                                
                                <th className="text-center">                                   
                                    <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn bg-orange-600 text-white btn-ghost text-3xl btn-outline"><FaEdit></FaEdit></button></Link>
                                </th>
                                <th className="text-center">
                                        <button onClick={()=>handleDelete(item)} className="btn bg-red-600 text-white btn-ghost text-3xl btn-outline"><FaTrash></FaTrash></button>
                                </th>
                            </tr>)
                            }
                        
                        {/* row 2 */}
                        
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;