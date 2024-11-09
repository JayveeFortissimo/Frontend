import React, { useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { IoMdSend } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast'

const Inquire = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // Let the Form component handle the submission
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: ''
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left side - Info */}
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Need some support?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Questions about gown rentals? Gown Haven's got your back! Our friendly team is here to assist you anytime. 😊
              </p>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <IoMdSend className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quick Response</h3>
                    <p className="text-sm text-gray-400">We'll get back to you within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-12">
              <Form method="post" className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 bg-gray-50"
                      required
                    />
                    <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 bg-gray-50"
                      required
                    />
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile No
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 bg-gray-50"
                      required
                    />
                    <BsFillTelephoneFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition duration-200 bg-gray-50"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-800 text-white py-3 px-6 rounded-lg hover:bg-neutral-900 transform transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                  disabled={navigation.state === 'submitting'}
                >
                  <span>{navigation.state === 'submitting' ? 'Submitting...' : 'Send Message'}</span>
                  {!navigation.state === 'submitting' && <IoMdSend className="w-4 h-4 ml-2" />}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inquire;



export const sendEmail = async ({ request }) => {
  const alldata = await request.formData();

  const send = {
    name: alldata.get('name'),
    email: alldata.get('email'),
    mobile: alldata.get('mobile'),
    message: alldata.get('message'),
  };

  try {
    const response = await fetch(`https://backend-production-024f.up.railway.app/email`, {
      method: "POST",
      body: JSON.stringify(send),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Server problem");
    }

    toast.success("Inquiry Submitted!");
    return response;

  } catch (error) {
    console.error(error);
    toast.error("Error submitting inquiry. Please try again.");
  }
};