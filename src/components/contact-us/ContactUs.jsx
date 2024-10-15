import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser, FaComment } from 'react-icons/fa';
import emailjs from 'emailjs-com';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your EmailJS service ID, template ID, and user ID
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const userId = 'YOUR_USER_ID';

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitting(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 lg:p-10 xl:p-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8">
          Get in Touch
        </h2>
        <p className="text-md text-gray-600 text-center mb-8">
          Feel free to contact us using the form below, and we'll get back to you as soon as possible!
        </p>

        {success && (
          <p className="text-center text-green-500 text-lg font-semibold mb-4">
            Your message has been sent successfully!
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 flex items-center">
                <FaUser className="absolute ml-3 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="form-group relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 flex items-center">
                <FaEnvelope className="absolute ml-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="form-group relative">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile No.
              </label>
              <div className="mt-1 flex items-center">
                <FaPhone className="absolute ml-3 text-gray-400" />
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="+123 456 7890"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="form-group relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1 flex items-start">
                <FaComment className="absolute ml-3 mt-3 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                ></textarea>
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-main to-secondary hover:from-secondary hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg space-y-6 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-gray-800">Our Contact Info</h3>
            <p className="text-md text-gray-600">
              You can also reach us through the following details:
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              <FaPhone className="inline-block mr-2 text-main" />
              +123 456 7890
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              <FaEnvelope className="inline-block mr-2 text-main" />
              rohitjoshii55555@gmail.com
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              <FaComment className="inline-block mr-2 text-main" />
              Live Chat available 9am-6pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
