import React , {useEffect} from 'react'
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { pendingrequests } from '../../Actions/actions';
import { urlapi } from '../Menu';

const DashboardCards3 = () => {
    const dispatch = useDispatch();
    const pendingrequest = useSelector((state) => state.pendingrequest);

    useEffect(() => {
        dispatch(pendingrequests(urlapi)); // Dispatch the action to fetch roles
    }, [dispatch]);
    return (
        <>
            <div className="rounded-sm border border-stroke bg-green-50 py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <FaRegUser className='text-blue-500 text-xl' />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold text-black dark:text-white">
                            {pendingrequest.length}
                        </h4>
                        <span className="text-sm font-medium">Edit Approvals</span>
                    </div>
{/* 
                    {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                        2.59%
                        <svg
                            className="fill-meta-3"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                                fill=""
                            />
                        </svg>
                    </span> */} 
                </div>
            </div>
        </>
    )
}

export default DashboardCards3
