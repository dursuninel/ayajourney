import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import TurkishToEnglish from "../TurkishToEnglish";

const VisaStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      birthDate: null,
      passportNumber: "",
      passportIssueDate: null,
      passportExpiryDate: null,
      idNumber: "",
      idExpiryDate: null,
      homeAddress: "",
      landlord: "",
      yearsAtHome: "",
      motherNameBirth: "",
      spouseInfo: "",
      childrenInfo: "",

      workDetails: "",
      workPhone: "",
      workYears: "",
      selfEmployed: "",
      monthlyIncome: "",
      savings: "",
      additionalIncome: "",
      monthlyExpenses: "",

      ukExpense: "",
      ukAddress: "",
      travelDates: "",
      travelHistory: "",
      travelSponsor: "",
      visaRejection: "",
      passportUpload: null,
      photoUpload: null,
    },
    onSubmit: (values) => {
      const transformedValues = Object.keys(values).reduce((acc, key) => {
        const value = values[key];
        if (typeof value === "string") {
          acc[key] = TurkishToEnglish(value.toUpperCase());
        } else if (value instanceof Date) {
          acc[key] = value; // Tarihler olduğu gibi bırakılır
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log("Transformed Values:", transformedValues);
    },
  });

  const steps = [
    { id: 1, step_name: "Kişisel Bilgiler" },
    { id: 2, step_name: "İş/Tecrübe" },
    { id: 3, step_name: "Seyahat" },
  ];
  // Step kontrol fonksiyonu
  const isStepValid = () => {
    const stepFields = {
      1: [
        "fullName",
        "email",
        "phone",
        "birthDate",
        "passportNumber",
        "passportIssueDate",
        "passportExpiryDate",
        "idNumber",
        "idExpiryDate",
        "homeAddress",
        "landlord",
        "yearsAtHome",
        "motherNameBirth",
        "spouseInfo",
        "childrenInfo",
      ],
      2: [
        "workDetails",
        "workPhone",
        "workYears",
        "selfEmployed",
        "monthlyIncome",
        "savings",
        "additionalIncome",
        "monthlyExpenses",
      ],
      3: [
        "ukExpense",
        "ukAddress",
        "travelDates",
        "travelHistory",
        "travelSponsor",
        "visaRejection",
        "passportUpload",
        "photoUpload",
      ],
    };

    const fieldsToValidate = stepFields[currentStep];
    return fieldsToValidate.every((field) => {
      const value = formik.values[field];
      return value !== "" && value !== null && value !== undefined;
    });
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail: "Lütfen tüm alanları doldurun",
        life: "2000"
      });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <div className="visa-form-container">
        <div className="steps-flex">
          {steps.map((item) => (
            <div
              className={
                item.id <= currentStep ? "step-item active" : "step-item"
              }
              key={item.id}
              onClick={() => {
                if (item.id <= currentStep) {
                  setCurrentStep(item.id);
                }
              }}
            >
              <span className="index">{item.id}</span>
              <span className="step-name">{item.step_name}</span>
            </div>
          ))}
        </div>
        <div className="step-line" />
        <form onSubmit={formik.handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="step">
                {/* 1. Tam Adınız */}
                <div>
                  <label htmlFor="fullName">Tam Adınız</label>
                  <InputText
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    placeholder="Tam adınızı giriniz"
                  />
                </div>

                {/* 2. E-posta Adresiniz */}
                <div>
                  <label htmlFor="email">E-posta Adresiniz</label>
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="E-posta adresinizi giriniz"
                  />
                </div>

                {/* 3. Telefon Numaranız */}
                <div>
                  <label htmlFor="phone">Telefon Numaranız</label>
                  <InputText
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="Telefon numaranızı giriniz"
                  />
                </div>

                {/* 4. Doğum Tarihiniz */}
                <div>
                  <label htmlFor="birthDate">Doğum Tarihiniz</label>
                  <Calendar
                    id="birthDate"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={(e) => formik.setFieldValue("birthDate", e.value)}
                    placeholder="Doğum tarihinizi seçiniz"
                    locale="tr"
                  />
                </div>

                {/* 5. Pasaport Numaranız */}
                <div>
                  <label htmlFor="passportNumber">Pasaport Numaranız</label>
                  <InputText
                    id="passportNumber"
                    name="passportNumber"
                    value={formik.values.passportNumber}
                    onChange={formik.handleChange}
                    placeholder="Pasaport numaranızı giriniz"
                  />
                </div>

                {/* 6. Pasaport Veriliş Tarihi */}
                <div>
                  <label htmlFor="passportIssueDate">
                    Pasaport Veriliş Tarihi
                  </label>
                  <Calendar
                    id="passportIssueDate"
                    name="passportIssueDate"
                    value={formik.values.passportIssueDate}
                    onChange={(e) =>
                      formik.setFieldValue("passportIssueDate", e.value)
                    }
                    placeholder="Pasaport veriliş tarihini seçiniz"
                    locale="tr"
                  />
                </div>

                {/* 7. Pasaport Bitiş Tarihi */}
                <div>
                  <label htmlFor="passportExpiryDate">
                    Pasaport Bitiş Tarihi
                  </label>
                  <Calendar
                    id="passportExpiryDate"
                    name="passportExpiryDate"
                    value={formik.values.passportExpiryDate}
                    onChange={(e) =>
                      formik.setFieldValue("passportExpiryDate", e.value)
                    }
                    placeholder="Pasaport bitiş tarihini seçiniz"
                    locale="tr"
                  />
                </div>

                {/* 8. TC Kimlik Numaranız */}
                <div>
                  <label htmlFor="idNumber">TC Kimlik Numaranız</label>
                  <InputText
                    id="idNumber"
                    name="idNumber"
                    value={formik.values.idNumber}
                    onChange={formik.handleChange}
                    placeholder="TC kimlik numaranızı giriniz"
                  />
                </div>

                {/* 9. Kimlik Kartı Son Geçerlilik Tarihi */}
                <div>
                  <label htmlFor="idExpiryDate">
                    Kimlik Kartı Son Geçerlilik Tarihi
                  </label>
                  <Calendar
                    id="idExpiryDate"
                    name="idExpiryDate"
                    value={formik.values.idExpiryDate}
                    onChange={(e) =>
                      formik.setFieldValue("idExpiryDate", e.value)
                    }
                    placeholder="Kimlik kartı son geçerlilik tarihi"
                    locale="tr"
                  />
                </div>

                {/* 10. Ev Adresiniz ve Posta Kodu */}
                <div>
                  <label htmlFor="homeAddress">
                    Ev Adresiniz ve Posta Kodu
                  </label>
                  <InputText
                    id="homeAddress"
                    name="homeAddress"
                    value={formik.values.homeAddress}
                    onChange={formik.handleChange}
                    placeholder="Ev adresinizi ve posta kodunuzu giriniz"
                  />
                </div>

                {/* 11. Ev Sahibi */}
                <div className="w-100">
                  <label htmlFor="landlord">Ev Sahibi</label>
                  <InputText
                    id="landlord"
                    name="landlord"
                    value={formik.values.landlord}
                    onChange={formik.handleChange}
                    placeholder="Ev sahibinizi belirtiniz"
                  />
                </div>

                {/* 12. Kaç Yıldır O Evde Yaşıyorsunuz? */}
                <div>
                  <label htmlFor="yearsAtHome">
                    Kaç Yıldır O Evde Yaşıyorsunuz?
                  </label>
                  <InputText
                    id="yearsAtHome"
                    name="yearsAtHome"
                    value={formik.values.yearsAtHome}
                    onChange={formik.handleChange}
                    placeholder="Yıl sayısını giriniz"
                  />
                </div>

                {/* 13. Anne Adı ve Doğum Tarihi */}
                <div>
                  <label htmlFor="motherNameBirth">
                    Anne Adı ve Doğum Tarihi
                  </label>
                  <InputText
                    id="motherNameBirth"
                    name="motherNameBirth"
                    value={formik.values.motherNameBirth}
                    onChange={formik.handleChange}
                    placeholder="Anne adı ve doğum tarihini giriniz"
                  />
                </div>

                {/* 14. Yeni/Eski Eşinizin Adı, Soyadı, Doğum Tarihi ve Yeri (Varsa) */}
                <div>
                  <label htmlFor="spouseInfo">
                    Yeni/Eski Eşinizin Bilgileri (Varsa)
                  </label>
                  <InputText
                    id="spouseInfo"
                    name="spouseInfo"
                    value={formik.values.spouseInfo}
                    onChange={formik.handleChange}
                    placeholder="Eş bilgilerini giriniz"
                  />
                </div>

                {/* 15. Çocuklarınızın Adı, Soyadı, Doğum Tarihi ve Yerleri (Varsa) */}
                <div>
                  <label htmlFor="childrenInfo">
                    Çocuklarınızın Bilgileri (Varsa)
                  </label>
                  <InputText
                    id="childrenInfo"
                    name="childrenInfo"
                    value={formik.values.childrenInfo}
                    onChange={formik.handleChange}
                    placeholder="Çocuklarınızın bilgilerini giriniz"
                  />
                </div>
                <div className="buttons center">
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="step">
                {/* 16. Çalıştığınız İş Yeri Adı, Adresi ve Görev Tanımı */}
                <div>
                  <label htmlFor="workDetails">
                    Çalıştığınız İş Yeri Bilgileri
                  </label>
                  <InputText
                    id="workDetails"
                    name="workDetails"
                    value={formik.values.workDetails}
                    onChange={formik.handleChange}
                    placeholder="İş yeri bilgilerini giriniz"
                  />
                </div>

                {/* 17. İş Yerinizin Telefon Numarası */}
                <div>
                  <label htmlFor="workPhone">
                    İş Yerinizin Telefon Numarası
                  </label>
                  <InputText
                    id="workPhone"
                    name="workPhone"
                    value={formik.values.workPhone}
                    onChange={formik.handleChange}
                    placeholder="İş yeri telefon numarasını giriniz"
                  />
                </div>

                {/* 18. Kaç Yıldır O İş Yerinde Çalışıyorsunuz (Okuyorsunuz)? */}
                <div>
                  <label htmlFor="workYears">
                    Kaç Yıldır O İş Yerinde Çalışıyorsunuz (Okuyorsunuz)?
                  </label>
                  <InputText
                    id="workYears"
                    name="workYears"
                    value={formik.values.workYears}
                    onChange={formik.handleChange}
                    placeholder="Yıl sayısını giriniz"
                  />
                </div>

                {/* 19. Kendi İşiniz Mi, Yoksa Çalışan Mısınız? */}
                <div>
                  <label htmlFor="selfEmployed">
                    Kendi İşiniz Mi, Yoksa Çalışan Mısınız?
                  </label>
                  <Dropdown
                    id="selfEmployed"
                    name="selfEmployed"
                    className="w-100"
                    value={formik.values.selfEmployed}
                    onChange={(e) =>
                      formik.setFieldValue("selfEmployed", e.value)
                    }
                    options={[
                      { label: "Kendi İşim", value: "selfEmployed" },
                      { label: "Çalışanım", value: "employed" },
                    ]}
                    placeholder="Seçiniz"
                  />
                </div>

                {/* 20. Yaklaşık Aylık Geliriniz */}
                <div>
                  <label htmlFor="monthlyIncome">
                    Yaklaşık Aylık Geliriniz
                  </label>
                  <InputText
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formik.values.monthlyIncome}
                    onChange={formik.handleChange}
                    placeholder="Aylık gelir miktarını giriniz"
                  />
                </div>

                {/* 21. Bu Gelir Dışında Birikiminiz Var Mı? Ne Kadar? */}
                <div>
                  <label htmlFor="savings">
                    Bu Gelir Dışında Birikiminiz Var Mı? Ne Kadar?
                  </label>
                  <InputText
                    id="savings"
                    name="savings"
                    value={formik.values.savings}
                    onChange={formik.handleChange}
                    placeholder="Birikim miktarını giriniz"
                  />
                </div>

                {/* 22. Aylık Kazancınız Dışında Yan Gelirleriniz Var Mı? Ne Kadar? */}
                <div>
                  <label htmlFor="additionalIncome">
                    Aylık Kazancınız Dışında Yan Gelirleriniz Var Mı? Ne Kadar?
                  </label>
                  <InputText
                    id="additionalIncome"
                    name="additionalIncome"
                    value={formik.values.additionalIncome}
                    onChange={formik.handleChange}
                    placeholder="Yan gelir miktarını giriniz"
                  />
                </div>

                {/* 23. Ayda Ne Kadar Harcama Yapıyorsunuz? */}
                <div>
                  <label htmlFor="monthlyExpenses">
                    Ayda Ne Kadar Harcama Yapıyorsunuz?
                  </label>
                  <InputText
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    value={formik.values.monthlyExpenses}
                    onChange={formik.handleChange}
                    placeholder="Aylık harcama miktarını giriniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="step">
                {/* 24. İngiltere’de Ne Kadar Pound Harcamayı Planlıyorsunuz? */}
                <div>
                  <label htmlFor="ukExpense">
                    İngiltere’de Ne Kadar Pound Harcamayı Planlıyorsunuz?
                  </label>
                  <InputText
                    id="ukExpense"
                    name="ukExpense"
                    value={formik.values.ukExpense}
                    onChange={formik.handleChange}
                    placeholder="Harcamayı planladığınız miktarı giriniz"
                  />
                </div>

                {/* 25. İngiltere’de Kalacağınız Adres */}
                <div>
                  <label htmlFor="ukAddress">
                    İngiltere’de Kalacağınız Adres
                  </label>
                  <InputText
                    id="ukAddress"
                    name="ukAddress"
                    value={formik.values.ukAddress}
                    onChange={formik.handleChange}
                    placeholder="Kalacağınız adresi giriniz"
                  />
                </div>

                {/* 26. Tahmini Seyahat Tarihleriniz */}
                <div>
                  <label htmlFor="travelDates">
                    Tahmini Seyahat Tarihleriniz
                  </label>
                  <Calendar
                    id="travelDates"
                    name="travelDates"
                    value={formik.values.travelDates}
                    onChange={(e) =>
                      formik.setFieldValue("travelDates", e.value)
                    }
                    placeholder="Seyahat tarihlerini seçiniz"
                    locale="tr"
                  />
                </div>

                {/* 26. Tahmini Seyahat Tarihleriniz */}
                <div>
                  <label htmlFor="travelDates">
                    Tahmini Seyahat Tarihleriniz
                  </label>
                  <Calendar
                    id="travelDates"
                    name="travelDates"
                    value={formik.values.travelDates}
                    onChange={(e) =>
                      formik.setFieldValue("travelDates", e.value)
                    }
                    placeholder="Seyahat tarihlerini seçiniz"
                    locale="tr"
                  />
                </div>

                {/* 27. Daha Önce Yurtdışına Çıktıysanız, Ülkeler ve Ay/Yıl */}
                <div>
                  <label htmlFor="travelHistory">
                    Daha Önce Yurtdışına Çıktıysanız, Ülkeler ve Ay/Yıl
                  </label>
                  <InputText
                    id="travelHistory"
                    name="travelHistory"
                    value={formik.values.travelHistory}
                    onChange={formik.handleChange}
                    placeholder="Seyahat geçmişinizi giriniz"
                    rows={3}
                  />
                </div>

                {/* 28. Seyahat Giderleriniz Kimin Tarafından Karşılanacak? */}
                <div>
                  <label htmlFor="travelSponsor">
                    Seyahat Giderleriniz Kimin Tarafından Karşılanacak?
                  </label>
                  <InputText
                    id="travelSponsor"
                    name="travelSponsor"
                    value={formik.values.travelSponsor}
                    onChange={formik.handleChange}
                    placeholder="Sponsor bilgilerini giriniz"
                  />
                </div>

                {/* 29. Daha Önce İngiltere’den veya Başka Bir Ülkeden Ret Aldınız Mı? */}
                <div className="w-100">
                  <label htmlFor="visaRejection">
                    Daha Önce İngiltere’den veya Başka Bir Ülkeden Ret Aldınız
                    Mı?
                  </label>
                  <InputText
                    id="visaRejection"
                    name="visaRejection"
                    value={formik.values.visaRejection}
                    onChange={formik.handleChange}
                    placeholder="Ret durumunu belirtiniz"
                  />
                </div>

                {/* 30. Lütfen Pasaportunuzun Bilgi Sayfasını Yükleyiniz */}
                <div>
                  <label htmlFor="passportUpload">
                    Pasaportunuzun Bilgi Sayfasını Yükleyiniz
                  </label>
                  <FileUpload
                    id="passportUpload"
                    name="passportUpload"
                    customUpload
                    auto
                    chooseLabel="Dosya Seçiniz"
                    onUpload={(e) =>
                      formik.setFieldValue("passportUpload", e.files)
                    }
                  />
                </div>

                {/* 31. Lütfen 5x5 Biyometrik Fotoğrafınızı Yükleyiniz */}
                <div>
                  <label htmlFor="photoUpload">
                    5x5 Biyometrik Fotoğrafınızı Yükleyiniz
                  </label>
                  <FileUpload
                    id="photoUpload"
                    name="photoUpload"
                    customUpload
                    auto
                    chooseLabel="Dosya Seçiniz"
                    onUpload={(e) =>
                      formik.setFieldValue("photoUpload", e.files)
                    }
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button type="submit">Gönder</button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default VisaStepForm;
