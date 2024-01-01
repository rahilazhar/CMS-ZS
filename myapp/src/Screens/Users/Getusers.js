import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/Usercontext';
import axios from 'axios';
import { urlapi } from '../../Components/Menu';
import { Link } from 'react-router-dom';
// import './Getusers.css'; // Import a CSS file for custom styles

const Getusers = () => {
    const { Getallusers, getuserdata } = useContext(UserContext);

    useEffect(() => {
        Getallusers();
    }, []);

    const handleApprovalChange = async (userid, isUserApproved) => {
        try {
            const response = await axios.post(`${urlapi}/api/v1/auth/approvedreq/${userid}`,
                { isUserApproved }
            );
            console.log(response.data.message);
            Getallusers();
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    return (
        <main className='w-full'>
            <div className="container mx-auto mt-5">
                <div className="shadow-lg mt-2">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Profile</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.map((item, index) => {
                                return (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-3 border-b border-gray-200">{index + 1}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <img className='rounded-full h-10 w-10' src={`${urlapi}/${item.profilePicture?.replace(/\\/g, "/")}`} alt="Profile" />
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200">{item.name}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">{item.email}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">{item.role}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <select
                                                className="form-select block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                value={item.isUserApproved}
                                                onChange={(e) => handleApprovalChange(item._id, e.target.value)}
                                            >
                                                <option value="true">Approved</option>
                                                <option value="false">Not Approved</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <Link to={`/useredit/${item._id}`} className="text-blue-600 hover:text-blue-900">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Getusers;
