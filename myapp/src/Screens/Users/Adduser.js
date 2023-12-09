import React from 'react';

const SignUpForm = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign up</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="firstName">First Name</label>
              <input type="text" placeholder="First Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="firstName"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="lastName">Last Name</label>
              <input type="text" placeholder="Last Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="lastName"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="email"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="confirmPassword"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
              <button className="px-6 py-2 mt-4 text-white bg-gray-300 rounded-lg hover:bg-gray-400">Clear</button>
              <a href="#" className="text-sm text-blue-600 hover:underline">Already have an account?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
