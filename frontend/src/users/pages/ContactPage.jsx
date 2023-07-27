import React, { useState } from 'react';
import './contactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  //Pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:contact@example.com?subject=Message%20from%20${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(
      message
    )}%0A%0A---%0AEmail%3A%20${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='contact-page'>
      <div className='contact-form'>
        <h2>Contactez-nous</h2>
        <div className='contact-info'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Nom :</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Email :</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Message :</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit'>Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
