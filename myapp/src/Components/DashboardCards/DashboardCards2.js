import React, { useEffect } from 'react'
import { urlapi } from '../Menu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayCases } from '../../Actions/actions';
import { IoIosToday } from "react-icons/io";

const DashboardCards2 = () => {
    const dispatch = useDispatch();
    const { todayCases, loading, error } = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchTodayCases(urlapi));
    }, [dispatch]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-yellow-50 py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <IoIosToday className='text-xl text-blue-500' />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold text-black dark:text-white">
                            <div>{Array.isArray(todayCases) ? todayCases.length : '0'}</div>
                        </h4>
                        <span className="text-sm font-medium">Today's Cases</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCards2
