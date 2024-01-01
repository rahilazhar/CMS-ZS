import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CaseHistoryContext } from '../../Context/CaseHistoryContext';
import { FaFileDownload } from "react-icons/fa";
import { urlapi } from '../../Components/Menu';
import axios from 'axios';


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

const RolebaseCases = () => {

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  // const [selectednature, setSelectedNature] = useState(null);
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
  const [cases, setCases] = useState([])

  const handleClose = () => setOpen(false);


  const { casesrole } = useContext(CaseHistoryContext);





  const natureviewhandler = (entry) => {
    // setSelectedNature(nature)
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

  const downloadFile = async (filename) => {
    try {
        const response = await axios({
            url: `${urlapi}/api/v1/auth/downloadWord/${filename}`, // Replace with your server URL and filename
            method: 'GET',
            responseType: 'blob', // Important
        });

        // Create a new Blob object using the response data of the file
        const file = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        // Create a link element, use it to download the file and remove it
        const fileURL = URL.createObjectURL(file);
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', filename.split('/').pop());
        document.body.appendChild(fileLink);
        
        fileLink.click();

        // Clean up and remove the link
        fileLink.parentNode.removeChild(fileLink);
    } catch (error) {
        console.error('Error during file download', error);
    }
};











  return (
    <>

      <main className=' w-full '>
        <section className="p-4 text-center">
          <div className="bg-gray-200 shadow-xl p-4 font-semibold text-2xl admin-dashboard-title">
            View Case
          </div>
        </section>

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

        <table className='w-full'>
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
            Download Wordfile
          </th>


          <tbody>
            {
              loading ? (
                <tr className='colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500'>
                  <td>Loading...</td>
                </tr>
              ) : casesrole.map((entry, index) => {
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
                      <td className="px- py-4 whitespace-normal text-sm text-gray-500">
                        <button onClick={() => downloadFile(entry.wordFilePath)}><FaFileDownload className='text-2xl hover:text-black' /></button>
                      </td>
                    </tr>


                  </>
                )
              })
            }
          </tbody>
        </table>

      </main>
    </>
  )
}

export default RolebaseCases
