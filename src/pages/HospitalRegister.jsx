import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'

function HospitalRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [director, setDirector] = useState("");
  const [directorNIC, setDirectorNIC] = useState("");
  const [noOfWards, setNoOfWards] = useState(0);

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/hospital`, { name, location, director, director_NIC: directorNIC, no_of_wards: noOfWards });
      if (response) {
        alert("Hospital Registered Successfully");
        navigate("/hospitals");
      }
    }
    catch (error) {
      alert("Hospital Registration Failed");
      navigate("/hospitals");
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
                    Hospital Name
                  </label>
                  <input onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Hospital Name" required/>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Location
                  </label>
                  <input onChange={(e) => setLocation(e.target.value)} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Location" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Director Name
                  </label>
                  <input onChange={(e) => setDirector(e.target.value)} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Director Name" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Director NIC
                  </label>
                  <input onChange={(e) => setDirectorNIC(e.target.value)} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Director NIC" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    No Of Wards
                  </label>
                  <input onChange={(e) => setNoOfWards(e.target.value)} required class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="No of Wards" />
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

export default HospitalRegister

