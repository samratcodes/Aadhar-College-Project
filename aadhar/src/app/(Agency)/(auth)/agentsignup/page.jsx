'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Image from 'next/image';

const agentsignup = () => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [signingUp, setSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [backcitizen, setBackCitizen] = useState('');
  const [frontCitizen, setFrontCitizen] = useState('');
  const [valueCertifications, setCertifications] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  
    const handleChange_citizenshipPhotoFront = async (e) => {
      const files = e.target.files;
    
      if (!files || files.length === 0) return;
    
      const file = files[0];
    
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "citizenshipPhotoFront"); // must match your Cloudinary preset
    
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/daaizghcr/image/upload", {
          method: "POST",
          body: data,
        });
    
        const uploadedFile = await res.json();
    
        if (uploadedFile.secure_url) {
          console.log("Uploaded URL:", uploadedFile.secure_url);
          setFrontCitizen(uploadedFile.secure_url);
        } else {
          console.error("Upload failed", uploadedFile);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    const handleChange_profilePicture = async (e) => {
      const files = e.target.files;
    
      if (!files || files.length === 0) return;
    
      const file = files[0];
    
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "profilePicture"); // must match your Cloudinary preset
    
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/daaizghcr/image/upload", {
          method: "POST",
          body: data,
        });
    
        const uploadedFile = await res.json();
    
        if (uploadedFile.secure_url) {
          console.log("Uploaded URL:", uploadedFile.secure_url);
          setProfilePicture(uploadedFile.secure_url);
        } else {
          console.error("Upload failed", uploadedFile);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
    
  const handleChange_citizenshipPhotoBack = async (e) => {
    const files = e.target.files;
  
    if (!files || files.length === 0) return;
  
    const file = files[0];
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "citizenshipPhotoBack"); // must match your Cloudinary preset
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/daaizghcr/image/upload", {
        method: "POST",
        body: data,
      });
  
      const uploadedFile = await res.json();
  
      if (uploadedFile.secure_url) {
        console.log("Uploaded URL:", uploadedFile.secure_url);
        setBackCitizen(uploadedFile.secure_url);
      } else {
        console.error("Upload failed", uploadedFile);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange_certifications = async (e) => {
    const files = e.target.files;
  
    if (!files || files.length === 0) return;

    const file = files[0];
  
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "certifications");
  
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/daaizghcr/image/upload", {
          method: "POST",
          body: data,
        });
  
        const uploadedFile = await res.json();
  
        if (uploadedFile.secure_url) {
          setCertifications(uploadedFile.secure_url);
          console.log("Uploaded URL:", uploadedFile.secure_url);
        } else {
          console.error("Upload failed for a file:", uploadedFile);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }

    };

    const handleSignUp = async (values) => {
      setSigningUp(true);
      setError('');
    
      try {
          console.log(values,frontCitizen,backcitizen,valueCertifications,profilePicture)
        const response = await fetch(`${API_URL}doctor/auth/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            role: values.role,
            password: values.password,
            contactNumber: values.contactNumber,
            citizenshipNumber: values.citizenshipNumber,
            citizenshipPhotoFront: frontCitizen,
            citizenshipPhotoBack: backcitizen,
            bio: values.bio,
            profilePicture: profilePicture,
            experience: values.experience,
            specialization: values.specialization,
            certifications: valueCertifications,
          }),
        });
      
        
        const data = await response.json();
    
        if (response.ok) {
          router.push('/agencylogin'); // redirect on success
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
    contactNumber: Yup.string().required('Contact number is required'),
    citizenshipNumber: Yup.string().required('Citizenship number is required'),
    role: Yup.string()
    .required('Role is required')
    .oneOf(['doctor', 'nurse', 'caretaker'], 'Role must be doctor, nurse, or caretaker'),
      bio: Yup.string().required('Bio is required'),
    experience: Yup.number()
      .required('Experience is required')
      .positive('Experience must be a positive number'),
    specialization: Yup.string().required('Specialization is required'),
  });

  return (
    <div className="flex items-center justify-center w-full bg-gray-50 h-full">
      <div className="flex items-center absolute top-5 left-5 bg-transparent">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={50} 
            height={50} 
            className="cursor-pointer rounded-full" 
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-xl h-full">
        <div className="flex flex-col justify-center px-6 md:px-10 pb-8 space-y-6">
          <div className="space-y-8">
            <h1 className="text-LoginCustom font-bold text-green-600 text-center md:text-left text-[30px] md:text-[35px] lg:text-[38px] mt-10 mb-5">
              Create Your Account
            </h1>

            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                contactNumber: '',
                citizenshipNumber: '',
                citizenshipPhotoFront: '',
                citizenshipPhotoBack: '',
                profilePicture: '',
                bio: '',
                experience: '',
                specialization: '',
                role: '',
                certifications: '',
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

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label htmlFor="username" className="font-normal text-lg text-blue-950">
                        User name
                      </label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="User name"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.username && touched.username
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-1/2">
                      <label htmlFor="role" className="font-normal text-lg text-blue-950">
                        Role
                      </label>
                      <Field
                        name="role"
                        type="text"
                        placeholder="Role"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.role && touched.role
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="role" component="p" className="text-red-500 text-sm" />
                    </div>
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


                  <div>
                    <label htmlFor="contactNumber" className="font-normal text-lg text-blue-950">
                      Contact Number
                    </label>
                    <Field
                      type="number"
                      name="contactNumber"
                      placeholder="Eg. 9800000000"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.contactNumber && touched.contactNumber
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="contactNumber" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="citizenshipNumber" className="font-normal text-lg text-blue-950">
                      Citizenship Number
                    </label>
                    <Field
                      type="text"
                      name="citizenshipNumber"
                      placeholder="Eg. 63456"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.citizenshipNumber && touched.citizenshipNumber
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="citizenshipNumber" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="bio" className="font-normal text-lg text-blue-950">
                      Bio
                    </label>
                    <Field
                      type="text"
                      name="bio"
                      placeholder="Tell us about yourself"
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.bio && touched.bio
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="bio" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label htmlFor="experience" className="font-normal text-lg text-blue-950">
                        Experience
                      </label>
                      <Field
                        name="experience"
                        type="number"
                        placeholder="eg. 2.5 (in years)"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.experience && touched.experience
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="experience" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div className="w-1/2">
                      <label htmlFor="specialization" className="font-normal text-lg text-blue-950">
                        Specialization
                      </label>
                      <Field
                        name="specialization"
                        type="text"
                        placeholder="eg. Cardiologist"
                        className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                          errors.specialization && touched.specialization
                            ? 'ring-red-500 focus:ring-red-500'
                            : 'ring-gray-200 focus:ring-LoginCustom'
                        }`}
                      />
                      <ErrorMessage name="specialization" component="p" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profilePicture" className="font-normal text-lg text-blue-950">
                      Profile Picture
                    </label>
                    <Field
                      type="file"
                      name="profilePicture"
                      onChange={handleChange_profilePicture}
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.profilePicture && touched.profilePicture
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="profilePicture" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex gap-4">
                  <div className="w-1/2">                    
                  <label htmlFor="citizenshipPhotoFront" className="font-normal text-lg text-blue-950">
                      Front Citizenship Photo
                    </label>
                    <Field
                      type="file"
                      name="citizenshipPhotoFront"
                      onChange={handleChange_citizenshipPhotoFront}
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.citizenshipPhotoFront && touched.citizenshipPhotoFront
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="citizenshipPhotoFront" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div className="w-1/2">                   
                  <label htmlFor="citizenshipPhotoBack" className="font-normal text-lg text-blue-950">
                      Back Citizenship Photo
                    </label>
                    <Field
                      type="file"
                      name="citizenshipPhotoBack"
                      onChange={handleChange_citizenshipPhotoBack}
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.citizenshipPhotoBack && touched.citizenshipPhotoBack
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="citizenshipPhotoBack" component="p" className="text-red-500 text-sm" />
                  </div>
                  </div>

                  <div>
                    <label htmlFor="Certifications" className="font-normal text-lg text-blue-950">
                      Certifications
                    </label>
                    <Field
                      type="file"
                      name="certifications"
                      onChange={handleChange_certifications}
                      className={`w-full p-2 mt-1 ring-1 rounded-md focus:outline-none ${
                        errors.Certifications && touched.Certifications
                          ? 'ring-red-500 focus:ring-red-500'
                          : 'ring-gray-200 focus:ring-LoginCustom'
                      }`}
                    />
                    <ErrorMessage name="Certifications" component="p" className="text-red-500 text-sm" />
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
                <Link href="/agentlogin" className="text-blue-800">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex items-center justify-center h-full">
          <Image
            src="https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Signup Illustration"
            width={800}
            height={1200}
            className=" object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default agentsignup;
