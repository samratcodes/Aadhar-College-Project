'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';

const Signup = () => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [signingUp, setSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSignUp = async (values) => {
    setSigningUp(true);
    setError('');
  
    try {
        console.log(values)
      const response = await fetch(`${API_URL}auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
    
      
      const data = await response.json();
  
      if (response.ok) {
        router.push('/userlogin'); // redirect on success
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSigningUp(false);
    }
  };
  

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .matches(/[A-Z]/, 'At least one uppercase')
      .matches(/[a-z]/, 'At least one lowercase')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[^a-zA-Z0-9]/, 'At least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  return (
    <div className="flex items-center justify-center w-full bg-gray-50 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-xl h-full">
        <div className="flex flex-col justify-center px-6 md:px-10 pb-8 space-y-6">
          <div className="space-y-8">
            <h1 className="text-LoginCustom font-bold text-green-600 text-center md:text-left text-[30px] md:text-[35px] lg:text-[38px] mb-3">
              Create Your Account
            </h1>

            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
            >
              {({ handleSubmit, touched, errors }) => (
                <Form onSubmit={handleSubmit} className="space-y-6">
                                      <div className="flex gap-4">
                    <div className="w-1/2">
                      <label htmlFor="firstName" className="font-normal text-lg text-blue-950">
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.firstName && touched.firstName
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-1/2">
                      <label htmlFor="lastName" className="font-normal text-lg text-blue-950">
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.lastName && touched.lastName
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="username" className="font-normal text-lg text-blue-950">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.username && touched.username
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="email" className="font-normal text-lg text-blue-950">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Eg. janedoe@gmail.com"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.email && touched.email
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>



                  <div className="relative">
                    <label htmlFor="password" className="font-normal text-lg text-blue-950">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className={`w-full mt-1 p-2 ring-1 rounded-md focus:outline-none ${
                        errors.password && touched.password
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-10 transform text-gray-500"
                    >
                      {showPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />}
                    </button>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="relative">
                    <label htmlFor="confirmPassword" className="font-normal text-lg text-blue-950">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`w-full mt-1 p-2 ring-1 rounded-md focus:outline-none ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-10 transform text-gray-500"
                    >
                      {showConfirmPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />}
                    </button>
                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white text-lg bg-green-600 rounded-md"
                  >
                    {signingUp ? (
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center">
              <span className="text-base font-normal">
                Already have an account?{' '}
                <Link href="/userlogin" className="text-blue-800">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex items-center justify-center h-full">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Signup Illustration"
            width={500}
            height={800}
            className="w-[70%] h-[80vh] object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
