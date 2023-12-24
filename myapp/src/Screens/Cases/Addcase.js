import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { urlapi } from '../../Components/Menu'; // Ensure this is the correct import for your setup
import { FaArrowDownLong } from "react-icons/fa6";
import { Button } from '@mui/material';
const Addcase = () => {
    // State variables for all schema fields
    const [natureOfSuit, setNatureOfSuit] = useState('');
    const [plaintiffsBackground, setPlaintiffsBackground] = useState('');
    const [plaintiffsClaim, setPlaintiffsClaim] = useState('');
    const [defendantsArgument, setDefendantsArgument] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [plaintiffsRepresentation, setPlaintiffsRepresentation] = useState('');
    const [defendantRepresentative, setDefendantRepresentative] = useState('');
    const [restrainingOrder, setRestrainingOrder] = useState('');
    const [plaintiffsSubmittedDocuments, setPlaintiffsSubmittedDocuments] = useState([]);
    const [plaintiffsSubmittedDocument, setPlaintiffsSubmittedDocument] = useState('');
    const [additionalPlaintiffDocuments, setAdditionalPlaintiffDocuments] = useState([]);
    const [additionalPlaintiffDocument, setAdditionalPlaintiffDocument] = useState('');
    const [defendantsSubmittedDocuments, setDefendantsSubmittedDocuments] = useState([]);
    const [additionalDefendantDocuments, setAdditionalDefendantDocuments] = useState([]);
    const [additionalDefendantDocument, setAdditionalDefendantDocument] = useState('');
    const [defendantSubmittedDocumentmessage, setDefendantSubmittedDocumentmessage] = useState('');
    const [noOfWitnessesOfPlaintiff, setNoOfWitnessesOfPlaintiff] = useState('');
    const [noOfWitnessesOfDefendant, setNoOfWitnessesOfDefendant] = useState('');

    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        srNo: "",
        application: "",
        applicationDate: "",
        reply: "",
        replyDate: "",
    });
    const [editIndexap, setEditIndexap] = useState(-1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClick = () => {
        if (editIndexap === -1) {
            // Create a new entry object from the formData
            const newEntry = {
                srNo: formData.srNo,
                application: formData.application,
                applicationDate: formData.applicationDate,
                reply: formData.reply,
                replyDate: formData.replyDate,
            };

            // Add the new entry to the entries array
            setEntries([...entries, newEntry]);

            // Clear the formData for the next entry
            setFormData({
                srNo: "",
                application: "",
                applicationDate: "",
                reply: "",
                replyDate: "",
            });
        } else {
            // Edit existing entry
            const updatedEntries = [...entries];
            updatedEntries[editIndexap] = {
                srNo: formData.srNo,
                application: formData.application,
                applicationDate: formData.applicationDate,
                reply: formData.reply,
                replyDate: formData.replyDate,
            };

            setEntries(updatedEntries);
            setEditIndexap(-1);

            // Clear the formData for the next entry
            setFormData({
                srNo: "",
                application: "",
                applicationDate: "",
                reply: "Not Available",
                replyDate: "",
            });
        }
    };

    const handleDeleteClick = (index) => {
        const updatedEntries = [...entries];
        updatedEntries.splice(index, 1);
        setEntries(updatedEntries);
    };

    const handleEditClick = (index) => {
        const entryToEdit = entries[index];
        setFormData(entryToEdit);
        setEditIndexap(index);
    };




    const [filingOfSuit, setFilingOfSuit] = useState('');
    const [numberOfDefendants, setNumberOfDefendants] = useState('');
    const [poaFilingDatePlaintiff, setPoaFilingDatePlaintiff] = useState('');
    const [poaFilingDateDefendant, setPoaFilingDateDefendant] = useState('');
    const [defendantsWrittenStatementDate, setDefendantsWrittenStatementDate] = useState('');
    const [issuesFramedDate, setIssuesFramedDate] = useState('');
    const [restrainingOrderDate, setRestrainingOrderDate] = useState('');
    const [prevhearing, setPrevHearing] = useState('');
    const [nexthearing, setNextHearing] = useState('');
    const [lawyer, setLawyer] = useState('');
    const [court, setCourt] = useState('');
    const [title, setTitle] = useState('');

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const [showPlaintiffsSubmittedDocuments, setShowPlaintiffsSubmittedDocuments] = useState(false);
    const [showDefendantsSubmittedDocuments, setShowDefendantsSubmittedDocuments] = useState(false);
    const [witness, setWitness] = useState(false);
    const [showApplications, setShowApplications] = useState(false);
    const [showDates, setShowDates] = useState(false);
    const [addcase, setAddcase] = useState(false)
    const [clientname, setClientname] = useState('')


    const [editIndex, setEditIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');

    const [editIndex1, setEditIndex1] = useState(-1);
    const [editValue1, setEditValue1] = useState('');

    // Additional plantiffs bullets edits
    const [editIndexa, setEditIndexa] = useState(-1);
    const [editValuea, setEditValuea] = useState('');


    // Additional defendants bullets edits
    const [editIndexd, setEditIndexd] = useState(-1);
    const [editValued, setEditValued] = useState('');




    // plantiffs
    const startEdit = (index, value) => {
        setEditIndex(index);
        setEditValue(value);
    };

    const saveEdit = (index) => {
        const updatedDocs = [...plaintiffsSubmittedDocuments];
        updatedDocs[index] = editValue;
        setPlaintiffsSubmittedDocuments(updatedDocs);
        setEditIndex(-1);
        setEditValue('');
    };


    // Additional plantiffs
    const startAEdit = (index, value) => {
        setEditIndexa(index);
        setEditValuea(value);
    };

    const saveAEdit = (index) => {
        const updatedDocs = [...additionalPlaintiffDocuments];
        updatedDocs[index] = editValuea;
        setAdditionalPlaintiffDocuments(updatedDocs);
        setEditIndexa(-1);
        setEditValuea('');
    };


    // defendants
    const startdEdit = (index, value) => {
        setEditIndex1(index);
        setEditValue1(value);
    };
    const savedEdit = (index) => {
        const updatedDocs = [...defendantsSubmittedDocuments];
        updatedDocs[index] = editValue1;
        setDefendantsSubmittedDocuments(updatedDocs);
        setEditIndex1(-1);
        setEditValue1('');
    };



    // defendants additional
    const startDEdit = (index, value) => {
        setEditIndexd(index);
        setEditValued(value);
    };
    const savedDEdit = (index) => {
        const updatedDocs = [...additionalDefendantDocuments];
        updatedDocs[index] = editValued;
        setAdditionalDefendantDocuments(updatedDocs);
        setEditIndexd(-1);
        setEditValued('');
    };





    const togglePlaintiffsSubmittedDocuments = () => setShowPlaintiffsSubmittedDocuments(prev => !prev);
    const toggleDefendantsSubmittedDocuments = () => setShowDefendantsSubmittedDocuments(prev => !prev);
    const togglewitness = () => setWitness(prev => !prev);
    const toggleApplications = () => setShowApplications(prev => !prev);
    const toggleDates = () => setShowDates(prev => !prev);
    const toggleaddcase = () => setAddcase(prev => !prev);

    const formsubmission = async (event) => {
        event.preventDefault();
        const caseData = {
            NatureofSuit: natureOfSuit,
            PlaintiffsBackground: plaintiffsBackground,
            PlaintiffsClaim: plaintiffsClaim,
            DefendantsArgument: defendantsArgument,
            CurrentStatus: currentStatus,
            PlaintiffsRepresentation: plaintiffsRepresentation,
            Defendantrepresentative: defendantRepresentative,
            RestrainingOrder: restrainingOrder,
            PlaintiffsSubmittedDocuments: plaintiffsSubmittedDocuments,
            AdditionalPlaintiffDocuments: additionalPlaintiffDocuments,
            DefendantsSubmittedDocuments: defendantsSubmittedDocuments,
            AdditionalDefendantDocuments: additionalDefendantDocuments,
            NoofWitnessesofPlaintiff: noOfWitnessesOfPlaintiff,
            NoofWitnessesofDefendant: noOfWitnessesOfDefendant,
            application: entries,
            filingOfSuit: filingOfSuit,
            numberOfDefendants: numberOfDefendants,
            poaFilingDatePlaintiff: poaFilingDatePlaintiff,
            poaFilingDateDefendant: poaFilingDateDefendant,
            defendantsWrittenStatementDate: defendantsWrittenStatementDate,
            issuesFramedDate: issuesFramedDate,
            restrainingOrderDate: restrainingOrderDate,
            prevhearing: prevhearing,
            nexthearing: nexthearing,
            lawyer: lawyer,
            court: court,
            title: title,
            Clientname : clientname
        };

        try {
            const response = await fetch(`${urlapi}/api/v1/auth/entries`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(caseData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.Message || 'Case added successfully!');
                setIsError(false);
                setNatureOfSuit('');
                setPlaintiffsBackground('');
                setPlaintiffsClaim('');
                setDefendantsArgument('');
                setCurrentStatus('');
                setPlaintiffsRepresentation('');
                setDefendantRepresentative('');
                setRestrainingOrder('');
                setPlaintiffsSubmittedDocuments([]);
                setPlaintiffsSubmittedDocument('');
                setAdditionalPlaintiffDocuments([]);
                setAdditionalPlaintiffDocument('');
                setDefendantsSubmittedDocuments([]);
                setAdditionalDefendantDocuments([]);
                setAdditionalDefendantDocument('');
                setDefendantSubmittedDocumentmessage('');
                setNoOfWitnessesOfPlaintiff('');
                setNoOfWitnessesOfDefendant('');
                setFilingOfSuit('');
                setNumberOfDefendants('');
                setPoaFilingDatePlaintiff('');
                setPoaFilingDateDefendant('');
                setDefendantsWrittenStatementDate('');
                setIssuesFramedDate('');
                setRestrainingOrderDate('');
                setPrevHearing('');
                setNextHearing('');
                setLawyer('');
                setCourt('');
                setTitle('');
                setClientname('')


            } else {
                setMessage(data.Message || 'Form submission failed!');
                setIsError(true);
            }
        } catch (error) {
            setMessage('An unexpected error occurred. Please try again later.');
            setIsError(true);
        }
    };
    // plantiff;s
    const handleAddPlaintiffsSubmittedDocument = () => {
        if (plaintiffsSubmittedDocument) {
            setPlaintiffsSubmittedDocuments(prevDocs => [...prevDocs, plaintiffsSubmittedDocument]);
            setPlaintiffsSubmittedDocument(''); // Reset the input field after adding
        }
    };


    // working
    const handleAdditionalPlaintiffDocuments = () => {
        if (additionalPlaintiffDocument) {
            setAdditionalPlaintiffDocuments(prevDocs => [...prevDocs, additionalPlaintiffDocument]);
            setAdditionalPlaintiffDocument(''); // Reset the input field after adding
        }
    };


    // defendants
    const handleAdddefendantsSubmittedDocuments = () => {
        if (defendantSubmittedDocumentmessage) {
            setDefendantsSubmittedDocuments(prevDocs => [...prevDocs, defendantSubmittedDocumentmessage]);
            setDefendantSubmittedDocumentmessage(''); // Reset the input field after adding
        }
    };


    // defendants additional 
    const handleAdditionalDefendantDocument = () => {
        if (additionalDefendantDocument) {
            setAdditionalDefendantDocuments(prevDocs => [...prevDocs, additionalDefendantDocument]);
            setAdditionalDefendantDocument(''); // Reset the input field after adding
        }
    };




    return (
        <div className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
            <div className='w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                <h2 className="text-2xl font-semibold mb-4 text-center">Add Case</h2>
                <form onSubmit={formsubmission}>



                    {/* Add Case Section */}
                    <div onClick={toggleaddcase} className="section-toggle cursor-pointer  shadow-2xl bg-gray-100 flex justify-center p-4 mt-4">
                        Add Case
                        {/* arrow icon */}
                    </div>
                    {addcase && (
                        <>
                            <div className=' flex  justify-evenly space-x-2 mt-3' >
                                <TextField
                                    className='w-full mb-4'
                                    label="Title"
                                    variant="outlined"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Court Name"
                                    variant="outlined"
                                    onChange={(e) => setCourt(e.target.value)}
                                    value={court}
                                />

                                <TextField
                                    className='w-full mb-4'
                                    label="Lawyer Name"
                                    variant="outlined"
                                    onChange={(e) => setLawyer(e.target.value)}
                                    value={lawyer}
                                />

                                <TextField
                                    className='w-full mb-4'
                                    label="Client Name"
                                    variant="outlined"
                                    onChange={(e) => setClientname(e.target.value)}
                                    value={clientname}
                                />
                            </div>
                            <div className='flex  justify-evenly space-x-2 mt-3'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Nature of Suit"
                                    variant="outlined"
                                    onChange={(e) => setNatureOfSuit(e.target.value)}
                                    value={natureOfSuit}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Plaintiff's Background"
                                    variant="outlined"
                                    onChange={(e) => setPlaintiffsBackground(e.target.value)}
                                    value={plaintiffsBackground}
                                />


                            </div>


                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Plaintiff's Claim"
                                    variant="outlined"
                                    onChange={(e) => setPlaintiffsClaim(e.target.value)}
                                    value={plaintiffsClaim}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Defendant's Argument"
                                    variant="outlined"
                                    onChange={(e) => setDefendantsArgument(e.target.value)}
                                    value={defendantsArgument}
                                />
                            </div>

                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Current Status"
                                    variant="outlined"
                                    onChange={(e) => setCurrentStatus(e.target.value)}
                                    value={currentStatus}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Plaintiff's Representation"
                                    variant="outlined"
                                    onChange={(e) => setPlaintiffsRepresentation(e.target.value)}
                                    value={plaintiffsRepresentation}
                                />
                            </div>
                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Defendant representative"
                                    variant="outlined"
                                    onChange={(e) => setDefendantRepresentative(e.target.value)}
                                    value={defendantRepresentative}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Restraining Order"
                                    variant="outlined"
                                    onChange={(e) => setRestrainingOrder(e.target.value)}
                                    value={restrainingOrder}
                                />
                            </div>

                        </>
                    )}






                    {/* Plaintiffs Submitted Documents Section */}
                    <div onClick={togglePlaintiffsSubmittedDocuments} className="section-toggle cursor-pointer shadow-2xl bg-gray-100 flex justify-center p-4 mt-4">
                        Plaintiffs Submitted Documents
                        {/* <FaArrowDownLong /> */}
                    </div>
                    {showPlaintiffsSubmittedDocuments && (
                        <>
                            <div className=' flex  mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Plaintiffs Submitted Document"
                                    variant="outlined"
                                    onChange={(e) => setPlaintiffsSubmittedDocument(e.target.value)} // Corrected this line
                                    value={plaintiffsSubmittedDocument}
                                />
                                <Button type='button' onClick={handleAddPlaintiffsSubmittedDocument} className=' bg-blue-600  text-white px-4 rounded-md'>Add</Button>


                            </div>

                            {/* Show Bullet Points */}
                            <ol className=' list-decimal px-5 '>
                                {plaintiffsSubmittedDocuments.map((doc, index) => (
                                    <li key={index} className='mt-5'>
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className=' border border-black  ring-1 ring-blue-500'
                                            />
                                        ) : (
                                            <span>{doc}</span>
                                        )}
                                        {editIndex === index ? (
                                            <button type='button' className=' bg-green-500 px-5 rounded-md py-1 ml-2' onClick={() => saveEdit(index)}>Save</button>
                                        ) : (
                                            <button type='button' className='bg-red-200 px-5 rounded-md ml-10 py-1 ' onClick={() => startEdit(index, doc)}>Edit</button>
                                        )}
                                    </li>
                                ))}
                            </ol>
                            {/* Additional plantiffs */}
                            <div className=' flex  mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Additional Plaintiff Documents"
                                    variant="outlined"
                                    onChange={(e) => setAdditionalPlaintiffDocument(e.target.value)} // Corrected this line
                                    value={additionalPlaintiffDocument}
                                />

                                <Button type='button' onClick={handleAdditionalPlaintiffDocuments} className=' bg-blue-600  text-white px-4 rounded-md'>Add</Button>
                            </div>

                            {/* additional palntiffs bullet points */}
                            <ol className=' list-decimal px-5 '>
                                {additionalPlaintiffDocuments.map((doc, index) => (
                                    <li key={index} className='mt-5'>
                                        {editIndexa === index ? (
                                            <input
                                                type="text"
                                                value={editValuea}
                                                onChange={(e) => setEditValuea(e.target.value)}
                                                className=' border border-black  ring-1 ring-blue-500'
                                            />
                                        ) : (
                                            <span>{doc}</span>
                                        )}
                                        {editIndexa === index ? (
                                            <button type='button' className=' bg-green-500 px-5 rounded-md py-1 ml-2' onClick={() => saveAEdit(index)}>Save</button>
                                        ) : (
                                            <button type='button' className='bg-red-200 px-5 rounded-md ml-10 py-1 ' onClick={() => startAEdit(index, doc)}>Edit</button>
                                        )}
                                    </li>
                                ))}
                            </ol>


                        </>
                    )}

                    {/*Defendant's Submitted Documents */}
                    <div onClick={toggleDefendantsSubmittedDocuments} className="section-toggle cursor-pointer   shadow-2xl bg-gray-100 flex justify-center p-4 mt-4">
                        Defendant's Submitted Documents
                        {/* <FaArrowDownLong /> */}
                    </div>
                    {showDefendantsSubmittedDocuments && (
                        <>
                            <div className=' flex  mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Defendant's Submitted Documents"
                                    variant="outlined"
                                    onChange={(e) => setDefendantSubmittedDocumentmessage(e.target.value)} // Corrected this line
                                    value={defendantSubmittedDocumentmessage}
                                />

                                <Button type='button' onClick={handleAdddefendantsSubmittedDocuments} className=' bg-blue-600  text-white px-4 rounded-md'>Add</Button>
                            </div>

                            {/* Show Bullet Points */}
                            <ol className=' list-decimal px-5 '>
                                {defendantsSubmittedDocuments.map((doc, index) => (
                                    <li key={index} className='mt-5'>
                                        {editIndex1 === index ? (
                                            <input
                                                type="text"
                                                value={editValue1}
                                                onChange={(e) => setEditValue1(e.target.value)}
                                                className=' border border-black  ring-1 ring-blue-500'
                                            />
                                        ) : (
                                            <span>{doc}</span>
                                        )}
                                        {editIndex1 === index ? (
                                            <button type='button' className=' bg-green-500 px-5 rounded-md py-1 ml-2' onClick={() => savedEdit(index)}>Save</button>
                                        ) : (
                                            <button type='button' className='bg-red-200 px-5 rounded-md ml-10 py-1 ' onClick={() => startdEdit(index, doc)}>Edit</button>
                                        )}
                                    </li>
                                ))}
                            </ol>


                            {/* additional defendants */}
                            <div className=' flex  mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Additional Defendant Documents"
                                    variant="outlined"
                                    onChange={(e) => setAdditionalDefendantDocument(e.target.value)} // Corrected this line
                                    value={additionalDefendantDocument}
                                />

                                <Button type='button' onClick={handleAdditionalDefendantDocument} className=' bg-blue-600  text-white px-4 rounded-md'>Add</Button>
                            </div>


                            {/* Show Bullet Points */}
                            <ol className=' list-decimal px-5 '>
                                {additionalDefendantDocuments.map((doc, index) => (
                                    <li key={index} className='mt-5'>
                                        {editIndexd === index ? (
                                            <input
                                                type="text"
                                                value={editValued}
                                                onChange={(e) => setEditValued(e.target.value)}
                                                className=' border border-black  ring-1 ring-blue-500'
                                            />
                                        ) : (
                                            <span>{doc}</span>
                                        )}
                                        {editIndexd === index ? (
                                            <button type='button' className=' bg-green-500 px-5 rounded-md py-1 ml-2' onClick={() => savedDEdit(index)}>Save</button>
                                        ) : (
                                            <button type='button' className='bg-red-200 px-5 rounded-md ml-10 py-1 ' onClick={() => startDEdit(index, doc)}>Edit</button>
                                        )}
                                    </li>
                                ))}
                            </ol>



                        </>
                    )}


                    {/* Witness */}
                    <div onClick={togglewitness} className="section-toggle cursor-pointer bg-gray-100 shadow-2xl flex justify-center p-4 mt-4">
                        Witnesses
                        {/* <FaArrowDownLong /> */}
                    </div>

                    {witness && (
                        <>
                            <div className=' flex  mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="No. of Witnesses of Plaintiff"
                                    variant="outlined"
                                    onChange={(e) => setNoOfWitnessesOfPlaintiff(e.target.value)} // Corrected this line
                                    value={noOfWitnessesOfPlaintiff}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="No. of Witnesses of Defendant"
                                    variant="outlined"
                                    onChange={(e) => setNoOfWitnessesOfDefendant(e.target.value)} // Corrected this line
                                    value={noOfWitnessesOfDefendant}
                                />
                            </div>
                        </>
                    )}
                    {/* Application */}
                    <div onClick={toggleApplications} className="section-toggle cursor-pointer bg-gray-100 shadow-2xl flex justify-center p-4 mt-4">
                        Application
                        {/* <FaArrowDownLong /> */}
                    </div>
                    {showApplications && (
                        <>

                            <div className='p-4'>
                                <div className=' flex justify-center space-x-5'>
                                    <TextField
                                        type="text"
                                        name="srNo"
                                        placeholder="srNo"
                                        value={formData.srNo}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        type="text"
                                        name="application"
                                        placeholder="Application"
                                        value={formData.application}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        type="text"
                                        name="applicationDate"
                                        placeholder="Application Date"
                                        value={formData.applicationDate}
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        type="text"
                                        name="reply"
                                        placeholder="Reply"
                                        value={formData.reply}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        type="text"
                                        name="replyDate"
                                        placeholder="Reply Date"
                                        value={formData.replyDate}
                                        onChange={handleInputChange}
                                    />



                                    <Button type="button" className=' bg-blue-600  text-white px-4 rounded-md' onClick={handleAddClick}>
                                        {editIndexap === -1 ? "Add" : "Update"}
                                    </Button>
                                </div>






                                <table className='border border-collapse border-black w-full mt-5 text-center'>
                                    <thead>
                                        <tr>
                                            <th className='border border-black'>srNo</th>
                                            <th className='border border-black'>Application</th>
                                            <th className='border border-black'>Application Date</th>
                                            <th className='border border-black'>Reply</th>
                                            <th className='border border-black'>Reply Date</th>
                                            <th className='border border-black'>Edit</th>
                                            <th className='border border-black'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entries.map((entry, index) => (
                                            <tr key={index}>
                                                <td className='border border-black'>{entry.srNo}</td>
                                                <td className='border border-black'>{entry.application}</td>
                                                <td className='border border-black'>{entry.applicationDate}</td>
                                                <td className='border border-black'>{entry.reply}</td>
                                                <td className='border border-black'>{entry.replyDate}</td>
                                                {/* Display other fields here */}
                                                <td className='border border-black'>
                                                    <button className=' bg-red-500 px-3 py-1 rounded' type='button' onClick={() => handleEditClick(index)}>Edit</button>

                                                </td>
                                                <td className='border border-black'>
                                                    <button className=' bg-red-500 px-3 py-1 rounded' type='button' onClick={() => handleDeleteClick(index)}>Delete</button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </>
                    )}

                    <div onClick={toggleDates} className="section-toggle cursor-pointer bg-gray-100 shadow-2xl flex justify-center p-4 mt-4">
                        Dates
                        {/* <FaArrowDownLong /> */}
                    </div>
                    {showDates && (
                        <>
                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Filing of Suit"
                                    variant="outlined"
                                    onChange={(e) => setFilingOfSuit(e.target.value)}
                                    value={filingOfSuit}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="No. of Defendant"
                                    variant="outlined"
                                    onChange={(e) => setNumberOfDefendants(e.target.value)}
                                    value={numberOfDefendants}
                                />
                            </div>


                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="POA Filling date Plaintiff"
                                    variant="outlined"
                                    onChange={(e) => setPoaFilingDatePlaintiff(e.target.value)}
                                    value={poaFilingDatePlaintiff}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="POA Filing Date Defendant"
                                    variant="outlined"
                                    onChange={(e) => setPoaFilingDateDefendant(e.target.value)}
                                    value={poaFilingDateDefendant}
                                />
                            </div>


                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Defendant's Written Statement"
                                    variant="outlined"
                                    onChange={(e) => setDefendantsWrittenStatementDate(e.target.value)}
                                    value={defendantsWrittenStatementDate}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Issues Framed"
                                    variant="outlined"
                                    onChange={(e) => setIssuesFramedDate(e.target.value)}
                                    value={issuesFramedDate}
                                />
                            </div>


                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Restraining Order"
                                    variant="outlined"
                                    onChange={(e) => setRestrainingOrderDate(e.target.value)}
                                    value={restrainingOrderDate}
                                />
                                <TextField
                                    className='w-full mb-4'
                                    label="Last Date of Hearing"
                                    variant="outlined"
                                    onChange={(e) => setPrevHearing(e.target.value)}
                                    value={prevhearing}
                                />
                            </div>

                            <div className=' flex  justify-evenly mt-3 space-x-2'>
                                <TextField
                                    className='w-full mb-4'
                                    label="Next date of Hearing"
                                    variant="outlined"
                                    onChange={(e) => setNextHearing(e.target.value)}
                                    value={nexthearing}
                                />

                            </div>

                        </>
                    )}






                    <div className=' flex justify-center mt-10'>
                        <button className=' bg-purple-300 px-10 py-2 rounded hover:text-white' type='submit'>Submit</button>
                        {message && (
                            <div className={`p-4 text-center ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addcase;
