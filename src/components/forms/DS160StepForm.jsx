import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import TurkishToEnglish from "../TurkishToEnglish";

const DS160StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      // Kimlik Bilgileri
      visaCity: "",
      fullName: "",
      previousName: "",
      birthPlace: "",
      maritalStatus: "",
      secondCitizenship: "",
      secondCitizenshipPassport: "",
      socialSecurityNumber: "",
      idNumber: "",

      // Adres Bilgileri
      homeAddress: "",
      postalCode: "",
      alternativeAddress: "",
      alternativePostalCode: "",
      mobilePhone: "",
      homePhone: "",
      email: "",

      // Sosyal Medya Hesapları
      askfm: "",
      reddit: "",
      douban: "",
      sinaWeibo: "",
      facebook: "",
      tencentWeibo: "",
      flickr: "",
      tumblr: "",
      googlePlus: "",
      twitter: "",
      instagram: "",
      twoo: "",
      linkedin: "",
      vine: "",
      myspace: "",
      vkontakte: "",
      pinterest: "",
      youku: "",
      qzone: "",
      youtube: "",

      // Pasaport ve Seyahat Bilgileri
      passportNumber: "",
      passportAuthority: "",
      lostPassport: "",
      lostPassportNumber: "",
      lostPassportAuthority: "",

      // Masraflar
      sponsorName: "",
      sponsorRelationship: "",
      sponsorPhone: "",
      sponsorEmail: "",
      sponsorAddress: "",
      sponsorPostalCode: "",

      // Önceki Amerika Gezileri
      visitedUS: "",
      usEntryDate: null,
      usExitDate: null,
      previousVisa: "",
      previousVisaDate: null,
      visaType: "",
      visaNumber: "",
      visaConsulate: "",
      visaRejection: "",
      rejectionReason: "",
      rejectionDate: null,
      rejectionVisaType: "",

      // Aile Bilgileri
      fatherName: "",
      fatherBirthDate: null,
      motherName: "",
      motherBirthDate: null,
      hasUSRelative: "",
      relativeName: "",
      relativeRelationship: "",

      //Evli iseniz eşinizin
      w_fullname: "",
      w_birthdate: "",
      w_birthplace: "",
      w_tc_no: "",

      // Eğitim ve Meslek Bilgileri
      universityName: "",
      universityPhone: "",
      universityAddress: "",
      universityStartDate: null,
      highSchoolName: "",
      highSchoolStartEndDate: "",
      highSchoolAddress: "",

      // Başka bir üniversite okuduysanız belirtiniz (Devam eden)
      otherUniversityName: "",
      otherUniversityAddress: "",
      otherUniversityStartEndDate: "",
      workPlace: "",
      workDetails: "",

      // Ek Bilgiler
      otherLanguages: "",
      countriesVisited: "",
      militaryService: "",
      charityMembership: "",

      // Referanslar
      reference1Name: "",
      reference1Address: "",
      reference1Phone: "",
      reference1Email: "",
      reference2Name: "",
      reference2Address: "",
      reference2Phone: "",
      reference2Email: "",
    },
    onSubmit: (values) => {
      if (isStepValid()) {
        console.log("Transformed Values:", values);
      }
    },
  });
  const maritalStatusOptions = [
    "Bekar",
    "Evli",
    "Kayıtlı birliktelik",
    "Aynı",
    "Boşanmış",
    "Dul",
    "Diğer",
  ];

  const steps = [
    { id: 1, step_name: "Kimlik Bilgileri" },
    { id: 2, step_name: "Adres Bilgileri" },
    { id: 3, step_name: "Sosyal Medya Hesapları" },
    { id: 4, step_name: "Pasaport ve Seyahat Bilgileri" },
    { id: 5, step_name: "Masraflar" },
    { id: 6, step_name: "Önceki Amerika Gezileri" },
    { id: 7, step_name: "Aile Bilgileri" },
    { id: 8, step_name: "Evliyseniz Eşinizin Bilgileri" },
    { id: 9, step_name: "Eğitim Bilgileri ve Meslek Bilgileri" },
    {
      id: 10,
      step_name: "Farklı Üniversite ",
    },
    { id: 11, step_name: "Ek Bilgiler" },
    { id: 12, step_name: "Referanslar" },
  ];
  // Step kontrol fonksiyonu
  const isStepValid = () => {
    const stepFields = {
      1: [
        "visaCity",
        "fullName",
        "previousName",
        "birthPlace",
        "maritalStatus",
        "secondCitizenship",
        "secondCitizenshipPassport",
        "socialSecurityNumber",
        "idNumber",
      ],
      2: [
        "homeAddress",
        "postalCode",
        "alternativeAddress",
        "alternativePostalCode",
        "mobilePhone",
        "homePhone",
        "email",
      ],
      3: [
        "askfm",
        "reddit",
        "douban",
        "sinaWeibo",
        "facebook",
        "tencentWeibo",
        "flickr",
        "tumblr",
        "googlePlus",
        "twitter",
        "instagram",
        "twoo",
        "linkedin",
        "vine",
        "myspace",
        "vkontakte",
        "pinterest",
        "youku",
        "qzone",
        "youtube",
      ],
      4: [
        "passportNumber",
        "passportAuthority",
        "lostPassport",
        "lostPassportNumber",
        "lostPassportAuthority",
      ],
      5: [
        "sponsorName",
        "sponsorRelationship",
        "sponsorPhone",
        "sponsorEmail",
        "sponsorAddress",
        "sponsorPostalCode",
      ],
      6: [
        "visitedUS",
        "usEntryDate",
        "usExitDate",
        "previousVisa",
        "previousVisaDate",
        "visaType",
        "visaNumber",
        "visaConsulate",
        "visaRejection",
        "rejectionReason",
        "rejectionDate",
        "rejectionVisaType",
      ],
      7: [
        "fatherName",
        "fatherBirthDate",
        "motherName",
        "motherBirthDate",
        "hasUSRelative",
        "relativeName",
        "relativeRelationship",
      ],
      8: ["w_fullname", "w_birthdate", "w_birthplace", "w_tc_no"],
      9: [
        "universityName",
        "universityPhone",
        "universityAddress",
        "universityStartDate",
        "highSchoolName",
        "highSchoolStartEndDate",
        "highSchoolAddress",
      ],
      10: [
        "otherUniversityName",
        "otherUniversityAddress",
        "otherUniversityStartEndDate",
        "workPlace",
        "workDetails",
      ],
      11: [
        "otherLanguages",
        "countriesVisited",
        "militaryService",
        "charityMembership",
      ],
      12: [
        "reference1Name",
        "reference1Address",
        "reference1Phone",
        "reference1Email",
        "reference2Name",
        "reference2Address",
        "reference2Phone",
        "reference2Email",
      ],
    };

    const fieldsToValidate = stepFields[currentStep];
    return fieldsToValidate.every((field) => {
      const value = formik.values[field];
      return value !== "" && value !== null && value !== undefined;
    });
  };

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      // Eğer son adımdaysa formu gönder
      if (isStepValid()) {
        formik.handleSubmit();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Hata",
          detail: "Lütfen tüm alanları doldurun",
          life: 2000,
        });
      }
    } else {
      // Adım ilerlemesi
      if (isStepValid()) {
        setCurrentStep((prev) => prev + 1);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Hata",
          detail: "Lütfen tüm alanları doldurun",
          life: 2000,
        });
      }
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
                  <label htmlFor="visaCity">
                    Vizeye gireceğiniz şehri belirtiniz (İstanbul – Ankara)
                  </label>
                  <InputText
                    id="visaCity"
                    name="visaCity"
                    value={formik.values.visaCity}
                    onChange={formik.handleChange}
                    placeholder="Vizeye gireceğiniz şehri belirtiniz (İstanbul – Ankara)"
                  />
                </div>

                <div>
                  <label htmlFor="fullName">Adınız Soyadınız</label>
                  <InputText
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="previousName">
                    İsminizi değiştirdiyseniz eski adınız
                  </label>
                  <InputText
                    id="previousName"
                    name="previousName"
                    value={formik.values.previousName}
                    onChange={formik.handleChange}
                    placeholder="İsminizi değiştirdiyseniz eski adınız"
                  />
                </div>

                <div>
                  <label htmlFor="birthPlace">
                    Doğum Yeri (Pasaportta yazıldığı gibi)
                  </label>
                  <InputText
                    id="birthPlace"
                    name="birthPlace"
                    value={formik.values.birthPlace}
                    onChange={formik.handleChange}
                    placeholder="Doğum Yeri (Pasaportta yazıldığı gibi)"
                  />
                </div>

                <div>
                  <label htmlFor="maritalStatus">Medeni Hal</label>
                  <Dropdown
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formik.values.maritalStatus}
                    options={maritalStatusOptions.map((status) => ({
                      label: status,
                      value: status,
                    }))}
                    onChange={formik.handleChange}
                    placeholder="Medeni Hal"
                  />
                </div>

                <div>
                  <label htmlFor="secondCitizenship">
                    İkinci bir vatandaşlığınız var mı? Belirtiniz
                  </label>
                  <InputText
                    id="secondCitizenship"
                    name="secondCitizenship"
                    value={formik.values.secondCitizenship}
                    onChange={formik.handleChange}
                    placeholder="İkinci bir vatandaşlığınız var mı? Belirtiniz"
                  />
                </div>

                <div>
                  <label htmlFor="secondCitizenshipPassport">
                    İkinci vatandaşlığınız varsa, pasaport numarasını ya da
                    oturum kartı numarasını yazınız
                  </label>
                  <InputText
                    id="secondCitizenshipPassport"
                    name="secondCitizenshipPassport"
                    value={formik.values.secondCitizenshipPassport}
                    onChange={formik.handleChange}
                    placeholder="İkinci vatandaşlığınız varsa, pasaport numarasını ya da oturum kartı numarasını yazınız"
                  />
                </div>

                <div>
                  <label htmlFor="socialSecurityNumber">
                    Daha önce Work and Travel programına katıldıysanız, U.S
                    Social Security Numaranız
                  </label>
                  <InputText
                    id="socialSecurityNumber"
                    name="socialSecurityNumber"
                    value={formik.values.socialSecurityNumber}
                    onChange={formik.handleChange}
                    placeholder="(Amerika'da daha önce çalışmış olanlar)"
                  />
                </div>

                <div>
                  <label htmlFor="idNumber">Tc Kimlik No</label>
                  <InputText
                    id="idNumber"
                    name="idNumber"
                    value={formik.values.idNumber}
                    onChange={formik.handleChange}
                    placeholder="Tc Kimlik No"
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
                  <label htmlFor="homeAddress">Ev Adresi (İkamet adresi)</label>
                  <InputText
                    id="homeAddress"
                    name="homeAddress"
                    value={formik.values.homeAddress}
                    onChange={formik.handleChange}
                    placeholder="Ev Adresi (İkamet adresi)"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode">Posta Kodu</label>
                  <InputText
                    id="postalCode"
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    placeholder="Posta Kodu"
                  />
                </div>

                <div>
                  <label htmlFor="alternativeAddress">
                    Başka bir adreste kalıyorsanız, adresi belirtiniz. (Öğrenci
                    evi, yurt vb.)
                  </label>
                  <InputText
                    id="alternativeAddress"
                    name="alternativeAddress"
                    value={formik.values.alternativeAddress}
                    onChange={formik.handleChange}
                    placeholder="Başka bir adreste kalıyorsanız, adresi belirtiniz. (Öğrenci evi, yurt vb.)"
                  />
                </div>

                <div>
                  <label htmlFor="alternativePostalCode">Posta Kodu</label>
                  <InputText
                    id="alternativePostalCode"
                    name="alternativePostalCode"
                    value={formik.values.alternativePostalCode}
                    onChange={formik.handleChange}
                    placeholder="Posta Kodu"
                  />
                </div>

                <div>
                  <label htmlFor="mobilePhone">Cep telefon No</label>
                  <InputText
                    id="mobilePhone"
                    name="mobilePhone"
                    value={formik.values.mobilePhone}
                    onChange={formik.handleChange}
                    placeholder="Cep telefon No"
                  />
                </div>

                <div>
                  <label htmlFor="homePhone">Ev Telefonu</label>
                  <InputText
                    id="homePhone"
                    name="homePhone"
                    value={formik.values.homePhone}
                    onChange={formik.handleChange}
                    placeholder="Ev Telefonu"
                  />
                </div>

                <div>
                  <label htmlFor="email">E-posta Adresi</label>
                  <InputText
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="E-posta Adresi"
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
                  <label htmlFor="askfm">ASK.FM</label>
                  <InputText
                    id="askfm"
                    name="askfm"
                    value={formik.values.askfm}
                    onChange={formik.handleChange}
                    placeholder="ASK.FM"
                  />
                </div>

                <div>
                  <label htmlFor="reddit">Reddit</label>
                  <InputText
                    id="reddit"
                    name="reddit"
                    value={formik.values.reddit}
                    onChange={formik.handleChange}
                    placeholder="Reddit"
                  />
                </div>

                <div>
                  <label htmlFor="douban">Douban</label>
                  <InputText
                    id="douban"
                    name="douban"
                    value={formik.values.douban}
                    onChange={formik.handleChange}
                    placeholder="Douban"
                  />
                </div>

                <div>
                  <label htmlFor="sinaWeibo">Sina Weibo</label>
                  <InputText
                    id="sinaWeibo"
                    name="sinaWeibo"
                    value={formik.values.sinaWeibo}
                    onChange={formik.handleChange}
                    placeholder="Sina Weibo"
                  />
                </div>

                <div>
                  <label htmlFor="facebook">Facebook</label>
                  <InputText
                    id="facebook"
                    name="facebook"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    placeholder="Facebook"
                  />
                </div>

                <div>
                  <label htmlFor="tencentWeibo">Tencent Weibo</label>
                  <InputText
                    id="tencentWeibo"
                    name="tencentWeibo"
                    value={formik.values.tencentWeibo}
                    onChange={formik.handleChange}
                    placeholder="Tencent Weibo"
                  />
                </div>

                <div>
                  <label htmlFor="flickr">Flickr</label>
                  <InputText
                    id="flickr"
                    name="flickr"
                    value={formik.values.flickr}
                    onChange={formik.handleChange}
                    placeholder="Flickr"
                  />
                </div>

                <div>
                  <label htmlFor="tumblr">Tumblr</label>
                  <InputText
                    id="tumblr"
                    name="tumblr"
                    value={formik.values.tumblr}
                    onChange={formik.handleChange}
                    placeholder="Tumblr"
                  />
                </div>

                <div>
                  <label htmlFor="googlePlus">Google Plus</label>
                  <InputText
                    id="googlePlus"
                    name="googlePlus"
                    value={formik.values.googlePlus}
                    onChange={formik.handleChange}
                    placeholder="Google Plus"
                  />
                </div>

                <div>
                  <label htmlFor="twitter">Twitter</label>
                  <InputText
                    id="twitter"
                    name="twitter"
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    placeholder="Twitter"
                  />
                </div>

                <div>
                  <label htmlFor="instagram">Instagram</label>
                  <InputText
                    id="instagram"
                    name="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    placeholder="Instagram"
                  />
                </div>

                <div>
                  <label htmlFor="twoo">Twoo</label>
                  <InputText
                    id="twoo"
                    name="twoo"
                    value={formik.values.twoo}
                    onChange={formik.handleChange}
                    placeholder="Twoo"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin">LinkedIn</label>
                  <InputText
                    id="linkedin"
                    name="linkedin"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    placeholder="LinkedIn"
                  />
                </div>

                <div>
                  <label htmlFor="vine">Vine</label>
                  <InputText
                    id="vine"
                    name="vine"
                    value={formik.values.vine}
                    onChange={formik.handleChange}
                    placeholder="Vine"
                  />
                </div>

                <div>
                  <label htmlFor="myspace">MySpace</label>
                  <InputText
                    id="myspace"
                    name="myspace"
                    value={formik.values.myspace}
                    onChange={formik.handleChange}
                    placeholder="MySpace"
                  />
                </div>

                <div>
                  <label htmlFor="vkontakte">VKontakte</label>
                  <InputText
                    id="vkontakte"
                    name="vkontakte"
                    value={formik.values.vkontakte}
                    onChange={formik.handleChange}
                    placeholder="VKontakte"
                  />
                </div>

                <div>
                  <label htmlFor="pinterest">Pinterest</label>
                  <InputText
                    id="pinterest"
                    name="pinterest"
                    value={formik.values.pinterest}
                    onChange={formik.handleChange}
                    placeholder="Pinterest"
                  />
                </div>

                <div>
                  <label htmlFor="youku">Youku</label>
                  <InputText
                    id="youku"
                    name="youku"
                    value={formik.values.youku}
                    onChange={formik.handleChange}
                    placeholder="Youku"
                  />
                </div>

                <div>
                  <label htmlFor="qzone">Qzone</label>
                  <InputText
                    id="qzone"
                    name="qzone"
                    value={formik.values.qzone}
                    onChange={formik.handleChange}
                    placeholder="Qzone"
                  />
                </div>

                <div>
                  <label htmlFor="youtube">YouTube</label>
                  <InputText
                    id="youtube"
                    name="youtube"
                    value={formik.values.youtube}
                    onChange={formik.handleChange}
                    placeholder="YouTube"
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
                  <label htmlFor="passportNumber">Pasaport No</label>
                  <InputText
                    id="passportNumber"
                    name="passportNumber"
                    value={formik.values.passportNumber}
                    onChange={formik.handleChange}
                    placeholder="Pasaport No"
                  />
                </div>

                <div>
                  <label htmlFor="passportAuthority">Veren Makam (Şehir)</label>
                  <InputText
                    id="passportAuthority"
                    name="passportAuthority"
                    value={formik.values.passportAuthority}
                    onChange={formik.handleChange}
                    placeholder="Veren Makam (Şehir)"
                  />
                </div>

                <div>
                  <label htmlFor="lostPassport">
                    Daha önce pasaport kaybettiniz mi?
                  </label>
                  <InputText
                    id="lostPassport"
                    name="lostPassport"
                    value={formik.values.lostPassport}
                    onChange={formik.handleChange}
                    placeholder="Daha önce pasaport kaybettiniz mi?"
                  />
                </div>

                <div>
                  <label htmlFor="lostPassportNumber">
                    Kaybettiyseniz, pasaport no
                  </label>
                  <InputText
                    id="lostPassportNumber"
                    name="lostPassportNumber"
                    value={formik.values.lostPassportNumber}
                    onChange={formik.handleChange}
                    placeholder="Kaybettiyseniz, pasaport no"
                  />
                </div>

                <div>
                  <label htmlFor="lostPassportAuthority">
                    (Kaybettiyseniz) Veren Makam
                  </label>
                  <InputText
                    id="lostPassportAuthority"
                    name="lostPassportAuthority"
                    value={formik.values.lostPassportAuthority}
                    onChange={formik.handleChange}
                    placeholder="(Kaybettiyseniz) Veren Makam"
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
                  <label htmlFor="sponsorName">İsim Soyisim</label>
                  <InputText
                    id="sponsorName"
                    name="sponsorName"
                    value={formik.values.sponsorName}
                    onChange={formik.handleChange}
                    placeholder="İsim Soyisim"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorRelationship">
                    Yakınlığını belirtiniz (anne, baba, kardeş- mevcut işveren)
                  </label>
                  <InputText
                    id="sponsorRelationship"
                    name="sponsorRelationship"
                    value={formik.values.sponsorRelationship}
                    onChange={formik.handleChange}
                    placeholder="Yakınlığını belirtiniz"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorPhone">Telefon numarası</label>
                  <InputText
                    id="sponsorPhone"
                    name="sponsorPhone"
                    value={formik.values.sponsorPhone}
                    onChange={formik.handleChange}
                    placeholder="Telefon numarası"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorEmail">E-posta Adresi</label>
                  <InputText
                    id="sponsorEmail"
                    name="sponsorEmail"
                    value={formik.values.sponsorEmail}
                    onChange={formik.handleChange}
                    placeholder="E-posta Adresi"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorAddress">
                    Masraflarınızı karşılayan kişi yukarıda yazdıklarınızdan
                    farklı bir adreste yaşıyorsa belirtiniz ve adresi yazın
                  </label>
                  <InputText
                    id="sponsorAddress"
                    name="sponsorAddress"
                    value={formik.values.sponsorAddress}
                    onChange={formik.handleChange}
                    placeholder="Adres"
                  />
                </div>

                <div>
                  <label htmlFor="sponsorPostalCode">Posta kodu</label>
                  <InputText
                    id="sponsorPostalCode"
                    name="sponsorPostalCode"
                    value={formik.values.sponsorPostalCode}
                    onChange={formik.handleChange}
                    placeholder="Posta kodu"
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
                  <label htmlFor="visitedUS">
                    Daha önce ABD’ye gittiniz mi? (evet, hayır)
                  </label>
                  <Dropdown
                    id="visitedUS"
                    name="visitedUS"
                    value={formik.values.visitedUS}
                    options={[
                      { label: "Evet", value: "evet" },
                      { label: "Hayır", value: "hayir" },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="Daha önce ABD’ye gittiniz mi?"
                  />
                </div>

                <div>
                  <label htmlFor="usEntryDate">Giriş Tarihi</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="usEntryDate"
                    name="usEntryDate"
                    value={formik.values.usEntryDate}
                    onChange={(e) =>
                      formik.setFieldValue("usEntryDate", e.value)
                    }
                    placeholder="Giriş Tarihinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="usExitDate">Dönüş Tarihi</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="usExitDate"
                    name="usExitDate"
                    value={formik.values.usExitDate}
                    onChange={(e) =>
                      formik.setFieldValue("usExitDate", e.value)
                    }
                    placeholder="Dönüş Tarihinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="previousVisa">
                    Daha önce ABD vizesi aldınız mı?
                  </label>
                  <Dropdown
                    id="previousVisa"
                    name="previousVisa"
                    value={formik.values.previousVisa}
                    options={[
                      { label: "Evet", value: "evet" },
                      { label: "Hayır", value: "hayir" },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="Daha önce ABD vizesi aldınız mı?"
                  />
                </div>

                <div>
                  <label htmlFor="previousVisaDate">
                    Aldıysanız, Vize Tarihi
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="previousVisaDate"
                    name="previousVisaDate"
                    value={formik.values.previousVisaDate}
                    onChange={(e) =>
                      formik.setFieldValue("previousVisaDate", e.value)
                    }
                    placeholder="Vize Tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="visaType">Vize Türü</label>
                  <InputText
                    id="visaType"
                    name="visaType"
                    value={formik.values.visaType}
                    onChange={formik.handleChange}
                    placeholder="Vize Türü"
                  />
                </div>

                <div>
                  <label htmlFor="visaNumber">
                    Vize Numarası (Vize sayfasındaki kırmızı 8 haneli numara)
                  </label>
                  <InputText
                    id="visaNumber"
                    name="visaNumber"
                    value={formik.values.visaNumber}
                    onChange={formik.handleChange}
                    placeholder="Vize Numarası"
                  />
                </div>

                <div>
                  <label htmlFor="visaConsulate">
                    Vizeyi aldığınız konsolosluk konumu
                  </label>
                  <InputText
                    id="visaConsulate"
                    name="visaConsulate"
                    value={formik.values.visaConsulate}
                    onChange={formik.handleChange}
                    placeholder="Konsolosluk Konumu"
                  />
                </div>

                <div>
                  <label htmlFor="visaRejection">
                    Daha önce ABD’den vize reddi aldınız mı?
                  </label>
                  <Dropdown
                    id="visaRejection"
                    name="visaRejection"
                    value={formik.values.visaRejection}
                    options={[
                      { label: "Evet", value: "evet" },
                      { label: "Hayır", value: "hayir" },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="Daha önce ABD’den vize reddi aldınız mı?"
                  />
                </div>

                <div>
                  <label htmlFor="rejectionReason">Sizce Nedeni ne?</label>
                  <InputText
                    id="rejectionReason"
                    name="rejectionReason"
                    value={formik.values.rejectionReason}
                    onChange={formik.handleChange}
                    placeholder="Sizce Nedeni ne?"
                  />
                </div>

                <div>
                  <label htmlFor="rejectionDate">Red Tarihi</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="rejectionDate"
                    name="rejectionDate"
                    value={formik.values.rejectionDate}
                    onChange={(e) =>
                      formik.setFieldValue("rejectionDate", e.value)
                    }
                    placeholder="Red Tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="rejectionVisaType">Vize Türü</label>
                  <InputText
                    id="rejectionVisaType"
                    name="rejectionVisaType"
                    value={formik.values.rejectionVisaType}
                    onChange={formik.handleChange}
                    placeholder="Vize Türü"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 7 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="fatherName">Babanızın Adı-Soyadı</label>
                  <InputText
                    id="fatherName"
                    name="fatherName"
                    value={formik.values.fatherName}
                    onChange={formik.handleChange}
                    placeholder="Babanızın Adı-Soyadı"
                  />
                </div>

                <div>
                  <label htmlFor="fatherBirthDate">
                    Doğum Tarihi (GG-AA-YYYY)
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="fatherBirthDate"
                    name="fatherBirthDate"
                    value={formik.values.fatherBirthDate}
                    onChange={(e) =>
                      formik.setFieldValue("fatherBirthDate", e.value)
                    }
                    placeholder="Doğum Tarihinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="motherName">Annenizin Adı-Soyadı</label>
                  <InputText
                    id="motherName"
                    name="motherName"
                    value={formik.values.motherName}
                    onChange={formik.handleChange}
                    placeholder="Annenizin Adı-Soyadı"
                  />
                </div>

                <div>
                  <label htmlFor="motherBirthDate">
                    Doğum Tarihi (GG-AA-YYYY)
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="motherBirthDate"
                    name="motherBirthDate"
                    value={formik.values.motherBirthDate}
                    onChange={(e) =>
                      formik.setFieldValue("motherBirthDate", e.value)
                    }
                    placeholder="Doğum Tarihinizi seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="hasUSRelative">
                    ABD’de akrabanız var mı?
                  </label>
                  <Dropdown
                    id="hasUSRelative"
                    name="hasUSRelative"
                    value={formik.values.hasUSRelative}
                    options={[
                      { label: "Evet", value: "evet" },
                      { label: "Hayır", value: "hayir" },
                    ]}
                    onChange={formik.handleChange}
                    placeholder="ABD’de akrabanız var mı?"
                  />
                </div>

                <div>
                  <label htmlFor="relativeName">Varsa adı - soyadı</label>
                  <InputText
                    id="relativeName"
                    name="relativeName"
                    value={formik.values.relativeName}
                    onChange={formik.handleChange}
                    placeholder="Akrabanızın adı - soyadı"
                  />
                </div>

                <div>
                  <label htmlFor="relativeRelationship">
                    Yakınlığı belirtiniz
                  </label>
                  <InputText
                    id="relativeRelationship"
                    name="relativeRelationship"
                    value={formik.values.relativeRelationship}
                    onChange={formik.handleChange}
                    placeholder="Yakınlığını belirtiniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 8 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="w_fullname">İsmi Soyismi</label>
                  <InputText
                    id="w_fullname"
                    name="w_fullname"
                    value={formik.values.w_fullname}
                    onChange={formik.handleChange}
                    placeholder="İsmi Soyismi"
                  />
                </div>

                <div>
                  <label htmlFor="w_birthdate">Doğum Tarihi (Gün-Ay-Yıl)</label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="w_birthdate"
                    name="w_birthdate"
                    value={formik.values.w_birthdate}
                    onChange={(e) =>
                      formik.setFieldValue("w_birthdate", e.value)
                    }
                    placeholder="Doğum Tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="w_birthplace">
                    Doğum Yeri (Pasaportta yazıldığı gibi)
                  </label>
                  <InputText
                    id="w_birthplace"
                    name="w_birthplace"
                    value={formik.values.w_birthplace}
                    onChange={formik.handleChange}
                    placeholder="Doğum Yeri"
                  />
                </div>

                <div>
                  <label htmlFor="w_tc_no">Kimlik No (ID Number)</label>
                  <InputText
                    id="w_tc_no"
                    name="w_tc_no"
                    value={formik.values.w_tc_no}
                    onChange={formik.handleChange}
                    placeholder="Kimlik No"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 9 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="universityName">
                    Üniversitenizin İsmi ve Okuduğunuz Bölüm
                  </label>
                  <InputText
                    id="universityName"
                    name="universityName"
                    value={formik.values.universityName}
                    onChange={formik.handleChange}
                    placeholder="Üniversitenizin İsmi ve Okuduğunuz Bölüm"
                  />
                </div>

                <div>
                  <label htmlFor="universityPhone">Telefonu</label>
                  <InputText
                    id="universityPhone"
                    name="universityPhone"
                    value={formik.values.universityPhone}
                    onChange={formik.handleChange}
                    placeholder="Telefonu"
                  />
                </div>

                <div>
                  <label htmlFor="universityAddress">
                    Adresi (Posta kodu da belirtiniz)
                  </label>
                  <InputText
                    id="universityAddress"
                    name="universityAddress"
                    value={formik.values.universityAddress}
                    onChange={formik.handleChange}
                    placeholder="Adresi (Posta kodu da belirtiniz)"
                  />
                </div>

                <div>
                  <label htmlFor="universityStartDate">
                    Üniversite Başlangıç Tarihi (Gün/Ay/Yıl)
                  </label>
                  <Calendar
                    dateFormat="dd/mm/yy"
                    locale="tr"
                    id="universityStartDate"
                    name="universityStartDate"
                    value={formik.values.universityStartDate}
                    onChange={(e) =>
                      formik.setFieldValue("universityStartDate", e.value)
                    }
                    placeholder="Üniversite Başlangıç Tarihini seçiniz"
                  />
                </div>

                <div>
                  <label htmlFor="highSchoolName">
                    Lise Eğitimi Aldığınız Okul (Meslek lisesi mi belirtiniz)
                  </label>
                  <InputText
                    id="highSchoolName"
                    name="highSchoolName"
                    value={formik.values.highSchoolName}
                    onChange={formik.handleChange}
                    placeholder="Lise Eğitimi Aldığınız Okul"
                  />
                </div>

                <div>
                  <label htmlFor="highSchoolStartEndDate">
                    Liseye Başlangıç ve Mezuniyet Tarihi
                  </label>
                  <InputText
                    id="highSchoolStartEndDate"
                    name="highSchoolStartEndDate"
                    value={formik.values.highSchoolStartEndDate}
                    onChange={formik.handleChange}
                    placeholder="Liseye Başlangıç ve Mezuniyet Tarihi"
                  />
                </div>

                <div>
                  <label htmlFor="highSchoolAddress">
                    Adresi (Posta Kodu da Belirtiniz)
                  </label>
                  <InputText
                    id="highSchoolAddress"
                    name="highSchoolAddress"
                    value={formik.values.highSchoolAddress}
                    onChange={formik.handleChange}
                    placeholder="Adresi (Posta Kodu da Belirtiniz)"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 10 && (
            <>
              <h2>Başka Bir Üniversite Okuduysanız Belirtiniz (Devam Eden)</h2>
              <div className="step">
                <div>
                  <label htmlFor="otherUniversityName">
                    Üniversite İsmi ve Okunan Bölüm Adı
                  </label>
                  <InputText
                    id="otherUniversityName"
                    name="otherUniversityName"
                    value={formik.values.otherUniversityName}
                    onChange={formik.handleChange}
                    placeholder="Üniversite İsmi ve Okunan Bölüm Adı"
                  />
                </div>

                <div>
                  <label htmlFor="otherUniversityAddress">
                    Adresi (Posta Kodu da Belirtiniz)
                  </label>
                  <InputText
                    id="otherUniversityAddress"
                    name="otherUniversityAddress"
                    value={formik.values.otherUniversityAddress}
                    onChange={formik.handleChange}
                    placeholder="Adresi (Posta Kodu da Belirtiniz)"
                  />
                </div>

                <div>
                  <label htmlFor="otherUniversityStartEndDate">
                    Başlangıç ve Bitiş Tarihi
                  </label>
                  <InputText
                    id="otherUniversityStartEndDate"
                    name="otherUniversityStartEndDate"
                    value={formik.values.otherUniversityStartEndDate}
                    onChange={formik.handleChange}
                    placeholder="Başlangıç ve Bitiş Tarihi"
                  />
                </div>

                <div>
                  <label htmlFor="workPlace">
                    Sigortalı Çalışıyor İseniz Çalıştığınız Yerin İsmi ve Adresi
                  </label>
                  <InputText
                    id="workPlace"
                    name="workPlace"
                    value={formik.values.workPlace}
                    onChange={formik.handleChange}
                    placeholder="Çalıştığınız Yerin İsmi ve Adresi"
                  />
                </div>

                <div>
                  <label htmlFor="workDetails">
                    Görev Tanımınız, İşe Başlangıç Tarihiniz ve Aylık Geliriniz
                  </label>
                  <InputText
                    id="workDetails"
                    name="workDetails"
                    value={formik.values.workDetails}
                    onChange={formik.handleChange}
                    placeholder="Görev Tanımınız, İşe Başlangıç Tarihiniz ve Aylık Geliriniz"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 11 && (
            <>
              <div className="step">
                <div>
                  <label htmlFor="otherLanguages">
                    Türkçe Dışında Bildiğiniz Yabancı Dilleri Yazınız (Orta ve
                    Üzeri)
                  </label>
                  <InputText
                    id="otherLanguages"
                    name="otherLanguages"
                    value={formik.values.otherLanguages}
                    onChange={formik.handleChange}
                    placeholder="Türkçe Dışında Bildiğiniz Yabancı Dilleri Yazınız (Orta ve Üzeri)"
                  />
                </div>

                <div>
                  <label htmlFor="countriesVisited">
                    Son 5 Yıl İçinde Yurt Dışına Çıktınız Mı? Ülkeleri Yazınız.
                  </label>
                  <InputText
                    id="countriesVisited"
                    name="countriesVisited"
                    value={formik.values.countriesVisited}
                    onChange={formik.handleChange}
                    placeholder="Ülkeleri Yazınız"
                  />
                </div>

                <div>
                  <label htmlFor="militaryService">
                    Askerlik Yaptıysanız – Başlangıç ve Bitiş Tarihi
                  </label>
                  <InputText
                    id="militaryService"
                    name="militaryService"
                    value={formik.values.militaryService}
                    onChange={formik.handleChange}
                    placeholder="Askerlik Başlangıç ve Bitiş Tarihini Yazınız"
                  />
                </div>

                <div>
                  <label htmlFor="charityMembership">
                    Bir Yardım Kuruluşuna Üye Misiniz? Yazınız.
                  </label>
                  <InputText
                    id="charityMembership"
                    name="charityMembership"
                    value={formik.values.charityMembership}
                    onChange={formik.handleChange}
                    placeholder="Bir Yardım Kuruluşuna Üye Misiniz?"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button onClick={handleNextStep}>İleri</button>
                </div>
              </div>
            </>
          )}

          {currentStep === 12 && (
            <>
              <h2>
                Verdiğiniz bilgileri doğrulacak iki kişi (Akrabanız olmamalıdır,
                aynı soyadı taşımamalısınız, zorunludur) belirtilmelidir. Açık
                adres yazmanız gerekmektedir. (F1 vizesi için gereklidir.)
              </h2>
              <div className="step">
                <div>
                  <label htmlFor="reference1Name">Adı Soyadı</label>
                  <InputText
                    id="reference1Name"
                    name="reference1Name"
                    value={formik.values.reference1Name}
                    onChange={formik.handleChange}
                    placeholder="Adı Soyadı"
                  />
                </div>

                <div>
                  <label htmlFor="reference1Address">
                    Adresi (Posta Kodu da Belirtiniz)
                  </label>
                  <InputText
                    id="reference1Address"
                    name="reference1Address"
                    value={formik.values.reference1Address}
                    onChange={formik.handleChange}
                    placeholder="Adresi (Posta Kodu da Belirtiniz)"
                  />
                </div>

                <div>
                  <label htmlFor="reference1Phone">Telefonu</label>
                  <InputText
                    id="reference1Phone"
                    name="reference1Phone"
                    value={formik.values.reference1Phone}
                    onChange={formik.handleChange}
                    placeholder="Telefonu"
                  />
                </div>

                <div>
                  <label htmlFor="reference1Email">E-posta Adresi</label>
                  <InputText
                    id="reference1Email"
                    name="reference1Email"
                    value={formik.values.reference1Email}
                    onChange={formik.handleChange}
                    placeholder="E-posta Adresi"
                  />
                </div>

                <div>
                  <label htmlFor="reference2Name">Adı Soyadı</label>
                  <InputText
                    id="reference2Name"
                    name="reference2Name"
                    value={formik.values.reference2Name}
                    onChange={formik.handleChange}
                    placeholder="Adı Soyadı"
                  />
                </div>

                <div>
                  <label htmlFor="reference2Address">
                    Adresi (Posta Kodu da Belirtiniz)
                  </label>
                  <InputText
                    id="reference2Address"
                    name="reference2Address"
                    value={formik.values.reference2Address}
                    onChange={formik.handleChange}
                    placeholder="Adresi (Posta Kodu da Belirtiniz)"
                  />
                </div>

                <div>
                  <label htmlFor="reference2Phone">Telefonu</label>
                  <InputText
                    id="reference2Phone"
                    name="reference2Phone"
                    value={formik.values.reference2Phone}
                    onChange={formik.handleChange}
                    placeholder="Telefonu"
                  />
                </div>

                <div>
                  <label htmlFor="reference2Email">E-posta Adresi</label>
                  <InputText
                    id="reference2Email"
                    name="reference2Email"
                    value={formik.values.reference2Email}
                    onChange={formik.handleChange}
                    placeholder="E-posta Adresi"
                  />
                </div>

                <div className="buttons">
                  <button onClick={handlePreviousStep}>Geri</button>
                  <button type="button" onClick={handleNextStep}>
                    Gönder
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default DS160StepForm;
