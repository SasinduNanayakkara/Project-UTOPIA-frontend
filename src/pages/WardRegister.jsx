import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'

function WardRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hospitalID, setHospitalID] = useState("");
  const [no_of_beds, setNo_of_beds] = useState("");

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
    setHospitalID(location.state.hospitalId);
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/ward`, { name, hospitalID, no_of_beds});
      if (response) {
        const WardResponse = await axios.post(`${baseUrl}/wardPatient`, {wardId: response.data._id, hospitalId: hospitalID});
        if (WardResponse) {
          alert("Ward Registered Successfully");
          navigate("/wards", { state: { hospitalId: hospitalID } });
        }
      }
    }
    catch (error) {
      alert("Error in Registering Ward");
      navigate("/wards", { state: { hospitalId: hospitalID } });
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
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Ward Name
                  </label>
                  <input onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Ward Name" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    No of Beds
                  </label>
                  <input onChange={(e) => setNo_of_beds(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="No Of Beds" />
                </div>
              </div>
              <div class="flex items-center justify-between mb-6">
                <button onClick={(e) => { handleSubmit(e) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WardRegister

