import React, { useState, useEffect, useContext } from 'react'
import { urlapi } from '../../Components/Menu';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicModal from '../../Components/ViewcaseModal';
import { CaseHistoryContext } from '../../Context/CaseHistoryContext';
// import { useDispatch } from 'react-redux';
import { deleteEntry } from '../../Actions/actions';
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from '../../Actions/actions';
import { BsFillFileEarmarkSpreadsheetFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai'
import { FaRegEdit } from "react-icons/fa";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {Input} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    maxHeight: '80%', // Set a maximum height for the modal
    overflowY: 'auto', // Enable vertical scrolling
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};






const Newcaseget = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [natureOfSuit, setNatureOfSuit] = useState('');
    const [plaintiffsBackground, setPlaintiffsBackground] = useState(null);
    const [plaintiffsClaim, setPlaintiffsClaim] = useState(null);
    const [application, setApplication] = useState([]);
    const [defendantsArgument, setDefendantsArgument] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [plaintiffsRepresentation, setPlaintiffsRepresentation] = useState('');
    const [defendantRepresentative, setDefendantRepresentative] = useState('');
    const [restrainingOrder, setRestrainingOrder] = useState('');
    const [plaintiffsSubmittedDocuments, setPlaintiffsSubmittedDocuments] = useState([]);
    const [additionalPlaintiffDocuments, setAdditionalPlaintiffDocuments] = useState([]);
    const [defendantsSubmittedDocuments, setDefendantsSubmittedDocuments] = useState([]);
    const [additionalDefendantDocuments, setAdditionalDefendantDocuments] = useState([]);
    // const { caseget } = useContext(CaseHistoryContext);
    // const [modalOpen, setModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const [selectedCourt, setSelectedCourt] = useState('');

    const courtNames = [
        "Supreme Court of Pakistan",
        "High Court, Lahore",
        "High Court, Multan",
        "High Court, Rawalpindi",
        "High Court, Islamabad",
        "District Court",
        "Special Judicial Magistrate",
        "Special Judicial Magistrate-30",
        "Senior Civil Court",
        "Civil Court",
        "Family Court",
        "Guardian Court",
        "Banking Court-I",
        "Banking Court-II",
        "Banking Court-III",
        "Banking Court-IV",
        "Banking Court-V",
        "CNSA Court",
        "Anti Corruption Court",
        "ATA-I Court",
        "ATA-II Court",
        "ATA-III Court",
        "Special Tribunal",
        "Rent Tribunal",
        "PST Lahore",
        "FST Lahore",
        "Revenue Court",
        "Commissioner",
        "Special Rent Tribunal",
        "Environment Tribunal",
        "Others"
    ];


    const { entriesAll, loading, error } = useSelector(state => state);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    // const currentItems = entriesAll.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(entriesAll.length / itemsPerPage);






    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
    //             setEntries(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data: ', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [entries]);


    const natureviewhandler = (entry) => {
        setNatureOfSuit(entry.nature ?? entry.NatureofSuit);
        setPlaintiffsBackground(entry.PlaintiffsBackground)
        setPlaintiffsClaim(entry.PlaintiffsClaim)
        setApplication(entry.application)
        setDefendantsArgument(entry.DefendantsArgument)
        setCurrentStatus(entry.CurrentStatus)
        setPlaintiffsRepresentation(entry.PlaintiffsRepresentation)
        setDefendantRepresentative(entry.Defendantrepresentative)
        setRestrainingOrder(entry.RestrainingOrder)
        setPlaintiffsSubmittedDocuments(entry.PlaintiffsSubmittedDocuments)
        setAdditionalPlaintiffDocuments(entry.AdditionalPlaintiffDocuments)
        setDefendantsSubmittedDocuments(entry.DefendantsSubmittedDocuments)
        setAdditionalDefendantDocuments(entry.AdditionalDefendantDocuments)
        setOpen(true);
    }



    const handleDeleteEntry = (id) => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            dispatch(deleteEntry(id, urlapi));
        }
    };




    useEffect(() => {
        dispatch(fetchEntries(urlapi));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // const filteredItems = searchTerm
    //     ? entriesAll.filter(entry =>
    //         entry.title.toLowerCase().includes(searchTerm.toLowerCase()))
    //     : entriesAll;

    // const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    // const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


    const filteredItems = entriesAll
        .filter(entry => {
            // Filter by search term if it exists
            const matchesSearchTerm = searchTerm
                ? entry.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            // Filter by selected court if it's selected
            const matchesSelectedCourt = selectedCourt
                ? entry.court === selectedCourt // Replace 'courtName' with the actual property name
                : true;

            return matchesSearchTerm && matchesSelectedCourt;
        });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            <main className='w-full text-center'>
                {/* Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className=' flex flex-col gap-4'>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Nature of Suit</span>  : {natureOfSuit}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Plaintiff's Background</span> : {plaintiffsBackground}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Plaintiff's Claim</span>  : {plaintiffsClaim}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Defendant's Argument</span>  : {defendantsArgument}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Current Status</span>  : {currentStatus}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Plaintiff's Representation</span> : {plaintiffsRepresentation}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Defendant representative</span> : {defendantRepresentative}
                            </Typography>
                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Restraining Order</span> : {restrainingOrder}
                            </Typography>

                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Plaintiffs Submitted Documents</span>:
                                <ul className=' list-decimal ml-10'>
                                    {plaintiffsSubmittedDocuments.map((document, index) => (
                                        <li key={index}>{document}</li>
                                    ))}
                                </ul>
                            </Typography>


                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Additional Plaintiff Documents</span>:
                                <ul className=' list-decimal ml-10'>
                                    {additionalPlaintiffDocuments.map((document, index) => (
                                        <li key={index}>{document}</li>
                                    ))}
                                </ul>
                            </Typography>

                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Defendant's Submitted Documents</span>:
                                <ul className=' list-decimal ml-10'>
                                    {defendantsSubmittedDocuments.map((document, index) => (
                                        <li key={index}>{document}</li>
                                    ))}
                                </ul>
                            </Typography>

                            <Typography id="modal-modal-title">
                                <span className=' font-bold'>Additional Defendant Documents</span>:
                                <ul className=' list-decimal ml-10'>
                                    {additionalDefendantDocuments.map((document, index) => (
                                        <li key={index}>{document}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </div>





                        <div className=' text-center font-bold underline text-xl'>APPLICATIONS</div>
                        <table className='border border-collapse border-black w-full mt-5 text-center'>
                            <thead>
                                <tr>
                                    <th className='border border-black'>srNo</th>
                                    <th className='border border-black'>Application</th>
                                    <th className='border border-black'>Application Date</th>
                                    <th className='border border-black'>Reply</th>
                                    <th className='border border-black'>Reply Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {application.map((app, index) => (
                                    <tr key={index}>
                                        <td className='border border-black'>{app.srNo}</td>
                                        <td className='border border-black'>{app.application}</td>
                                        <td className='border border-black'>{app.applicationDate}</td>
                                        <td className='border border-black'>{app.reply}</td>
                                        <td className='border border-black'>{app.replyDate}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className=' text-center font-bold text-xl underline mt-4'>DATES</div>

                    </Box>
                </Modal>

                {/* End */}
                <div className='grid grid-cols-2'>
                    <div className="search-bar p-3">
                        <Input
                            type=""
                            placeholder="Search by Title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3"
                        />
                    </div>

                    <div className="court-dropdown p-4">
                        <FormControl fullWidth>
                            <InputLabel id="court-select-label">Select Court</InputLabel>
                            <Select
                                labelId="court-select-label"
                                id="court-select"
                                value={selectedCourt}
                                label="Select Court"
                                onChange={(e) => setSelectedCourt(e.target.value)}
                            >
                                <MenuItem value="">All Courts</MenuItem>
                                {courtNames.map((courtName, index) => (
                                    <MenuItem key={index} value={courtName}>{courtName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>


                <div className=' bg-gray-200 shadow-xl p-4 font-semibold text-2xl'>All Cases</div>



                <table>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                    </th>

                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nature of Suit
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        prev-hearing
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        next-hearing
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View Details
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View Details
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View factsheet
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                    </th>
                    <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                    </th>

                    <tbody>
                        {
                            loading ? (
                                <tr className='colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500'>
                                    <td>Loading...</td>
                                </tr>
                            ) : currentItems.map((entry, index) => {
                                return (
                                    <>
                                        <tr key={entry.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 text-center`}>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.title}</td>
                                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.NatureofSuit ? entry.NatureofSuit : entry.nature}</td>
                                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.lastDateOfHearing ? entry.lastDateOfHearing : entry.prevhearing}</td>
                                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.nextDateOfHearing ? entry.nextDateOfHearing : entry.nexthearing}</td>


                                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">
                                                <button onClick={() => natureviewhandler(entry)}>View</button>
                                            </td>


                                            <td className="px-10 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/viewdetails/${entry._id}/${entry.title}`} className="text-gray-700 hover:text-indigo-900 text-xl">
                                                    <AiFillEye className='' />
                                                </Link>
                                            </td>

                                            {/* Viewfactsheet */}
                                            <td className=" text-center px-10 text-sm font-medium">
                                                <Link to={`/factsheetview/${entry._id}`} className="text-gray-700 hover:text-indigo-900 text-xl">
                                                    <BsFillFileEarmarkSpreadsheetFill />
                                                </Link>
                                            </td>

                                            <td>
                                                <button
                                                    className='text-2xl text-gray-700  hover:text-red-500'
                                                    onClick={() => handleDeleteEntry(entry._id)}
                                                >
                                                    <MdDeleteForever />
                                                </button>
                                            </td>

                                            <td className=" text-center px-10 text-sm font-medium">
                                                <Link to={`/Editcase/${entry._id}`} className="text-gray-700  hover:text-indigo-900 text-xl">
                                                    <FaRegEdit />
                                                </Link>
                                            </td>
                                        </tr>

                                        {/* {entry.application && entry.application.map((appItem, appIndex) => (
                                            <tr key={appIndex}>
                                                Render your application data here
                                                <td colSpan="10">Application Detail: {appItem.srNo}</td>
                                            </tr>
                                        ))} */}
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='flex justify-center items-center mt-4 pb-7'>
                    <nav aria-label="Pagination">
                        <ul className='inline-flex items-center -space-x-px'>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <li key={number} className='px-1'>
                                    <button
                                        onClick={() => setCurrentPage(number)}
                                        aria-current={currentPage === number ? 'page' : undefined}
                                        className={`${currentPage === number
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                    >
                                        {number}
                                    </button>
                                </li>
                            ))}

                        </ul>
                    </nav>
                </div>



            </main>
        </>
    )
}

export default Newcaseget
