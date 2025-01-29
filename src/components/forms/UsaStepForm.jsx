import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useState, useEffect, useRef } from "react";
import { t } from "i18next";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
import Swal from "sweetalert2";

const UsaStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const { activeLanguage } = useLanguage();

  const steps = [
    {
      id: 0,
      label: "Kişisel Bilgiler",
      text: t("usaForm.step1"),
    },
    {
      id: 1,
      label: "Seyahat Bilgileri",
      text: t("usaForm.step2"),
    },
    {
      id: 2,
      label: "Geçmiş ABD Seyahat Bilgileri",
      text: t("usaForm.step3"),
    },
    {
      id: 3,
      label: "İletişim Bilgileri",
      text: t("usaForm.step4"),
    },
    {
      id: 4,
      label: "Pasaport Bilgileri",
      text: t("usaForm.step5"),
    },
    {
      id: 5,
      label: "ABD Seyahatı İletişim Bilgileri",
      text: t("usaForm.step6"),
    },
    {
      id: 6,
      label: "Aile Bilgileri",
      text: t("usaForm.step7"),
    },
    {
      id: 7,
      label: "Güncel ve Geçmiş Mesleki Durum/Eğitim Bilgileri",
      text: t("usaForm.step8"),
    },
    {
      id: 8,
      label: "Ek Zorunlu Bilgiler",
      text: t("usaForm.step9"),
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      step: steps[0],
      name: "surname",
      text: t("usaForm.question1"),
      label: "Soyadınız",
      type: "text",
      required: true,
    },
    {
      id: 2,
      step: steps[0],
      name: "name",
      label: "Adınız",
      text: t("usaForm.question2"),
      type: "text",
      required: true,
    },
    {
      id: 3,
      step: steps[0],
      name: "birthSurname",
      text: t("usaForm.question3"),
      label:
        "Doğum ile Aldığınız Soyad Farklı İse Nedir? (Evlenmeden Önce – Değiştirilmiş Soyad)",
      type: "text",
      required: false,
    },
    {
      id: 4,
      step: steps[0],
      name: "birthDate",
      label: "Doğum Tarihi",
      text: t("usaForm.question4"),
      type: "calendar",
      required: true,
    },
    {
      id: 5,
      step: steps[0],
      name: "birthPlace",
      label: "Doğum Yeri",
      text: t("usaForm.question5"),
      type: "text",
      required: true,
    },
    {
      id: 6,
      step: steps[0],
      name: "nationality",
      label: "Hangi Ülke Vatandaşısınız?",
      text: t("usaForm.question6"),
      type: "text",
      required: true,
    },
    {
      id: 7,
      step: steps[0],
      name: "otherCitizenship",
      label: "Başka Bir Uyruga Sahip Misiniz?",
      text: t("usaForm.question7"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question7_1"),
          text: t("usaForm.question7_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question7_2"),
          text: t("usaForm.question7_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
    },
    {
      id: 8,
      step: steps[0],
      name: "otherCitizenshipPassport",
      label: "O Bölgeye Ait Pasaportunuz Var mı?",
      text: t("usaForm.question8"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question8_1"),
          text: t("usaForm.question8_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question8_2"),
          text: t("usaForm.question8_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "otherCitizenshipPassportNumber",
          label: "Pasaport numarası nedir?",
          text: t("usaForm.question8_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 9,
      step: steps[0],
      name: "residenceInAnotherCountry",
      label:
        "Vatandaşı Olduğunuz Ülkeden Farklı Bir Ülkede Mi İkamet Ediyorsunuz?",
      text: t("usaForm.question9"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question9_1"),
          text: t("usaForm.question9_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question9_2"),
          text: t("usaForm.question9_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "residenceCountry",
          label: "Hangi ülke belirtiniz.",
          text: t("usaForm.question9_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 10,
      step: steps[0],
      name: "tcIdentityNumber",
      label: "TC Kimlik No",
      text: t("usaForm.question10"),
      type: "text",
      required: true,
    },
    {
      id: 11,
      step: steps[0],
      name: "ssn",
      label: "ABD Sosyal Güvenlik Numaranız Varsa Nedir? (SSN)",
      text: t("usaForm.question11"),
      type: "text",
      required: false,
    },
    {
      id: 12,
      step: steps[0],
      name: "taxNumber",
      label: "ABD Vergi Mükellefi Kimlik Numaranız Varsa Nedir?",
      text: t("usaForm.question12"),
      type: "text",
      required: false,
    },
    {
      id: 13,
      step: steps[1],
      name: "visaType",
      label: "Hangi Vize Tipine Başvuruyorsunuz?",
      text: t("usaForm.question13"),
      type: "text",
      required: true,
    },
    {
      id: 14,
      step: steps[1],
      name: "specificPlan",
      label: "Spesifik Bir Tatil Planınız Var mı?",
      text: t("usaForm.question14"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question14_1"),
          text: t("usaForm.question14_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question14_2"),
          text: t("usaForm.question14_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "specificPlanDestination",
          label: "Varış Tarihi",
          text: t("usaForm.question14_1_1"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "specificPlanCity",
          label: "Varış Şehri",
          text: t("usaForm.question14_1_2"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "specificPlanDepartureDate",
          label: "Kalkış Tarihi",
          text: t("usaForm.question14_1_3"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "specificPlanDepartureCity",
          label: "Kalkış Yeri",
          text: t("usaForm.question14_1_4"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          name: "specificPlanCities",
          label: "Hangi Şehir-Şehirleri Ziyaret Edeceksiniz?",
          text: t("usaForm.question14_1_5"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 6,
          name: "specificPlanDate",
          label:
            "Tahmini seyahat tarihiniz nedir, kaç gün kalmayı planlıyorsunuz?",
          text: t("usaForm.question14_1_6"),
          type: "text",
          required: true,
          if_value: ["Hayır"],
        },
      ],
    },
    {
      id: 15,
      step: steps[1],
      name: "accommodation",
      label: "Kalacağınız Adres Belli Mi?",
      text: t("usaForm.question15"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question15_1"),
          text: t("usaForm.question15_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question15_2"),
          text: t("usaForm.question15_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "accommodationAddress",
          label: "Adresi nedir?",
          text: t("usaForm.question15_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 16,
      step: steps[1],
      name: "travelCosts",
      label: "Seyahat Masraflarını Kim Karşılayacak?",
      text: t("usaForm.question16"),
      type: "dropdown",
      options: [
        {
          label: "Kendisi",
          value: t("usaForm.question16_1"),
          text: t("usaForm.question16_1"),
          showValue: "Kendisi",
        },
        {
          label: "İşveren",
          value: t("usaForm.question16_2"),
          text: t("usaForm.question16_2"),
          showValue: "İşveren",
        },
        {
          label: "ABD’de İşveren",
          value: t("usaForm.question16_3"),
          text: t("usaForm.question16_3"),
          showValue: "ABD’de İşveren",
        },
        {
          label: "Diğer Kişi",
          value: t("usaForm.question16_4"),
          text: t("usaForm.question16_4"),
          showValue: "Diğer Kişi",
        },
        {
          label: "Diğer Şirket",
          value: t("usaForm.question16_5"),
          text: t("usaForm.question16_5"),
          showValue: "Diğer Şirket",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelCostsPersonName",
          label: "Kişinin Adı Soyadı",
          text: t("usaForm.question16_4_1"),
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 2,
          name: "travelCostsPersonPhone",
          label: "Telefon Numarası",
          text: t("usaForm.question16_4_2"),
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 3,
          name: "travelCostsPersonEmail",
          label: "E-posta Adresi",
          text: t("usaForm.question16_4_3"),
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 4,
          name: "travelCostsPersonRelation",
          label: "Sizinle Yakınlığı Nedir?",
          text: t("usaForm.question16_4_4"),
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 5,
          name: "travelCostsCompany",
          label: "Kuruluşun Adı",
          text: t("usaForm.question16_5_1"),
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 6,
          name: "travelCostsCompanyPhone",
          label: "Telefon Numarası",
          text: t("usaForm.question16_5_2"),
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 7,
          name: "travelCostsCompanyRelation",
          label: "Şirketle İlişkiniz",
          text: t("usaForm.question16_5_3"),
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 8,
          name: "travelCostsCompanyAddress",
          label: "Kuruluşun Adresi",
          text: t("usaForm.question16_5_4"),
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
      ],
    },
    {
      id: 17,
      step: steps[1],
      name: "travelWithOthers",
      label: "Sizinle Birlikte Seyahat Edecek Kişiler Var mı?",
      text: t("usaForm.question17"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question17_1"),
          text: t("usaForm.question17_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question17_2"),
          text: t("usaForm.question17_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelWithOthersGroup",
          label:
            "Bu Bir Grup Mu? Grubun Adı Nedir? Değilse Ad-Soyad ve Sizinle Yakınlığı Nedir?",
          text: t("usaForm.question17_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 18,
      step: steps[2],
      name: "travelledToUs",
      label: "Daha Önce ABD’ye Seyahat Ettiniz Mi?",
      text: t("usaForm.question18"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question18_1"),
          text: t("usaForm.question18_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question18_2"),
          text: t("usaForm.question18_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelledToUsArrivalDate",
          label: "Varış Tarihi",
          text: t("usaForm.question18_1_1"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "travelledToUsDuration",
          label:
            "Ne Kadar Süre Kaldınız? (Tarihlerden Emin Değilseniz En Yakın Tarihleri Belirtiniz)",
          text: t("usaForm.question18_1_2"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "travelledToUsDriverLicense",
          label:
            "ABD Sürücü Belgeniz Var mı ya da Daha Önce Oldu Mu? Olduysa Sürücü Belgesi Numaranız Nedir, Hangi Eyaletten Aldınız?",
          text: t("usaForm.question18_1_3"),
          type: "text",
          required: false,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 19,
      step: steps[2],
      name: "previousUsVisa",
      label: "Daha Önce ABD Vizesi Aldınız mı?",
      text: t("usaForm.question19"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question19_1"),
          text: t("usaForm.question19_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question19_2"),
          text: t("usaForm.question19_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaIssueDate",
          label: "Son Aldığınız Vizenin Veriliş Tarihi",
          text: t("usaForm.question19_1_1"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousUsVisaNumber",
          label: "Vize Numarası",
          text: t("usaForm.question19_1_2"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "previousUsVisaType",
          label: "Hangi Vize Türüne Başvuru Yaptığınız",
          text: t("usaForm.question19_1_3"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "previousUsVisaBiometrics",
          label: "Parmak İzinizi Alındı Mı?",
          text: t("usaForm.question19_1_4"),
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("usaForm.question19_4_1"),
              text: t("usaForm.question19_4_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("usaForm.question19_4_2"),
              text: t("usaForm.question19_4_2"),
              showValue: "Hayır",
            },
          ],
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 19.2,
      step: steps[2],
      name: "previousUsVisaLostOrStolen",
      label: "Vizeniz Kayboldu veya Çalındı Mı?",
      text: t("usaForm.question19__2"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question19__2_1"),
          text: t("usaForm.question19__2_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question19__2_2"),
          text: t("usaForm.question19__2_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaLostOrStolenYear",
          label: "Hangi Yıl",
          text: t("usaForm.question19__2_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousUsVisaLostOrStolenExplanation",
          label: "Nasıl oldu açıklayınız",
          text: t("usaForm.question19__2_1_2"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 20,
      step: steps[2],
      name: "previousUsVisaCancelled",
      label: "Vizeniz İptal Edildi veya Geri Alındı mı?",
      text: t("usaForm.question20"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question20_1"),
          text: t("usaForm.question20_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question20_2"),
          text: t("usaForm.question20_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaCancelledExplanation",
          label: "Açıklayınız",
          text: t("usaForm.question20_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 21,
      step: steps[2],
      name: "previousUsVisaRejected",
      label: "Daha Önce ABD Vize Başvurunuz – Girişiniz – Reddedildi Mi?",
      text: t("usaForm.question21"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question21_1"),
          text: t("usaForm.question21_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question21_2"),
          text: t("usaForm.question21_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaRejectedExplanation",
          label: "Açıklayınız",
          text: t("usaForm.question21_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 22,
      step: steps[2],
      name: "previousUsImmigrationPetition",
      label:
        "Daha Önce Adınıza ABD Göçmenlik Hizmetlerine Göçmenlik İçin Dilekçe Verildi Mi?",
      text: t("usaForm.question22"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question22_1"),
          text: t("usaForm.question22_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question22_2"),
          text: t("usaForm.question22_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsImmigrationPetitionExplanation",
          label: "Açıklayınız",
          text: t("usaForm.question22_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 23,
      step: steps[3],
      name: "homeAddress",
      label:
        "Ev Adresinizi Mahalle – Sokak / Cd Apt Adı Bina No İl İlçe Posta Kodu Şeklinde Belirtiniz.",
      text: t("usaForm.question23"),
      type: "textarea",
      required: true,
    },
    {
      id: 24,
      step: steps[3],
      name: "phone",
      label: "Telefon Numaranız Nedir?",
      text: t("usaForm.question24"),
      type: "text",
      required: true,
    },
    {
      id: 25,
      step: steps[3],
      name: "secondPhone",
      label: "İkinci Bir Telefon Numarası Belirtiniz.",
      text: t("usaForm.question25"),
      type: "text",
      required: false,
    },
    {
      id: 26,
      step: steps[3],
      name: "workPhone",
      label: "İş Numaranız Nedir?",
      text: t("usaForm.question26"),
      type: "text",
      required: false,
    },
    {
      id: 27,
      step: steps[3],
      name: "email",
      label: "E-posta Adresiniz Nedir?",
      text: t("usaForm.question27"),
      type: "text",
      required: true,
    },
    {
      id: 28,
      step: steps[3],
      name: "useSocialMedia",
      label: "Sosyal Medya Kullanıyor Musunuz?",
      text: t("usaForm.question28"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question28_1"),
          text: t("usaForm.question28_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question28_2"),
          text: t("usaForm.question28_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "socialMedia",
          label:
            "Sosyal Medya Adreslerinizi, Uygulama Adı ve Kullanıcı Adı Şeklinde Belirtiniz. Kullanıcı Adınızı Bilmiyorsanız Link Ekleyebilirsiniz. (Ek Olarak Bir İşletme Sahibi vs. iseniz İşletmenin Sosyal Medya Kullanıcı Adını Belirtiniz)",
          text: t("usaForm.question28_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "socialMediaLink",
          label:
            "İçerik Paylaşmak Amacıyla Web Sitesi, Blog vs. Varsa Link Ekleyiniz",
          text: t("usaForm.question28_1_2"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 29,
      step: steps[4],
      name: "passportNumber",
      label: "Pasaport numaranız nedir?",
      text: t("usaForm.question29"),
      type: "text",
      required: true,
    },
    {
      id: 30,
      step: steps[4],
      name: "passportCountry",
      label: "Hangi ülkenin pasaportu ile başvuru yapıyorsunuz?",
      text: t("usaForm.question30"),
      type: "text",
      required: true,
    },
    {
      id: 31,
      step: steps[4],
      name: "passportAuthority",
      label: "Veren makam (Pasaportta görünen şekliyle)",
      text: t("usaForm.question31"),
      type: "text",
      required: true,
    },
    {
      id: 32,
      step: steps[4],
      name: "passportIssueDate",
      label: "Pasaport verilme tarihi",
      text: t("usaForm.question32"),
      type: "calendar",
      required: true,
    },
    {
      id: 33,
      step: steps[4],
      name: "passportExpiryDate",
      label: "Pasaport son geçerlilik tarihi",
      text: t("usaForm.question33"),
      type: "calendar",
      required: true,
    },
    {
      id: 34,
      step: steps[4],
      name: "passportLostOrStolen",
      label: "Daha önce pasaportunuz çalındı ya da kayboldu mu?",
      text: t("usaForm.question34"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question34_1"),
          text: t("usaForm.question34_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question34_2"),
          text: t("usaForm.question34_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "passportLostOrStolenExplanation",
          label:
            "Pasaport numarası, hangi ülkeden aldığınız ve olayı açıklayınız.",
          text: t("usaForm.question34_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 35,
      step: steps[5],
      name: "usAccommodation",
      label: "ABD’de kalacağınız adres belli mi?",
      text: t("usaForm.question35"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question35_1"),
          text: t("usaForm.question35_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question35_2"),
          text: t("usaForm.question35_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usAccommodationAddress",
          label: "Adresi nedir?",
          text: t("usaForm.question35_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 36,
      step: steps[5],
      name: "usRelative",
      label: "ABD’de bir yakınınızın yanına mı seyahat ediyorsunuz?",
      text: t("usaForm.question36"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question36_1"),
          text: t("usaForm.question36_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question36_2"),
          text: t("usaForm.question36_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usRelativeName",
          label: "Kişi adı soyadı, adresi, yakınlığınız nedir?",
          text: t("usaForm.question36_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 37,
      step: steps[5],
      name: "usEvent",
      label: "ABD’de bir etkinliğe katılacak mısınız?",
      text: t("usaForm.question37"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question37_1"),
          text: t("usaForm.question37_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question37_2"),
          text: t("usaForm.question37_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usEventName",
          label:
            "Etkinlik adı, adresi, iletişimde olduğunuz kişi varsa adı soyadı nedir?",
          text: t("usaForm.question37_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 38,
      step: steps[5],
      name: "usSchoolOrCompany",
      label: "Bir okula veya şirket/kuruluşa gidiyor musunuz?",
      text: t("usaForm.question38"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question38_1"),
          text: t("usaForm.question38_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question38_2"),
          text: t("usaForm.question38_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "usSchoolOrCompanyInfo",
          label: "Adresi giriniz",
          text: t("usaForm.question38_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 39,
      step: steps[6],
      name: "fatherName",
      label: "Baba adı soyadı",
      text: t("usaForm.question39"),
      type: "text",
      required: true,
    },
    {
      id: 39.2,
      step: steps[6],
      name: "fatherBirthDate",
      label: "Baba doğum tarihi",
      text: t("usaForm.question39__2"),
      type: "calendar",
      required: true,
    },
    {
      id: 40,
      step: steps[6],
      name: "motherName",
      label: "Anne adı-soyadı, doğum tarihi (gün, ay, yıl)",
      text: t("usaForm.question40"),
      type: "text",
      required: true,
    },
    {
      id: 40.2,
      step: steps[6],
      name: "motherBirthDate",
      label: "Anne doğum tarihi",
      text: t("usaForm.question40__2"),
      type: "calendar",
      required: true,
    },
    {
      id: 41,
      step: steps[6],
      name: "parentsInUsMother",
      label: "Anneniz ABD’de mi?",
      text: t("usaForm.question41"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question41_1"),
          text: t("usaForm.question41_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question41_2"),
          text: t("usaForm.question41_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parentsInUsMotherStatus",
          label:
            "Amerika’daki durumu nedir? (Vatandaş, LPR yasal daimi ikamet sahibi, vize sahibi, diğer)",
          text: t("usaForm.question41_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 41.2,
      step: steps[6],
      name: "parentsInUsFather",
      label: "Babanız ABD’de mi?",
      text: t("usaForm.question41__2"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question41__2_1"),
          text: t("usaForm.question41__2_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question41__2_2"),
          text: t("usaForm.question41__2_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parentsInUsFatherStatus",
          label:
            "Amerika’daki durumu nedir? (Vatandaş, LPR yasal daimi ikamet sahibi, vize sahibi, diğer)",
          text: t("usaForm.question41__2_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 42,
      step: steps[6],
      name: "relativeInUs",
      label:
        "Anne-babanız haricinde ABD’de yaşayan birinci derece akrabanız var mı? (Nişanlı, eş, çocuk veya kardeş)",
      text: t("usaForm.question42"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question42_1"),
          text: t("usaForm.question42_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question42_2"),
          text: t("usaForm.question42_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "relativeInUsInfo",
          label: "Ad-soyad, sizinle yakınlığı, ABD’deki durumu belirtiniz.",
          text: t("usaForm.question42_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 43,
      step: steps[6],
      name: "maritalStatus",
      label: "Medeni Durumnuz Nedir?",
      text: t("usaForm.question43"),
      type: "dropdown",
      options: [
        {
          label: "Bekar",
          value: t("usaForm.question43_1"),
          text: t("usaForm.question43_1"),
          showValue: "Bekar",
        },
        {
          label: "Evli",
          value: t("usaForm.question43_2"),
          text: t("usaForm.question43_2"),
          showValue: "Evli",
        },
        {
          label: "Boşanmış",
          value: t("usaForm.question43_3"),
          text: t("usaForm.question43_3"),
          showValue: "Boşanmış",
        },
        {
          label: "Dul",
          value: t("usaForm.question43_4"),
          text: t("usaForm.question43_4"),
          showValue: "Dul",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "spouseFirstNameLastName",
          label: "Eşinizin adı ve soyadı nedir?",
          text: t("usaForm.question43_2_1"),
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 2,
          name: "spouseBirthLastName",
          label: "Eşinizin doğumla birlikte aldığı soyadı nedir?",
          text: t("usaForm.question43_2_2"),
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 3,
          name: "spouseBirthDate",
          label: "Eşinizin doğum tarihi nedir?",
          text: t("usaForm.question43_2_3"),
          type: "calendar",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 4,
          name: "spouseBirthPlace",
          label: "Eşinizin doğum yeri nedir?",
          text: t("usaForm.question43_2_4"),
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 5,
          name: "spouseNationality",
          label: "Eşinizin uyruk nedir?",
          text: t("usaForm.question43_2_5"),
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 6,
          name: "spouseAddress",
          label: "Sizinle aynı adreste mi yaşıyor?",
          text: t("usaForm.question43_2_6"),
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("usaForm.question43_2_6_1"),
              text: t("usaForm.question43_2_6_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("usaForm.question43_2_6_2"),
              text: t("usaForm.question43_2_6_2"),
              showValue: "Hayır",
            },
          ],
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 7,
          name: "spousePreviousMarriageCount",
          label: "Kaç kere evlendiniz?",
          text: t("usaForm.question43_2_7"),
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 8,
          name: "previousSpouseName",
          label: "Eski eşinizin adı ve soyadı nedir?",
          text: t("usaForm.question43_3_1"),
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 9,
          name: "previousSpouseBirthDate",
          label: "Eski eşinizin doğum tarihi nedir?",
          text: t("usaForm.question43_3_2"),
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 10,
          name: "previousSpouseBirthPlace",
          label: "Eski eşinizin doğum yeri nedir?",
          text: t("usaForm.question43_3_3"),
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 11,
          name: "previousSpouseNationality",
          label: "Eski eşinizin uyruğu nedir?",
          text: t("usaForm.question43_3_4"),
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 12,
          name: "marriageDate",
          label: "Evlilik tarihiniz nedir?",
          text: t("usaForm.question43_3_5"),
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 13,
          name: "divorceDate",
          label: "Boşanma tarihiniz nedir?",
          text: t("usaForm.question43_3_6"),
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 14,
          name: "divorceCountry",
          label: "Hangi ülkede boşandınız?",
          text: t("usaForm.question43_3_7"),
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 15,
          name: "deceasedSpouseName",
          label: "Vefat eden eşinizin adı ve soyadı nedir?",
          text: t("usaForm.question43_4_1"),
          type: "text",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 16,
          name: "deceasedSpouseBirthDate",
          label: "Vefat eden eşinizin doğum tarihi nedir?",
          text: t("usaForm.question43_4_2"),
          type: "calendar",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 17,
          name: "deceasedSpouseBirthDate",
          label: "Vefat eden eşinizin vefat tarihi nedir?",
          text: t("usaForm.question43_4_3"),
          type: "calendar",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 18,
          name: "deceasedSpouseBirthPlace",
          label: "Vefat eden eşinizin doğum yeri nedir?",
          text: t("usaForm.question43_4_4"),
          type: "text",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 19,
          name: "deceasedSpouseNationality",
          label: "Vefat eden eşinizin uyruk nedir?",
          text: t("usaForm.question43_4_5"),
          type: "text",
          required: true,
          if_value: ["Dul"],
        },
      ],
    },
    {
      id: 44,
      step: steps[7],
      label: "Mesleki dumunuz nedir?",
      text: t("usaForm.question44"),
      name: "profession",
      type: "dropdown",
      options: [
        {
          label: "Öğrenci",
          value: t("usaForm.question44_1"),
          text: t("usaForm.question44_1"),
          showValue: "Öğrenci",
        },
        {
          label: "Çalışan",
          value: t("usaForm.question44_2"),
          text: t("usaForm.question44_2"),
          showValue: "Çalışan",
        },
        {
          label: "İşveren",
          value: t("usaForm.question44_3"),
          text: t("usaForm.question44_3"),
          showValue: "İşveren",
        },
        {
          label: "Kamu Görevlisi",
          value: t("usaForm.question44_4"),
          text: t("usaForm.question44_4"),
          showValue: "Kamu Görevlisi",
        },
        {
          label: "Emekli",
          value: t("usaForm.question44_5"),
          text: t("usaForm.question44_5"),
          showValue: "Emekli",
        },
        {
          label: "İşsiz",
          value: t("usaForm.question44_6"),
          text: t("usaForm.question44_6"),
          showValue: "İşsiz",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "workplaceName",
          label: "İş yerinizin adı nedir?",
          text: t("usaForm.question44_2_1"),
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 2,
          name: "workplaceAddress",
          label: "İş yerinizin adresi nedir?",
          text: t("usaForm.question44_2_2"),
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 3,
          name: "workplacePhone",
          label: "İş yerinizin telefon numarası nedir?",
          text: t("usaForm.question44_2_3"),
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 4,
          name: "jobStartDate",
          label: "İşe başlama tarihiniz nedir?",
          text: t("usaForm.question44_2_4"),
          type: "calendar",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 5,
          name: "monthlyIncome",
          label: "Aylık geliriniz nedir?",
          text: t("usaForm.question44_2_5"),
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 6,
          name: "jobDescription",
          label: "İş tanımınız nedir?",
          text: t("usaForm.question44_2_6"),
          type: "textarea",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 7,
          name: "publicWorkplaceName",
          label: "İş yerinizin adı nedir?",
          text: t("usaForm.question44_4_1"),
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 8,
          name: "publicWorkplaceAddress",
          label: "İş yerinizin adresi nedir?",
          text: t("usaForm.question44_4_2"),
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 9,
          name: "publicWorkplacePhone",
          label: "İş yerinizin telefon numarası nedir?",
          text: t("usaForm.question44_4_3"),
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 10,
          name: "publicJobStartDate",
          label: "Kamuda göreve başlama tarihiniz nedir?",
          text: t("usaForm.question44_4_4"),
          type: "calendar",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 11,
          name: "publicMonthlyIncome",
          label: "Aylık geliriniz nedir?",
          text: t("usaForm.question44_4_5"),
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 12,
          name: "publicJobDescription",
          label: "İş tanımınız nedir?",
          text: t("usaForm.question44_4_6"),
          type: "textarea",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 13,
          name: "schoolName",
          label: "Okulunuzun adı nedir?",
          text: t("usaForm.question44_1_1"),
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 14,
          name: "schoolAddress",
          label: "Okulunuzun adresi nedir?",
          text: t("usaForm.question44_1_2"),
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 15,
          name: "schoolPhone",
          label: "Okulunuzun telefon numarası nedir?",
          text: t("usaForm.question44_1_3"),
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 16,
          name: "schoolStartDate",
          label: "Okula başlama tarihiniz nedir?",
          text: t("usaForm.question44_1_4"),
          type: "calendar",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 17,
          name: "schoolDepartment",
          label: "Bölümünüz nedir?",
          text: t("usaForm.question44_1_5"),
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 18,
          name: "schoolClass",
          label: "Sınıfınız nedir?",
          text: t("usaForm.question44_1_6"),
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
      ],
    },
    {
      id: 45,
      step: steps[7],
      label: "Daha önce bir yerde çalıştınız mı?",
      text: t("usaForm.question45"),
      name: "previousJob",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question45_1"),
          text: t("usaForm.question45_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question45_2"),
          text: t("usaForm.question45_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousWorkplaceName",
          label: "Çalıştığınız iş yerinin adı nedir?",
          text: t("usaForm.question45_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousWorkplaceAddress",
          label: "Çalıştığınız iş yerinin adresi nedir?",
          text: t("usaForm.question45_1_2"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "previousWorkplacePhone",
          label: "Çalıştığınız iş yerinin telefon numarası nedir?",
          text: t("usaForm.question45_1_3"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "previousJobTitle",
          label: "Çalıştığınız iş yerindeki unvanınız nedir?",
          text: t("usaForm.question45_1_4"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          name: "previousSupervisorName",
          label: "Amirinizin adı ve soyadı nedir (varsa)?",
          text: t("usaForm.question45_1_5"),
          type: "text",
          required: false,
          if_value: ["Evet"],
        },
        {
          id: 6,
          name: "previousJobStartDate",
          label: "Çalışmaya başlama tarihiniz nedir?",
          text: t("usaForm.question45_1_6"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 7,
          name: "previousJobEndDate",
          label: "Çalışmayı bitirme tarihiniz nedir?",
          text: t("usaForm.question45_1_7"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 46,
      step: steps[7],
      name: "education",
      label: "Eğitim durumunuz nedir?",
      text: t("usaForm.question46"),
      type: "dropdown",
      options: [
        {
          label: "İlkokul",
          value: t("usaForm.question46_1"),
          text: t("usaForm.question46_1"),
          showValue: "İlkokul",
        },
        {
          label: "Ortaokul",
          value: t("usaForm.question46_2"),
          text: t("usaForm.question46_2"),
          showValue: "Ortaokul",
        },
        {
          label: "Lise",
          value: t("usaForm.question46_3"),
          text: t("usaForm.question46_3"),
          showValue: "Lise",
        },
        {
          label: "Üniversite",
          value: t("usaForm.question46_4"),
          text: t("usaForm.question46_4"),
          showValue: "Üniversite",
        },
        {
          label: "Yüksek Lisans",
          value: t("usaForm.question46_5"),
          text: t("usaForm.question46_5"),
          showValue: "Yüksek Lisans",
        },
        {
          label: "Doktora",
          value: t("usaForm.question46_6"),
          text: t("usaForm.question46_6"),
          showValue: "Doktora",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "highSchoolName",
          label: "Eğitim aldığınız lisenin adı nedir?",
          text: t("usaForm.question46_3_1"),
          type: "text",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 2,
          name: "highSchoolAddress",
          label: "Eğitim aldığınız lisenin adresi nedir?",
          text: t("usaForm.question46_3_2"),
          type: "text",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 3,
          name: "highSchoolStartDate",
          label: "Lise başlama tarihiniz nedir?",
          text: t("usaForm.question46_3_3"),
          type: "date",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 4,
          name: "highSchoolGraduationDate",
          label: "Lise mezuniyet tarihiniz nedir?",
          text: t("usaForm.question46_3_4"),
          type: "date",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 5,
          name: "universityName",
          label: "Eğitim aldığınız üniversitenin adı nedir?",
          text: t("usaForm.question46_4_1"),
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 6,
          name: "universityAddress",
          label: "Eğitim aldığınız üniversitenin adresi nedir?",
          text: t("usaForm.question46_4_2"),
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 7,
          name: "universityStartDate",
          label: "Üniversite başlama tarihiniz nedir?",
          text: t("usaForm.question46_4_3"),
          type: "date",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 8,
          name: "universityGraduationDate",
          label: "Üniversite mezuniyet tarihiniz nedir?",
          text: t("usaForm.question46_4_4"),
          type: "date",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 9,
          name: "universityDepartment",
          label: "Üniversitedeki bölümünüz nedir?",
          text: t("usaForm.question46_4_5"),
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 10,
          name: "mastersUniversityName",
          label: "Yüksek lisans yaptığınız üniversitenin adı nedir?",
          text: t("usaForm.question46_5_1"),
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 11,
          name: "mastersUniversityAddress",
          label: "Yüksek lisans yaptığınız üniversitenin adresi nedir?",
          text: t("usaForm.question46_5_2"),
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 12,
          name: "mastersStartDate",
          label: "Yüksek lisansa başlama tarihiniz nedir?",
          text: t("usaForm.question46_5_3"),
          type: "date",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 13,
          name: "mastersGraduationDate",
          label: "Yüksek lisans mezuniyet tarihiniz nedir?",
          text: t("usaForm.question46_5_4"),
          type: "date",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 14,
          name: "mastersDepartment",
          label: "Yüksek lisanstaki bölümünüz nedir?",
          text: t("usaForm.question46_5_5"),
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 15,
          name: "phdUniversityName",
          label: "Doktora yaptığınız üniversitenin adı nedir?",
          text: t("usaForm.question46_6_1"),
          type: "text",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 16,
          name: "phdUniversityAddress",
          label: "Doktora yaptığınız üniversitenin adresi nedir?",
          text: t("usaForm.question46_6_2"),
          type: "text",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 17,
          name: "phdStartDate",
          label: "Doktora başlama tarihiniz nedir?",
          text: t("usaForm.question46_6_3"),
          type: "date",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 18,
          name: "phdGraduationDate",
          label: "Doktora mezuniyet tarihiniz nedir?",
          text: t("usaForm.question46_6_4"),
          type: "date",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 19,
          name: "phdDepartment",
          label: "Doktoradaki bölümünüz nedir?",
          text: t("usaForm.question46_6_5"),
          type: "text",
          required: true,
          if_value: ["Doktora"],
        },
      ],
    },
    {
      id: 47,
      step: steps[8],
      name: "language",
      label: "Bildiğiniz yabancı dilleri belirtiniz.",
      text: t("usaForm.question47"),
      type: "text",
      required: true,
    },
    {
      id: 48,
      step: steps[8],
      name: "previusSchengenVisa",
      label: "Daha önce Schengen vizesi aldınız mı?",
      text: t("usaForm.question48"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("usaForm.question48_1"),
          text: t("usaForm.question48_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("usaForm.question48_2"),
          text: t("usaForm.question48_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previusSchengenVisaInfo",
          label:
            "Hangi ülkeden, kaç gün kaldınız, Schengen bölgesinde geçiş sağladığınız diğer ülkeler varsa belirtiniz",
          text: t("usaForm.question48_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
    },
    {
      id: 49,
      step: steps[8],
      name: "travelHistory",
      label: "Daha önce hangi ülkelere seyahat ettiniz?",
      text: t("usaForm.question49"),
      type: "textarea",
      required: true,
    },
    {
      id: 50,
      step: steps[8],
      name: "militaryService",
      label: "Askerlik durumunuz nedir?",
      text: t("usaForm.question50"),
      type: "dropdown",
      options: [
        {
          label: "Yapıldı",
          value: t("usaForm.question50_1"),
          text: t("usaForm.question50_1"),
          showValue: "Yapıldı",
        },
        {
          label: "Yapılmadı",
          value: t("usaForm.question50_2"),
          text: t("usaForm.question50_2"),
          showValue: "Yapılmadı",
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "militaryServiceInfo",
          label: "Ne zaman, terhis tarihini belirtiniz",
          text: t("usaForm.question50_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Yapıldı"],
        },
      ],
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
          step: { id: item.step.id, label: item.step.label },
          type: item.type,
          otherInputs: item.otherInputs
            ? item.otherInputs.reduce((acc, input) => {
                acc[input.name] = {
                  label: input.label,
                  name: input.name,
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
        summary: t("swal.error"),
        detail: t("swal.formError"),
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
      input.type === "calendar"
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
        form_id: "2",
        values: formValues,
        lang: activeLanguage.code,
      });

      if (response.data.insertId) {
        Swal.fire(t("swal.success"), t("swal.formSendSuccess"), "success");
        defaultSetValues();
        setCurrentStep(0);
      } else {
        toast.current.show({
          severity: "error",
          summary: t("swal.error"),
          detail: t("swal.formSendError"),
          life: 2000,
        });
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: t("swal.error"),
        detail: t("swal.formError"),
        life: 2000,
      });
    }
  };

  const valueTemplate = (option, props) => {
    if (option) {
      return <div>{option.text}</div>;
    }

    return <span>{props.placeholder}</span>;
  };

  const itemTemplate = (option, props) => {
    if (option) {
      return <div>{option.text}</div>;
    }

    return <span>{props.placeholder}</span>;
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
              <span className="step-name">{item.text}</span>
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
                        <label htmlFor="fullName">{item.text}</label>
                        {item.type === "text" && (
                          <InputText
                            id={item.name}
                            name={item.name}
                            placeholder={item.text}
                            value={formValues[item.name]?.value || ""}
                            onChange={(e) => handleInputChange(e, item)}
                          />
                        )}
                        {item.type === "textarea" && (
                          <InputTextarea
                            id={item.name}
                            name={item.name}
                            placeholder={item.text}
                            value={formValues[item.name]?.value || ""}
                            onChange={(e) => handleInputChange(e, item)}
                          />
                        )}
                        {item.type === "dropdown" && (
                          <Dropdown
                            id={item.name}
                            name={item.name}
                            placeholder={item.text}
                            options={item.options}
                            valueTemplate={valueTemplate}
                            itemTemplate={itemTemplate}
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
                            placeholder={item.text}
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
                                    {input.text}
                                  </label>
                                  {input.type === "text" && (
                                    <InputText
                                      id={input.name}
                                      name={input.name}
                                      placeholder={input.text}
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
                                      placeholder={input.text}
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
                                      placeholder={input.text}
                                      options={input.options}
                                      valueTemplate={valueTemplate}
                                      itemTemplate={itemTemplate}
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
                                      placeholder={input.text}
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
                    {t("input.back")}
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="next-button"
                  >
                    {t("input.next")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    {t("input.send")}
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

export default UsaStepForm;
