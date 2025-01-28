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

const SchengenStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const { activeLanguage } = useLanguage();

  const steps = [
    {
      id: 0,
      label: "Kişisel Bilgiler",
      text: t("schengenForm.step1"),
    },
    {
      id: 1,
      label: "Pasaport Bilgileri",
      text: t("schengenForm.step2"),
    },
    {
      id: 2,
      label: "İletişim Bilgileri",
      text: t("schengenForm.step3"),
    },
    {
      id: 3,
      label: "Mesleki Durum / Eğitim Bilgileri",
      text: t("schengenForm.step4"),
    },
    {
      id: 4,
      label: "Seyahat Bilgileri",
      text: t("schengenForm.step5"),
    },
    {
      id: 5,
      label: "Ek Bilgiler",
      text: t("schengenForm.step6"),
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      step: steps[0],
      label: "Soyadınız",
      name: "surname",
      type: "text",
      required: true,
      text: t("schengenForm.question1"),
    },
    {
      id: 2,
      step: steps[0],
      label: "Doğumla daha önce aldığınız soyadı",
      name: "previous_surname",
      type: "text",
      required: false,
      text: t("schengenForm.question2"),
    },
    {
      id: 3,
      step: steps[0],
      label: "Adınız",
      name: "name",
      type: "text",
      required: true,
      text: t("schengenForm.question3"),
    },
    {
      id: 4,
      step: steps[0],
      label: "Doğum tarihiniz",
      name: "birth_date",
      type: "calendar",
      required: true,
      text: t("schengenForm.question4"),
    },
    {
      id: 5,
      step: steps[0],
      label: "Pasaportta belirtilen doğum yeriniz",
      name: "birth_place",
      type: "text",
      required: true,
      text: t("schengenForm.question5"),
    },
    {
      id: 6,
      step: steps[0],
      label: "Doğum ülkeniz",
      name: "birth_country",
      type: "text",
      required: true,
      text: t("schengenForm.question6"),
    },
    {
      id: 7,
      step: steps[0],
      label: "Vatandaşlığınız",
      name: "citizenship",
      type: "text",
      required: true,
      text: t("schengenForm.question7"),
    },
    {
      id: 8,
      step: steps[0],
      label: "Doğumdan farklı bir vatandaşlığınız varsa belirtiniz",
      name: "other_citizenship",
      type: "text",
      required: false,
      text: t("schengenForm.question8"),
    },
    {
      id: 9,
      step: steps[0],
      label: "Medeni durumunuz nedir?",
      name: "marital_status",
      type: "dropdown",
      text: t("schengenForm.question9"),
      options: [
        {
          label: "Bekar",
          showValue: "Bekar",
          text: t("schengenForm.question9_1"),
          value: t("schengenForm.question9_1"),
        },
        {
          label: "Evli",
          showValue: "Evli",
          text: t("schengenForm.question9_2"),
          value: t("schengenForm.question9_2"),
        },
        {
          label: "Boşanmış",
          showValue: "Boşanmış",
          text: t("schengenForm.question9_3"),
          value: t("schengenForm.question9_3"),
        },
        {
          label: "Dul",
          showValue: "Dul",
          text: t("schengenForm.question9_4"),
          value: t("schengenForm.question9_4"),
        },
        {
          label: "Kayıt dışı beraberlik",
          showValue: "Kayıt dışı beraberlik",
          text: t("schengenForm.question9_5"),
          value: t("schengenForm.question9_5"),
        },
      ],
      required: true,
    },
    {
      id: 10,
      step: steps[0],
      label: "18 yaşından büyükmüsünüz?",
      name: "is_adult",
      type: "dropdown",
      text: t("schengenForm.question10"),
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question10_1"),
          value: t("schengenForm.question10_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question10_2"),
          value: t("schengenForm.question10_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parent_name",
          label: "Ebeveynin adı soyadı",
          type: "text",
          required: true,
          text: t("schengenForm.question10_2_1"),
          if_value: ["Hayır"],
        },
        {
          id: 2,
          name: "parent_address",
          label: "Ebeveynin adresi",
          type: "text",
          required: true,
          text: t("schengenForm.question10_2_2"),
          if_value: ["Hayır"],
        },
        {
          id: 3,
          name: "parent_phone",
          label: "Ebeveynin telefonu",
          type: "text",
          required: true,
          text: t("schengenForm.question10_2_3"),
          if_value: ["Hayır"],
        },
        {
          id: 4,
          name: "parent_email",
          label: "Ebeveynin mail adresi",
          type: "text",
          required: true,
          text: t("schengenForm.question10_2_4"),
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
      text: t("schengenForm.question11"),
      required: true,
    },
    {
      id: 12,
      text: t("schengenForm.question12"),
      step: steps[1],
      label: "Pasaport numaranız nedir?",
      name: "passport_number",
      type: "text",
      required: true,
    },
    {
      id: 13,
      text: t("schengenForm.question13"),
      step: steps[1],
      label: "Pasaport veriliş tarihi",
      name: "passport_issue_date",
      type: "calendar",
      required: true,
    },
    {
      id: 14,
      text: t("schengenForm.question14"),
      step: steps[1],
      label: "Pasaport geçerlilik tarihi",
      name: "passport_expire_date",
      type: "calendar",
      required: true,
    },
    {
      id: 15,
      text: t("schengenForm.question15"),
      step: steps[1],
      label: "Veren makam",
      name: "passport_issuing_authority",
      type: "text",
      required: true,
    },
    {
      id: 16,
      text: t("schengenForm.question16"),
      step: steps[2],
      label: "İkametgah belgenizde belirtilen adres nedir?",
      name: "residence_address",
      type: "text",
      required: true,
    },
    {
      id: 17,
      text: t("schengenForm.question17"),
      step: steps[2],
      label: "Telefon numaranız nedir?",
      name: "phone_number",
      type: "text",
      required: true,
    },
    {
      id: 18,
      text: t("schengenForm.question18"),
      step: steps[2],
      label: "E-postanız nedir?",
      name: "email",
      type: "text",
      required: true,
    },
    {
      id: 19,
      text: t("schengenForm.question19"),
      step: steps[2],
      label:
        "İkamet ettiğiniz ülkeden farklı bir ülkede mi ikamet ediyorsunuz?",
      name: "is_residing_abroad",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question19_1"),
          value: t("schengenForm.question19_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question19_2"),
          value: t("schengenForm.question19_2"),
        },
      ],
      required: true,
    },
    {
      id: 20,
      text: t("schengenForm.question20"),
      step: steps[3],
      label: "Çalışma durumunuz nedir?",
      name: "employment_status",
      type: "dropdown",
      options: [
        {
          label: "İşveren",
          showValue: "İşveren",
          text: t("schengenForm.question20_1"),
          value: t("schengenForm.question20_1"),
        },
        {
          label: "Çalışan",
          showValue: "Çalışan",
          text: t("schengenForm.question20_2"),
          value: t("schengenForm.question20_2"),
        },
        {
          label: "Öğrenci",
          showValue: "Öğrenci",
          text: t("schengenForm.question20_3"),
          value: t("schengenForm.question20_3"),
        },
        {
          label: "Serbest meslek",
          showValue: "Serbest meslek",
          text: t("schengenForm.question20_4"),
          value: t("schengenForm.question20_4"),
        },
      ],
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question20_3_1"),
          name: "school_name",
          label: "Okul adı",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 2,
          text: t("schengenForm.question20_3_2"),
          name: "school_address",
          label: "Okul adresi",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 3,
          text: t("schengenForm.question20_3_3"),
          name: "school_phone",
          label: "Okul telefon numarası",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 4,
          text: t("schengenForm.question20_3_4"),
          name: "school_class",
          label: "Sınıf",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 5,
          text: t("schengenForm.question20_3_5"),
          name: "school_department",
          label: "Bölüm",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 6,
          text: t("schengenForm.question20_1_1"),
          name: "job_title",
          label: "Meslek",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 7,
          text: t("schengenForm.question20_1_2"),
          name: "company_name",
          label: "Şirket adı",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 8,
          text: t("schengenForm.question20_1_3"),
          name: "company_address",
          label: "İş adresi",
          type: "text",
          required: true,
          if_value: ["İşveren", "Çalışan", "Serbest meslek"],
        },
        {
          id: 9,
          text: t("schengenForm.question20_1_4"),
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
      text: t("schengenForm.question21"),
      step: steps[4],
      label: "Tek mi seyahat edeceksiniz?",
      name: "is_traveling_alone",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question21_1"),
          value: t("schengenForm.question21_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question21_2"),
          value: t("schengenForm.question21_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question21_2_1"),
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
      text: t("schengenForm.question22"),
      step: steps[4],
      label: "Seyahat tarihleriniz",
      name: "travel_dates",
      type: "text",
      required: true,
    },
    {
      id: 23,
      text: t("schengenForm.question23"),
      step: steps[4],
      label: "Daha önce Schengen vizesi için parmak iziniz alındı mı?",
      name: "is_fingerprint_taken",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question23_1"),
          value: t("schengenForm.question23_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question23_2"),
          value: t("schengenForm.question23_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question23_1_1"),
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
      text: t("schengenForm.question24"),
      step: steps[4],
      label:
        "Son Schengen vizenizin etiket numarasını belirtiniz (Vize etiket numaranız; vizinizin sağ üst köşesinde bulunur, harfle başlayıp numara ile devam eder)",
      name: "last_visa_number",
      type: "text",
      required: false,
    },
    {
      id: 25,
      text: t("schengenForm.question25"),
      step: steps[4],
      label: "Kalacağınız otel belli mi?",
      name: "is_hotel_known",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question25_1"),
          value: t("schengenForm.question25_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question25_2"),
          value: t("schengenForm.question25_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question25_1_1"),
          name: "hotel_name",
          label: "Otel adı",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          text: t("schengenForm.question25_1_2"),
          name: "hotel_address",
          label: "Otel adresi",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          text: t("schengenForm.question25_1_3"),
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
      step: steps[4],
      text: t("schengenForm.question26"),
      label: "Masraflarınızı kim karşılayacak?",
      name: "expense_payer",
      type: "dropdown",
      options: [
        {
          label: "Kendim",
          showValue: "Kendim",
          text: t("schengenForm.question26_1"),
          value: t("schengenForm.question26_1"),
        },
        {
          label: "İşverenim",
          showValue: "İşverenim",
          text: t("schengenForm.question26_2"),
          value: t("schengenForm.question26_2"),
        },
        {
          label: "Diğer kişi",
          showValue: "Diğer kişi",
          text: t("schengenForm.question26_3"),
          value: t("schengenForm.question26_3"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question26_3_1"),
          name: "payer_name",
          label: "Ödeyenin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 2,
          text: t("schengenForm.question26_3_2"),
          name: "payer_relation",
          label: "Yakınlık durumu",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 3,
          text: t("schengenForm.question26_3_3"),
          name: "payer_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Diğer kişi"],
        },
        {
          id: 4,
          text: t("schengenForm.question26_3_4"),
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
      step: steps[4],
      text: t("schengenForm.question27"),
      label: "Davetiyeniz varsa kim tarafından gönderildi?",
      name: "has_invitation",
      type: "dropdown",
      options: [
        {
          label: "Kişi",
          showValue: "Kişi",
          text: t("schengenForm.question27_1"),
          value: t("schengenForm.question27_1"),
        },
        {
          label: "Şirket",
          showValue: "Şirket",
          text: t("schengenForm.question27_2"),
          value: t("schengenForm.question27_2"),
        },
        {
          label: "Davetiyem yok",
          showValue: "Davetiyem yok",
          text: t("schengenForm.question27_3"),
          value: t("schengenForm.question27_3"),
        },
      ],
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question27_1_1"),
          name: "inviter_name",
          label: "Davet eden kişinin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 2,
          text: t("schengenForm.question27_1_2"),
          name: "inviter_address",
          label: "Adresi",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 3,
          text: t("schengenForm.question27_1_3"),
          name: "inviter_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 4,
          text: t("schengenForm.question27_1_4"),
          name: "inviter_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 5,
          text: t("schengenForm.question27_1_5"),
          name: "inviter_relation",
          label: "Yakınlık durumu",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 6,
          text: t("schengenForm.question27_1_6"),
          name: "inviter_situation",
          label: "Davet eden kişinin Schengen ülkesindeki durumu",
          type: "text",
          required: true,
          if_value: ["Kişi"],
        },
        {
          id: 7,
          text: t("schengenForm.question27_2_1"),
          name: "company_name",
          label: "Şirket adı",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 8,
          text: t("schengenForm.question27_2_2"),
          name: "company_address",
          label: "Adresi",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 9,
          text: t("schengenForm.question27_2_3"),
          name: "company_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 10,
          text: t("schengenForm.question27_2_4"),
          name: "contact_person",
          label: "İrtibat kişisi",
          type: "text",
          required: true,
          if_value: ["Şirket"],
        },
        {
          id: 11,
          text: t("schengenForm.question27_3_1"),
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
      step: steps[4],
      text: t("schengenForm.question28"),
      label: "Masrafları başka biri mi karşılayacak?",
      name: "is_expense_payer_other",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question28_1"),
          value: t("schengenForm.question28_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question28_2"),
          value: t("schengenForm.question28_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question28_1_1"),
          name: "payer_name",
          label: "Ödeyenin adı soyadı",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          text: t("schengenForm.question28_1_2"),
          name: "payer_phone",
          label: "Telefon numarası",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          text: t("schengenForm.question28_1_3"),
          name: "payer_email",
          label: "E-posta adresi",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          text: t("schengenForm.question28_1_4"),
          name: "payer_job",
          label: "Mesleği",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          text: t("schengenForm.question28_1_5"),
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
      step: steps[5],
      text: t("schengenForm.question29"),
      label: "Daha önce Schengen vizesi aldınız mı?",
      name: "is_visa_taken",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question29_1"),
          value: t("schengenForm.question29_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question29_2"),
          value: t("schengenForm.question29_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question29_1_1"),
          name: "visa_date",
          label: "Vize aldığınız tarih (Ortalama)",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          text: t("schengenForm.question29_1_2"),
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
      step: steps[5],
      text: t("schengenForm.question30"),
      label: "Schengen bölgesi dışında ülkelere seyahat ettiniz mi?",
      name: "is_travelled_outside_schengen",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question30_1"),
          value: t("schengenForm.question30_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question30_2"),
          value: t("schengenForm.question30_2"),
        },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          text: t("schengenForm.question30_1_1"),
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
      step: steps[5],
      text: t("schengenForm.question31"),
      label: "Aktif vizeniz var mı? (İngiltere, ABD vs.)",
      name: "is_active_visa",
      type: "dropdown",
      options: [
        {
          label: "Evet",
          showValue: "Evet",
          text: t("schengenForm.question31_1"),
          value: t("schengenForm.question31_1"),
        },
        {
          label: "Hayır",
          showValue: "Hayır",
          text: t("schengenForm.question31_2"),
          value: t("schengenForm.question31_2"),
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
        form_id: "1",
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

export default SchengenStepForm;
