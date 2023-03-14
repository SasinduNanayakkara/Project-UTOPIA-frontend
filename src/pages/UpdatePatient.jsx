import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'

function UpdatePatient() {
    const navigate = useNavigate();
    const location = useLocation();
    const hospitalID = location.state.HospitalID;
    const patientID = location.state.patientID;
    const wardID = location.state.wardID;

    const [ward, setWard] = useState("");
    const [wards, setWards] = useState([]);
    const [name, setName] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [gender, setGender] = useState("male");
    const [pulse, setPulse] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [complain, setComplain] = useState("");
    const [medical_history, setMedical_history] = useState("");
    const [NIC, setNIC] = useState("");
    const [surgical_history, setSurgical_history] = useState("");
    const [food_allergies, setFood_allergies] = useState("");
    const [drug_allergies, setDrug_allergies] = useState("");
    const [guardian_Details, setGuardian_Details] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("admitted");
    const [discharge_date, setDischarge_date] = useState("");


    console.log(patientID);
    useEffect(() => {
        const getDoctorDetails = async () => {
            try {
                const wardResponse = await axios.get(`${baseUrl}/ward/hospital/${hospitalID}`);
                if (wardResponse) {
                    console.log(" wards ok");
                    setWards(wardResponse.data);
                }
                const NurseResponse = await axios.get(`${baseUrl}/patient/${patientID}`);
                if (NurseResponse) {
                    console.log("patient data ok");
                    setName(NurseResponse.data.name);
                    setNIC(NurseResponse.data.NIC);
                    setBloodType(NurseResponse.data.blood_type);
                    setGender(NurseResponse.data.gender);
                    setPulse(NurseResponse.data.pulse);
                    setWard(NurseResponse.data.ward);
                    setWeight(NurseResponse.data.weight);
                    setHeight(NurseResponse.data.height);
                    setComplain(NurseResponse.data.complain);
                    setMedical_history(NurseResponse.data.medical_history);
                    setSurgical_history(NurseResponse.data.surgical_history);
                    setFood_allergies(NurseResponse.data.food_allergies);
                    setDrug_allergies(NurseResponse.data.drug_allergies);
                    setGuardian_Details(NurseResponse.data.guardian_Details);
                    setAddress(NurseResponse.data.address);
                    setPhone(NurseResponse.data.phone);
                    setStatus(NurseResponse.data.status);
                    setDischarge_date(NurseResponse.data.discharge_date);
                    setWard(NurseResponse.data.ward);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getDoctorDetails();
    }, []);
    console.log(wards);
    console.log(name);

    const handleSubmit = async (e) => {
        console.log("ward id", wardID);
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/patient/${patientID}`, { name, NIC, gender, pulse, weight, height, complain, medical_history, surgical_history, food_allergies, drug_allergies, guardian_Details, address, phone, status, discharge_date, ward: wardID });
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
                                <h2 class="mb-10 mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Update the Patient</h2>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Patient Name
                                    </label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Patient name" />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        NIC
                                    </label>
                                    <input value={NIC} onChange={(e) => setNIC(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="NIC" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Blood Type
                                    </label>
                                    <div class="relative">
                                        <select defaultValue={bloodType} onChange={(e) => setBloodType(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option value="">-</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Gender
                                    </label>
                                    <div class="relative">
                                        <select defaultValue={gender} onChange={(e) => setGender(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Patient Status
                                    </label>
                                    <div class="relative">
                                        <select defaultValue={status} onChange={(e) => setStatus(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option value="admitted">admitted</option>
                                            <option value="discharged">discharged</option>
                                            <option value="dead">dead</option>
                                            <option value="transferred">transferred</option>
                                            <option value="missing">missing</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Address
                                    </label>
                                    <input value={address} onChange={(e) => setAddress(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Address" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Phone Number
                                    </label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="756 123 2343" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Guardian Details
                                    </label>
                                    <input value={guardian_Details} onChange={(e) => setGuardian_Details(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Guardian Details" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Pulse
                                    </label>
                                    <input value={pulse} onChange={(e) => setPulse(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Weight
                                    </label>
                                    <input value={weight} onChange={(e) => setWeight(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                        Height
                                    </label>
                                    <input value={height} onChange={(e) => setHeight(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        complain
                                    </label>
                                    <input value={complain} onChange={(e) => setComplain(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Complain" />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Medical History
                                    </label>
                                    <input value={medical_history} onChange={(e) => setMedical_history(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Medical History" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Surgical history
                                    </label>
                                    <input value={surgical_history} onChange={(e) => setSurgical_history(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Surgical History" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Food allergies
                                    </label>
                                    <input value={food_allergies} onChange={(e) => setFood_allergies(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Food Allergies" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Drug allergies
                                    </label>
                                    <input value={drug_allergies} onChange={(e) => setDrug_allergies(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Drug Allergies" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Discharge Date
                                    </label>
                                    <input value={discharge_date} onChange={(e) => setDischarge_date(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="date" placeholder="******************" />

                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Ward
                                    </label>
                                    <div class="relative">
                                        <select defaultValue={ward} onChange={(e) => setGender(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            {wards.map((ward) => (
                                                <option value={ward._id}>{ward.name}</option>
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
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdatePatient

