import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';

function HospitalReport() {
    const location = useLocation();
    const navigate = useNavigate();
    // const HospitalID = location.state.HospitalID;
    const HospitalID = "6408d47f1bd1a23165fb9d18";
    const [wards, setWards] = useState([]);
    const [patients, setPatients] = useState([]);
    const [click, setClick] = useState(false);
    let newAdmissionCount = 0;
    let dischargedCount = 0;
    let deathCount = 0;
    let transferCount = 0;
    let missingCount = 0;
    const newAdmissionCountArray = [];
    const dischargedCountArray = [];
    const transferCountArray = [];
    const deathCountArray = [];
    const missingCountArray = [];

    useEffect(() => {
		const authenticate = async () => {
			if (localStorage.getItem("role") === "admin") {
				return true;
			}
			else {
				alert("You are not authorized to view this page");
				navigate(-1);
			}
		}
		authenticate();
	});
    
    useEffect(() => {
        const getData = async () => {
            try {
                console.log("1");
                const response = await axios.get(`${baseUrl}/wardPatient/${HospitalID}`);
                if (response) {
                    console.log("response" ,response.data);
                    setWards(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        getCounts();
    });

    console.log("wards", wards);
    let date = new Date();
    date = date.toISOString().substring(0, 10)
    console.log("ISO today", date);

    const getCounts = () => {
        setClick(true);
        // console.log("click", click);
        wards.map(ward => {
            // console.log("patients ",ward.patientId);
            ward.patientId.map((patient, index) => {
                // console.log("patient admit date",patient.updatedAt.substring(0, 10));
                if (patient.admit_date.substring(0, 10) === '2023-03-19') {
                    newAdmissionCount += 1;
                    console.log("ok", newAdmissionCount);
                }
                if (patient.discharge_date) {
                    console.log("asd");
                    if (patient.discharge_date.substring(0,10) === date) {  
                        dischargedCount += 1;
                        console.log("ok", dischargedCount);
                    }
                }
                if (patient.status === "dead") {
                    deathCount += 1;
                }
                if (patient.status === "transferred") {
                    transferCount += 1;
                }
                if (patient.status === "missing") {
                    transferCount += 1;
                }
            });
            newAdmissionCountArray.push(newAdmissionCount);
            dischargedCountArray.push(dischargedCount);
            deathCountArray.push(deathCount);
            transferCountArray.push(transferCount);
            missingCountArray.push(missingCount);
            newAdmissionCount = 0;
            dischargedCount = 0;
            deathCount = 0;
            transferCount = 0;
        })
        console.log("new admission count", newAdmissionCountArray);
        console.log("new discharge count", dischargedCountArray);
        console.log("new death count", deathCountArray);
        console.log("new transfer count", transferCountArray);
        console.log("new missing count", missingCountArray);

        newAdmissionCountArray.map((count, index) => {
            console.log("new admission count Array", count);
        })
    }



    // console.log( "all wards", wards);
    // console.log("all patients", patients);
    return (
        <div className="flex flex-col mx-20">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                <th scope="col" className="px-6 py-4">Details / Wards</th>
                                   { wards.map((ward, index) => (
                                       <th scope="col" className="px-6 py-4">{ward.wardId.name}</th>
                                   ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        No of beds
                                    </td>
                                    {
                                        wards.map((ward, index) => (
                                            <td className="whitespace-nowrap px-6 py-4">{ward.wardId.no_of_beds}</td>
                                        ))
                                    }
                                </tr>
                                <tr
                                    className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        New Admissions
                                    </td>
                                    {
                                        newAdmissionCountArray.forEach((count, index) => (    
                                            <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                        ))
                                    }
                                </tr>
                                <tr
                                    className="border-b border-success-200 bg-success-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Discharge
                                    </td>
                                    {
                                        dischargedCountArray.map((count, index) => {
                                            return (
                                                <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                            )
                                        })
                                    }
                                </tr>
                                <tr
                                    className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Death
                                    </td>
                                    {
                                        deathCountArray.map((count, index) => (
                                            <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                        ))
                                    }
                                </tr>
                                <tr
                                    className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        transfer
                                    </td>
                                    {
                                        transferCountArray.map((count, index) => (
                                            <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                        ))
                                    }
                                </tr>
                                <tr
                                    className="border-b border-info-200 bg-info-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        missing
                                    </td>
                                    {
                                        missingCountArray.map((count, index) => (
                                            <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                        ))
                                    }
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button onClick={(e) => getCounts(e)}>click</button>
        </div>
    )
}

export default HospitalReport