import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRole } from '../../Actions/actions';
import TextField from '@mui/material/TextField';
import { urlapi } from '../../Components/Menu';

const Addroles = () => {
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const roleData = { role }; // Data structure based on your backend requirements
        dispatch(postRole(roleData, urlapi));
        setRole(''); // Reset the role input after submission
    };

    return (
        <>
            <section className="p-4 text-center">
                <div className="bg-gray-200 shadow-xl p-4 font-semibold text-2xl admin-dashboard-title">
                    Settings
                </div>
            </section>


            <div className=' flex justify-evenly space-x-2 mt-3' >


                <TextField
                    className='w-full mb-4'
                    label="Client Name"
                    variant="outlined"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                />

                <div className='flex justify-center'>
                    <button onClick={handleFormSubmit} className='bg-green-500 px-7 py-2 rounded'>Add</button>
                </div>
            </div>

        </>

    );
}

export default Addroles;
