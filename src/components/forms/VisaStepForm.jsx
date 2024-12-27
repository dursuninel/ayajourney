import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useState, useEffect, useRef } from "react";
import TurkishToEnglish from "../TurkishToEnglish";
import { t } from "i18next";

const VisaStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

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
      label: "Kimlik Bilgileri",
    },
    {
      id: 3,
      label: "Uyruk/Vatandaşlık Bilgileri",
    },
    {
      id: 4,
      label: "Çalışma Durumu",
    },
    {
      id: 5,
      label: "Ek Gelirler",
    },
    {
      id: 6,
      label: "Seyahat Giderleri",
    },
    {
      id: 7,
      label: "Seyahat Planı",
    },
    {
      id: 8,
      label: "Aile Bilgileri",
    },
    {
      id: 9,
      label: "Seyahat Bilgisi",
    },
    {
      id: 10,
      label: "Konaklama Detayları",
    },
    {
      id: 11,
      label: "Seyahat Geçmişi",
    },
    {
      id: 12,
      label: "Vize Durumu",
    },
  ];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      label: "E-mail adresiniz nedir?",
      name: "email",
      type: "text",
      step: steps[0],
      required: false,
    },
    {
      id: 2,
      label: "Kullandığınız başka e-mail adresiniz var mı?",
      name: "otherEmail",
      type: "text",
      step: steps[0],
    },
    {
      id: 3,
      label: "Telefon numaranız nedir?",
      name: "phone",
      type: "text",
      step: steps[0],
    },
    {
      id: 4,
      label: "Ek olarak kullandığınız telefon numarası var mı?",
      name: "otherPhone",
      type: "text",
      step: steps[0],
    },
    {
      id: 5,
      label: "Cinsiyetiniz nedir?",
      name: "gender",
      type: "dropdown",
      options: [
        { label: "Erkek", value: "Erkek" },
        { label: "Kadın", value: "Kadın" },
      ],
      step: steps[0],
    },
    {
      id: 6,
      label: "Ad – Soyad (Pasaport üzerinde görünen)",
      name: "fullName",
      type: "text",
      step: steps[0],
    },
    {
      id: 7,
      label: "Medeni durumunuz nedir?",
      name: "maritalStatus",
      type: "dropdown",
      options: [
        { label: "Bekar", value: "Bekar" },
        { label: "Evli", value: "Evli" },
        { label: "Boşanmış", value: "Boşanmış" },
        {
          label: "Kayıtlı olmayan birliktelik",
          value: "Kayıtlı olmayan birliktelik",
        },
      ],
      step: steps[0],
    },
    {
      id: 8,
      label: "Evli iseniz, kızlık soyadınız nedir?",
      name: "maidenName",
      type: "text",
      step: steps[0],
    },
    {
      id: 9,
      label: "Daha önce başka bir isim-soy isim kullandınız mı?",
      name: "usedOtherName",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Daha önce kullandığınız isim-soy ismi",
          name: "otherName",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[0],
    },
    {
      id: 10,
      label: "İkamet ettiğiniz adres nedir?",
      name: "homeAddress",
      type: "text",
      step: steps[0],
    },
    {
      id: 11,
      label: "Ne kadar zamandır bu adreste yaşıyorsunuz? (Gün/Ay/Yıl şeklinde)",
      name: "yearsAtHome",
      type: "text",
      step: steps[0],
    },
    {
      id: 12,
      label:
        "Eğer 1 yıldan az bir süredir bu adreste yaşıyorsanız, bundan önce son 2 yıldır yaşadığınız adres ve tarihler nedir? (Gün/Ay/Yıl şeklinde)",
      name: "previousAddresses",
      type: "text",
      step: steps[0],
    },
    {
      id: 13,
      label: "Yaşadığınız adres sizin mülkünüz mü?",
      name: "homeOwnership",
      type: "dropdown",
      options: [
        { label: "Kendi mülküm", value: "Kendi mülküm" },
        { label: "Kiralık", value: "Kiralık" },
        { label: "Diğer", value: "Diğer" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
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
      name: "passportNumber",
      type: "text",
      step: steps[1],
    },
    {
      id: 15,
      label: "Pasaportunuzun veriliş tarihi nedir?",
      name: "passportIssueDate",
      type: "calendar",
      step: steps[1],
    },
    {
      id: 16,
      label: "Pasaportunuzun geçerlilik tarihi nedir?",
      name: "passportExpiryDate",
      type: "calendar",
      step: steps[1],
    },
    {
      id: 17,
      label: "Pasaportunuzu veren makam (pasaportunuzda görünen)",
      name: "passportIssuer",
      type: "text",
      step: steps[1],
    },
    {
      id: 18,
      label: "T.C. kimlik numaranız nedir?",
      name: "idNumber",
      type: "text",
      step: steps[2],
    },
    {
      id: 19,
      label: "Kimlik kartınızın geçerlilik tarihi nedir?",
      name: "idExpiryDate",
      type: "calendar",
      step: steps[2],
    },
    {
      id: 20,
      label: "Hangi ülke vatandaşısınız?",
      name: "nationality",
      type: "text",
      step: steps[3],
    },
    {
      id: 21,
      label: "Pasaportta belirtilen doğum ülkeniz neresidir?",
      name: "birthCountry",
      type: "text",
      step: steps[3],
    },
    {
      id: 22,
      label: "Pasaportta yazan doğum yeriniz neresidir?",
      name: "birthPlace",
      type: "text",
      step: steps[3],
    },
    {
      id: 23,
      label: "Doğum tarihinizi belirtiniz",
      name: "birthDate",
      type: "calendar",
      step: steps[3],
    },
    {
      id: 24,
      label:
        "Şu anda başka bir uyruğa veya vatandaşlığa sahip misiniz veya daha önce sahip oldunuz mu?",
      name: "otherNationality",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ülke, hakkın veriliş ve bitiş tarihi, vatandaşlık durumu",
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
      name: "employmentStatus",
      type: "dropdown",
      options: [
        { label: "Çalışan", value: "Çalışan" },
        { label: "Şirket sahibi", value: "Şirket sahibi" },
        { label: "Öğrenci", value: "Öğrenci" },
        { label: "Emekli", value: "Emekli" },
        { label: "İşsiz", value: "İşsiz" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Şirket adı",
          name: "companyName",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 2,
          label: "Şirket adresi",
          name: "companyAddress",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 3,
          label: "Telefon numarası",
          name: "companyPhone",
          type: "text",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 4,
          label: "İşe giriş tarihi",
          name: "startDate",
          type: "calendar",
          if_value: ["Çalışan"],
        },
        {
          id: 5,
          label: "İş unvanınız",
          name: "jobTitle",
          type: "text",
          if_value: ["Çalışan"],
        },
        {
          id: 6,
          label: "Aylık kazancınız (TRY)",
          name: "monthlyIncome",
          type: "text",
          if_value: ["Çalışan"],
        },
        {
          id: 7,
          label: "Yıllık kazancınız (TRY)",
          name: "annualIncome",
          type: "text",
          if_value: ["Şirket sahibi"],
        },
        {
          id: 8,
          label: "İşinizi açıklayınız",
          name: "jobDescription",
          type: "textarea",
          if_value: ["Çalışan", "Şirket sahibi"],
        },
        {
          id: 9,
          label: "Görev unvanınız",
          name: "jobTitle2",
          type: "text",
          if_value: ["Serbest meslek sahibi"],
        },
        {
          id: 10,
          label: "Yıllık kazancınız (TRY)",
          name: "annualIncome2",
          type: "text",
          if_value: ["Serbest meslek sahibi"],
        },
        {
          id: 11,
          label: "Okul adı",
          name: "schoolName",
          type: "text",
          if_value: ["Öğrenci"],
        },
        {
          id: 12,
          label: "Okul adresi",
          name: "schoolAddress",
          type: "text",
          if_value: ["Öğrenci"],
        },
        {
          id: 13,
          label: "Okuduğunuz bölüm nedir?",
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
      name: "additionalIncome",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label:
            "Açıklayınız: kira geliri, emekli maaşı, yatırımlar vb. yıllık toplam kazanç, GBP cinsinden belirtiniz.",
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
    },
    {
      id: 28,
      label:
        "İngiltere’de GBP döviz kuru üzerinden ne kadar harcama yapmayı planlıyorsunuz?",
      name: "ukExpense",
      type: "text",
      step: steps[6],
    },
    {
      id: 29,
      label: "Her ay toplam ne kadar para harcarsınız? (TRY cinsinden)",
      name: "monthlyExpenses",
      type: "text",
      step: steps[6],
    },
    {
      id: 30,
      label: "Seyahat masraflarınızı başka biri ödeyecek mi?",
      name: "travelSponsor",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Aile veya arkadaş (Adı, Soyadı, Adresi, Telefon numarası)",
          name: "sponsorInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "İşveren veya şirket (Şirket adı, Adresi, Telefon numarası)",
          name: "sponsorInfo2",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Neden katkıda bulunduklarını açıklayınız",
          name: "sponsorInfo3",
          type: "textarea",
          if_value: ["Evet"],
        },
      ],
      step: steps[6],
    },
    {
      id: 31,
      label: "İngiltere’ye seyahat etmeyi planladığınız tarih aralığı nedir?",
      name: "travelDates",
      type: "text",
      step: steps[7],
    },
    {
      id: 32,
      label: "Ziyaret sebebiniz nedir?",
      name: "travelReason",
      type: "dropdown",
      options: [
        { label: "Turizm", value: "Turizm" },
        { label: "Aile ziyareti", value: "Aile ziyareti" },
        { label: "Arkadaş ziyareti", value: "Arkadaş ziyareti" },
        { label: "İş", value: "İş" },
        { label: "Transit", value: "Transit" },
        { label: "Akademik ziyaret", value: "Akademik ziyaret" },
        { label: "Kısa süreli eğitim", value: "Kısa süreli eğitim" },
        { label: "Sağlık", value: "Sağlık" },
        { label: "Evlilik", value: "Evlilik" },
        { label: "Diğer", value: "Diğer" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
          name: "travelReasonOther",
          type: "text",
          if_value: ["Diğer"],
        },
      ],
      step: steps[7],
    },
    {
      id: 33,
      label: "Evlimisiniz?",
      name: "isMarried",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Eşinizin adı, soyadı",
          name: "spouseName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Doğum tarihi",
          name: "spouseBirthDate",
          type: "calendar",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Uyruğu",
          name: "spouseNationality",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Eşiniz sizinle birlikte mi yaşıyor?",
          name: "spouseLivingWith",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          if_value: ["Evet"],
        },
        {
          id: 5,
          label: "Sizinle birlikte seyahat edecek mi?",
          name: "spouseTravelWith",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
              name: "spousePassportNumber",
              type: "text",
              if_value: ["Evet"],
            },
          ],
          if_value: ["Evet"],
        },
      ],
      step: steps[8],
    },
    {
      id: 34,
      label: "Anne ve baba bilgileri",
      name: "parentsInfo",
      type: "text",
      step: steps[8],
    },
    {
      id: 35,
      label: "Birleşik Krallık’ta ailenizden biri yaşıyor mu?",
      name: "familyInUK",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Yakınlık derecesi",
          name: "familyRelation",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Ad – Soyad",
          name: "familyName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Uyruk",
          name: "familyNationality",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Vize durumu",
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
      name: "hasChildren",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ad – Soyad",
          name: "childName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Doğum tarihi",
          name: "childBirthDate",
          type: "calendar",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Sizinle birlikte mi yaşıyor?",
          name: "childLivingWith",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Sizinle seyahat edecek mi?",
          name: "childTravelWith",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
              name: "childPassportNumber",
              type: "text",
              if_value: ["Evet"],
            },
          ],
          if_value: ["Evet"],
        },
      ],
      step: steps[8],
    },
    {
      id: 37,
      label: "Birleşik Krallık'ta ailenizden biri yaşıyor mu?",
      name: "familyInUK2",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Yakınlık dereceniz",
          name: "familyRelation2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Ad – Soyad",
          name: "familyName2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Uyruk",
          name: "familyNationality2",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Birleşik Krallık'taki yasal durumu",
          name: "familyLegalStatus",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 5,
          label: "Geçici vizeye sahip mi?",
          name: "familyTemporaryVisa",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
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
          name: "familyPermanentUK",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          otherInputs: [
            {
              id: 1,
              label: "Pasaport numarası",
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
          name: "familyNoVisa",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          otherInputs: [
            {
              id: 1,
              label:
                "Yasal durum açıklaması (Vize başvuruları beklemede mi, göçmenlik muafiyeti mi var, yasal olmayan bir durum mu söz konusu?)",
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
      name: "groupTravel",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Grup adı nedir?",
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
      name: "travelWithOther",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ad – Soyad",
          name: "travelWithOtherName",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Uyruk",
          name: "travelWithOtherNationality",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Sizinle olan bağı",
          name: "travelWithOtherRelation",
          type: "text",
          if_value: ["Evet"],
        },
      ],
      step: steps[9],
    },
    {
      id: 40,
      label: "Konaklayacağınız adres belli mi? (Zorunlu değil)",
      name: "accommodationKnown",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Tam adres",
          name: "accommodationAddress",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Kalacağınız kişinin adı",
          name: "landlord",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Varış ve çıkış tarihleri",
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
      name: "ukPlan",
      type: "textarea",
      step: steps[10],
      required: false,
    },
    {
      id: 42,
      label: "Son 10 yıl içerisinde İngiltere’ye gittiniz mi?",
      name: "visitedUK",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Kaç kere gittiniz?",
          name: "visitCount",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Amaç (Turizm, iş, öğrenim, transit vb.)",
          name: "visitReason",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Ziyaret tarihleri (ay ve yıl)",
          name: "visitDates",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Ne kadar süre kaldınız?",
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
      name: "medicalTreatment",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Ücret ödemeniz gerektiği söylendi mi?",
          name: "treatmentCost",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Tüm tutarı ödediniz mi?",
          name: "paidAll",
          type: "dropdown",
          options: [
            { label: "Evet", value: "Evet" },
            { label: "Hayır", value: "Hayır" },
          ],
          if_value: ["Evet"],
        },
      ],
      step: steps[11],
    },
    {
      id: 44,
      label: "Ulusal sigorta numaranız var mı?",
      name: "nationalInsuranceNumber",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Sigorta numarası",
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
      name: "ukDrivingLicense",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Lisans numarası",
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
      name: "publicFundsUK",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Açıklayınız",
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
      name: "ukVisaBefore",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Veriliş tarihi",
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
      name: "ukResidencePermitBefore",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Başvuru tarihi",
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
      name: "visitedCountries",
      type: "dropdown",
      options: [
        { label: "Hiç", value: "Hiç" },
        { label: "Birkez", value: "Birkez" },
        { label: "2-5 kez", value: "2-5 kez" },
        { label: "6 veya daha fazla", value: "6 veya daha fazla" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Son 2 ziyaretteki ülkeler",
          name: "visitedCountriesInfo",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 2,
          label: "Seyahat Amaçları",
          name: "visitedCountriesReason",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 3,
          label: "Ziyaret tarihleri",
          name: "visitedCountriesDates",
          type: "textarea",
          if_value: ["2-5 kez", "6 veya daha fazla"],
        },
        {
          id: 4,
          label: "Ne kadar süre kaldınız?",
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
      name: "visitedOtherCountries",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Gidilen ülkeler",
          name: "visitedOtherCountriesInfo",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Seyahat amacları (Turizm, iş, eğitim, aile ziyareti vb.)",
          name: "visitedOtherCountriesReason",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Giriş tarihleri",
          name: "visitedOtherCountriesDates",
          type: "textarea",
          if_value: ["Evet"],
        },
        {
          id: 4,
          label: "Çıkış tarihleri",
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
      name: "refusalUK",
      type: "dropdown",
      options: [
        { label: "Evet", value: "Evet" },
        { label: "Hayır", value: "Hayır" },
      ],
      otherInputs: [
        {
          id: 1,
          label: "Hangi ülke?",
          name: "refusalCountry",
          type: "text",
          if_value: ["Evet"],
        },
        {
          id: 2,
          label: "Tarih",
          name: "refusalDate",
          type: "calendar",
          if_value: ["Evet"],
        },
        {
          id: 3,
          label: "Red veya yasağın sebebi",
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
        "Birleşik Krallık ile ilgili herhangi bir güvenlik ihlali vs. bir durum yaşadıysanız lütfen belirtiniz.",
      name: "securityIssues",
      type: "textarea",
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
          value: "",
          step: item.step,
          otherInputs: item.otherInputs
            ? item.otherInputs.reduce((acc, input) => {
                acc[input.name] = {
                  label: input.label,
                  name: input.name,
                  value: "",
                  required: true,
                };
                return acc;
              }, {})
            : {}, // Eğer otherInputs yoksa boş bir nesne
        },
        required: item.required || true,
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
      (item) => item.step.id === currentStep
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
        item.otherInputs.forEach((input) => {
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
      item.type === "calendar" || item.type === "dropdown"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStepValid()) {
      // Perform form submission logic here
      console.log("Form submitted successfully:", formValues);
      toast.current.show({
        severity: "success",
        summary: "Başarılı",
        detail: "Form başarıyla gönderildi",
        life: 2000,
      });

      // Reset form values and navigate to the first step
      defaultSetValues();
      setCurrentStep(0);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail: "Lütfen tüm alanları doldurun",
        life: 2000,
      });
    }
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

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

export default VisaStepForm;
