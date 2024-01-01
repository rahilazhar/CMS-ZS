import React, { useState, useEffect, useContext } from 'react'
import { urlapi } from '../../Components/Menu';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserContext } from '../../Context/Usercontext';
import { AuthContext } from '../../Context/AuthContext';
import { Button } from '@mui/material';

const Editcase = () => {
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
    const { id } = useParams()
    const [caseedit, setCaseedit] = useState([])
    const [title, setTitle] = useState('')
    const [suitno, setSuitNo] = useState('');
    const [nature, setNature] = useState('');
    const [prevhearing, setPrevHearing] = useState('');
    const [nexthearing, setNextHearing] = useState('');
    const [factsheet, setFactSheet] = useState('');
    const [progressreport, setProgressReport] = useState('');
    const [isError, setIsError] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [courtname, setCourtname] = useState("")
    const [lawyer, setLawyer] = useState('');
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


    const [filingOfSuit, setFilingOfSuit] = useState('');
    const [numberOfDefendants, setNumberOfDefendants] = useState('');
    const [poaFilingDatePlaintiff, setPoaFilingDatePlaintiff] = useState('');
    const [poaFilingDateDefendant, setPoaFilingDateDefendant] = useState('');
    const [defendantsWrittenStatementDate, setDefendantsWrittenStatementDate] = useState('');
    const [issuesFramedDate, setIssuesFramedDate] = useState('');
    const [restrainingOrderDate, setRestrainingOrderDate] = useState('');
    const [valueofsuit, setValueofsuit] = useState('')



    // plantiffs
    const [editIndex, setEditIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');

    // Additionl plantiffs
    const [editIndexa, setEditIndexa] = useState(-1);
    const [editValuea, setEditValuea] = useState('');


    // defendants
    const [editIndex1, setEditIndex1] = useState(-1);
    const [editValue1, setEditValue1] = useState('');


    // Additional defendants bullets edits
    const [editIndexd, setEditIndexd] = useState(-1);
    const [editValued, setEditValued] = useState('');

    // Get the user from the session storage and then take the toke on that user 
    const user = sessionStorage.getItem('user')
    const token = user ? JSON.parse(user).token : null


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




    // this handler is used to update the edit details of the case 
    // [Update Edit Details]
    const Updatecasehandler = async (e) => {
        e.preventDefault();

        const updateddata = {
            title: title,
            Suitno: suitno,
            court: courtname,
            lawyer: lawyer,
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
            nexthearing: nexthearing,
            prevhearing: prevhearing,
            NatureofSuit: nature




        };
        try {
            let response = await axios.put(`${urlapi}/api/v1/auth/editentries/${id}`, updateddata, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the header
                }
            });
            // Update the message extraction here
            setResponseMessage(response.data.message || "Entry updated successfully");
        } catch (error) {
            console.error('Error updating data:', error);

            // Check if the error is related to authentication
            if (error.response && error.response.data) {
                if (error.response.status === 401) { // 401 is the status code for authentication errors
                    setResponseMessage(error.response.data.error || 'Please authenticate.');
                } else {
                    // Handle other types of errors that might come from the backend
                    setResponseMessage(error.response.data.message || 'Failed to update entry');
                }
            } else {
                // Generic message for other types of errors (like network issues)
                setResponseMessage('Failed to update entry');
            }
        }
    };


    // [-----------------------------------------------------------------------------------------------------]





    useEffect(() => {
        const fetchData = async () => {
            try {
                // Build the URL dynamically based on whether 'id' is available
                let apiUrl = `${urlapi}/api/v1/auth/getentries`;
                if (id) {
                    apiUrl += `/${id}`;
                }
                const response = await axios.get(apiUrl);
                const data = response.data;

                // Assuming 'setCaseedit' and 'setTitle' are state setters
                setCaseedit(data);

                if (data) {
                    // This assumes that if a single object is returned, it has a 'title' property
                    setTitle(data.title);
                    setSuitNo(data.Suitno)
                    setCourtname(data.court)
                    setLawyer(data.lawyer)
                    setNextHearing(data.nexthearing)
                    setPrevHearing(data.prevhearing)
                    setNature(data.nature ?? data.NatureofSuit)
                    setFactSheet(data.factsheet ? data.factsheet : "No Data")
                    setProgressReport(data.progressreport)
                    setPlaintiffsBackground(data.PlaintiffsBackground)
                    setPlaintiffsClaim(data.PlaintiffsClaim);
                    setDefendantsArgument(data.DefendantsArgument);
                    setCurrentStatus(data.CurrentStatus);
                    setPlaintiffsRepresentation(data.PlaintiffsRepresentation);
                    setDefendantRepresentative(data.Defendantrepresentative);
                    setRestrainingOrder(data.RestrainingOrder);




                    setPlaintiffsSubmittedDocuments(data.PlaintiffsSubmittedDocuments)
                    setAdditionalPlaintiffDocuments(data.AdditionalPlaintiffDocuments);
                    setDefendantsSubmittedDocuments(data.DefendantsSubmittedDocuments)
                    setAdditionalDefendantDocuments(data.AdditionalDefendantDocuments)
                    setNoOfWitnessesOfPlaintiff(data.NoofWitnessesofPlaintiff)
                    setNoOfWitnessesOfDefendant(data.NoofWitnessesofDefendant)
                    setEntries(data.application)


                    setFilingOfSuit(data.filingOfSuit)
                    setNumberOfDefendants(data.numberOfDefendants)
                    setPoaFilingDatePlaintiff(data.poaFilingDatePlaintiff)
                    setPoaFilingDateDefendant(data.poaFilingDateDefendant)
                    setDefendantsWrittenStatementDate(data.defendantsWrittenStatementDate)
                    setIssuesFramedDate(data.issuesFramedDate)
                    setRestrainingOrderDate(data.restrainingOrderDate)





                    {/* {caseedit.PlaintiffsSubmittedDocuments && caseedit.PlaintiffsSubmittedDocuments.map((document, index) => (
                        <div key={index}>{document}</div>
                    ))} */}

                    // setAdditionalPlaintiffDocuments([data.additionalPlaintiffDocuments.map((item)=>item)])


                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [id]); // Include 'id' in the dependency array if it's expected to change



    const titlehandler = (e) => {
        // Replace any forward slashes with an empty string
        const updatedValue = e.target.value.replace(/\//g, '');
        setTitle(updatedValue);
    }


    const Adminrequest = async () => {
        try {

            const response = await fetch(`${urlapi}/api/v1/auth/reqedit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                alert('Edit request submitted successfully');
            } else {
                alert(data.message || 'Error submitting edit request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send edit request');
        }
    }


    useEffect(() => {
        if (responseMessage) {
            const timer = setTimeout(() => {
                setResponseMessage('');
            }, 2000); // Clear the message after 2 seconds

            // Clean up the timer when the component is unmounted or the message changes
            return () => clearTimeout(timer);
        }
    }, [responseMessage]); // Dependency array, this effect runs every time responseMessage changes


    console.log(caseedit.Suitno, 'casedir')

    return (
        <>
            <body className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
                <div className='w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                    <h2 class="text-2xl font-semibold mb-4 text-center">Edit Case</h2>



                    <div className='flex   mt-3 space-x-2'>
                        <TextField label="Title" className='w-full'
                            onChange={titlehandler} value={title} />




                        <TextField className='w-full' id="standard-basic" label="Suit No"
                            onChange={(e) => setSuitNo(e.target.value)} value={suitno} />
                    </div>


                    <div className=' flex  space-x-2 mt-3'>
                        <TextField className=' w-full' id="standard-basic" label="Nature"
                            onChange={(e) => setNature(e.target.value)} value={nature} multiline />
                        <TextField className=' w-full' id="standard-basic" label="Previous hearing"
                            onChange={(e) => setPrevHearing(e.target.value)} value={prevhearing} />
                    </div>


                    <div className=' flex  space-x-2 mt-3'>
                        <TextField className=' w-full' id="standard-basic" label="Next hearing"
                            onChange={(e) => setNextHearing(e.target.value)} value={nexthearing} />
                        <TextField className=' w-full' id="standard-basic" label="Factsheet"
                            onChange={(e) => setFactSheet(e.target.value)} value={factsheet} />
                    </div>

                    {/* <div className=' flex justify-start ml-[100px]'>
                        <FormControl  sx={{ m: 1, minWidth: 190 }}>
                            <InputLabel className=' w-full' id="demo-simple-select-standard-label">Progress Report</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={progressreport}
                                label="Age"
                                onChange={(e) => setProgressReport(e.target.value)}
                            >

                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>

                            </Select>
                        </FormControl>
                    </div> */}

                    <div className=' flex space-x-2 mt-3'>
                        <Select
                            labelId="court-label"
                            id="court-select"
                            value={courtname}
                            onChange={(e) => setCourtname(e.target.value)}
                            label="Court Name"
                            className='w-full mb-4'
                        >
                            {courtNames.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField className=' w-full' id="standard-basic" label="Lawyer Name"
                            onChange={(e) => setLawyer(e.target.value)} value={lawyer} />

                    </div>

                    <div className=' flex   space-x-2 mt-3'>
                        <TextField className=' w-full' id="standard-basic" label="Plaintiff's Background"
                            onChange={(e) => setPlaintiffsBackground(e.target.value)} value={plaintiffsBackground} />
                        <TextField className=' w-full' id="standard-basic" label="Plaintiff's Claim"
                            onChange={(e) => setPlaintiffsClaim(e.target.value)} value={plaintiffsClaim} />

                    </div>

                    <div className=' flex   space-x-2 mt-3'>
                        <TextField className=' w-full' id="standard-basic" label="Defendant's Argument" onChange={(e) => setDefendantsArgument(e.target.value)} value={defendantsArgument} />
                        <TextField className=' w-full' id="standard-basic" label="Current Status"
                            onChange={(e) => setCurrentStatus(e.target.value)} value={currentStatus} />

                    </div>




                    <div className=' flex space-x-2 mt-3'>
                        <TextField className=' w-full' id="standard-basic" label="Plaintiff's Representation"
                            onChange={(e) => setPlaintiffsRepresentation(e.target.value)} value={plaintiffsRepresentation} />
                        <TextField className=' w-full' id="standard-basic" label="Defendant representative"
                            onChange={(e) => setDefendantRepresentative(e.target.value)} value={defendantRepresentative} />

                    </div>

                    <div className=' flex space-x-2 mt-3'>
                        <TextField className=' w-1/2' id="standard-basic" label="Defendant's Argument"
                            onChange={(e) => setRestrainingOrder(e.target.value)} value={restrainingOrder} />

                    </div>

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
                                    {/* <th className='border border-black'>Delete</th> */}
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
                                        <td className='border border-black p-3'>
                                            <button className=' bg-green-500 px-3 py-1 rounded' type='button' onClick={() => handleEditClick(index)}>Edit</button>

                                        </td>
                                        {/* <td className='border border-black'>
                                            <button className=' bg-red-500 px-3 py-1 rounded' type='button' onClick={() => handleDeleteClick(index)}>Delete</button>

                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


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
                    </div>


                    {/* {caseedit.PlaintiffsSubmittedDocuments && caseedit.PlaintiffsSubmittedDocuments.map((document, index) => (
                        <div key={index}>{document}</div>
                    ))} */}



                    <div className=' flex justify-center mt-10'>
                        <button className=' bg-purple-300 px-10 py-2 rounded hover:text-white' type='button' onClick={Updatecasehandler}>Update</button>

                    </div>
                    <div className=' flex justify-center mt-10'>
                        <button className=' bg-amber-300 px-10 py-2 rounded hover:text-white' type='button' onClick={Adminrequest}>Request For Admin to Allow you to Edit</button>

                    </div>
                    <div className='flex justify-center mt-5 text-lg '>{responseMessage && responseMessage}</div>

                </div>

            </body>
        </>
    )
}

export default Editcase