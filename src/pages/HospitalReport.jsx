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
    const newAdmissionCount = [0];
    const dischargedCount = [0];
    const transferCount = [0];
    const deathCount = [0];
    const missingCount = [0];

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
    // useEffect(() => {
    //     const getData = async () => {
    //         try {

    //             const response = await axios.get(`${baseUrl}/ward/hospital/${HospitalID}`);
    //             if (response) {
    //                 // console.log(response.data);
    //                 setWards(response.data);
    //             }
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     }        
    //     getData();
    // },[]);

    // useEffect(() => {
    //     const getWardData = async () => {
    //         try {
    //             const response = await axios.get(`${baseUrl}/ward/hospital/${HospitalID}`);
    //             if (response) {
    //                 const newWard = response.data.map((ward) => ({
    //                     name: ward.name,
    //                     no_of_beds: ward.no_of_beds,
    //                     wardID: ward._id
    //                 }));
    //                 setWards(newWard);
    //             }
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getWardData();
    // }, []);

    // useEffect(() => {
    //     const getPatients = async () => {
    //         wards.map(async (ward) => {
    //             console.log("1");
    //             try {
    //             console.log("2");
    //                 const response = await axios.get(`${baseUrl}/patient/ward/${ward.wardID}`);
    //                 if (response) {
    //             console.log("3");
    //                     const newPatient = response.data.map((patient) => ({
    //                         name: patient.name,
    //                         age: patient.age,
    //                         status: patient.status,
    //                         disChargeDate: patient.discharge_date,
    //                         ward: patient.ward,
    //                         hospital: patient.hospital,
    //                         id: patient._id,
    //                         updatedAt: patient.updatedAt.substring(0, 10),
    //                         createdAt: patient.createdAt.substring(0, 10)
    //                     }));
    //             console.log("4");
    //                     setPatients(newItem => [...newItem, newPatient]);
    //                 }
    //             }
    //             catch (error) {
    //                 console.log("5");
    //                 console.log(error);
    //             }
    //         });
    //     }
    //     getPatients();
    // },[]);
    // console.log("wards", wards);
    // console.log("patients", patients);


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/wardPatient/${HospitalID}`);
                if (response) {
                    console.log(response.data);
                    setWards(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    console.log("wards", wards);

    const getCounts = () => {
        setClick(true);
        console.log("click", click);
        patients.map((patient, index) => {
            patient.map((item) => {
                console.log("working");
                if (item.updatedAt === new Date().toISOString().substring(0, 10) || item.createdAt === new Date().toISOString().substring(0, 10)) {
                    if (item.status === "admitted") {
                        newAdmissionCount[index] += 1;
                        console.log("newAdmissionCount", newAdmissionCount[index]);
                    }
                }
            });
        });
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
                                <th scope="col" className="px-6 py-4">Details</th>
                                   { wards.map((ward, index) => (
                                       <th scope="col" className="px-6 py-4">{ward.wardId}</th>
                                   ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Default
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Primary
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Secondary
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-success-200 bg-success-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Success
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Danger
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Warning
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-info-200 bg-info-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Info
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Light
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Dark
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
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