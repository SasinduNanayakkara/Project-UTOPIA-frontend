import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'

function UpdateDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const doctorID = location.state.id;
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [username, setUsername] = useState("");
    const [Hospital, setHospital] = useState("");
    const [NIC, setNIC] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [passwordMatch, setPasswordMatch] = useState(true);
    console.log(doctorID);
    useEffect(() => {
        const getDoctorDetails = async () => {
            try {
                const hospitalResponse = await axios.get(`${baseUrl}/hospital`);
                if (hospitalResponse) {
                    console.log("ok");
                    // response.data.map((hospital) => {
                    //   setHospitals((prev) => [...prev, {id: hospital.id, name: hospital.name}]);
                    // });
                    setHospitals(hospitalResponse.data);
                }
                const doctorResponse = await axios.get(`${baseUrl}/doctor/${doctorID}`);
                if (doctorResponse) {
                    console.log("ok");
                    setFirst_name(doctorResponse.data.first_name);
                    setLast_name(doctorResponse.data.last_name);
                    setEmail(doctorResponse.data.email);
                    setUsername(doctorResponse.data.username);
                    setSpecialization(doctorResponse.data.specialization);
                    setHospital(doctorResponse.data.hospitalID);
                    setNIC(doctorResponse.data.NIC);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getDoctorDetails();
    }, []);
    console.log(hospitals);
    console.log(first_name);

    const handleSubmit = async (e) => {
        console.log("hospital id", Hospital);
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/doctor/${doctorID}`, { first_name, last_name, email, username, specialization, hospitalID: Hospital, NIC });
            if (response) {
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="h-screen">
            <Header />
            <div className="h-full">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                    </div>
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form class="w-full max-w-lg">
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <h2 class="mb-10 mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Update Doctor Details</h2>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        First Name
                                    </label>
                                    <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First name" />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Last Name
                                    </label>
                                    <input value={last_name} onChange={(e) => setLast_name(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last name" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Email
                                    </label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Email" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Specialization
                                    </label>
                                    <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Specialization" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        NIC
                                    </label>
                                    <input value={NIC} onChange={(e) => setNIC(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="NIC" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Username
                                    </label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Username" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Password
                                    </label>
                                    <input value={"asd123"} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Hospital
                                    </label>
                                    <div class="relative">
                                        <select value={Hospital} onChange={(e) => setHospital(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            {hospitals.map((hospital) => (
                                                <option value={hospital._id}>{hospital.name}</option>
                                            ))}
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between mb-6">
                                <button onClick={(e) => { handleSubmit(e) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateDoctor

