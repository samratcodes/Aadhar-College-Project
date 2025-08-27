'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaUpload,FaPlus } from 'react-icons/fa';

const Page = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    numberOfPeople: '',
    price: '',
    tentativeDate: '',
    time: '',
    category: '',
    images: [],
    booked: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const MAX_SIZE = 5 * 1024 * 1024;
  const MAX_FILES = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const uploadPromises = Array.from(files).map(async (file) => {
      if (file.size > MAX_SIZE) {
        alert(`File ${file.name} is too large. Max size is 5MB.`);
        return null;
      }

      if (formData.images.length >= MAX_FILES) {
        alert('Maximum number of images reached (10).');
        return null;
      }

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'travories');
      data.append('cloud_name', 'del4rzg3b');

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/del4rzg3b/image/upload', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
        return result.secure_url;
      } catch (error) {
        console.error('Upload failed:', error);
        return null;
      }
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
  };

  const removeImage = (index) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${ApiUrl}admin/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit activity');

      setMessage('🎉 Activity created successfully!');
      setFormData({
        title: '',
        description: '',
        numberOfPeople: '',
        price: '',
        tentativeDate: '',
        time: '',
        category: '',
        images: [],
        booked: false,
      });
    } catch (err) {
      setMessage('❌ Error submitting activity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  p-6 mt-2 rounded-2xl ">
      <h1 className="text-3xl flex items-center font-semibold text-green-600 text-start mb-8">
        <FaPlus className='mr-4'/>
        Recreational Creation</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto w-full">
        <input name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" rows={4} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="numberOfPeople" type="number" value={formData.numberOfPeople} onChange={handleChange} placeholder="Max People" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Price ($)" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="tentativeDate" type="date" value={formData.tentativeDate} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />
          <input name="time" type="time" value={formData.time} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />
        </div>

        <input name="category" type="text" value={formData.category} onChange={handleChange} placeholder="Category (e.g. Outdoor)" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600" />

        {/* Upload */}
        <label className="w-full bg-green-50 border-2 border-dashed border-green-400 rounded-xl p-6 text-center flex flex-col items-center cursor-pointer transition hover:bg-green-100 relative">
          <FaUpload className="text-3xl text-green-600 mb-2" />
          <p className="text-green-700 font-semibold">Click to upload activity photos</p>
          <p className="text-sm text-green-600">Min. 1 photo, Max. 10, under 5MB each</p>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </label>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative group">
                <Image src={img} alt={`Uploaded ${idx}`} width={300} height={200} className="w-full h-40 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200"
        >
          {loading ? 'Submitting...' : 'Submit Activity'}
        </button>
      </form>

      {message && <p className="mt-6 text-center text-lg font-semibold text-green-700">{message}</p>}
    </div>
  );
};

export default Page;
