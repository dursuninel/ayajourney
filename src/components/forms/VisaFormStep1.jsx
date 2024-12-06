import React from "react";

const VisaFormStep1 = ({ formData, handleChange }) => (
  <div>
    <h2>Kişisel Bilgiler</h2>
    <div>
      <label>Tam Adınız</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>E-posta Adresiniz</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Telefon Numaranız</label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Doğum Tarihiniz</label>
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default VisaFormStep1;
