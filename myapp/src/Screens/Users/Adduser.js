import React, { useState } from 'react';


const SignUpForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)

  const Registerhandler = async (e) => {
    e.preventDefault()


    let formdata = new FormData()

    formdata.append("profilePicture", profilePicture)
    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("role", role)

    let response = await fetch("http://localhost:8000/api/v1/auth/registration", {
      method: "post",
      body: formdata, // use formData object
      headers: {
        // remove "Content-Type" header,
        // the browser will automatically set it to multipart/form-data
        // "Authorization": token ? `Bearer ${token}` : 'No Token Found'
      }


    })
    response = await response.json()
    alert(response.message)


  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign up</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="firstName">Name</label>
              <input type="text" placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="firstName"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Role</label>
              {/* <input type="text" placeholder="Role"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="confirmPassword"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              /> */}

              <select className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600' onChange={(e) => setRole(e.target.value)}>
                <option>--select--</option>
                <option value="User">User</option>
                <option value="Banker">Banker</option>
                <option value="Lawyer">Lawyer</option>
              </select>
            </div>

          
            {/* <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Picture</label>
              <input type="file"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="confirmPassword"
               

              />
            </div> */}
            {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
            <div class="mb-3">
              <label
                for="formFile"
                class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              > </label>
              <input
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />

            </div>
            <div className="flex items-baseline justify-center space-x-3">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={Registerhandler}>Register</button>
              <button className="px-6 py-2 mt-4 text-white bg-gray-300 rounded-lg hover:bg-gray-400">Clear</button>

            </div>
            <div className='text-center'><a href="#" className="text-sm text-blue-600 hover:underline">Already have an account?</a></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
