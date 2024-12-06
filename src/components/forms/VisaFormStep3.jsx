import React from "react";

const VisaFormStep3 = ({ formData, handleChange }) => (
  <div>
    <h2>Diğer Bilgiler</h2>
    <div>
      <label>Kaç Yıldır O Evde Yaşıyorsunuz?</label>
      <input
        type="number"
        name="yearsAtHome"
        value={formData.yearsAtHome}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Anne Adı ve Doğum Tarihi</label>
      <input
        type="text"
        name="parentNameBirth"
        value={formData.parentNameBirth}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Yeni/Eskı Eş Bilgisi</label>
      <input
        type="text"
        name="spouseInfo"
        value={formData.spouseInfo}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Çocuklarınızın Bilgisi</label>
      <input
        type="text"
        name="childrenInfo"
        value={formData.childrenInfo}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default VisaFormStep3;
