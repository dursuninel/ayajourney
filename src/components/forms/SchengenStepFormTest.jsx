import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useState, useEffect, useRef } from "react";
import TurkishToEnglish from "../TurkishToEnglish";
import { t } from "i18next";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
import Swal from "sweetalert2";

const SchengenStepFormTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const { activeLanguage } = useLanguage();

  /* SCHENGEN WEB SITESI SORULARI

SOYADINIZ:
DOGUMLA DAHA ONCE ALDIGINIZ SOYADI: (ZORUNLU DEGIL)
ADINIZ: 
DOGUM TARIHINIZ:
PASAPORTTA BELIRTILEN DOGUM YERINIZ:
DOGUM ULKENIZ:
VATANDASLIGINIZ:
DOGUMDAN FARKLI BIR VATANDASLIGINIZ VARSA BELIRTINIZ: (ZORUNLU DEGIL)
MEDENI DURUMUNUZ NEDIR? 
-	BEKAR – EVLI – BOSANMIS- DUL – KAYIT DISI BERABERLIK – 
EGER 18 YASINDAN KUCUKSE (DOGUM TARIHINE GORE) EBEVEYNIN ADI SOYADI- ADRESI – TELEFONU VE MAIL ADRESI
KIMLIK NUMARANIZ NEDIR:
PASAPORT NUMARAIZ NEDIR:
PASAPORT VERILIS TARIHI:
PASAPORT GECERLILIK TARIHI:
VEREN MAKAM:
IKAMETGAH BELGENIZDE BELIRTILEN ADRES NEDIR:
TELEFON NUMARANIZ NEDIR:
E-POSTANIZ NEDIR:
IKAMET ETTIGINIZ ULKEDEN FARKLI BIR ULKEDE MI IKAMET EDIYORSUNUZ?
CALISMA DURUMUNUZ NEDIR? : ISVEREN – CALISAN – OGRENCI – SERBEST MESLEK
OGRENCI ISENIZ OKUL ADI ADRESI TELEFON NUMARASI (UNIVERSITE OGRENCISI ISENIZ KACINCI SINIF VE BOLUMUNUZU BELIRTINIZ)
ISVEREN – CALISAN YA DA SERBEST MESLEK SECILDIYSE MESLEGINIZ NEDIR:
SIRKETIN ADI NEDIR 
IS ADRESINIZ NEDIR 
SIRKETIN TELEFON NUMARASI NEDIR?
TEK MI SEYAHAT EDECEKSINIZ? CEVAP HAYIR İSE: BERABER GIDECEGINIZ KISILERIN AD-SOYAD VE PASAPORT NUMARALARINI BELIRTINIZ 
SEYAHAT TARIHLERINIZI BELIRTINIZ (GIDIS-DONUS)
DAHA ONCE SCHENGEN VIZESI ICIN PARMAK IZINIZ ALINDI MI? 
CEVAP EVET ISE: PARMAK IZI ALINMA TARIHINIZI YAZINIZ (ZORUNLU DEGIL)
SON SCHENGEN VIZENIZIN ETIKET NUMARASINI BELIRTINIZ (VIZE ETIKET NUMARANIZ; VIZENIZIN SAG UST KOSESINDE BULUNUR, HARFLE BASLAYIP NUMARA ILE DEVAM EDER)
KALACAGINIZ OTEL BELLI MI? CEVAP EVET ISE: 
OTELIN ADI NEDIR?
ADRESI NEDIR?
TELEFONU NEDIR?

MASRAFLARINIZI KIM KARSILAYACAK? KENDIM – ISVERENIM – DIGER KISI
DIGER KISI SECILDIYSE: ADI SOYADI NEDIR – YAKINLIGINIZ NEDIR – E-POSTA ADRESI NEDIR TELEFON NUMARASI NEDIR?

DAVETIYENIZ VAR MI? EVET ISE:
KISI TARAFINDAN GONDERILEN DAVETIYEDEKI KISININ ADI SOYADI ADRESI TELEFON NUMARASI E-POSTA ADRESI VE O KISI ILE YAKINLIGINIZ – O KISININ SCHENGEN ULKESINDEKI DURUMU NEDIR?
SIRKET TARAFINDAN GONDERILEN DAVETIYE ISE: SIRKET ADI -  ADRESI TELEFON NUMARASI– IRTIBAT KISISI AD SOYADI
DAVETIYENIZ YOK ISE: KALACAGINIZ OTEL ADI ADRESI (ZORUNLU DEGIL)
MASRAFLARI BASKA BIRI MI KARSILAYACAK? CEVAP EVET ISE: AD SOYAD – TELEFON NUMARASI – E POSTA ADRESI – MESLEGI – VE YAKINLIK DURUMUNUZU BELIRTINIZ
DAHA ONCE SCHENGEN VIZESI ALDINIZ MI? CEVAP EVET ISE: HANGI TARIHTE VE HANGI ULKELERDEN (ORTALAMA BELIRTINIZ) 
SCHENGEN BOLGESI DISINDA ULKELERE SEYAHAT ETTINIZ MI? BELIRTINIZ.

AKTIF VIZENIZ VAR MI? (INGILTERE, ABD VS.)

 */

  /* SCHENGEN FORMU KATEGORILERI : –  */
  const steps = [
    {
      id: 0,
      label: "Kişisel Bilgiler",
    },
    {
      id: 1,
      label: "Pasaport Bilgileri",
    },
    {
      id: 2,
      label: "Aile Bilgileri",
    },
    {
      id: 3,
      label: "İletişim Bilgileri",
    },
    {
      id: 4,
      label: "Mesleki Durum / Eğitim Bilgileri",
    },
    {
      id: 5,
      label: "Seyahat Bilgileri",
    },
    {
      id: 6,
      label: "Ek Bilgiler",
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      step: steps[0],
      label: "Soyadınız2",
      name: "surname",
      type: "text",
      required: true,
    },
    {
      id: 2,
      step: steps[0],
      label: "Doğumla daha önce aldığınız soyadı",
      name: "previous_surname",
      type: "text",
      required: false,
    },
    {
      id: 3,
      step: steps[0],
      label: "Adınız",
      name: "name",
      type: "text",
      required: true,
    },
    {
      id: 4,
      step: steps[0],
      label: "Doğum tarihiniz",
      name: "birth_date",
      type: "calendar",
      required: true,
    },
    {
      id: 5,
      step: steps[0],
      label: "Pasaportta belirtilen doğum yeriniz",
      name: "birth_place",
      type: "text",
      required: true,
    },
    {
      id: 6,
      step: steps[0],
      label: "Doğum ülkeniz",
      name: "birth_country",
      type: "text",
      required: true,
    },
    {
      id: 7,
      step: steps[0],
      label: "Vatandaşlığınız",
      name: "citizenship",
      type: "text",
      required: true,
    },
    {
      id: 8,
      step: steps[0],
      label: "Doğumdan farklı bir vatandaşlığınız varsa belirtiniz",
      name: "other_citizenship",
      type: "text",
      required: false,
    },
    {
      id: 9,
      step: steps[0],
      label: "Medeni durumunuz nedir?",
      name: "marital_status",
      type: "dropdown",
      options: [
        { label: "Bekar", value: "Bekar" },
        { label: "Evli", value: "Evli" },
        { label: "Boşanmış", value: "Boşanmış" },
        { label: "Dul", value: "Dul" },
        { label: "Kayıt dışı beraberlik", value: "Kayıt dışı beraberlik" },
      ],
      required: true,
    },
    {
      id: 10,
      step: steps[0],
      label: "18 yaşından büyükmüsünüz?",
      name: "is_adult",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parent_name",
          label: "Ebeveynin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
        {
          id: 2,
          name: "parent_address",
          label: "Ebeveynin adresi",
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
        {
          id: 3,
          name: "parent_phone",
          label: "Ebeveynin telefonu",
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
        {
          id: 4,
          name: "parent_email",
          label: "Ebeveynin mail adresi",
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
      ],
    },
    {
      id: 11,
      step: steps[0],
      label: "Kimlik numaranız nedir?",
      name: "identity_number",
      type: "text",
      required: true,
    },
    {
      id: 12,
      step: steps[1],
      label: "Pasaport numaranız nedir?",
      name: "passport_number",
      type: "text",
      required: true,
    },
    {
      id: 13,
      step: steps[1],
      label: "Pasaport veriliş tarihi",
      name: "passport_issue_date",
      type: "calendar",
      required: true,
    },
    {
      id: 14,
      step: steps[1],
      label: "Pasaport geçerlilik tarihi",
      name: "passport_expire_date",
      type: "calendar",
      required: true,
    },
    {
      id: 15,
      step: steps[1],
      label: "Veren makam",
      name: "passport_issuing_authority",
      type: "text",
      required: true,
    },
    {
      id: 16,
      step: steps[1],
      label: "İkametgah belgenizde belirtilen adres nedir?",
      name: "residence_address",
      type: "text",
      required: true,
    },
    {
      id: 17,
      step: steps[0],
      label: "Telefon numaranız nedir?",
      name: "phone_number",
      type: "text",
      required: true,
    },
    {
      id: 18,
      step: steps[0],
      label: "E-postanız nedir?",
      name: "email",
      type: "text",
      required: true,
    },
    {
      id: 19,
      step: steps[0],
      label:
        "İkamet ettiğiniz ülkeden farklı bir ülkede mi ikamet ediyorsunuz?",
      name: "is_residing_abroad",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
    },
    {
      id: 20,
      step: steps[0],
      label: "Çalışma durumunuz nedir?",
      name: "employment_status",
      type: "dropdown",
      options: [
        { label: "İşveren", value: "İşveren" },
        { label: "Çalışan", value: "Çalışan" },
        { label: "Öğrenci", value: "Öğrenci" },
        { label: "Serbest meslek", value: "Serbest meslek" },
      ],
      otherInputs: [
        {
          id: 1,
          name: "school_name",
          label: "Okul adı",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 2,
          name: "school_address",
          label: "Okul adresi",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 3,
          name: "school_phone",
          label: "Okul telefon numarası",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 4,
          name: "school_class",
          label: "Sınıf",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 5,
          name: "school_department",
          label: "Bölüm",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 6,
          name: "job_title",
          label: "Meslek",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 7,
          name: "company_name",
          label: "Şirket adı",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 8,
          name: "company_address",
          label: "İş adresi",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 9,
          name: "company_phone",
          label: "Şirket telefon numarası",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
      ],
      required: true,
    },
    {
      id: 21,
      step: steps[0],
      label: "Tek mi seyahat edeceksiniz?",
      name: "is_traveling_alone",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travel_companions",
          label: "Beraber gideceğiniz kişiler",
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
      ],
    },
    {
      id: 22,
      step: steps[0],
      label: "Seyahat tarihleriniz",
      name: "travel_dates",
      type: "text",
      required: true,
    },
    {
      id: 23,
      step: steps[0],
      label: "Daha önce Schengen vizesi için parmak iziniz alındı mı?",
      name: "is_fingerprint_taken",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "fingerprint_date",
          label: "Parmak izi alınma tarihi",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 24,
      step: steps[0],
      label:
        "Son Schengen vizenizin etiket numarasını belirtiniz (Vize etiket numaranız; vizinizin sağ üst köşesinde bulunur, harfle başlayıp numara ile devam eder)",
      name: "last_visa_number",
      type: "text",
      required: false,
    },
    {
      id: 25,
      step: steps[0],
      label: "Kalacağınız otel belli mi?",
      name: "is_hotel_known",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "hotel_name",
          label: "Otel adı",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "hotel_address",
          label: "Otel adresi",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "hotel_phone",
          label: "Otel telefonu",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 26,
      step: steps[0],
      label: "Masraflarınızı kim karşılayacak?",
      name: "expense_payer",
      type: "dropdown",
      options: [
        { label: "Kendim", value: "Kendim" },
        { label: "İşverenim", value: "İşverenim" },
        { label: "Diğer kişi", value: "Diğer kişi" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "payer_name",
          label: "Ödeyenin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 2,
          name: "payer_relation",
          label: "Yakınlık durumu",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 3,
          name: "payer_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 4,
          name: "payer_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
      ],
    },
    {
      id: 27,
      step: steps[0],
      label: "Davetiyeniz varsa kim tarafından gönderildi?",
      name: "has_invitation",
      type: "dropdown",
      options: [
        { label: "Kişi", value: "Kişi" },
        { label: "Şirket", value: "Şirket" },
        { label: "Davetiyem yok", value: "Davetiyem yok" },
      ],
      otherInputs: [
        {
          id: 1,
          name: "inviter_name",
          label: "Davet eden kişinin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 2,
          name: "inviter_address",
          label: "Adresi",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 3,
          name: "inviter_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 4,
          name: "inviter_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 5,
          name: "inviter_relation",
          label: "Yakınlık durumu",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 6,
          name: "inviter_situation",
          label: "Davet eden kişinin Schengen ülkesindeki durumu",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 7,
          name: "company_name",
          label: "Şirket adı",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 8,
          name: "company_address",
          label: "Adresi",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 9,
          name: "company_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 10,
          name: "contact_person",
          label: "İrtibat kişisi",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 11,
          label: "Kalacağınız Otel Adresi",
          name: "hotel_info",
          type: "textarea",
          required: false,
          if_value: ["Davetiyem yok"],
        },
      ],
    },
    {
      id: 28,
      step: steps[0],
      label: "Masrafları başka biri mi karşılayacak?",
      name: "is_expense_payer_other",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "payer_name",
          label: "Ödeyenin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "payer_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "payer_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "payer_job",
          label: "Mesleği",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          name: "payer_relation",
          label: "Yakınlık durumu",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 29,
      step: steps[0],
      label: "Daha önce Schengen vizesi aldınız mı?",
      name: "is_visa_taken",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "visa_date",
          label: "Vize aldığınız tarih (Ortalama)",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "visa_countries",
          label: "Vize aldığınız ülkeler (Ortalama)",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 30,
      step: steps[0],
      label: "Schengen bölgesi dışında ülkelere seyahat ettiniz mi?",
      name: "is_travelled_outside_schengen",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelled_countries",
          label: "Seyahat ettiğiniz ülkeler",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 31,
      step: steps[0],
      label: "Aktif vizeniz var mı? (İngiltere, ABD vs.)",
      name: "is_active_visa",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    defaultSetValues();
    setLoading(false);
  }, [questions]);

  const defaultSetValues = () => {
    questions.map((item) => {
      return setFormValues((prev) => ({
        ...prev,
        [item.name]: {
          label: item.label,
          name: item.name,
          value: "",
          step: item.step,
          type: item.type,
          otherInputs: item.otherInputs
            ? item.otherInputs.reduce((acc, input) => {
                acc[input.name] = {
                  label: input.label,
                  name: input.name,
                  value: "",
                  type: input.type,
                  if_value: input.if_value,
                };
                return acc;
              }, {})
            : {}, // Eğer otherInputs yoksa boş bir nesne
        },
      }));
    });
  };

  const handleScrollToForm = () => {
    const formContainer = document.querySelector(".visa-form-container");
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isStepValid = () => {
    const currentStepInputs = questions.filter(
      (item) => item.step.id === currentStep && item.required !== false
    );

    let isValid = true;

    currentStepInputs.forEach((item) => {
      const value = formValues[item.name]?.value;
      const inputElement = document.getElementById(item.name);

      if (value === "" || value === undefined || value === null) {
        isValid = false;
        if (inputElement) {
          inputElement.classList.add("required-error");
        }
      } else {
        if (inputElement) {
          inputElement.classList.remove("required-error");
        }
      }

      if (item.otherInputs && item.otherInputs.length > 0) {
        item.otherInputs
          .filter((item) => item.required !== false)
          .forEach((input) => {
            if (input.if_value.includes(value)) {
              const otherValue =
                formValues[item.name]?.otherInputs?.[input.name]?.value;
              const otherInputElement = document.getElementById(input.name);

              if (
                otherValue === "" ||
                otherValue === undefined ||
                otherValue === null
              ) {
                isValid = false;
                if (otherInputElement) {
                  otherInputElement.classList.add("required-error");
                }
              } else {
                if (otherInputElement) {
                  otherInputElement.classList.remove("required-error");
                }
              }
            }
          });
      }
    });

    return isValid;
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        handleScrollToForm();
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail: "Lütfen tüm alanları doldurun",
        life: 2000,
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      handleScrollToForm();
    }
  };

  const convertToUppercaseAndReplaceTurkishChars = (value) => {
    const turkishChars = {
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "C",
      Ğ: "G",
      İ: "I",
      Ö: "O",
      Ş: "S",
      Ü: "U",
    };
    return value
      .split("")
      .map((char) => turkishChars[char] || char)
      .join("")
      .toUpperCase();
  };

  const handleInputChange = (e, item) => {
    const { name, value } = e.target;
    const convertedValue =
      item.type === "calendar" || item.type === "dropdown"
        ? value
        : convertToUppercaseAndReplaceTurkishChars(value);
    setFormValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: convertedValue,
      },
    }));
    const inputElement = document.getElementById(name);
    if (inputElement) {
      inputElement.classList.remove("invalid-input");
    }
  };

  const handleOtherInputChange = (e, item, input) => {
    const { name, value } = e.target;
    const convertedValue =
      item.type === "calendar"
        ? value
        : convertToUppercaseAndReplaceTurkishChars(value);

    setFormValues((prev) => ({
      ...prev,
      [item.name]: {
        ...prev[item.name],
        otherInputs: {
          ...prev[item.name]?.otherInputs,
          [name]: {
            ...prev[item.name]?.otherInputs?.[name],
            value: convertedValue,
          },
        },
      },
    }));
    const inputElement = document.getElementById(name);
    if (inputElement) {
      inputElement.classList.remove("invalid-input");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStepValid()) {
      const response = await axios.post("/addFormValue", {
        form_id: "1",
        values: formValues,
        lang: activeLanguage.code,
      });

      if (response.data.insertId) {
        Swal.fire(
          "Başarılı",
          "Form başarıyla gönderildi, En kısa zamanda size ulaşacağız.",
          "success"
        );
        defaultSetValues();
        setCurrentStep(0);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Hata",
          detail: "Form gönderilirken bir hata oluştu",
          life: 2000,
        });
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail: "Lütfen tüm alanları doldurun",
        life: 2000,
      });
    }
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
              <span className="step-name">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="step-line" />
        {loading ? (
          <>Yükleniyor...</>
        ) : (
          <>
            <form>
              <div className="step">
                {questions
                  .filter((item) => item.step.id === currentStep)
                  .map((item, key) => (
                    <React.Fragment key={key}>
                      <div className="step_parent">
                        <label htmlFor="fullName">{item.label}</label>
                        {item.type === "text" && (
                          <InputText
                            id={item.name}
                            name={item.name}
                            placeholder={item.label}
                            value={formValues[item.name]?.value || ""}
                            onChange={(e) => handleInputChange(e, item)}
                          />
                        )}
                        {item.type === "textarea" && (
                          <InputTextarea
                            id={item.name}
                            name={item.name}
                            placeholder={item.label}
                            value={formValues[item.name]?.value || ""}
                            onChange={(e) => handleInputChange(e, item)}
                          />
                        )}
                        {item.type === "dropdown" && (
                          <Dropdown
                            id={item.name}
                            name={item.name}
                            placeholder={item.label}
                            options={item.options}
                            value={formValues[item.name]?.value || ""}
                            onChange={(e) => handleInputChange(e, item)}
                          />
                        )}
                        {item.type === "calendar" && (
                          <Calendar
                            dateFormat="dd/mm/yy"
                            locale="tr"
                            id={item.name}
                            name={item.name}
                            placeholder={item.label}
                            value={formValues[item.name]?.value || null}
                            onChange={(date) =>
                              handleInputChange(
                                {
                                  target: {
                                    name: item.name,
                                    value: date.value,
                                  },
                                },
                                item
                              )
                            }
                          />
                        )}
                      </div>
                      {item.otherInputs && item.otherInputs.length > 0 ? (
                        <>
                          {item.otherInputs
                            .filter((input) =>
                              input.if_value.includes(
                                formValues[item.name]?.value
                              )
                            ) // Doğru filtreleme
                            .map((input) => {
                              return (
                                <div className="step_parent" key={input.name}>
                                  <label htmlFor={input.name}>
                                    {input.label}
                                  </label>
                                  {input.type === "text" && (
                                    <InputText
                                      id={input.name}
                                      name={input.name}
                                      placeholder={input.label}
                                      value={
                                        formValues[item.name]?.otherInputs?.[
                                          input.name
                                        ]?.value || ""
                                      }
                                      onChange={(e) =>
                                        handleOtherInputChange(e, item, input)
                                      }
                                    />
                                  )}
                                  {input.type === "textarea" && (
                                    <InputTextarea
                                      id={input.name}
                                      name={input.name}
                                      placeholder={input.label}
                                      value={
                                        formValues[item.name]?.otherInputs?.[
                                          input.name
                                        ]?.value || ""
                                      }
                                      onChange={(e) =>
                                        handleOtherInputChange(e, item, input)
                                      }
                                    />
                                  )}
                                  {input.type === "dropdown" && (
                                    <Dropdown
                                      id={input.name}
                                      name={input.name}
                                      placeholder={input.label}
                                      options={input.options}
                                      value={
                                        formValues[item.name]?.otherInputs?.[
                                          input.name
                                        ]?.value || ""
                                      }
                                      onChange={(e) =>
                                        handleOtherInputChange(e, item, input)
                                      }
                                    />
                                  )}
                                  {input.type === "calendar" && (
                                    <Calendar
                                      dateFormat="dd/mm/yy"
                                      locale="tr"
                                      id={input.name}
                                      name={input.name}
                                      placeholder={input.label}
                                      value={
                                        formValues[item.name]?.otherInputs?.[
                                          input.name
                                        ]?.value || null
                                      }
                                      onChange={(date) =>
                                        handleOtherInputChange(
                                          {
                                            target: {
                                              name: input.name,
                                              value: date.value,
                                            },
                                          },
                                          item,
                                          input
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              );
                            })}
                        </>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))}
              </div>
              <div className="buttons center">
                {currentStep !== 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="prev-button"
                  >
                    Önceki
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="next-button"
                  >
                    Sonraki
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    Gönder
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SchengenStepFormTest;
