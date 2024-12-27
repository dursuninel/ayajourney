import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import TurkishToEnglish from "../TurkishToEnglish";

const SchengenStepFormEski = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      surname: "",
      previousSurname: "",
      firstName: "",
      birthDate: null,
      birthPlace: "",
      birthCountry: "",
      nationality: "",
      gender: "",
      maritalStatus: "",
      guardianInfo: "",
      nationalID: "",
      address: "",
      phone: "",

      passportType: "",
      passportNumber: "",
      passportIssueDate: null,
      passportExpiryDate: null,
      passportIssuer: "",

      euf_surname: "",
      euf_firstName: "",
      euf_birthDate: null,
      euf_nationality: "",
      euf_documentNumber: "",
      euf_relationship: "",

      occupation: "",
      employerInfo: "",

      travelPurpose: [],
      additionalInfo: "",
      mainDestination: "",
      entryCountry: "",
      entryCount: "",
      plannedEntryDate: null,
      plannedExitDate: null,
      previousVisa: "",
      previousVisaDate: null,
      inviteeInfo: "",
      inviteeAddress: "",
      inviteeContact: "",
      inviteeEmail: "",
      inviteeCompany: "",
      inviteeRepresentative: "",

      financialSupport: "",
      financialDetails: [],
      sponsorDetails: "",
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

  const genderOptions = [
    { label: "Erkek", value: "Erkek" },
    { label: "Kadın", value: "Kadın" },
  ];

  const yesNoOptions = [
    { label: "Evet", value: "Evet" },
    { label: "Hayır", value: "Hayır" },
  ];

  const maritalStatusOptions = [
    "Bekar",
    "Evli",
    "Kayıtlı birliktelik",
    "Aynı",
    "Boşanmış",
    "Dul",
    "Diğer",
  ];

  const passportTypes = [
    "Normal pasaport",
    "Diplomatik pasaport",
    "Hizmet pasaportu",
    "Resmi pasaport",
    "Özel pasaport",
    "Diğer seyahat belgesi",
  ];

  const entryCounts = ["Tek giriş", "İki giriş", "Çok girişli"];

  const travelPurposes = [
    "Turistik",
    "Aile veya arkadaş ziyareti",
    "Kültürel",
    "Sportif",
    "Resmi ziyaret",
    "Sağlık sebepleri",
    "Eğitim",
    "Havalimanı transit",
    "Diğer",
  ];

  const steps = [
    { id: 1, step_name: "Kişisel Bilgiler" },
    { id: 2, step_name: "Pasaport bilgileri" },
    { id: 3, step_name: "AB Vatandaşı Aile Üyesi Varsa" },
    { id: 4, step_name: "Çalışma Hayatı" },
    { id: 5, step_name: "Seyahat Planı" },
    { id: 6, step_name: "Geçim Kaynağı" },
  ];
  // Step kontrol fonksiyonu
  const isStepValid = () => {
    const stepFields = {
      1: [
        "surname",
        "previousSurname",
        "firstName",
        "birthDate",
        "birthPlace",
        "birthCountry",
        "nationality",
        "gender",
        "maritalStatus",
        "guardianInfo",
        "nationalID",
        "address",
        "phone",
      ],
      2: [
        "passportType",
        "passportNumber",
        "passportIssueDate",
        "passportExpiryDate",
        "passportIssuer",
      ],
      3: [
        "euf_surname",
        "euf_firstName",
        "euf_birthDate",
        "euf_nationality",
        "euf_documentNumber",
        "euf_relationship",
      ],

      4: ["occupation", "employerInfo"],

      5: [
        "travelPurpose",
        "additionalInfo",
        "mainDestination",
        "entryCountry",
        "entryCount",
        "plannedEntryDate",
        "plannedExitDate",
        "previousVisa",
        "previousVisaDate",
        "inviteeInfo",
        "inviteeAddress",
        "inviteeContact",
        "inviteeEmail",
        "inviteeCompany",
        "inviteeRepresentative",
      ],

      6: ["financialSupport", "financialDetails", "sponsorDetails"],
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
        life: "2000",
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
                <div>
                  <label htmlFor="surname">Soyadınız (Aile adı)</label>
                  <InputText
                    id="surname"
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    placeholder="Soyadınızı giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="previousSurname">Önceki soyadınız</label>
                  <InputText
                    id="previousSurname"
                    name="previousSurname"
                    value={formik.values.previousSurname}
                    onChange={formik.handleChange}
                    placeholder="Önceki soyadınızı giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="firstName">Adınız</label>
                  <InputText
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    placeholder="Adınızı giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="birthDate">
                    Doğum tarihiniz (gün-ay-yıl)
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="birthDate"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={(e) => formik.setFieldValue("birthDate", e.value)}
                    placeholder="Doğum tarihinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="birthPlace">Doğum yeriniz</label>
                  <InputText
                    id="birthPlace"
                    name="birthPlace"
                    value={formik.values.birthPlace}
                    onChange={formik.handleChange}
                    placeholder="Doğum yerinizi giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="birthCountry">Doğum ülkeniz</label>
                  <InputText
                    id="birthCountry"
                    name="birthCountry"
                    value={formik.values.birthCountry}
                    onChange={formik.handleChange}
                    placeholder="Doğum ülkenizi giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="nationality">Uyruğunuz</label>
                  <InputText
                    id="nationality"
                    name="nationality"
                    value={formik.values.nationality}
                    onChange={formik.handleChange}
                    placeholder="Uyruğunuzu giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="gender">Cinsiyet</label>
                  <Dropdown
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    options={genderOptions}
                    onChange={formik.handleChange}
                    placeholder="Cinsiyetinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="maritalStatus">Medeni hal</label>
                  <Dropdown
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formik.values.maritalStatus}
                    options={maritalStatusOptions.map((status) => ({
                      label: status,
                      value: status,
                    }))}
                    onChange={formik.handleChange}
                    placeholder="Medeni halinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="guardianInfo">
                    (Reşit değilse) Ebeveyn yetkisi sahibi/yasal velinin
                    bilgileri
                  </label>
                  <InputText
                    id="guardianInfo"
                    name="guardianInfo"
                    value={formik.values.guardianInfo}
                    onChange={formik.handleChange}
                    placeholder="Velinizin bilgilerini giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="nationalID">
                    Ulusal Kimlik Numarası / TC Vatandaşları için TC Kimlik No
                    (var ise)
                  </label>
                  <InputText
                    id="nationalID"
                    name="nationalID"
                    value={formik.values.nationalID}
                    onChange={formik.handleChange}
                    placeholder="Kimlik numaranızı giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="address">
                    Başvuru sahibinin ev adresi ve e-posta adresi
                  </label>
                  <InputText
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Adresinizi giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="phone">Telefon numaranız</label>
                  <InputText
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="Telefon numaranızı giriniz"
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
                <div>
                  <label htmlFor="passportType">Pasaport türünüz</label>
                  <Dropdown
                    id="passportType"
                    name="passportType"
                    value={formik.values.passportType}
                    options={passportTypes.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    onChange={formik.handleChange}
                    placeholder="Pasaport türünüzü seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="passportNumber">Pasaport numaranız</label>
                  <InputText
                    id="passportNumber"
                    name="passportNumber"
                    value={formik.values.passportNumber}
                    onChange={formik.handleChange}
                    placeholder="Pasaport numaranızı giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="passportIssueDate">
                    Pasaport veriliş tarihi
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="passportIssueDate"
                    name="passportIssueDate"
                    value={formik.values.passportIssueDate}
                    onChange={(e) =>
                      formik.setFieldValue("passportIssueDate", e.value)
                    }
                    placeholder="Pasaport veriliş tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="passportExpiryDate">
                    Pasaport son geçerlilik tarihi
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="passportExpiryDate"
                    name="passportExpiryDate"
                    value={formik.values.passportExpiryDate}
                    onChange={(e) =>
                      formik.setFieldValue("passportExpiryDate", e.value)
                    }
                    placeholder="Pasaport son geçerlilik tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="passportIssuer">
                    Pasaport düzenleyen makam
                  </label>
                  <InputText
                    id="passportIssuer"
                    name="passportIssuer"
                    value={formik.values.passportIssuer}
                    onChange={formik.handleChange}
                    placeholder="Pasaport düzenleyen makamı giriniz"
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
                <div>
                  <label htmlFor="euf_surname">Aile üyesi soyadı</label>
                  <InputText
                    id="euf_surname"
                    name="euf_surname"
                    value={formik.values.euf_surname}
                    onChange={formik.handleChange}
                    placeholder="Aile üyesinin soyadını giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="euf_firstName">Aile üyesi adı</label>
                  <InputText
                    id="euf_firstName"
                    name="euf_firstName"
                    value={formik.values.euf_firstName}
                    onChange={formik.handleChange}
                    placeholder="Aile üyesinin adını giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="euf_birthDate">Aile üyesi doğum tarihi</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="euf_birthDate"
                    name="euf_birthDate"
                    value={formik.values.euf_birthDate}
                    onChange={(e) =>
                      formik.setFieldValue("euf_birthDate", e.value)
                    }
                    placeholder="Aile üyesinin doğum tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="euf_nationality">Aile üyesi uyruğu</label>
                  <InputText
                    id="euf_nationality"
                    name="euf_nationality"
                    value={formik.values.euf_nationality}
                    onChange={formik.handleChange}
                    placeholder="Aile üyesinin uyruğunu giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="euf_documentNumber">
                    Aile üyesi belge numarası
                  </label>
                  <InputText
                    id="euf_documentNumber"
                    name="euf_documentNumber"
                    value={formik.values.euf_documentNumber}
                    onChange={formik.handleChange}
                    placeholder="Aile üyesinin belge numarasını giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="euf_relationship">
                    Aile üyesi ile ilişki
                  </label>
                  <InputText
                    id="euf_relationship"
                    name="euf_relationship"
                    value={formik.values.euf_relationship}
                    onChange={formik.handleChange}
                    placeholder="Aile üyesi ile ilişkinizi giriniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="occupation">Meslek</label>
                  <InputText
                    id="occupation"
                    name="occupation"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    placeholder="Mesleğinizi giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="employerInfo">İşveren bilgisi</label>
                  <InputText
                    id="employerInfo"
                    name="employerInfo"
                    value={formik.values.employerInfo}
                    onChange={formik.handleChange}
                    placeholder="İşveren bilgilerinizi giriniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 5 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="travelPurpose">Seyahat amacı</label>
                  <Dropdown
                    id="travelPurpose"
                    name="travelPurpose"
                    value={formik.values.travelPurpose}
                    options={travelPurposes.map((purpose) => ({
                      label: purpose,
                      value: purpose,
                    }))}
                    onChange={formik.handleChange}
                    placeholder="Seyahat amacınızı seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="additionalInfo">
                    Kalış sebebinize ilişkin ek bilgi
                  </label>
                  <InputText
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formik.values.additionalInfo}
                    onChange={formik.handleChange}
                    placeholder="Kalış sebebinize ilişkin ek bilgi"
                  />
                </div>

                <div>
                  <label htmlFor="mainDestination">
                    Gidilecek olan asıl üye ülke (ve varsa gidilecek olan diğer
                    üye ülkeler)
                  </label>
                  <InputText
                    id="mainDestination"
                    name="mainDestination"
                    value={formik.values.mainDestination}
                    onChange={formik.handleChange}
                    placeholder="Gidilecek olan asıl üye ülke (ve varsa gidilecek olan diğer üye
                        ülkeler)"
                  />
                </div>

                <div>
                  <label htmlFor="entryCountry">
                    İlk giriş yapacağınız üye ülke
                  </label>
                  <InputText
                    id="entryCountry"
                    name="entryCountry"
                    value={formik.values.entryCountry}
                    onChange={formik.handleChange}
                    placeholder="İlk giriş yapacağınız üye ülke"
                  />
                </div>

                <div>
                  <label htmlFor="entryCount">Talep edilen giriş sayısı</label>
                  <Dropdown
                    id="entryCount"
                    name="entryCount"
                    value={formik.values.entryCount}
                    options={entryCounts.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    onChange={formik.handleChange}
                    placeholder="Talep edilen giriş sayısı"
                  />
                </div>

                <div>
                  <label htmlFor="plannedEntryDate">
                    Schengen bölgesinde ilk kalmaya başlayacağınız tarih için
                    öngörülen gidiş tarihi
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="plannedEntryDate"
                    name="plannedEntryDate"
                    value={formik.values.plannedEntryDate}
                    onChange={(e) =>
                      formik.setFieldValue("plannedEntryDate", e.value)
                    }
                    placeholder="Gidiş tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="plannedExitDate">
                    İlk kalıştan sonra Schengen bölgesinden ayrılış için
                    öngörülen çıkış tarihi
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="plannedExitDate"
                    name="plannedExitDate"
                    value={formik.values.plannedExitDate}
                    onChange={(e) =>
                      formik.setFieldValue("plannedExitDate", e.value)
                    }
                    placeholder="Çıkış tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="previousVisa">
                    Schengen vizesi talebinde daha önce parmak izi alınmış mı?
                  </label>
                  <Dropdown
                    id="previousVisa"
                    name="previousVisa"
                    value={formik.values.previousVisa}
                    options={[
                      { label: "Hayır", value: "Hayır" },
                      { label: "Evet", value: "Evet" },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="Seçiminizi yapınız"
                  />
                </div>

                <div>
                  <label htmlFor="previousVisaDate">Biliyorsanız tarihi</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="previousVisaDate"
                    name="previousVisaDate"
                    value={formik.values.previousVisaDate}
                    onChange={(e) =>
                      formik.setFieldValue("previousVisaDate", e.value)
                    }
                    placeholder="Tarihi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeInfo">
                    Üye Devlet(ler)den davetiye gönderen kişi(ler)in soyadı ve
                    adı
                  </label>
                  <InputText
                    id="inviteeInfo"
                    name="inviteeInfo"
                    value={formik.values.inviteeInfo}
                    onChange={formik.handleChange}
                    placeholder="Davetiye gönderen kişi bilgilerini giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeAddress">
                    Davetiye olmaması durumunda, Üye Devletlerde geçici olarak
                    konaklanacak yer(ler)in adresi veya otel(ler)in isimleri
                  </label>
                  <InputText
                    id="inviteeAddress"
                    name="inviteeAddress"
                    value={formik.values.inviteeAddress}
                    onChange={formik.handleChange}
                    placeholder="Konaklama adresini giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeContact">
                    Davetiye gönderen kişi(ler)in/otel(ler)in/geçici olarak
                    konaklanacak yer(ler)in telefon numarası
                  </label>
                  <InputText
                    id="inviteeContact"
                    name="inviteeContact"
                    value={formik.values.inviteeContact}
                    onChange={formik.handleChange}
                    placeholder="Telefon numarasını giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeEmail">
                    Yer(ler)in posta adresi ve e-posta adresi
                  </label>
                  <InputText
                    id="inviteeEmail"
                    name="inviteeEmail"
                    value={formik.values.inviteeEmail}
                    onChange={formik.handleChange}
                    placeholder="E-posta adresini giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeCompany">
                    Davetiye gönderen şirket veya kurumun adı ve adresi
                  </label>
                  <InputText
                    id="inviteeCompany"
                    name="inviteeCompany"
                    value={formik.values.inviteeCompany}
                    onChange={formik.handleChange}
                    placeholder="Şirket veya kurumun bilgilerini giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="inviteeRepresentative">
                    Şirket veya kurumdaki irtibat kişinin soyadı, adı, adresi,
                    telefon numarası ve e-posta adresi
                  </label>
                  <InputText
                    id="inviteeRepresentative"
                    name="inviteeRepresentative"
                    value={formik.values.inviteeRepresentative}
                    onChange={formik.handleChange}
                    placeholder="İrtibat kişisinin bilgilerini giriniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 6 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="financialSupport">
                    Kaldığınız süre boyunca başvuru sahibinin seyahat ve genel
                    masrafları kim tarafından karşılanacak?
                  </label>
                  <Dropdown
                    id="financialSupport"
                    name="financialSupport"
                    value={formik.values.financialSupport}
                    options={[
                      {
                        label: "Başvuru sahibinin kendisi tarafından",
                        value: "self",
                      },
                      {
                        label:
                          "Sponsor tarafından (ev sahibi, şirket, kuruluş)",
                        value: "sponsor",
                      },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="Seçiminizi yapınız"
                  />
                </div>

                <div>
                  <label htmlFor="financialDetails">
                    Başvuru sahibi tarafından karşılanıyorsa (Nakit, Seyahat
                    çeki, Kredi kartı, Konaklama bedeli ön ödemeli, Ön ödemeli
                    ulaşım, Diğer)
                  </label>
                  <InputText
                    id="financialDetails"
                    name="financialDetails"
                    value={formik.values.financialDetails}
                    onChange={formik.handleChange}
                    placeholder="Finansal detayları giriniz"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorDetails">
                    Sponsor tarafından karşılanıyorsa: (Nakit, Konaklama
                    sağlanmıştır, Tüm masraflar karşılanmıştır, Ön ödemeli
                    ulaşım, Diğer)
                  </label>
                  <InputText
                    id="sponsorDetails"
                    name="sponsorDetails"
                    value={formik.values.sponsorDetails}
                    onChange={formik.handleChange}
                    placeholder="Sponsor detaylarını giriniz"
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

export default SchengenStepFormEski;
