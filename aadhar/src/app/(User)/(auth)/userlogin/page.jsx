'use client';
import {useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';
import Cookies from 'js-cookie';


const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (values) => {
    setSigningIn(true);
    setError('');
  
    try {
      const response = await fetch(`${API_URL}auth/login/`, {
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
  console.log(data)
      if (response.ok) {
        console.log(data)
        Cookies.set('accessToken', data.accessToken, { expires: 7 });
        router.push('/userhome');
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
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol')
      .required('Password is required'),
  });

  return (
    <div className="flex items-center justify-center w-full bg-gray-50 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-xl h-full">
        
        {/* Left: Login Form */}
        <div className="flex flex-col justify-center px-6 md:px-10 pb-8 space-y-6">
          <div className="space-y-8">
            <h1 className="text-LoginCustom font-bold text-green-600 text-center md:text-left text-[30px] md:text-[35px] lg:text-[38px] mb-3">
              Welcome Back!
            </h1>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              {({ handleSubmit, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="font-normal text-lg text-blue-950">
                      Email Address
                    </label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Eg. doessmith@gmail.com"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.email && touched.email
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="relative">
                    <label htmlFor="password" className="font-normal text-blue-950 text-lg">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className={`w-full mt-1 p-2 ring-1 rounded-md focus:outline-none ${
                        errors.password && touched.password
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform  text-gray-500"
                    >
                      {showPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
                    </button>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="text-blue-800  cursor-pointer text-base font-normal">
                    Forget Password?
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white text-lg bg-green-600 rounded-md"
                  >
                    {signingIn ? (
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      <div>
                        Login
                      </div>
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center">
              <span className="text-base font-normal">
                Don’t Have An Account?{' '}
                <Link href="/usersignup" className="text-blue-800">
                  Create Account
                </Link>
              </span>
            </div>
          </div>
        </div>

   {/* Right: Image Grid */}
<div className="hidden md:flex items-center justify-center h-full">
  <Image
    src="https://images.pexels.com/photos/9366074/pexels-photo-9366074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Image 1"
    width={500}
    height={800}
    className="w-[70%] h-[80vh] object-cover rounded-3xl"
  />
</div>


      </div>
    </div>
  );
};

export default Login;
