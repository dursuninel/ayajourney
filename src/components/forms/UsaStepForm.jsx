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
    },
    {
      id: 1,
      label: "Seyahat Bilgileri",
    },
    {
      id: 2,
      label: "Geçmiş ABD Seyahat Bilgileri",
    },
    {
      id: 3,
      label: "İletişim Bilgileri",
    },
    {
      id: 4,
      label: "Pasaport Bilgileri",
    },
    {
      id: 5,
      label: "ABD Seyahatı İletişim Bilgileri",
    },
    {
      id: 6,
      label: "Aile Bilgileri",
    },
    {
      id: 7,
      label: "Güncel ve Geçmiş Mesleki Durum/Eğitim Bilgileri",
    },
    {
      id: 8,
      label: "Ek Zorunlu Bilgiler",
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      step: steps[0],
      name: "surname",
      label: "Soyadınız",
      type: "text",
      required: true,
    },
    {
      id: 2,
      step: steps[0],
      name: "name",
      label: "Adınız",
      type: "text",
      required: true,
    },
    {
      id: 3,
      step: steps[0],
      name: "birthSurname",
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
      type: "calendar",
      required: true,
    },
    {
      id: 5,
      step: steps[0],
      name: "birthPlace",
      label: "Doğum Yeri",
      type: "text",
      required: true,
    },
    {
      id: 6,
      step: steps[0],
      name: "nationality",
      label: "Hangi Ülke Vatandaşısınız?",
      type: "text",
      required: true,
    },
    {
      id: 7,
      step: steps[0],
      name: "otherCitizenship",
      label: "Başka Bir Uyruga Sahip Misiniz?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
    },
    {
      id: 8,
      step: steps[0],
      name: "otherCitizenshipPassport",
      label: "O Bölgeye Ait Pasaportunuz Var mı?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "otherCitizenshipPassportNumber",
          label: "Pasaport numarası nedir?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "residenceCountry",
          label: "Hangi ülke belirtiniz.",
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
      type: "text",
      required: true,
    },
    {
      id: 11,
      step: steps[0],
      name: "ssn",
      label: "ABD Sosyal Güvenlik Numaranız Varsa Nedir? (SSN)",
      type: "text",
      required: false,
    },
    {
      id: 12,
      step: steps[0],
      name: "taxNumber",
      label: "ABD Vergi Mükellefi Kimlik Numaranız Varsa Nedir?",
      type: "text",
      required: false,
    },
    {
      id: 13,
      step: steps[1],
      name: "visaType",
      label: "Hangi Vize Tipine Başvuruyorsunuz?",
      type: "text",
      required: true,
    },
    {
      id: 14,
      step: steps[1],
      name: "specificPlan",
      label: "Spesifik Bir Tatil Planınız Var mı?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "specificPlanDestination",
          label: "Varış Tarihi",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "specificPlanCity",
          label: "Varış Şehri",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "specificPlanDepartureDate",
          label: "Kalkış Tarihi",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "specificPlanDepartureCity",
          label: "Kalkış Yeri",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          name: "specificPlanCities",
          label: "Hangi Şehir-Şehirleri Ziyaret Edeceksiniz?",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 6,
          name: "specificPlanDate",
          label:
            "Tahmini seyahat tarihiniz nedir, kaç gün kalmayı planlıyorsunuz?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "accommodationAddress",
          label: "Adresi nedir?",
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
      type: "dropdown",
      options: [
        { label: "Kendisi", value: "Kendisi" },
        { label: "İşveren", value: "İşveren" },
        { label: "ABD’de İşveren", value: "ABD’de İşveren" },
        { label: "Diğer Kişi", value: "Diğer Kişi" },
        { label: "Diğer Şirket", value: "Diğer Şirket" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelCostsPersonName",
          label: "Kişinin Adı Soyadı",
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 2,
          name: "travelCostsPersonPhone",
          label: "Telefon Numarası",
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 3,
          name: "travelCostsPersonEmail",
          label: "E-posta Adresi",
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 4,
          name: "travelCostsPersonRelation",
          label: "Sizinle Yakınlığı Nedir?",
          type: "text",
          required: true,
          if_value: ["Diğer Kişi"],
        },
        {
          id: 5,
          name: "travelCostsCompany",
          label: "Kuruluşun Adı",
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 6,
          name: "travelCostsCompanyPhone",
          label: "Telefon Numarası",
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 7,
          name: "travelCostsCompanyRelation",
          label: "Şirketle İlişkiniz",
          type: "text",
          required: true,
          if_value: ["Diğer Şirket"],
        },
        {
          id: 8,
          name: "travelCostsCompanyAddress",
          label: "Kuruluşun Adresi",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelWithOthersGroup",
          label:
            "Bu Bir Grup Mu? Grubun Adı Nedir? Değilse Ad-Soyad ve Sizinle Yakınlığı Nedir?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "travelledToUsArrivalDate",
          label: "Varış Tarihi",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "travelledToUsDuration",
          label:
            "Ne Kadar Süre Kaldınız? (Tarihlerden Emin Değilseniz En Yakın Tarihleri Belirtiniz)",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "travelledToUsDriverLicense",
          label:
            "ABD Sürücü Belgeniz Var mı ya da Daha Önce Oldu Mu? Olduysa Sürücü Belgesi Numaranız Nedir, Hangi Eyaletten Aldınız?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaIssueDate",
          label: "Son Aldığınız Vizenin Veriliş Tarihi",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousUsVisaNumber",
          label: "Vize Numarası",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "previousUsVisaType",
          label: "Hangi Vize Türüne Başvuru Yaptığınız",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "previousUsVisaBiometrics",
          label: "Parmak İzinizi Alındı Mı?",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaLostOrStolenYear",
          label: "Hangi Yıl",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousUsVisaLostOrStolenExplanation",
          label: "Nasıl oldu açıklayınız",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaCancelledExplanation",
          label: "Açıklayınız",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsVisaRejectedExplanation",
          label: "Açıklayınız",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousUsImmigrationPetitionExplanation",
          label: "Açıklayınız",
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
      type: "textarea",
      required: true,
    },
    {
      id: 24,
      step: steps[3],
      name: "phone",
      label: "Telefon Numaranız Nedir?",
      type: "text",
      required: true,
    },
    {
      id: 25,
      step: steps[3],
      name: "secondPhone",
      label: "İkinci Bir Telefon Numarası Belirtiniz.",
      type: "text",
      required: false,
    },
    {
      id: 26,
      step: steps[3],
      name: "workPhone",
      label: "İş Numaranız Nedir?",
      type: "text",
      required: false,
    },
    {
      id: 27,
      step: steps[3],
      name: "email",
      label: "E-posta Adresiniz Nedir?",
      type: "text",
      required: true,
    },
    {
      id: 28,
      step: steps[3],
      name: "useSocialMedia",
      label: "Sosyal Medya Kullanıyor Musunuz?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "socialMedia",
          label:
            "Sosyal Medya Adreslerinizi, Uygulama Adı ve Kullanıcı Adı Şeklinde Belirtiniz. Kullanıcı Adınızı Bilmiyorsanız Link Ekleyebilirsiniz. (Ek Olarak Bir İşletme Sahibi vs. iseniz İşletmenin Sosyal Medya Kullanıcı Adını Belirtiniz)",
          type: "textarea",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "socialMediaLink",
          label:
            "İçerik Paylaşmak Amacıyla Web Sitesi, Blog vs. Varsa Link Ekleyiniz",
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
      type: "text",
      required: true,
    },
    {
      id: 30,
      step: steps[4],
      name: "passportCountry",
      label: "Hangi ülkenin pasaportu ile başvuru yapıyorsunuz?",
      type: "text",
      required: true,
    },
    {
      id: 31,
      step: steps[4],
      name: "passportAuthority",
      label: "Veren makam (Pasaportta görünen şekliyle)",
      type: "text",
      required: true,
    },
    {
      id: 32,
      step: steps[4],
      name: "passportIssueDate",
      label: "Pasaport verilme tarihi",
      type: "calendar",
      required: true,
    },
    {
      id: 33,
      step: steps[4],
      name: "passportExpiryDate",
      label: "Pasaport son geçerlilik tarihi",
      type: "calendar",
      required: true,
    },
    {
      id: 34,
      step: steps[4],
      name: "passportLostOrStolen",
      label: "Daha önce pasaportunuz çalındı ya da kayboldu mu?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "passportLostOrStolenExplanation",
          label:
            "Pasaport numarası, hangi ülkeden aldığınız ve olayı açıklayınız.",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usAccommodationAddress",
          label: "Adresi nedir?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usRelativeName",
          label: "Kişi adı soyadı, adresi, yakınlığınız nedir?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "usEventName",
          label:
            "Etkinlik adı, adresi, iletişimde olduğunuz kişi varsa adı soyadı nedir?",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          name: "usSchoolOrCompanyInfo",
          label: "Adresi giriniz",
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
      type: "text",
      required: true,
    },
    {
      id: 39.2,
      step: steps[6],
      name: "fatherBirthDate",
      label: "Baba doğum tarihi",
      type: "calendar",
      required: true,
    },
    {
      id: 40,
      step: steps[6],
      name: "motherName",
      label: "Anne adı-soyadı, doğum tarihi (gün, ay, yıl)",
      type: "text",
      required: true,
    },
    {
      id: 40.2,
      step: steps[6],
      name: "motherBirthDate",
      label: "Anne doğum tarihi",
      type: "calendar",
      required: true,
    },
    {
      id: 41,
      step: steps[6],
      name: "parentsInUsMother",
      label: "Anneniz ABD’de mi?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parentsInUsMotherStatus",
          label:
            "Amerika’daki durumu nedir? (Vatandaş, LPR yasal daimi ikamet sahibi, vize sahibi, diğer)",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "parentsInUsFatherStatus",
          label:
            "Amerika’daki durumu nedir? (Vatandaş, LPR yasal daimi ikamet sahibi, vize sahibi, diğer)",
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
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "relativeInUsInfo",
          label: "Ad-soyad, sizinle yakınlığı, ABD’deki durumu belirtiniz.",
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
      type: "dropdown",
      options: [
        { label: "Bekar", value: "Bekar" },
        { label: "Evli", value: "Evli" },
        { label: "Boşanmış", value: "Boşanmış" },
        { label: "Dul", value: "Dul" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "spouseFirstNameLastName",
          label: "Eşinizin adı ve soyadı nedir?",
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 2,
          name: "spouseBirthLastName",
          label: "Eşinizin doğumla birlikte aldığı soyadı nedir?",
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 3,
          name: "spouseBirthDate",
          label: "Eşinizin doğum tarihi nedir?",
          type: "calendar",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 4,
          name: "spouseBirthPlace",
          label: "Eşinizin doğum yeri nedir?",
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 5,
          name: "spouseNationality",
          label: "Eşinizin uyruk nedir?",
          type: "text",
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 6,
          name: "spouseAddress",
          label: "Sizinle aynı adreste mi yaşıyor?",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          required: true,
          if_value: ["Evli"],
        },
        {
          id: 7,
          name: "spousePreviousMarriageCount",
          label: "Kaç kere evlendiniz?",
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 8,
          name: "previousSpouseName",
          label: "Eski eşinizin adı ve soyadı nedir?",
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 9,
          name: "previousSpouseBirthDate",
          label: "Eski eşinizin doğum tarihi nedir?",
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 10,
          name: "previousSpouseBirthPlace",
          label: "Eski eşinizin doğum yeri nedir?",
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 11,
          name: "previousSpouseNationality",
          label: "Eski eşinizin uyruğu nedir?",
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 12,
          name: "marriageDate",
          label: "Evlilik tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 13,
          name: "divorceDate",
          label: "Boşanma tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 14,
          name: "divorceCountry",
          label: "Hangi ülkede boşandınız?",
          type: "text",
          required: true,
          if_value: ["Boşanmış"],
        },
        {
          id: 15,
          name: "deceasedSpouseName",
          label: "Vefat eden eşinizin adı ve soyadı nedir?",
          type: "text",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 16,
          name: "deceasedSpouseBirthDate",
          label: "Vefat eden eşinizin doğum tarihi nedir?",
          type: "calendar",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 17,
          name: "deceasedSpouseBirthDate",
          label: "Vefat eden eşinizin vefat tarihi nedir?",
          type: "calendar",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 18,
          name: "deceasedSpouseBirthPlace",
          label: "Vefat eden eşinizin doğum yeri nedir?",
          type: "text",
          required: true,
          if_value: ["Dul"],
        },
        {
          id: 19,
          name: "deceasedSpouseNationality",
          label: "Vefat eden eşinizin uyruk nedir?",
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
      name: "profession",
      type: "dropdown",
      options: [
        { label: "Öğrenci", value: "Öğrenci" },
        { label: "Çalışan", value: "Çalışan" },
        { label: "İşveren", value: "İşveren" },
        { label: "Kamu Görevlisi", value: "Kamu Görevlisi" },
        { label: "Emekli", value: "Emekli" },
        { label: "İşsiz", value: "İşsiz" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "workplaceName",
          label: "İş yerinizin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 2,
          name: "workplaceAddress",
          label: "İş yerinizin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 3,
          name: "workplacePhone",
          label: "İş yerinizin telefon numarası nedir?",
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 4,
          name: "jobStartDate",
          label: "İşe başlama tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 5,
          name: "monthlyIncome",
          label: "Aylık geliriniz nedir?",
          type: "text",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 6,
          name: "jobDescription",
          label: "İş tanımınız nedir?",
          type: "textarea",
          required: true,
          if_value: ["Çalışan", "İşveren"],
        },
        {
          id: 7,
          name: "publicWorkplaceName",
          label: "İş yerinizin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 8,
          name: "publicWorkplaceAddress",
          label: "İş yerinizin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 9,
          name: "publicWorkplacePhone",
          label: "İş yerinizin telefon numarası nedir?",
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 10,
          name: "publicJobStartDate",
          label: "Kamuda göreve başlama tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 11,
          name: "publicMonthlyIncome",
          label: "Aylık geliriniz nedir?",
          type: "text",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 12,
          name: "publicJobDescription",
          label: "İş tanımınız nedir?",
          type: "textarea",
          required: true,
          if_value: ["Kamu Görevlisi"],
        },
        {
          id: 13,
          name: "schoolName",
          label: "Okulunuzun adı nedir?",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 14,
          name: "schoolAddress",
          label: "Okulunuzun adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 15,
          name: "schoolPhone",
          label: "Okulunuzun telefon numarası nedir?",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 16,
          name: "schoolStartDate",
          label: "Okula başlama tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 17,
          name: "schoolDepartment",
          label: "Bölümünüz nedir?",
          type: "text",
          required: true,
          if_value: ["Öğrenci"],
        },
        {
          id: 18,
          name: "schoolClass",
          label: "Sınıfınız nedir?",
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
      name: "previousJob",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previousWorkplaceName",
          label: "Çalıştığınız iş yerinin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 2,
          name: "previousWorkplaceAddress",
          label: "Çalıştığınız iş yerinin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 3,
          name: "previousWorkplacePhone",
          label: "Çalıştığınız iş yerinin telefon numarası nedir?",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 4,
          name: "previousJobTitle",
          label: "Çalıştığınız iş yerindeki unvanınız nedir?",
          type: "text",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 5,
          name: "previousSupervisorName",
          label: "Amirinizin adı ve soyadı nedir (varsa)?",
          type: "text",
          required: false,
          if_value: ["Evet"],
        },
        {
          id: 6,
          name: "previousJobStartDate",
          label: "Çalışmaya başlama tarihiniz nedir?",
          type: "calendar",
          required: true,
          if_value: ["Evet"],
        },
        {
          id: 7,
          name: "previousJobEndDate",
          label: "Çalışmayı bitirme tarihiniz nedir?",
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
      type: "dropdown",
      options: [
        { label: "İlkokul", value: "İlkokul" },
        { label: "Ortaokul", value: "Ortaokul" },
        { label: "Lise", value: "Lise" },
        { label: "Üniversite", value: "Üniversite" },
        { label: "Yüksek Lisans", value: "Yüksek Lisans" },
        { label: "Doktora", value: "Doktora" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "highSchoolName",
          label: "Eğitim aldığınız lisenin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 2,
          name: "highSchoolAddress",
          label: "Eğitim aldığınız lisenin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 3,
          name: "highSchoolStartDate",
          label: "Lise başlama tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 4,
          name: "highSchoolGraduationDate",
          label: "Lise mezuniyet tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Lise"],
        },
        {
          id: 5,
          name: "universityName",
          label: "Eğitim aldığınız üniversitenin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 6,
          name: "universityAddress",
          label: "Eğitim aldığınız üniversitenin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 7,
          name: "universityStartDate",
          label: "Üniversite başlama tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 8,
          name: "universityGraduationDate",
          label: "Üniversite mezuniyet tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 9,
          name: "universityDepartment",
          label: "Üniversitedeki bölümünüz nedir?",
          type: "text",
          required: true,
          if_value: ["Üniversite"],
        },
        {
          id: 10,
          name: "mastersUniversityName",
          label: "Yüksek lisans yaptığınız üniversitenin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 11,
          name: "mastersUniversityAddress",
          label: "Yüksek lisans yaptığınız üniversitenin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 12,
          name: "mastersStartDate",
          label: "Yüksek lisansa başlama tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 13,
          name: "mastersGraduationDate",
          label: "Yüksek lisans mezuniyet tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 14,
          name: "mastersDepartment",
          label: "Yüksek lisanstaki bölümünüz nedir?",
          type: "text",
          required: true,
          if_value: ["Yüksek Lisans"],
        },
        {
          id: 15,
          name: "phdUniversityName",
          label: "Doktora yaptığınız üniversitenin adı nedir?",
          type: "text",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 16,
          name: "phdUniversityAddress",
          label: "Doktora yaptığınız üniversitenin adresi nedir?",
          type: "text",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 17,
          name: "phdStartDate",
          label: "Doktora başlama tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 18,
          name: "phdGraduationDate",
          label: "Doktora mezuniyet tarihiniz nedir?",
          type: "date",
          required: true,
          if_value: ["Doktora"],
        },
        {
          id: 19,
          name: "phdDepartment",
          label: "Doktoradaki bölümünüz nedir?",
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
      type: "text",
      required: true,
    },
    {
      id: 48,
      step: steps[8],
      name: "previusSchengenVisa",
      label: "Daha önce Schengen vizesi aldınız mı?",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "previusSchengenVisaInfo",
          label:
            "Hangi ülkeden, kaç gün kaldınız, Schengen bölgesinde geçiş sağladığınız diğer ülkeler varsa belirtiniz",
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
      type: "textarea",
      required: true,
    },
    {
      id: 50,
      step: steps[8],
      name: "militaryService",
      label: "Askerlik durumunuz nedir?",
      type: "dropdown",
      options: [
        { label: "Yapıldı", value: "Yapıldı" },
        { label: "Yapılmadı", value: "Yapılmadı" },
      ],
      required: true,
      otherInputs: [
        {
          id: 1,
          name: "militaryServiceInfo",
          label: "Ne zaman, terhis tarihini belirtiniz",
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

export default UsaStepForm;
