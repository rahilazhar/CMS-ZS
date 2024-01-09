import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { urlapi } from '../../Components/Menu'

const Editrequest = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await axios.get(`${urlapi}/api/v1/auth/pendingrequests`)
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [])

    const Approvehandler = async (selectedValue, id) => {
        if (window.confirm(`Are you sure to ${selectedValue} this Request`)) {
            try {
                let response = await axios.post(`${urlapi}/api/v1/auth/updaterequest/${id}`, { status: selectedValue });

                if (response.status === 200) {
                    // Handle success - maybe update the UI or show a success message
                    console.log("Request updated successfully:", response.data);
                    // Additional UI feedback can be added here
                } else {
                    // Handle non-success status codes
                    console.log("Failed to update request:", response.status, response.data);
                    // Additional UI feedback for failure can be added here
                }
            } catch (error) {
                // Handle errors in the request itself (e.g., network errors)
                console.error("Error during update request:", error);
                // Additional UI error handling can be added here
            }
        }
    };


    return (
        <div className='w-full p-4'>
            <section className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 bg-blue-100 rounded-md p-4 shadow-md">
                    Pending Approvals
                </h1>
            </section>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Suit No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nature
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Approve
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{item.caseId.Suitno}</td>
                                <td className="px-6 py-4">{item.caseId.title}</td>
                                <td className="px-6 py-4">{item.caseId.nature ? item.caseId.nature : item.caseId.NatureofSuit}</td>
                                <td className="px-6 py-4">{item.userId.name}</td>
                                <td className="px-6 py-4">{item.status}</td>
                                <td className="px-6 py-4">
                                    <select className='w-full p-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:border-gray-400 focus:outline-none focus:border-blue-300'
                                        onChange={(e) => Approvehandler(e.target.value, item.caseId._id)}>
                                        <option value="">--Select--</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Editrequest
