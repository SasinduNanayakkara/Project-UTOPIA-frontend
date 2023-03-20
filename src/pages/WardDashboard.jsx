import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Patients from "../Asserts/patients.jpg";
import Nurses from "../Asserts/Hospital.png";
import Inventories from "../Asserts/Inventory.png";
import Medicines from "../Asserts/Medicine.png";
import SergicalImg from "../Asserts/serge.jpg";
import Ward from "../Asserts/ward.jpg";
import axios from "axios";
import { baseUrl } from "../App";

function WardDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const HospitalID = location.state.HospitalID;
    const wardID = location.state.wardID;
	const [wardName, setWardName] = useState("");
    // const no_of_beds = location.state.no_of_beds;
    console.log("ward", wardID);
    console.log("hospital ID", HospitalID);

	useEffect(() => {
		const authenticate = async () => {
			if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "doctor") {
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
		const getWardData = async () => {
			const response = await axios.get(`${baseUrl}/ward/${wardID}`);
			if (response) {
				setWardName(response.data.name);
			}
		}
		getWardData();
	},[]);
	console.log("ward name", wardName);
    const navigateToPatients = (e) => {
        navigate('/patients', { state: { wardID: wardID, HospitalID: HospitalID } });
    }
    const navigateToNurses = (e) => {
      navigate('/nurses', { state: { wardID: wardID, HospitalID: HospitalID } });
  }

	const navigateToInventory = (e) => {
		navigate("/inventories", { state: { wardID: wardID } });
	};
	const navigateToMedicine = (e) => {
		navigate("/medicines", { state: { wardID: wardID } });
	};
	const navigateToSurgicalInventories = (e) => {
		navigate("/surgicalInventories", { state: { wardID: wardID } });
	};

	const navigateToProfile = (e) => {
		navigate("/nurseProfile", { state: { ID: localStorage.getItem("ID") } });
	}

	return (
		<>
			<div>
				<Header
					username={localStorage.getItem("username")}
					first_name={localStorage.getItem("first_name")}
				/>
			</div>
			<table>
				<tr>
					<td className="w-fit">
						<div className="bg-main-blue w-[100%] h-full">
							<div className="flex justify-center items-center">
								<div className="ml-20 w-full ">
									<div className="w-[75%] mb-10 mt-12">
										<h2 class="text-center mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">
											Ward Dashboard
										</h2>
									</div>

									<div className="w-3/4 mb-10 mt-12 ">
										<h6 className="text-center mb-10 mt-8 ml-10 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl py-2 rounded shadow-lg">
											Ward Name: {wardName}
											
										</h6>
									</div>
									<div className="bg-white w-[65%] h-auto p-14 rounded-xl mt-10 mb-10 mr-10 ml-10">
										<div className="flex-row">
											<div className="mr-80">
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToPatients
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg  px-[11.45rem] rounded">
															Patients Details
														</button>
														<img
															src={Patients}
															className="mt-1 h-20 w-35"
															alt="exams"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-600 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToInventory
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[11.06rem] rounded">
															Inventory Details
														</button>
														<img
															src={
																Inventories
															}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToNurses
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[11.80rem] rounded">
															Nurses Details
														</button>
														<img
															src={Nurses}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-600 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToMedicine
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[11.20rem] rounded">
															Medicine Details
														</button>
														<img
															src={Medicines}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
												<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToSurgicalInventories
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[10.76rem] rounded">
															Surgical Inventories
														</button>
														<img
															src={
																SergicalImg
															}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
												{
													localStorage.getItem("role") === "ward manager" ? (
														<div className="my-10 flex flex-row">
													<div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
														<button
															onClick={
																navigateToProfile
															}
															class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[10.76rem] rounded">
															Ward Manager Profile
														</button>
														<img
															src={
																SergicalImg
															}
															className="mt-1 h-20 w-35"
															alt="timetable"
														/>
													</div>
												</div>
													) : (
														<div></div>
													)
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</td>
					<td className="bg-main-blue w-fit">
						<div class="lg:w-[80%] flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
							<div class="text-white">
								<img
									src={Ward}
									className="mt-5 h-100% w-100%"
									alt="Ward"
								/>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</>
	);
}

export default WardDashboard;
