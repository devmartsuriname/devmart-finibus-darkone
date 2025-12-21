import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import ContactUsArea from "./ContactUsArea";
import ContactForm from "./ContactForm";
import LetsTalkArea from "../../common/LetsTalkArea";

function ContactPage() {
  return (
    <>
      <Breadcrumb pageName="Contact Us" />
      <section className="contact-area sec-mar">
        <ContactUsArea />
        <ContactForm />
      </section>
      <LetsTalkArea />
    </>
  );
}

export default ContactPage;
