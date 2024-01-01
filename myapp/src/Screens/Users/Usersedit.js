import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { urlapi } from '../../Components/Menu';
import { useNavigate } from 'react-router-dom';
import { Radio } from 'react-loader-spinner';
import  { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../Actions/actions';
const Usersedit = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [clientname, setClientname] = useState('')
    const [profilePicture, setProfilepicture] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.currentUser);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchUser(id, urlapi));
    }, [dispatch, id, urlapi]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setClientname(user.role);
            setProfilepicture(user.profilepicture);
        }
    }, [user]); // Reacts to changes in the user object


    const updateData = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        formData.append("name", name);
        formData.append("email", email);

        if (password !== '') {
            formData.append("password", password);
        }
        formData.append("role", clientname);

        dispatch(updateUser(id, formData, urlapi , setIsLoading));
        setTimeout(() => {
            navigate('/allusers');
        }, 1500); // Adjust the delay as needed
    };

    return (
        <>
            <section className="p-4 text-center">
                <div className="bg-gray-200 shadow-xl p-4 font-semibold text-2xl admin-dashboard-title">
                    Edit Information
                </div>
            </section>
            <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder='clientname' value={clientname} onChange={(e) => setClientname(e.target.value)} disabled />
            <input type="file" onChange={(e) => setProfilepicture(e.target.files[0])} />
            <button className='bg-yellow-200 px-3 py-1 rounded flex mx-auto' onClick={updateData} disabled={isLoading}>
                {isLoading ? (
                    <Radio
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="radio-loading"
                        wrapperStyle={{}}
                        wrapperClass="radio-wrapper"
                    />
                ) : (
                    'Submit'
                )}
            </button>
            <Toaster />
        </>
    )
}

export default Usersedit