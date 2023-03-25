import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header';

function HospitalReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const HospitalID = location.state.hospitalID;
    const HospitalName = location.state.hospitalName;
    const [wards, setWards] = useState([]);
    const [patients, setPatients] = useState([]);
    const [click, setClick] = useState(false);
    let newAdmissionCount = 0;
    let dischargedCount = 0;
    let deathCount = 0;
    let transferCount = 0;
    let missingCount = 0;
    let newAdmissionCountArray = [];
    let dischargedCountArray = [];
    let deathCountArray = [];
    let transferCountArray = [];
    let missingCountArray = [];
    const [newAdmissionCountArrayValue, setNewAdmissionCountArrayValue] = useState([]);
    const [dischargedCountArrayValue, setDischargedCountArrayValue] = useState([]);
    const [transferCountArrayValue, setTransferCountArrayValue] = useState([]);
    const [deathCountArrayValue, setDeathCountArrayValue] = useState([]);
    const [missingCountArrayValue, setMissingCountArrayValue] = useState([]);

    const reportData = {
        
    }

    useEffect(() => {
        const authenticate = async () => {
            if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "night in charge") {
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
                const response = await axios.get(`${baseUrl}/wardPatient/${HospitalID}`);
                if (response) {
                    setWards(response.data);
                }
            }
            catch (error) {
                alert(error)
            }
        }
        getData();
    }, []);

    let date = new Date();
    date = date.toISOString().substring(0, 10)

    
    useEffect(() => {
        const getCounts = () => {
            setClick(true);

            wards.map(ward => {
                ward.patientId.map((patient, index) => {
                    if (patient.updatedAt.substring(0, 10) === date) {
                    
                    if (patient.admit_date.substring(0, 10) === date) {
                        newAdmissionCount += 1;
                    }
                    if (patient.discharge_date) {
                        if (patient.discharge_date.substring(0, 10) === date) {
                            dischargedCount += 1;
                        }
                    }
                    if (patient.status === "dead") {
                        deathCount += 1;
                    }
                    if (patient.status === "transferred") {
                        transferCount += 1;
                    }
                    if (patient.status === "missing") {
                        missingCount += 1;
                    }
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
                missingCount = 0;
            });

            setNewAdmissionCountArrayValue(newAdmissionCountArray);
            setDischargedCountArrayValue(dischargedCountArray);
            setDeathCountArrayValue(deathCountArray);
            setTransferCountArrayValue(transferCountArray);
            setMissingCountArrayValue(missingCountArray);
        }

        getCounts();
    }, [newAdmissionCountArrayValue]);




    return (
        <div>
            <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
            <h2 class="mb-10 mt-5 text-3xl font-extrabold leading-none ml-20 tracking-tight text-gray-900 md:text-4xl dark:text-black">Hospital Report</h2>
            <div className="w-2/4 mb-10 mt-12 ">
                <h6 className="text-center mb-10 mt-8 ml-10 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl py-2 rounded shadow-lg">
                    Hospital Name : {HospitalName}
                </h6>
            </div>
            <div className="flex flex-col mx-20">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Details / Wards</th>
                                        {wards.map((ward, index) => (
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
                                            newAdmissionCountArrayValue.map((count, index) => (

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
                                            dischargedCountArrayValue.map((count, index) => {
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
                                            deathCountArrayValue.map((count, index) => (
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
                                            transferCountArrayValue.map((count, index) => (
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
                                            missingCountArrayValue.map((count, index) => (
                                                <td className="whitespace-nowrap px-6 py-4">{count}</td>
                                            ))
                                        }
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalReport