import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useGetAll } from "@/features/useGetAll";
import { useTranslation } from "react-i18next";

export const Reservations = () => {
  const { t } = useTranslation();
  const { color } = useGetAll();
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false
  });

  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Success/error message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatus({
      loading: true,
      success: false,
      error: false
    });
    
    try {
      // Replace these values with your EmailJS credentials
      const serviceId = 'service_8fcqpxm';
      const templateId = 'arabfest';
      const publicKey = 'user_k9R2TPppe5dZGfnHO1XSa';
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        },
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      setStatus({
        loading: false,
        success: true,
        error: false
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({...prev, success: false}));
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      setStatus({
        loading: false,
        success: false,
        error: true
      });
    }
  };


  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t("reservation.title")}</h1>
      </div>
      
      {showSuccessMessage && (
        <div className="max-w-4xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>{t("reservation.success_message")}</p>
        </div>
      )}
      
      {status.error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{t("reservation.error_message")}</p>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("reservation.name")}
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              style={{ color: color }}
              required
            />
          </div>
          <div className="col-span-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@mail.com"
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              style={{ color: color }}
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("reservation.message")}
              className="w-full border border-gray-300 p-3 rounded-md bg-gray-100"
              rows="4"
              style={{ color: color }}
              required
            ></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="submit"
              disabled={status.loading}
              className="text-white py-2 px-6 rounded-md transition-colors duration-300"
              style={{
                backgroundColor: color,
                opacity: status.loading ? 0.7 : 1
              }}
            >
              {status.loading ? t("reservation.sending") : t("reservation.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservations;