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

const CanadaStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const { activeLanguage } = useLanguage();

  const steps = [
    {
      id: 0,
      label: "Kişisel Bilgiler",
      text: t("canadaForm.step1"),
    },
    {
      id: 1,
      label: "Medeni Durum",
      text: t("canadaForm.step2"),
    },
    {
      id: 2,
      label: "Pasaport Bilgiler",
      text: t("canadaForm.step3"),
    },
    {
      id: 3,
      label: "Dil Bilgileri",
      text: t("canadaForm.step4"),
    },
    {
      id: 4,
      label: "İletişim Bilgileri",
      text: t("canadaForm.step5"),
    },
    {
      id: 5,
      label: "Kanada Ziyareti Detayları",
      text: t("canadaForm.step6"),
    },
    {
      id: 6,
      label: "Eğitim Bilgileri",
      text: t("canadaForm.step7"),
    },
    {
      id: 7,
      label: "İş Geçmişi",
      text: t("canadaForm.step8"),
    },
    {
      id: 8,
      label: "Arka Plan Bilgileri",
      text: t("canadaForm.step9"),
    },
    {
      id: 9,
      label: "Anne Bilgileri",
      text: t("canadaForm.step10_1"),
    },
    {
      id: 10,
      label: "Baba Bilgileri",
      text: t("canadaForm.step10_2"),
    },
    {
      id: 11,
      label: "Çocuk Bilgileri",
      text: t("canadaForm.step10_3"),
    },
    {
      id: 12,
      label: "Kardeş Bilgileri",
      text: t("canadaForm.step10_4"),
    },
    {
      id: 13,
      label: "Askeri Hizmet ve Güvenlik Kuvvetleri",
      text: t("canadaForm.step11_1"),
    },
    {
      id: 14,
      label: "İnsan Hakları İhlalleri ve Suç Geçmişi",
      text: t("canadaForm.step11_2"),
    },
    {
      id: 15,
      label: "Örgüt Üyelikleri ve Politik Bağlantılar",
      text: t("canadaForm.step11_3"),
    },
    {
      id: 16,
      label: "Devlet Pozisyonları",
      text: t("canadaForm.step11_4"),
    },
    {
      id: 17,
      label: "Önceki Seyahatler",
      text: t("canadaForm.step11_5"),
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      step: steps[0],
      name: "fullname",
      text: t("canadaForm.question1"),
      label: "Tam Ad",
      type: "text",
      required: true,
    },
    {
      id: 2,
      step: steps[0],
      name: "otherNames",
      label:
        "Daha önce kullanılan diğer isimler (Takma ad, evlenmeden önceki soyadı vb.)",
      text: t("canadaForm.question2"),
      type: "text",
      required: true,
    },
    {
      id: 3,
      step: steps[0],
      name: "gender",
      text: t("canadaForm.question3"),
      label: "Cinsiyet",
      type: "dropdown",
      options: [
        {
          label: "Erkek",
          value: t("canadaForm.question3_1"),
          text: t("canadaForm.question3_1"),
          showValue: "Erkek",
        },
        {
          label: "Kadın",
          value: t("canadaForm.question3_2"),
          text: t("canadaForm.question3_2"),
          showValue: "Kadın",
        },
      ],
      required: true,
    },
    {
      id: 4,
      step: steps[0],
      name: "birthDate",
      label: "Doğum Tarihi",
      text: t("canadaForm.question4"),
      type: "calendar",
      required: true,
    },
    {
      id: 5,
      step: steps[0],
      name: "birthPlace",
      label: "Doğum Yeri",
      text: t("canadaForm.question5"),
      type: "text",
      required: true,
    },
    {
      id: 6,
      step: steps[0],
      name: "nationality",
      label: "Hangi Ülke Vatandaşısınız?",
      text: t("canadaForm.question6"),
      type: "text",
      required: true,
    },
    {
      id: 7,
      step: steps[0],
      name: "nationalityStatus",
      label: "Şu anki ikamet edilen ülke ve statüsü",
      text: t("canadaForm.question7"),
      type: "text",
      required: true,
    },

    {
      id: 8,
      step: steps[0],
      name: "lifeOtherCountry",
      label: "Son 5 yılda başka ülkelerde 6 aydan uzun süre yaşadınız mı?",
      text: t("canadaForm.question8"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question8_1"),
          text: t("canadaForm.question8_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question8_2"),
          text: t("canadaForm.question8_2"),
          showValue: "Hayır",
        },
      ],
      required: true,
    },

    {
      id: 9,
      step: steps[1],
      name: "maritalStatus",
      label: "Mevcut medeni durumu",
      text: t("canadaForm.question9"),
      type: "dropdown",
      options: [
        {
          label: "Bekar",
          value: t("canadaForm.question9_1"),
          text: t("canadaForm.question9_1"),
          showValue: "Bekar",
        },
        {
          label: "Evli",
          value: t("canadaForm.question9_2"),
          text: t("canadaForm.question9_2"),
          showValue: "Evli",
        },
        {
          label: "Dul",
          value: t("canadaForm.question9_3"),
          text: t("canadaForm.question9_3"),
          showValue: "Dul",
        },
        {
          label: "Boşanmış",
          value: t("canadaForm.question9_4"),
          text: t("canadaForm.question9_4"),
          showValue: "Boşanmış",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "wifeName",
          label: "Eşinizin Adı",
          text: t("canadaForm.question9_2_1"),
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 1,
          name: "wifeBirthDate",
          label: "Doğum Tarihi",
          text: t("canadaForm.question9_2_2"),
          type: "calendar",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 1,
          name: "wifeStartDate",
          label: "Evlilik Tarihi",
          text: t("canadaForm.question9_2_3"),
          type: "calendar",
          required: true,
          if_value: ["Evli"],
        },
      ],
      required: true,
    },

    {
      id: 10,
      step: steps[1],
      name: "currentOccupation",
      label: "Mevcut Meslek",
      text: t("canadaForm.question10"),
      type: "text",
      required: true,
    },

    {
      id: 11,
      step: steps[1],
      name: "currentAddress",
      label: "Şu Anki İkamet Adresi",
      text: t("canadaForm.question11"),
      type: "text",
      required: true,
    },

    {
      id: 12,
      step: steps[1],
      name: "oldMarriage",
      label: "Önceden Evlendiniz Mi?",
      text: t("canadaForm.question12"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question12_1"),
          text: t("canadaForm.question12_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question12_2"),
          text: t("canadaForm.question12_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "oldWifeName",
          label: "Önceki Eşinizin Adı",
          text: t("canadaForm.question12_1_1"),
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 1,
          name: "oldWifeStartDate",
          label: "Evlilik Tarihi",
          text: t("canadaForm.question12_1_2"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 1,
          name: "oldWifeEndDate",
          label: "Boşanma Tarihi",
          text: t("canadaForm.question12_1_3"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 13,
      step: steps[2],
      name: "passportNumber",
      label: "Pasaport numarası",
      text: t("canadaForm.question13"),
      type: "text",
      required: true,
    },
    {
      id: 14,
      step: steps[2],
      name: "passportCountry",
      label: "Pasaport düzenleyen ülke",
      text: t("canadaForm.question14"),
      type: "text",
      required: true,
    },
    {
      id: 15,
      step: steps[2],
      name: "passportIssueDate",
      label: "Pasaport veriliş tarihi",
      text: t("canadaForm.question15"),
      type: "calendar",
      required: true,
    },
    {
      id: 16,
      step: steps[2],
      name: "passportExpiryDate",
      label: "Pasaport son geçerlilik tarihi",
      text: t("canadaForm.question16"),
      type: "calendar",
      required: true,
    },
    {
      id: 17,
      step: steps[2],
      name: "passportType",
      label: "Kullanılan pasaportun türü",
      text: t("canadaForm.question17"),
      type: "dropdown",
      options: [
        {
          label: "Standart",
          value: t("canadaForm.question17_1"),
          text: t("canadaForm.question17_1"),
          showValue: "Standart",
        },
        {
          label: "Diplomatik",
          value: t("canadaForm.question17_2"),
          text: t("canadaForm.question17_2"),
          showValue: "Diplomatik",
        },
      ],
      required: true,
    },
    {
      id: 18,
      step: steps[3],
      name: "nativeLanguage",
      label: "Ana dili",
      text: t("canadaForm.question18"),
      type: "text",
      required: true,
    },
    {
      id: 19,
      step: steps[3],
      name: "languageProficiency",
      label: "İngilizce veya Fransızca iletişim kurabilir misiniz?",
      text: t("canadaForm.question19"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question19_1"),
          text: t("canadaForm.question19_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question19_2"),
          text: t("canadaForm.question19_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "languageExamHistory",
          label: "İngilizce veya Fransızca dil sınavı geçmişi",
          text: t("canadaForm.question19_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 20,
      step: steps[4],
      name: "residenceAddress",
      label: "Mevcut ikamet adresi (Ülke, Şehir, Posta Kodu vb.)",
      text: t("canadaForm.question20"),
      type: "textarea",
      required: true,
    },
    {
      id: 21,
      step: steps[4],
      name: "contactInfo",
      label: "Telefon ve e-posta bilgileri",
      text: t("canadaForm.question21"),
      type: "text",
      required: true,
    },
    {
      id: 22,
      step: steps[4],
      name: "preferredContact",
      label: "Başvuru sürecinde iletişim için tercih edilen yöntem",
      text: t("canadaForm.question22"),
      type: "dropdown",
      options: [
        {
          label: "Telefon",
          value: t("canadaForm.question22_1"),
          text: t("canadaForm.question22_1"),
          showValue: "Telefon",
        },
        {
          label: "E-posta",
          value: t("canadaForm.question22_2"),
          text: t("canadaForm.question22_2"),
          showValue: "E-posta",
        },
      ],
      required: true,
    },
    {
      id: 23,
      step: steps[5],
      name: "visitPurpose",
      label: "Ziyaret amacı",
      text: t("canadaForm.question23"),
      type: "dropdown",
      options: [
        {
          label: "Turizm",
          value: t("canadaForm.question23_1"),
          text: t("canadaForm.question23_1"),
          showValue: "Turizm",
        },
        {
          label: "İş",
          value: t("canadaForm.question23_2"),
          text: t("canadaForm.question23_2"),
          showValue: "İş",
        },
        {
          label: "Aile ziyareti",
          value: t("canadaForm.question23_3"),
          text: t("canadaForm.question23_3"),
          showValue: "Aile ziyareti",
        },
      ],
      required: true,
    },
    {
      id: 24,
      step: steps[5],
      name: "plannedStartDates",
      label: "Kanada'ya Planlanan Giriş tarihi",
      text: t("canadaForm.question24_1"),
      type: "calendar",
      required: true,
    },
    {
      id: 24.1,
      step: steps[5],
      name: "plannedEndDates",
      label: "Kanada'ya Planlanan Çıkış tarihi",
      text: t("canadaForm.question24_2"),
      type: "calendar",
      required: true,
    },
    {
      id: 25,
      step: steps[5],
      name: "financialResources",
      label: "Kalış süresince kullanılabilecek maddi kaynaklar (CAD cinsinden)",
      text: t("canadaForm.question25"),
      type: "text",
      required: true,
    },
    {
      id: 26.1,
      step: steps[5],
      name: "contactName",
      label: "Kanada'da ziyaret edilecek kişinin ismi",
      text: t("canadaForm.question26_1"),
      type: "text",
      required: true,
    },
    {
      id: 26.2,
      step: steps[5],
      name: "contactAddress",
      label: "Kanada'da ziyaret edilecek kişinin adresi",
      text: t("canadaForm.question26_2"),
      type: "textarea",
      required: true,
    },
    {
      id: 26.3,
      step: steps[5],
      name: "contactRelation",
      label: "Ziyaret edilecek kişi ile ilişki türü",
      text: t("canadaForm.question26_3"),
      type: "text",
      required: true,
    },

    {
      id: 27,
      step: steps[6],
      name: "educationLevel",
      label: "En yüksek tamamlanan eğitim seviyesi",
      text: t("canadaForm.question27"),
      type: "dropdown",
      options: [
        {
          label: "İlkokul",
          value: t("canadaForm.question27_1"),
          text: t("canadaForm.question27_1"),
          showValue: "İlkokul",
        },
        {
          label: "Ortaokul",
          value: t("canadaForm.question27_2"),
          text: t("canadaForm.question27_2"),
          showValue: "Ortaokul",
        },
        {
          label: "Lise",
          value: t("canadaForm.question27_3"),
          text: t("canadaForm.question27_3"),
          showValue: "Lise",
        },
        {
          label: "Üniversite",
          value: t("canadaForm.question27_4"),
          text: t("canadaForm.question27_4"),
          showValue: "Üniversite",
        },
        {
          label: "Yüksek Lisans",
          value: t("canadaForm.question27_5"),
          text: t("canadaForm.question27_5"),
          showValue: "Yüksek Lisans",
        },
        {
          label: "Doktora",
          value: t("canadaForm.question27_6"),
          text: t("canadaForm.question27_6"),
          showValue: "Doktora",
        },
      ],
      required: true,
    },

    {
      id: 28.1,
      step: steps[6],
      name: "schoolName",
      label: "Okul adı",
      text: t("canadaForm.question28_1"),
      type: "text",
      required: true,
    },
    {
      id: 28.2,
      step: steps[6],
      name: "fieldOfStudy",
      label: "Alanı",
      text: t("canadaForm.question28_2"),
      type: "text",
      required: true,
    },
    {
      id: 28.3,
      step: steps[6],
      name: "graduationYear",
      label: "Mezuniyet yılı",
      text: t("canadaForm.question28_3"),
      type: "calendar",
      required: true,
    },

    {
      id: 29,
      step: steps[6],
      name: "educationCountry",
      label: "Eğitimin yapıldığı ülke",
      text: t("canadaForm.question29"),
      type: "text",
      required: true,
    },
    {
      id: 30,
      step: steps[7],
      name: "currentEmploymentStatus",
      label: "Mevcut iş durumu",
      text: t("canadaForm.question30"),
      type: "dropdown",
      options: [
        {
          label: "Çalışan",
          value: t("canadaForm.question30_1"),
          text: t("canadaForm.question30_1"),
          showValue: "Çalışan",
        },
        {
          label: "Emekli",
          value: t("canadaForm.question30_2"),
          text: t("canadaForm.question30_2"),
          showValue: "Emekli",
        },
        {
          label: "Öğrenci",
          value: t("canadaForm.question30_3"),
          text: t("canadaForm.question30_3"),
          showValue: "Öğrenci",
        },
        {
          label: "İşsiz",
          value: t("canadaForm.question30_4"),
          text: t("canadaForm.question30_4"),
          showValue: "İşsiz",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "employerName",
          label: "Şirket/işveren adı",
          text: t("canadaForm.question31_1"),
          type: "text",
          required: true,
          if_value: ["Çalışan"],
        },
        {
          id: 2,
          name: "employerAddress",
          label: "Şirket adresi",
          text: t("canadaForm.question31_2"),
          type: "textarea",
          required: true,
          if_value: ["Çalışan"],
        },
        {
          id: 3,
          name: "position",
          label: "Pozisyon",
          text: t("canadaForm.question31_3"),
          type: "text",
          required: true,
          if_value: ["Çalışan"],
        },
      ],
      required: true,
    },

    {
      id: 32,
      step: steps[7],
      name: "previousEmployment",
      label: "Son 10 yıldaki iş deneyimleri",
      text: t("canadaForm.question32"),
      type: "textarea",
      description:
        "Lütfen son 10 yıldaki tüm iş deneyimlerinizi boşluk bırakmadan yazınız",
      required: true,
    },
    {
      id: 33,
      step: steps[8],
      name: "healthHistory",
      label:
        "Son 2 yılda tüberküloz veya bulaşıcı bir hastalık teşhisi kondu mu?",
      text: t("canadaForm.question33"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question33_1"),
          text: t("canadaForm.question33_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question33_2"),
          text: t("canadaForm.question33_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "healthDetails",
          label: "Hastalık detayları",
          text: t("canadaForm.question33_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 34,
      step: steps[8],
      name: "entryDenial",
      label: "Daha önce Kanada veya başka bir ülkeye giriş reddi yaşadınız mı?",
      text: t("canadaForm.question34"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question34_1"),
          text: t("canadaForm.question34_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question34_2"),
          text: t("canadaForm.question34_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "denialDetails",
          label: "Red detayları",
          text: t("canadaForm.question34_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 35,
      step: steps[8],
      name: "unauthorizedStay",
      label: "Daha önce Kanada'da izinsiz çalışma veya eğitim aldınız mı?",
      text: t("canadaForm.question35"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question35_1"),
          text: t("canadaForm.question35_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question35_2"),
          text: t("canadaForm.question35_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "unauthorizedDetails",
          label: "Detaylar",
          text: t("canadaForm.question35_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 36,
      step: steps[8],
      name: "criminalHistory",
      label:
        "Suç geçmişi (Herhangi bir suçtan dolayı tutuklanma, mahkumiyet vb.)",
      text: t("canadaForm.question36"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question36_1"),
          text: t("canadaForm.question36_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question36_2"),
          text: t("canadaForm.question36_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "criminalDetails",
          label: "Suç detayları",
          text: t("canadaForm.question36_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 37,
      step: steps[8],
      name: "militaryService",
      label:
        "Askeri hizmet, güvenlik güçleri veya polis teşkilatında görev yaptınız mı?",
      text: t("canadaForm.question37"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question37_1"),
          text: t("canadaForm.question37_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question37_2"),
          text: t("canadaForm.question37_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "militaryDetails",
          label: "Görev detayları",
          text: t("canadaForm.question37_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 38,
      step: steps[8],
      name: "politicalAffiliation",
      label:
        "Politik örgüt üyelikleri veya şiddet yanlısı gruplarla ilişkiniz var mı?",
      text: t("canadaForm.question38"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question38_1"),
          text: t("canadaForm.question38_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question38_2"),
          text: t("canadaForm.question38_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "affiliationDetails",
          label: "İlişki detayları",
          text: t("canadaForm.question38_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 39,
      step: steps[8],
      name: "humanRightsViolations",
      label:
        "İnsan hakları ihlallerine tanıklık ettiniz mi veya katılım sağladınız mı?",
      text: t("canadaForm.question39"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question39_1"),
          text: t("canadaForm.question39_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question39_2"),
          text: t("canadaForm.question39_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "violationDetails",
          label: "İhlal detayları",
          text: t("canadaForm.question39_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 40,
      step: steps[9], // Anne Bilgileri
      name: "motherFullName",
      label: "Annenizin tam adı",
      text: t("canadaForm.question40"),
      type: "text",
      required: true,
    },
    {
      id: 41,
      step: steps[9],
      name: "motherBirthDate",
      label: "Annenizin doğum tarihi",
      text: t("canadaForm.question41"),
      type: "calendar",
      required: true,
    },
    {
      id: 42,
      step: steps[9],
      name: "motherBirthPlace",
      label: "Annenizin doğum yeri (Ülke)",
      text: t("canadaForm.question42"),
      type: "text",
      required: true,
    },
    {
      id: 43,
      step: steps[9],
      name: "motherOccupation",
      label: "Annenizin mevcut mesleği",
      text: t("canadaForm.question43"),
      type: "text",
      required: true,
    },
    {
      id: 44,
      step: steps[9],
      name: "motherMaritalStatus",
      label: "Annenizin medeni durumu",
      text: t("canadaForm.question44"),
      type: "dropdown",
      options: [
        {
          label: "Evli",
          value: t("canadaForm.question44_1"),
          text: t("canadaForm.question44_1"),
          showValue: "Evli",
        },
        {
          label: "Bekar",
          value: t("canadaForm.question44_2"),
          text: t("canadaForm.question44_2"),
          showValue: "Bekar",
        },
        {
          label: "Boşanmış",
          value: t("canadaForm.question44_3"),
          text: t("canadaForm.question44_3"),
          showValue: "Boşanmış",
        },
        {
          label: "Dul",
          value: t("canadaForm.question44_4"),
          text: t("canadaForm.question44_4"),
          showValue: "Dul",
        },
      ],
      required: true,
    },
    {
      id: 45,
      step: steps[9],
      name: "motherAddress",
      label: "Annenizin şu anki ikamet adresi",
      text: t("canadaForm.question45"),
      type: "textarea",
      required: true,
    },
    {
      id: 46,
      step: steps[10], // Baba Bilgileri
      name: "fatherFullName",
      label: "Babanızın tam adı",
      text: t("canadaForm.question46"),
      type: "text",
      required: true,
    },
    {
      id: 47,
      step: steps[10],
      name: "fatherBirthDate",
      label: "Babanızın doğum tarihi",
      text: t("canadaForm.question47"),
      type: "calendar",
      required: true,
    },
    {
      id: 48,
      step: steps[10],
      name: "fatherBirthPlace",
      label: "Babanızın doğum yeri (Ülke)",
      text: t("canadaForm.question48"),
      type: "text",
      required: true,
    },
    {
      id: 49,
      step: steps[10],
      name: "fatherOccupation",
      label: "Babanızın mevcut mesleği",
      text: t("canadaForm.question49"),
      type: "text",
      required: true,
    },
    {
      id: 50,
      step: steps[10],
      name: "fatherMaritalStatus",
      label: "Babanızın medeni durumu",
      text: t("canadaForm.question50"),
      type: "dropdown",
      options: [
        {
          label: "Evli",
          value: t("canadaForm.question50_1"),
          text: t("canadaForm.question50_1"),
          showValue: "Evli",
        },
        {
          label: "Bekar",
          value: t("canadaForm.question50_2"),
          text: t("canadaForm.question50_2"),
          showValue: "Bekar",
        },
        {
          label: "Boşanmış",
          value: t("canadaForm.question50_3"),
          text: t("canadaForm.question50_3"),
          showValue: "Boşanmış",
        },
        {
          label: "Dul",
          value: t("canadaForm.question50_4"),
          text: t("canadaForm.question50_4"),
          showValue: "Dul",
        },
      ],
      required: true,
    },
    {
      id: 51,
      step: steps[10],
      name: "fatherAddress",
      label: "Babanızın şu anki ikamet adresi",
      text: t("canadaForm.question51"),
      type: "textarea",
      required: true,
    },
    {
      id: 52,
      step: steps[11], // Çocuk Bilgileri
      name: "childrenCount",
      label: "Çocuk sayısı",
      text: t("canadaForm.question52"),
      type: "dropdown",
      options: Array.from({ length: 10 }, (_, i) => ({
        label: String(i),
        value: String(i),
        text: String(i),
        showValue: String(i),
      })),
      otherInputs: [
        {
          id: 1,
          name: "childFullName",
          label: "Tam adları",
          text: t("canadaForm.question52_1"),
          type: "text",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 2,
          name: "childBirthDate",
          label: "Doğum tarihleri",
          text: t("canadaForm.question52_2"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 3,
          name: "childBirthPlace",
          label: "Doğum yerleri (Ülke)",
          text: t("canadaForm.question52_3"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 4,
          name: "childAddress",
          label: "Mevcut adresleri",
          text: t("canadaForm.question52_4"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 5,
          name: "childMaritalStatus",
          label: "Medeni durumları",
          text: t("canadaForm.question52_5"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 6,
          name: "childOccupation",
          label: "Mevcut meslekleri",
          text: t("canadaForm.question52_6"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
      ],
      required: true,
    },

    {
      id: 54,
      step: steps[12], // Kardeş Bilgileri
      name: "siblingsCount",
      label: "Kardeş sayısı",
      text: t("canadaForm.question54"),
      type: "dropdown",
      options: Array.from({ length: 10 }, (_, i) => ({
        label: String(i),
        value: String(i),
        text: String(i),
        showValue: String(i),
      })),
      otherInputs: [
        {
          id: 1,
          name: "childFullName",
          label: "Tam adları",
          text: t("canadaForm.question54_1"),
          type: "text",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 2,
          name: "childBirthDate",
          label: "Doğum tarihleri",
          text: t("canadaForm.question54_2"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 3,
          name: "childBirthPlace",
          label: "Doğum yerleri (Ülke)",
          text: t("canadaForm.question54_3"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 4,
          name: "childAddress",
          label: "Mevcut adresleri",
          text: t("canadaForm.question54_4"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 5,
          name: "childMaritalStatus",
          label: "Medeni durumları",
          text: t("canadaForm.question54_5"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          id: 6,
          name: "childOccupation",
          label: "Mevcut meslekleri",
          text: t("canadaForm.question54_6"),
          type: "textarea",
          required: true,
          if_value: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
      ],
      required: true,
    },
    {
      id: 70,
      step: steps[13],
      name: "militaryService",
      label:
        "Askerlik, milis veya sivil savunma birimlerinde görev yaptınız mı?",
      text: t("canadaForm.question70"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question70_1"),
          text: t("canadaForm.question70_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question70_2"),
          text: t("canadaForm.question70_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "militaryStartDate",
          label: "Görev başlangıç tarihi",
          text: t("canadaForm.question71"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "militaryEndDate",
          label: "Görev bitiş tarihi",
          text: t("canadaForm.question72"),
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "militaryLocation",
          label: "Görev yeri (Şehir, Eyalet/Bölge, Ülke)",
          text: t("canadaForm.question73"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },

    // İnsan Hakları İhlalleri ve Suç Geçmişi
    {
      id: 71,
      step: steps[14],
      name: "warCrimes",
      label:
        "Savaş suçları, soykırım veya insanlığa karşı suçlarda herhangi bir rol oynadınız mı?",
      text: t("canadaForm.question74"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question74_1"),
          text: t("canadaForm.question74_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question74_2"),
          text: t("canadaForm.question74_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "convictionDetails",
          label: "Detaylar",
          text: t("canadaForm.question74_1_1"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },
    {
      id: 72,
      step: steps[14],
      name: "criminalRecord",
      label: "Tutuklanma veya suç mahkumiyeti geçmişiniz var mı?",
      text: t("canadaForm.question75"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question75_1"),
          text: t("canadaForm.question75_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question75_2"),
          text: t("canadaForm.question75_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "convictionDetails",
          label: "Mahkumiyet detayları (Tarih, yer, suç türü)",
          text: t("canadaForm.question76"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },

    // Örgüt Üyelikleri ve Politik Bağlantılar
    {
      id: 73,
      step: steps[15],
      name: "politicalAffiliation",
      label:
        "Daha önce herhangi bir siyasi partiye veya şiddeti savunan bir gruba üye oldunuz mu?",
      text: t("canadaForm.question77"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question77_1"),
          text: t("canadaForm.question77_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question77_2"),
          text: t("canadaForm.question77_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "organizationDetails",
          label: "Örgüt adı, faaliyetleri ve organizasyon içindeki pozisyonlar",
          text: t("canadaForm.question78"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },

    // Devlet Pozisyonları
    {
      id: 74,
      step: steps[16],
      name: "governmentPosition",
      label:
        "Hakim, polis memuru, belediye başkanı, milletvekili, kamu çalışanı gibi bir hükümet pozisyonunda görev yaptınız mı?",
      text: t("canadaForm.question79"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question79_1"),
          text: t("canadaForm.question79_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question79_2"),
          text: t("canadaForm.question79_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "governmentDuration",
          label: "Görev süresi ve hükümet departmanı bilgileri",
          text: t("canadaForm.question80"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "jurisdictionLevel",
          label: "Yargı seviyesi",
          text: t("canadaForm.question81"),
          type: "dropdown",
          options: [
            {
              label: "Ulusal",
              value: t("canadaForm.question81_1"),
              text: t("canadaForm.question81_1"),
              showValue: "Ulusal",
            },
            {
              label: "Bölgesel",
              value: t("canadaForm.question81_2"),
              text: t("canadaForm.question81_2"),
              showValue: "Bölgesel",
            },
            {
              label: "Yerel",
              value: t("canadaForm.question81_3"),
              text: t("canadaForm.question81_3"),
              showValue: "Yerel",
            },
          ],
          required: true,
          if_value: ["Evet"],
        },
      ],
      required: true,
    },

    // Önceki Seyahatler
    {
      id: 75,
      step: steps[17],
      name: "previousTravel",
      label:
        "Son 5 yılda veya 18 yaşından sonra başka ülkelere seyahat ettiniz mi?",
      text: t("canadaForm.question82"),
      type: "dropdown",
      options: [
        {
          label: "Evet",
          value: t("canadaForm.question82_1"),
          text: t("canadaForm.question82_1"),
          showValue: "Evet",
        },
        {
          label: "Hayır",
          value: t("canadaForm.question82_2"),
          text: t("canadaForm.question82_2"),
          showValue: "Hayır",
        },
      ],
      otherInputs: [
        {
          id: 1,
          name: "travelDetails",
          label: "Seyahat edilen ülkeler, seyahat tarihleri ve seyahat amacı",
          text: t("canadaForm.question83"),
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
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
        form_id: "4",
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

export default CanadaStepForm;
