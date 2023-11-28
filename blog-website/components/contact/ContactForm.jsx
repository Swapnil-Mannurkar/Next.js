import React from "react";
import styles from "./ContactForm.module.css";
import { useState } from "react";
import Notification from "../ui/notification";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    status: "",
  });
  const [displayNotification, setDisplayNotification] = useState(false);

  const submitHandler = async (e) => {
    setDisplayNotification(true);
    e.preventDefault();
    setNotification({
      title: "Processing...",
      message: "Sending your message!",
      status: "pending",
    });

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          message,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setNotification({
          title: "Successful",
          message: "Your message has been sent!",
          status: "success",
        });

        setTimeout(() => {
          setDisplayNotification(false);
        }, 2000);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      setNotification({
        title: "Error",
        message: error.message || "Something went wrong!",
        status: "error",
      });

      setTimeout(() => {
        setDisplayNotification(false);
      }, 2000);
    }
  };

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className={styles.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
      {displayNotification && <Notification notification={notification} />}
    </section>
  );
};

export default ContactForm;
