import React from 'react'

const ContactSection = () => {
  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4">
        <div className="text-xl font-boldtext-white my-2">
            <h5>Let's Connect</h5>
            <p className="text-[#ADB7BE] mb-4 max-w-md">
                {" "}
                Have questions, ideas or opportunities? I'm excited to hear from you. Drop me a message!
            </p>
        </div>
    </section>
  )
}

export default ContactSection