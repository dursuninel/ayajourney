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

const UkStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const { activeLanguage } = useLanguage();

  const steps = [
    {
      id: 0,
      label: "Kişisel Bilgiler",
      text: t("ukForm.step1"),
    },
    {
      id: 1,
      label: "Pasaport Bilgileri",
      text: t("ukForm.step2"),
    },
    {
      id: 2,
      label: "Kimlik Bilgileri",
      text: t("ukForm.step3"),
    },
    {
      id: 3,
      label: "Uyruk/Vatandaşlık Bilgileri",
      text: t("ukForm.step4"),
    },
    {
      id: 4,
      label: "Çalışma Durumu",
      text: t("ukForm.step5"),
    },
    {
      id: 5,
      label: "Ek Gelirler",
      text: t("ukForm.step6"),
    },
    {
      id: 6,
      label: "Seyahat Giderleri",
      text: t("ukForm.step7"),
    },
    {
      id: 7,
      label: "Seyahat Planı",
      text: t("ukForm.step8"),
    },
    {
      id: 8,
      label: "Aile Bilgileri",
      text: t("ukForm.step9"),
    },
    {
      id: 9,
      label: "Seyahat Bilgisi",
      text: t("ukForm.step10"),
    },
    {
      id: 10,
      label: "Konaklama Detayları",
      text: t("ukForm.step11"),
    },
    {
      id: 11,
      label: "Seyahat Geçmişi",
      text: t("ukForm.step12"),
    },
    {
      id: 12,
      label: "Vize Durumu",
      text: t("ukForm.step13"),
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      label: "E-mail adresiniz nedir?",
      name: "email",
      type: "text",
      step: steps[0],
      text: t("ukForm.question1"),
    },
    {
      id: 2,
      label: "Kullandığınız başka e-mail adresiniz var mı?",
      name: "otherEmail",
      type: "text",
      step: steps[0],
      required: false,
      text: t("ukForm.question2"),
    },
    {
      id: 3,
      label: "Telefon numaranız nedir?",
      name: "phone",
      type: "text",
      step: steps[0],
      text: t("ukForm.question3"),
    },
    {
      id: 4,
      label: "Ek olarak kullandığınız telefon numarası var mı?",
      name: "otherPhone",
      type: "text",
      step: steps[0],
      required: false,
      text: t("ukForm.question4"),
    },
    {
      id: 5,
      step: steps[0],
      label: "Cinsiyetiniz nedir?",
      name: "gender",
      type: "dropdown",
      text: t("ukForm.question5"),
      options: [
        {
          label: "Erkek",
          showValue: "Erkek",
          text: t("ukForm.question5_1"),
          value: t("ukForm.question5_1"),
        },
        {
          label: "Kadın",
          showValue: "Kadın",
          text: t("ukForm.question5_2"),
          value: t("ukForm.question5_2"),
        },
      ],
      required: true,
    },

    {
      id: 6,
      label: "Ad – Soyad (Pasaport üzerinde görünen)",
      name: "fullName",
      type: "text",
      step: steps[0],
      text: t("ukForm.question6"),
    },

    {
      id: 7,
      label: "Medeni durumunuz nedir?",
      text: t("ukForm.question7"),
      name: "maritalStatus",
      type: "dropdown",
      options: [
        {
          label: "Bekar",
          value: t("ukForm.question7_1"),
          text: t("ukForm.question7_1"),
          showValue: "Bekar",
        },
        {
          label: "Evli",
          value: t("ukForm.question7_2"),
          text: t("ukForm.question7_2"),
          showValue: "Evli",
        },
        {
          label: "Boşanmış",
          value: t("ukForm.question7_3"),
          text: t("ukForm.question7_3"),
          showValue: "Boşanmış",
        },
        {
          label: "Kayıtlı olmayan birliktelik",
          value: t("ukForm.question7_4"),
          text: t("ukForm.question7_4"),
          showValue: "Kayıtlı olmayan birliktelik",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Evlenmeden önceki soyadınız nedir?",
          text: t("ukForm.question7_2_1"),
          name: "maidenName",
          type: "text",
          if_value: ["Evli"],
        },
        {
          id: 2,
          label: "Eşinizin adı, soyadı",
          text: t("ukForm.question7_2_2"),
          name: "spouseName",
          type: "text",
          if_value: ["Evli"],
        },
        {
          id: 3,
          label: "Doğum tarihi",
          text: t("ukForm.question7_2_3"),
          name: "spouseBirthDate",
          type: "calendar",
          if_value: ["Evli"],
        },
        {
          id: 4,
          label: "Uyruğu",
          text: t("ukForm.question7_2_4"),
          name: "spouseNationality",
          type: "text",
          if_value: ["Evli"],
        },
        {
          id: 5,
          label: "Eşiniz sizinle birlikte mi yaşıyor?",
          text: t("ukForm.question7_2_5"),
          name: "spouseLivingWith",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question7_2_5_1"),
              text: t("ukForm.question7_2_5_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question7_2_5_2"),
              text: t("ukForm.question7_2_5_2"),
              showValue: "Hayır",
            },
          ],
          if_value: ["Evli"],
        },
        {
          id: 6,
          label: "Sizinle birlikte seyahat edecek ise pasaport numarası",
          text: t("ukForm.question7_2_6"),
          name: "spousePassportNumber",
          required: false,
          type: "text",
          if_value: ["Evli"],
        },
      ],
      step: steps[0],
    },

    {
      id: 9,
      label: "Daha önce başka bir isim-soy isim kullandınız mı?",
      text: t("ukForm.question9"),
      name: "usedOtherName",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question9_1"),
          text: t("ukForm.question9_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question9_2"),
          text: t("ukForm.question9_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Daha önce kullandığınız isim-soy ismi",
          text: t("ukForm.question9_1_1"),
          name: "otherName",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[0],
    },
    {
      id: 10,
      label:
        "İkamet ettiğiniz adres nedir? (Mahalle, sokak, cadde, bina, kat, daire)",
      text: t("ukForm.question10"),
      name: "homeAddress",
      type: "text",
      step: steps[0],
    },
    {
      id: 11,
      label: "Ne kadar zamandır bu adreste yaşıyorsunuz?",
      text: t("ukForm.question11"),
      name: "yearsAtHome",
      type: "dropdown",
      options: [
        {
          label: "1-6 Ay",
          value: t("ukForm.question11_1"),
          text: t("ukForm.question11_1"),
          showValue: "1-6 Ay",
        },
        {
          label: "6-12 Ay",
          value: t("ukForm.question11_2"),
          text: t("ukForm.question11_2"),
          showValue: "6-12 Ay",
        },
        {
          label: "1-2 yıl",
          value: t("ukForm.question11_3"),
          text: t("ukForm.question11_3"),
          showValue: "1-2 yıl",
        },
        {
          label: "2-3 yıl",
          value: t("ukForm.question11_4"),
          text: t("ukForm.question11_4"),
          showValue: "2-3 yıl",
        },
        {
          label: "3-4 yıl",
          value: t("ukForm.question11_5"),
          text: t("ukForm.question11_5"),
          showValue: "3-4 yıl",
        },
        {
          label: "5+ Yıl",
          value: t("ukForm.question11_6"),
          text: t("ukForm.question11_6"),
          showValue: "5+ Yıl",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label:
            "Bundan önceki son 2 yıldır yaşadığınız adres ve tarihler nedir?",
          text: t("ukForm.question11_1_1"),
          name: "previousAddresses",
          type: "textarea",
          if_value: ["1-6 Ay", "6-12 Ay"],
        },
      ],
      step: steps[0],
    },
    {
      id: 13,
      label: "Yaşadığınız adres sizin mülkünüz mü?",
      text: t("ukForm.question13"),
      name: "homeOwnership",
      type: "dropdown",
      options: [
        {
          label: "Kendi mülküm",
          value: t("ukForm.question13_1"),
          text: t("ukForm.question13_1"),
          showValue: "Kendi mülküm",
        },
        {
          label: "Kiralık",
          value: t("ukForm.question13_2"),
          text: t("ukForm.question13_2"),
          showValue: "Kiralık",
        },
        {
          label: "Diğer",
          value: t("ukForm.question13_3"),
          text: t("ukForm.question13_3"),
          showValue: "Diğer",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
          text: t("ukForm.question13_3_1"),
          name: "homeOwnershipOther",
          type: "text",
          if_value: ["Diğer"],
        },
      ],
      step: steps[0],
    },

    {
      id: 14,
      label: "Pasaport numaranız nedir?",
      text: t("ukForm.question14"),
      name: "passportNumber",
      type: "text",
      step: steps[1],
    },
    {
      id: 15,
      label: "Pasaportunuzun veriliş tarihi nedir?",
      text: t("ukForm.question15"),
      name: "passportIssueDate",
      type: "calendar",
      step: steps[1],
    },
    {
      id: 16,
      label: "Pasaportunuzun geçerlilik tarihi nedir?",
      text: t("ukForm.question16"),
      name: "passportExpiryDate",
      type: "calendar",
      step: steps[1],
    },
    {
      id: 17,
      label: "Pasaportunuzu veren makam (pasaportunuzda görünen)",
      text: t("ukForm.question17"),
      name: "passportIssuer",
      type: "text",
      step: steps[1],
    },
    {
      id: 18,
      label: "T.C. kimlik numaranız nedir?",
      text: t("ukForm.question18"),
      name: "idNumber",
      type: "text",
      step: steps[2],
    },
    {
      id: 19,
      label: "Kimlik kartınızın geçerlilik tarihi nedir?",
      text: t("ukForm.question19"),
      name: "idExpiryDate",
      type: "calendar",
      step: steps[2],
    },
    {
      id: 20,
      label: "Hangi ülke vatandaşısınız?",
      text: t("ukForm.question20"),
      name: "nationality",
      type: "text",
      step: steps[3],
    },
    {
      id: 21,
      label: "Pasaportta belirtilen doğum ülkeniz neresidir?",
      text: t("ukForm.question21"),
      name: "birthCountry",
      type: "text",
      step: steps[3],
    },
    {
      id: 22,
      label: "Pasaportta yazan doğum yeriniz neresidir?",
      text: t("ukForm.question22"),
      name: "birthPlace",
      type: "text",
      step: steps[3],
    },
    {
      id: 23,
      label: "Doğum tarihinizi belirtiniz",
      text: t("ukForm.question23"),
      name: "birthDate",
      type: "calendar",
      step: steps[3],
    },
    {
      id: 24,
      label:
        "Şu anda başka bir uyruğa veya vatandaşlığa sahip misiniz veya daha önce sahip oldunuz mu?",
      text: t("ukForm.question24"),
      name: "otherNationality",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question24_1"),
          text: t("ukForm.question24_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question24_2"),
          text: t("ukForm.question24_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ülke, hakkın veriliş ve bitiş tarihi, vatandaşlık durumu",
          text: t("ukForm.question24_1_1"),
          name: "otherNationalityInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[3],
    },

    {
      id: 25,
      label: "İş durumunuz nedir?",
      text: t("ukForm.question25"),
      name: "employmentStatus",
      type: "dropdown",
      options: [
        {
          label: "Çalışan",
          value: t("ukForm.question25_1"),
          text: t("ukForm.question25_1"),
          showValue: "Çalışan",
        },
        {
          label: "Şirket sahibi",
          value: t("ukForm.question25_2"),
          text: t("ukForm.question25_2"),
          showValue: "Şirket sahibi",
        },
        {
          label: "Öğrenci",
          value: t("ukForm.question25_3"),
          text: t("ukForm.question25_3"),
          showValue: "Öğrenci",
        },
        {
          label: "Emekli",
          value: t("ukForm.question25_4"),
          text: t("ukForm.question25_4"),
          showValue: "Emekli",
        },
        {
          label: "İşsiz",
          value: t("ukForm.question25_5"),
          text: t("ukForm.question25_5"),
          showValue: "İşsiz",
        },
        {
          label: "Serbest meslek sahibi",
          value: t("ukForm.question25_6"),
          text: t("ukForm.question25_6"),
          showValue: "Serbest meslek sahibi",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Şirket adı",
          text: t("ukForm.question25_1-2_1"),
          name: "companyName",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 2,
          label: "Şirket adresi",
          text: t("ukForm.question25_1-2_2"),
          name: "companyAddress",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 3,
          label: "Telefon numarası",
          text: t("ukForm.question25_1-2_3"),
          name: "companyPhone",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 4,
          label: "İşe giriş tarihi",
          text: t("ukForm.question25_1_4"),
          name: "startDate",
          type: "calendar",
          if_value: ["Çalışan"],
        },
        {
          id: 5,
          label: "İş unvanınız",
          text: t("ukForm.question25_1_5"),
          name: "jobTitle",
          type: "text",
          if_value: ["Çalışan"],
        },
        {
          id: 6,
          label: "Aylık kazancınız (TRY)",
          text: t("ukForm.question25_1_6"),
          name: "monthlyIncome",
          type: "text",
          if_value: ["Çalışan"],
        },
        {
          id: 7,
          label: "Yıllık kazancınız (TRY)",
          text: t("ukForm.question25_1_7"),
          name: "annualIncome",
          type: "text",
          if_value: ["Şirket sahibi"],
        },
        {
          id: 8,
          label: "İşinizi açıklayınız",
          text: t("ukForm.question25_1_8"),
          name: "jobDescription",
          type: "textarea",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 9,
          label: "Görev unvanınız",
          text: t("ukForm.question25_6_1"),
          name: "jobTitle2",
          type: "text",
          if_value: ["Serbest meslek sahibi"],
        },
        {
          id: 10,
          label: "Yıllık kazancınız (TRY)",
          text: t("ukForm.question25_6_2"),
          name: "annualIncome2",
          type: "text",
          if_value: ["Serbest meslek sahibi"],
        },
        {
          id: 11,
          label: "Okul adı",
          text: t("ukForm.question25_3_1"),
          name: "schoolName",
          type: "text",
          if_value: ["Öğrenci"],
        },
        {
          id: 12,
          label: "Okul adresi",
          text: t("ukForm.question25_3_2"),
          name: "schoolAddress",
          type: "text",
          if_value: ["Öğrenci"],
        },
        {
          id: 13,
          label: "Okuduğunuz bölüm nedir?",
          text: t("ukForm.question25_3_3"),
          name: "department",
          type: "text",
          if_value: ["Öğrenci"],
        },
      ],
      step: steps[4],
    },
    {
      id: 26,
      label: "Mesleğinizden gelen gelir dışında başka ek geliriniz var mı?",
      text: t("ukForm.question26"),
      name: "additionalIncome",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question26_1"),
          text: t("ukForm.question26_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question26_2"),
          text: t("ukForm.question26_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label:
            "Açıklayınız: kira geliri, emekli maaşı, yatırımlar vb. yıllık toplam kazanç, GBP cinsinden belirtiniz.",
          text: t("ukForm.question26_1_1"),
          name: "additionalIncomeInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[5],
    },
    {
      id: 27,
      label:
        "Birikim miktarınız nedir? (Banka hesap dökümünüzde göstereceğiniz miktar)(GBP cinsinden)",
      name: "savings",
      type: "text",
      step: steps[5],
      text: t("ukForm.question27"),
    },
    {
      id: 28,
      label:
        "İngiltere’de GBP döviz kuru üzerinden ne kadar harcama yapmayı planlıyorsunuz?",
      name: "ukExpense",
      type: "text",
      step: steps[6],
      text: t("ukForm.question28"),
    },
    {
      id: 29,
      label: "Her ay toplam ne kadar para harcarsınız? (TRY cinsinden)",
      name: "monthlyExpenses",
      type: "text",
      step: steps[6],
      text: t("ukForm.question29"),
    },
    {
      id: 30,
      label: "Seyahat masraflarınızı başka biri ödeyecek mi?",
      text: t("ukForm.question30"),
      name: "travelSponsor",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question30_1"),
          text: t("ukForm.question30_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question30_2"),
          text: t("ukForm.question30_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Aile veya arkadaş (Adı, Soyadı, Adresi, Telefon numarası)",
          name: "sponsorInfo",
          type: "textarea",
          if_value: ["Evet"],
          text: t("ukForm.question30_1_1"),
        },
        {
          id: 2,
          label: "İşveren veya şirket (Şirket adı, Adresi, Telefon numarası)",
          name: "sponsorInfo2",
          type: "textarea",
          if_value: ["Evet"],
          text: t("ukForm.question30_1_2"),
        },
        {
          id: 3,
          label: "Neden katkıda bulunduklarını açıklayınız",
          name: "sponsorInfo3",
          type: "textarea",
          if_value: ["Evet"],
          text: t("ukForm.question30_1_3"),
        },
      ],
      step: steps[6],
    },
    {
      id: 31,
      label: "İngiltere’ye seyahat etmeyi planladığınız tarih aralığı nedir?",
      text: t("ukForm.question31"),
      name: "travelDates",
      type: "text",
      step: steps[7],
    },
    {
      id: 32,
      label: "Ziyaret sebebiniz nedir?",
      text: t("ukForm.question32"),
      name: "travelReason",
      type: "dropdown",
      options: [
        {
          label: "Turizm",
          value: t("ukForm.question32_1"),
          text: t("ukForm.question32_1"),
          showValue: "Turizm",
        },
        {
          label: "Aile ziyareti",
          value: t("ukForm.question32_2"),
          text: t("ukForm.question32_2"),
          showValue: "Aile ziyareti",
        },
        {
          label: "Arkadaş ziyareti",
          value: t("ukForm.question32_3"),
          text: t("ukForm.question32_3"),
          showValue: "Arkadaş ziyareti",
        },
        {
          label: "İş",
          value: t("ukForm.question32_4"),
          text: t("ukForm.question32_4"),
          showValue: "İş",
        },
        {
          label: "Transit",
          value: t("ukForm.question32_5"),
          text: t("ukForm.question32_5"),
          showValue: "Transit",
        },
        {
          label: "Akademik ziyaret",
          value: t("ukForm.question32_6"),
          text: t("ukForm.question32_6"),
          showValue: "Akademik ziyaret",
        },
        {
          label: "Kısa süreli eğitim",
          value: t("ukForm.question32_7"),
          text: t("ukForm.question32_7"),
          showValue: "Kısa süreli eğitim",
        },
        {
          label: "Sağlık",
          value: t("ukForm.question32_8"),
          text: t("ukForm.question32_8"),
          showValue: "Sağlık",
        },
        {
          label: "Evlilik",
          value: t("ukForm.question32_9"),
          text: t("ukForm.question32_9"),
          showValue: "Evlilik",
        },
        {
          label: "Diğer",
          value: t("ukForm.question32_10"),
          text: t("ukForm.question32_10"),
          showValue: "Diğer",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
          text: t("ukForm.question32_10_1"),
          name: "travelReasonOther",
          type: "text",
          if_value: ["Diğer"],
        },
      ],
      step: steps[7],
    },
    {
      id: 34.1,
      label: "Anne adı soyadı",
      text: t("ukForm.question34_1"),
      name: "motherName",
      type: "text",
      step: steps[8],
    },
    {
      id: 34.2,
      label: "Baba adı soyadı",
      text: t("ukForm.question34_2"),
      name: "fatherName",
      type: "text",
      step: steps[8],
    },
    {
      id: 34.3,
      label: "Anne doğum tarihi",
      text: t("ukForm.question34_3"),
      name: "motherBirthDate",
      type: "text",
      step: steps[8],
    },
    {
      id: 34.4,
      label: "Baba doğum tarihi",
      text: t("ukForm.question34_4"),
      name: "fatherBirthDate",
      type: "text",
      step: steps[8],
    },
    {
      id: 34.5,
      label: "Anne uyrugu",
      text: t("ukForm.question34_5"),
      name: "motherNationality",
      type: "text",
      step: steps[8],
    },
    {
      id: 34.6,
      label: "Baba uyruğu",
      text: t("ukForm.question34_6"),
      name: "fatherNationality",
      type: "text",
      step: steps[8],
    },
    {
      id: 35,
      label: "Birleşik Krallık’ta ailenizden biri yaşıyor mu?",
      text: t("ukForm.question35"),
      name: "familyInUK",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question35_1"),
          text: t("ukForm.question35_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question35_2"),
          text: t("ukForm.question35_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Yakınlık derecesi",
          text: t("ukForm.question35_1_1"),
          name: "familyRelation",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Ad – Soyad",
          text: t("ukForm.question35_1_2"),
          name: "familyName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Uyruk",
          text: t("ukForm.question35_1_3"),
          name: "familyNationality",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Vize durumu",
          text: t("ukForm.question35_1_4"),
          name: "familyVisaStatus",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[8],
    },
    {
      id: 36,
      label: "Çocuğunuz var mı?",
      text: t("ukForm.question36"),
      name: "hasChildren",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question36_1"),
          text: t("ukForm.question36_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question36_2"),
          text: t("ukForm.question36_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ad – Soyad",
          text: t("ukForm.question36_1_1"),
          name: "childName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Doğum tarihi",
          text: t("ukForm.question36_1_2"),
          name: "childBirthDate",
          type: "calendar",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Sizinle birlikte mi yaşıyor?",
          text: t("ukForm.question36_1_3"),
          name: "childLivingWith",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question36_1_3_1"),
              text: t("ukForm.question36_1_3_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question36_1_3_2"),
              text: t("ukForm.question36_1_3_2"),
              showValue: "Hayır",
            },
          ],
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Sizinle seyahat edecek ise pasaport numarası",
          text: t("ukForm.question36_1_4"),
          name: "childPassportNumber",
          type: "text",
          required: false,
          if_value: ["Evet"],
        },
      ],
      step: steps[8],
    },
    {
      id: 37,
      label: "Birleşik Krallık'ta ailenizden biri yaşıyor mu?",
      text: t("ukForm.question37"),
      name: "familyInUK2",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question37_1"),
          text: t("ukForm.question37_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question37_2"),
          text: t("ukForm.question37_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Yakınlık dereceniz",
          text: t("ukForm.question37_1_1"),
          name: "familyRelation2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Ad – Soyad",
          text: t("ukForm.question37_1_2"),
          name: "familyName2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Uyruk",
          text: t("ukForm.question37_1_3"),
          name: "familyNationality2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Birleşik Krallık'taki yasal durumu",
          text: t("ukForm.question37_1_4"),
          name: "familyLegalStatus",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 5,
          label: "Geçici vizeye sahip mi?",
          text: t("ukForm.question37_1_5"),
          name: "familyTemporaryVisa",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question37_1_5_1"),
              text: t("ukForm.question37_1_5_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question37_1_5_2"),
              text: t("ukForm.question37_1_5_2"),
              showValue: "Hayır",
            },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
              text: t("ukForm.question37_1_5_1_1"),
              name: "familyPassportNumber",
              type: "text",
              if_value: ["Evet"],
            },
          ],
          if_value: ["Evet"],
        },
        {
          id: 6,
          label: "Temelli olarak Birleşik Krallık’ta mı?",
          text: t("ukForm.question37_1_6"),
          name: "familyPermanentUK",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question37_1_6_1"),
              text: t("ukForm.question37_1_6_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question37_1_6_2"),
              text: t("ukForm.question37_1_6_2"),
              showValue: "Hayır",
            },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
              text: t("ukForm.question37_1_6_1_1"),
              name: "familyPassportNumber2",
              type: "text",
              if_value: ["Evet"],
            },
          ],
          if_value: ["Evet"],
        },
        {
          id: 7,
          label:
            "Vizeleri yok ve Birleşik Krallık'ta temelli bulunmamaktalar mı?",
          text: t("ukForm.question37_1_7"),
          name: "familyNoVisa",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question37_1_7_1"),
              text: t("ukForm.question37_1_7_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question37_1_7_2"),
              text: t("ukForm.question37_1_7_2"),
              showValue: "Hayır",
            },
          ],
          otherInputs: [
            {
              id: 1,
              label:
                "Yasal durum açıklaması (Vize başvuruları beklemede mi, göçmenlik muafiyeti mi var, yasal olmayan bir durum mu söz konusu?)",
              text: t("ukForm.question37_1_7_1_1"),
              name: "familyLegalStatus2",
              type: "textarea",
              if_value: ["Evet"],
            },
          ],
          if_value: ["Evet"],
        },
      ],
      step: steps[8],
    },
    {
      id: 38,
      label: "Grup ile mi seyahat edeceksiniz?",
      text: t("ukForm.question38"),
      name: "groupTravel",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question38_1"),
          text: t("ukForm.question38_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question38_2"),
          text: t("ukForm.question38_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Grup adı nedir?",
          text: t("ukForm.question38_1_1"),
          name: "groupName",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[9],
    },
    {
      id: 39,
      label:
        "Eşiniz, çocuklarınız, bakmakla yükümlü olduğunuz aile bireyi dışında biri ile seyahat edecek misiniz?",
      text: t("ukForm.question39"),
      name: "travelWithOther",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question39_1"),
          text: t("ukForm.question39_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question39_2"),
          text: t("ukForm.question39_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ad – Soyad",
          name: "travelWithOtherName",
          text: t("ukForm.question39_1_1"),
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Uyruk",
          text: t("ukForm.question39_1_2"),
          name: "travelWithOtherNationality",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Sizinle olan bağı",
          text: t("ukForm.question39_1_3"),
          name: "travelWithOtherRelation",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Pasaport numarası",
          text: t("ukForm.question39_1_4"),
          name: "travelWithOtherPassportNumber",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[9],
    },
    {
      id: 40,
      label: "Konaklayacağınız adres belli mi? (Zorunlu değil)",
      text: t("ukForm.question40"),
      name: "accommodationKnown",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question40_1"),
          text: t("ukForm.question40_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question40_2"),
          text: t("ukForm.question40_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Tam adres",
          text: t("ukForm.question40_1_1"),
          name: "accommodationAddress",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Kalacağınız kişinin adı",
          text: t("ukForm.question40_1_2"),
          name: "landlord",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Varış ve çıkış tarihleri",
          text: t("ukForm.question40_1_3"),
          name: "accommodationDates",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[10],
      required: false,
    },
    {
      id: 41,
      label: "İngiltere'de bir planınız varsa açıklayınız (Zorunlu değil)",
      text: t("ukForm.question41"),
      name: "ukPlan",
      type: "textarea",
      step: steps[10],
      required: false,
    },
    {
      id: 42,
      label: "Son 10 yıl içerisinde İngiltere’ye gittiniz mi?",
      text: t("ukForm.question42"),
      name: "visitedUK",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question42_1"),
          text: t("ukForm.question42_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question42_2"),
          text: t("ukForm.question42_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Kaç kere gittiniz?",
          text: t("ukForm.question42_1_1"),
          name: "visitCount",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Amaç (Turizm, iş, öğrenim, transit vb.)",
          text: t("ukForm.question42_1_2"),
          name: "visitReason",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Ziyaret tarihleri (ay ve yıl)",
          text: t("ukForm.question42_1_3"),
          name: "visitDates",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Ne kadar süre kaldınız?",
          text: t("ukForm.question42_1_4"),
          name: "visitDuration",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 43,
      label: "İngiltere’de daha önce tıbbi tedavi gördünüz mü?",
      text: t("ukForm.question43"),
      name: "medicalTreatment",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question43_1"),
          text: t("ukForm.question43_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question43_2"),
          text: t("ukForm.question43_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ücret ödemeniz gerektiği söylendi mi?",
          text: t("ukForm.question43_1_1"),
          name: "treatmentCost",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question43_1_1_1"),
              text: t("ukForm.question43_1_1_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question43_1_1_2"),
              text: t("ukForm.question43_1_1_2"),
              showValue: "Hayır",
            },
          ],
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Tüm tutarı ödediniz mi?",
          text: t("ukForm.question43_1_2"),
          name: "paidAll",
          type: "dropdown",
          options: [
            {
              label: "Evet",
              value: t("ukForm.question43_1_2_1"),
              text: t("ukForm.question43_1_2_1"),
              showValue: "Evet",
            },
            {
              label: "Hayır",
              value: t("ukForm.question43_1_2_2"),
              text: t("ukForm.question43_1_2_2"),
              showValue: "Hayır",
            },
          ],
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 44,
      label: "Ulusal sigorta numaranız var mı?",
      text: t("ukForm.question44"),
      name: "nationalInsuranceNumber",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question44_1"),
          text: t("ukForm.question44_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question44_2"),
          text: t("ukForm.question44_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Sigorta numarası",
          text: t("ukForm.question44_1_1"),
          name: "insuranceNumber",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 45,
      label: "İngiltere’de geçerli bir ehliyetiniz var mı?",
      text: t("ukForm.question45"),
      name: "ukDrivingLicense",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question45_1"),
          text: t("ukForm.question45_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question45_2"),
          text: t("ukForm.question45_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Lisans numarası",
          text: t("ukForm.question45_1_1"),
          name: "licenseNumber",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 46,
      label: "İngiltere'de herhangi bir kamu fonu aldınız mı?",
      text: t("ukForm.question46"),
      name: "publicFundsUK",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question46_1"),
          text: t("ukForm.question46_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question46_2"),
          text: t("ukForm.question46_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
          text: t("ukForm.question46_1_1"),
          name: "publicFundsInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 47,
      label: "Son 10 yılda Birleşik Krallık vizesi aldınız mı?",
      text: t("ukForm.question47"),
      name: "ukVisaBefore",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question47_1"),
          text: t("ukForm.question47_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question47_2"),
          text: t("ukForm.question47_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Veriliş tarihi",
          text: t("ukForm.question47_1_1"),
          name: "visaIssueDate",
          type: "calendar",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 48,
      label:
        "Son 10 yılda Birleşik Krallık'ta kalma izni için başvuruda bulundunuz mu?",
      text: t("ukForm.question48"),
      name: "ukResidencePermitBefore",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question48_1"),
          text: t("ukForm.question48_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question48_2"),
          text: t("ukForm.question48_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Başvuru tarihi",
          text: t("ukForm.question48_1_1"),
          name: "permitApplicationDate",
          type: "calendar",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 49,
      label:
        "Son 10 yılda belirtilen ülkeleri kaç kez ziyaret ettiniz? (Avustralya, Kanada, Yeni Zelanda, Amerika, İsviçre, Schengen Ülkeleri)",
      text: t("ukForm.question49"),
      name: "visitedCountries",
      type: "dropdown",
      options: [
        {
          label: "Hiç",
          value: t("ukForm.question49_1"),
          text: t("ukForm.question49_1"),
          showValue: "Hiç",
        },
        {
          label: "Birkez",
          value: t("ukForm.question49_2"),
          text: t("ukForm.question49_2"),
          showValue: "Birkez",
        },
        {
          label: "2-5 kez",
          value: t("ukForm.question49_3"),
          text: t("ukForm.question49_3"),
          showValue: "2-5 kez",
        },
        {
          label: "6 veya daha fazla",
          value: t("ukForm.question49_4"),
          text: t("ukForm.question49_4"),
          showValue: "6 veya daha fazla",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Son 2 ziyaretteki ülkeler",
          text: t("ukForm.question49_1_1"),
          name: "visitedCountriesInfo",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 2,
          label: "Seyahat Amaçları",
          text: t("ukForm.question49_1_2"),
          name: "visitedCountriesReason",
          type: "dropdown",
          options: [
            {
              label: "Turizm",
              value: t("ukForm.question49_2_1"),
              text: t("ukForm.question49_2_1"),
              showValue: "Turizm",
            },
            {
              label: "Aile ziyareti",
              value: t("ukForm.question49_2_2"),
              text: t("ukForm.question49_2_2"),
              showValue: "Aile ziyareti",
            },
            {
              label: "Arkadaş ziyareti",
              value: t("ukForm.question49_2_3"),
              text: t("ukForm.question49_2_3"),
              showValue: "Arkadaş ziyareti",
            },
            {
              label: "İş",
              value: t("ukForm.question49_2_4"),
              text: t("ukForm.question49_2_4"),
              showValue: "İş",
            },
            {
              label: "Transit",
              value: t("ukForm.question49_2_5"),
              text: t("ukForm.question49_2_5"),
              showValue: "Transit",
            },
            {
              label: "Akademik ziyaret",
              value: t("ukForm.question49_2_6"),
              text: t("ukForm.question49_2_6"),
              showValue: "Akademik ziyaret",
            },
            {
              label: "Kısa süreli eğitim",
              value: t("ukForm.question49_2_7"),
              text: t("ukForm.question49_2_7"),
              showValue: "Kısa süreli eğitim",
            },
            {
              label: "Sağlık",
              value: t("ukForm.question49_2_8"),
              text: t("ukForm.question49_2_8"),
              showValue: "Sağlık",
            },
            {
              label: "Evlilik",
              value: t("ukForm.question49_2_9"),
              text: t("ukForm.question49_2_9"),
              showValue: "Evlilik",
            },
          ],
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 3,
          label: "Gidiş tarihleri (Ay ve yıl olarak belirtiniz)",
          text: t("ukForm.question49_1_3"),
          name: "visitedCountriesDates",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 4,
          label: "Ne kadar süre kaldınız?",
          text: t("ukForm.question49_1_4"),
          name: "visitedCountriesDuration",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
      ],
      step: steps[11],
    },
    {
      id: 50,
      label:
        "Son 10 yılda İngiltere, ABD, Kanada, Avustralya, Yeni Zelanda, İsviçre veya Schengen ülkeleri dışında başka ülkelere gittiniz mi? (Hepsini belirtiniz)",
      text: t("ukForm.question50"),
      name: "visitedOtherCountries",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question50_1"),
          text: t("ukForm.question50_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question50_2"),
          text: t("ukForm.question50_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Gidilen ülkeler",
          text: t("ukForm.question50_1_1"),
          name: "visitedOtherCountriesInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label:
            "Seyahat amacları (Turizm, iş, eğitim, aile ziyareti vb.) (Her ülke için ayrı ayrı belirtiniz)",
          text: t("ukForm.question50_1_2"),
          name: "visitedOtherCountriesReason",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Giriş tarihleri",
          text: t("ukForm.question50_1_3"),
          name: "visitedOtherCountriesDates",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Çıkış tarihleri",
          text: t("ukForm.question50_1_4"),
          name: "visitedOtherCountriesExitDates",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 51,
      label:
        "İngiltere veya başka bir ülke için herhangi bir vize reddi, sınırda giriş izni verilmemesi, kalma veya sığınma talebinin reddi, sürgün edilme ya da ülkeye giriş yasağı gibi bir durum yaşadınız mı?",
      text: t("ukForm.question51"),
      name: "refusalUK",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question51_1"),
          text: t("ukForm.question51_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question51_2"),
          text: t("ukForm.question51_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Hangi ülke?",
          text: t("ukForm.question51_1_1"),
          name: "refusalCountry",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Tarih",
          text: t("ukForm.question51_1_2"),
          name: "refusalDate",
          type: "calendar",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Red veya yasağın sebebi",
          text: t("ukForm.question51_1_3"),
          name: "refusalReason",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[12],
    },
    {
      id: 52,
      label:
        "Birleşik Krallık ile ilgili herhangi bir güvenlik ihlali vs. bir durum yaşadınız mı?",
      text: t("ukForm.question52"),
      name: "securityIssues",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("ukForm.question52_1"),
          text: t("ukForm.question52_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("ukForm.question52_2"),
          text: t("ukForm.question52_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
          text: t("ukForm.question52_1_1"),
          name: "securityIssuesInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[12],
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

export default UkStepForm;
