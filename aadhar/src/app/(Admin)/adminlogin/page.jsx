'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (values) => {
    setSigningIn(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}admin/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        
      });

      const data = await response.json();
     
      if (response.ok) {
        Cookies.set('adminAccessToken', data.accessToken, { expires: 7 });
        router.push('/admindashboard'); // redirect to admin dashboard
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase')
      .matches(/[a-z]/, 'Must contain at least one lowercase')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[^a-zA-Z0-9]/, 'Must contain at least one symbol')
      .required('Password is required'),
  });

  return (
    <div className="flex items-center justify-center w-full bg-gray-100 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-xl h-full">
        {/* Left: Admin Login Form */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-10 bg-white shadow-lg rounded-lg h-full">
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-600">Admin Panel</h1>
              <p className="text-gray-500 mt-1">Login to manage the platform</p>
            </div>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              {({ handleSubmit, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="font-medium text-gray-700">
                      Email Address
                    </label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="admin@example.com"
                      className={`w-full p-2 mt-1 border rounded-md focus:outline-none ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-indigo-500'
                      }`}
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="relative">
                    <label htmlFor="password" className="font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-indigo-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-10 text-gray-500"
                    >
                      {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                    </button>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    {signingIn ? (
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

          </div>
        </div>

        {/* Right: Admin Graphic / Image */}
        <div className="hidden md:flex items-center justify-center h-full ">
          <Image
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Admin illustration"
            width={500}
            height={600}
            className="object-cover rounded-2xl shadow-xl w-[80%] h-[80%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
