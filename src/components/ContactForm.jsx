import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    organization: '',
    serviceType: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const serviceTypes = [
    'App Security',
    'Web Security & Penetration Testing',
    'AI Security',
    'Cloud & Infrastructure Security',
    'Red Team / Blue Team Operations',
    'Incident Response & Forensics',
    'GRC',
    'Physical Security',
    'Security Training',
    'MDR',
    'Cyber Threat Intelligence',
    'Other'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Get EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      // Fallback: Log to console if EmailJS is not configured
      console.warn('EmailJS not configured. Please set up environment variables.')
      console.log('Form submission:', formData)
      
      setTimeout(() => {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! We will contact you within 24 hours. (Note: EmailJS not configured - check console for form data)' 
        })
        setIsSubmitting(false)
        setFormData({
          organization: '',
          serviceType: '',
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      }, 1500)
      return
    }

    // Send email via EmailJS
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          organization: formData.organization,
          service_type: formData.serviceType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          to_email: 'ceoeddieo@gmail.com' // You can change this or make it dynamic
        },
        publicKey
      )
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We will contact you within 24 hours.' 
      })
      setFormData({
        organization: '',
        serviceType: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact us directly at ceoeddieo@gmail.com' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-heading font-bold uppercase mb-6">
        Request Assessment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-sm font-medium mb-2">
            Organization Name *
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors"
            placeholder="Your organization"
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
            Type of Service *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors"
          >
            <option value="">Select a service...</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-red focus:ring-1 focus:ring-cyber-red transition-colors resize-none"
            placeholder="Tell us about your security requirements..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyber-red to-dark-red rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyber-red/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>

        {/* Status Message */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          All information is encrypted and kept confidential. We respond within 24 hours.
        </p>
      </form>
    </div>
  )
}

export default ContactForm

