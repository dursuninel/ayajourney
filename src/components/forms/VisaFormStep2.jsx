import React from "react";

const VisaFormStep2 = ({ formData, handleChange }) => (
  <div>
    <h2>Pasaport Bilgileri</h2>
    <div>
      <label>Pasaport Numaranız</label>
      <input
        type="text"
        name="passportNumber"
        value={formData.passportNumber}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Pasaport Veriliş Tarihi</label>
      <input
        type="date"
        name="passportIssueDate"
        value={formData.passportIssueDate}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Pasaport Bitiş Tarihi</label>
      <input
        type="date"
        name="passportExpiryDate"
        value={formData.passportExpiryDate}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>TC Kimlik Numaranız</label>
      <input
        type="text"
        name="nationalId"
        value={formData.nationalId}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default VisaFormStep2;
