// CaseHistoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlapi } from '../Components/Menu';

export const CaseHistoryContext = createContext(null);

export const CaseHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [entry, setEntry] = useState([]);
    const [factview, setFactview] = useState([]);
    const [message, setMessage] = useState('');
    const [updatemessage, setUpdatemessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
    const [editget, setEditget] = useState([]); // New loading state
    const [caseget, setCaseget] = useState([]);
    const [casesrole, setCasesrole] = useState([])
    const [entriesall, setEntriesall] = useState([]);
    const [todayCases, setTodayCases] = useState([]);
    const [error, setError] = useState(null);


    const usert = sessionStorage.getItem('user'); // Retrieve the token
    const token = usert ? JSON.parse(usert).token : null


    // Fetch case history function
    const fetchHistory = async (caseId) => {
        try {
            const url = `${urlapi}/api/v1/auth/gethistory/${caseId}`;
            const response = await axios.get(url);
            setHistory(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        }
    };


    const fetchHistoryentry = async (caseId) => {
        try {
            const url = `${urlapi}/api/v1/auth/getentriesid/${caseId}`;
            const response = await axios.get(url);
            setEntry(response.data);

        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        }
    };


    const fetchfactsheet = async (caseId) => {
        setLoading(true); // Start loading
        setFactview([]); // Reset factview state before loading new data
        try {
            const url = `${urlapi}/api/v1/auth/factsheet/caseentry/${caseId}`;
            const response = await axios.get(url);
            setFactview(response.data);

        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Update case history function
    const updateHistory = async (caseId, date, proceedings) => {
        try {
            const url = `${urlapi}/api/v1/auth/updateschema/${caseId}`;
            const response = await axios.put(url, {
                date,
                proceedings
            });
            setUpdatemessage(response.data.Message);
            setHistory([...history, { date, proceedings }]);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update case entry');
        }
    };
    // const updateHistory = async (caseId, date, proceedings) => {
    //     try {
    //         setLoading(true); // Indicate loading state
    //         const url = `${urlapi}/api/v1/auth/updateschema/${caseId}`;
    //         const response = await axios.put(url, {
    //             date,
    //             proceedings
    //         });
    //         if (response.data && response.data.newEntry) {
    //             setUpdatemessage(response.data.message);
    //             setHistory(prevHistory => [...prevHistory, response.data.newEntry]);

    //             // Update filteredHistory to include the new entry
    //             setHistory(prevFilteredHistory => [...prevFilteredHistory, response.data.newEntry]);
    //         } else {
    //             // Handle the case where the server doesn't return a newEntry as expected
    //             console.error('Server did not return the expected new entry');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setMessage('Failed to update case entry');
    //     } finally {
    //         setLoading(false); // Indicate loading has finished
    //     }
    // };


    const Editrequestget = async (caseId) => {
        setLoading(true); // Start loading
        try {
            const url = `${urlapi}/api/v1/auth/editreqget`;
            const response = await axios.get(url);
            setEditget(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
                setCaseget(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchProtectedData = async () => {


            try {
                const response = await fetch(`${urlapi}/api/v1/auth/getusersonrole`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`

                    }
                });

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const data = await response.json();
                setCasesrole(data)
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };
        fetchProtectedData()
    }, [casesrole, token])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
                setEntriesall(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        Editrequestget()
        fetchData();

    }, []);


    useEffect(() => {
        const fetchTodayCases = async () => {
          try {
            const response = await axios.get(`${urlapi}/api/v1/auth/gettodayentries`);
            setTodayCases(response.data);
          } catch (error) {
            console.error('Error fetching today cases: ', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTodayCases();
      }, []);










    return (
        <CaseHistoryContext.Provider value={{ history,todayCases , error, entriesall, casesrole, message, entry, updatemessage, editget, factview, loading, fetchfactsheet, fetchHistoryentry, fetchHistory, updateHistory, Editrequestget, caseget }}>
            {children}
        </CaseHistoryContext.Provider>
    );
};
