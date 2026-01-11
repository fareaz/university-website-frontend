"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";

const ContactPage = () => {
    return (
        <>
            {/* <Navbar /> */}

            <ContactHeader />

            {/* MAIN CONTENT */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT: CONTACT INFO */}
                    <ContactInformation />

                    {/* RIGHT: CONTACT FORM */}
                    <ContactForm />

                </div>
            </section>

            {/* <Footer /> */}
        </>
    );
};

export default ContactPage;