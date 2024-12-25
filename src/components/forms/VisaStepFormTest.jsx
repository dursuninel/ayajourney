import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import TurkishToEnglish from "../TurkishToEnglish";

const VisaStepFormTest = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const toast = useRef(null);

  /*
  Birleşik Krallık Vize Başvuru Formu
________________________________________
Kişisel Bilgiler:
1.	E-mail adresiniz nedir?
2.	Kullandığınız başka e-mail adresiniz var mı?
3.	Telefon numaranız nedir?
4.	Ek olarak kullandığınız telefon numaranız var mı?
5.	Cinsiyetiniz nedir?
o	Erkek
o	Kadın
6.	Ad – Soyad (Pasaport üzerinde görünen):
7.	Medeni durumunuz nedir?
o	Bekar
o	Evli
o	Boşanmış
o	Kayıtlı olmayan birliktelik
8.	Evli iseniz, kızlık soyadınız nedir? 
9.	Daha önce başka bir isim-soy isim kullandınız mı?
o	Evet
 Daha önce kullandığınız isim-soy ismi yazınız.
o	Hayır
 
10.	İkamet ettiğiniz adres nedir?
11.	Ne kadar zamandır bu adreste yaşıyorsunuz?
o	Gün, hafta, ay, yıl (Örn: 1 yıl) (gün/ay/yıl şeklinde)
12.	Eğer 1 yıldan az bir süredir bu adreste yaşıyorsanız, bundan önce son 2 yıldır yaşadığınız adres ve tarihler nedir (gün/ay/yıl şeklinde)?
13.	Yaşadığınız adres sizin mülkünüz mü?
o	Kendi mülküm
o	Kiralık
o	Diğer (açıklayınız)
________________________________________
Pasaport Bilgileri:
14.	Pasaport numaranız nedir?
15.	Pasaportunuzun veriliş tarihi nedir?
16.	Pasaportunuzun geçerlilik tarihi nedir?
17.	Pasaportunuzu veren makam (pasaportunuzda görünen):
________________________________________
Kimlik Bilgileri:
18.	T.C. kimlik numaranız nedir?
19.	Kimlik kartınızın geçerlilik tarihi nedir?
________________________________________
Uyruk/Vatandaşlık Bilgileri:
20.	Hangi ülke vatandaşısınız?
21.	Pasaportta belirtilen doğum ülkeniz neresidir?
22.	Pasaportta yazan doğum yeriniz neresidir?
23.	Doğum tarihinizi gün, ay, yıl şeklinde belirtiniz:
24.	Şu anda başka bir uyruğa veya vatandaşlığa sahip misiniz veya daha önce sahip oldunuz mu?
o	Evet (Ülke, hakkın veriliş ve bitiş tarihi, vatandaşlık durumu)
o	Hayır
________________________________________
Çalışma Durumu:
25.	İş durumunuz nedir?
o	Çalışan
o	Şirket sahibi
o	Öğrenci
o	Emekli
o	İşsiz

26.	Çalışan iseniz:
o	Şirket adı:
o	Şirket adresi:
o	Telefon numarası:
o	İşe giriş tarihi:
o	İş unvanınız:
o	Aylık kazancınız (TRY):
o	İşinizi açıklayınız:
27.	 Şirket Sahibi iseniz: 
o	Şirket adı:
o	Şirket adresi:
o	Telefon numarası:
o	Yıllık kazancınız (TRY):
o	İşinizi açıklayınız:

28.	Serbest meslek sahibi iseniz:
o	Görev unvanınız:
o	Yıllık kazancınız (TRY):
29.	Öğrenci iseniz:
o	Okul adı
o	Okul adresi
o	Okuduğunuz bölüm nedir:




________________________________________
Ek Gelirler:
30.	Mesleğinizden gelen gelir dışında başka ek geliriniz var mı?
o	Evet (Açıklayınız: kira geliri, emekli maaşı, yatırımlar vb. yıllık toplam kazanç, GBP cinsinden belirtiniz.)
o	Hayır
31.	Birikim miktarınız nedir? (Banka hesap dökümünüzde göstereceğiniz miktar)
o	GBP cinsinden hesaplanmış toplam tutarı belirtiniz.
________________________________________
Seyahat Giderleri:
32.	İngiltere’de GBP döviz kuru üzerinden ne kadar harcama yapmayı planlıyorsunuz?
33.	Her ay toplam ne kadar para harcarsınız? (TRY cinsinden)
34.	Seyahat masraflarınızı başka biri ödeyecek mi?
o	Evet
o	Hayır
35.	Evet ise masrafları kim karşılayacak?
o	Aile veya arkadaş (Adı, Soyadı, Adresi, Telefon numarası)
o	İşveren veya şirket (Şirket adı, Adresi, Telefon numarası)
o	Neden katkıda bulunduklarını açıklayınız:
________________________________________
Seyahat Planı:
36.	İngiltere’ye seyahat etmeyi planladığınız tarih aralığı nedir?
o	(Gidiş-Dönüş, Gün-Ay-Yıl)
37.	Ziyaret sebebiniz nedir?
o	Turizm
o	Aile ziyareti
o	Arkadaş ziyareti
o	İş
o	Transit
o	Akademik ziyaret
o	Kısa süreli eğitim
o	Sağlık
o	Evlilik
o	Diğer (açıklayınız)
________________________________________
Aile Bilgileri:
38.	Evliyseniz eşinizin;
o	Adı, Soyadı:
o	Doğum tarihi:
o	Uyruğu:
o	Eşiniz sizinle birlikte mi yaşıyor?
•	Evet
•	Hayır
o	Birleşik Krallık’a sizinle birlikte seyahat edecek mi?
o	Evet (Pasaport numarası)
o	Hayır
39.	Anne ve baba bilgileri:
o	Adı, Soyadı:
o	Doğum tarihi:
o	Uyruğu:
40.	Birleşik Krallık’ta ailenizden biri yaşıyor mu?
o	Evet 
•	Yakınlık derecesi, 
•	Adı, Soyadı, 
•	Uyruğu, 
•	Vize durumu
o	Hayır
41.	Çocuğunuz var mı?
o	Evet
o	Hayır
o	Evet ise: Adı, Soyadı:
o	Doğum tarihi:
o	Sizinle birlikte mi yaşıyor?
o	Sizinle birlikte seyahat edecek mi?
o	Evet
•	Pasaport Numarası:
o	Hayır
42.	Birleşik Krallık'ta ailenizden biri yaşıyor mu?
o	Evet
o	Hayır
o	Evet ise:
Yakınlık dereceniz:
•	Ad – Soyad:
•	Uyruk:
•	Birleşik Krallık'taki yasal durumu nedir?
•	Geçici vizeye sahip mi? 
o	Evet (Pasaport numarası nedir?)
o	Hayır
•	Temelli olarak Birleşik Krallık’ta mı?
o	Evet (Pasaport numarası nedir?)
•	Vizeleri yok ve Birleşik Krallık'ta temelli bulunmamaktalar mı?
o	Evet (Yasal durum açıklaması: Vize başvuruları beklemede mi, göçmenlik muafiyeti mi var, yasal olmayan bir durum mu söz konusu?)
________________________________________
Seyahat Bilgisi:
43.	Grup ile mi seyahat edeceksiniz?
o	Evet
o	Hayır
o	Evet ise grup adı nedir?
44.	Eşiniz, çocuklarınız, bakmakla yükümlü olduğunuz aile bireyi dışında biri ile seyahat edecek misiniz?
o	Evet
o	Hayır
o	Evet ise:
1.	Ad – Soyad:
2.	Uyruk:
3.	Sizinle olan bağı:
________________________________________
Konaklama Detayları:
45.	Konaklayacağınız adres belli mi? (Zorunlu değil.)
o	Evet
o	Hayır
o	Evet ise:
1.	Tam adres:
2.	Kalacağınız kişinin adı:
3.	Varış ve çıkış tarihleri:
46.	İngiltere’de bir planınız varsa açıklayınız: (Zorunlu değil.)
o	Otel bilgileri, gezi planı vb.
________________________________________
Seyahat Geçmişi:
47.	Son 10 yıl içerisinde İngiltere’ye gittiniz mi?
o	Evet
o	Hayır
o	Evet ise:
1.	Kaç kere gittiniz?
2.	Amaç: (Turizm, iş, öğrenim, transit vb.)
3.	Ziyaret tarihleri (ay ve yıl):
4.	Ne kadar süre kaldınız?
48.	İngiltere’de daha önce tıbbi tedavi gördünüz mü?
o	Evet
o	Hayır
o	Evet ise:
1.	Ücret ödemeniz gerektiği söylendi mi?
2.	Tüm tutarı ödediniz mi?
49.	Ulusal sigorta numaranız var mı?
o	Evet (Sigorta numarası)
o	Hayır
50.	İngiltere’de geçerli bir ehliyetiniz var mı?
o	Evet (Lisans numarası)
o	Hayır
51.	İngiltere'de herhangi bir kamu fonu aldınız mı?
o	Evet (Açıklayınız)
o	Hayır
52.	Son 10 yılda Birleşik Krallık vizesi aldınız mı?
o	Evet (Veriliş tarihi)
o	Hayır
53.	Son 10 yılda Birleşik Krallık'ta kalma izni için başvuruda bulundunuz mu?
o	Evet (Başvuru tarihi ve sonucu)
o	Hayır
54.	Son 10 yılda belirtilen ülkeleri kaç kez ziyaret ettiniz? (Avustralya, Kanada, Yeni Zelanda, Amerika, İsviçre, Schengen Ülkeleri)
o	Hiç
o	Bir kez
o	2-5 kez
o	6 veya daha fazla
o	Son 2 ziyaret:
1.	Ülke:
2.	Seyahat amacı:
3.	Tarih (ay ve yıl):
4.	Süre:
55.	Son 10 yılda İngiltere, ABD, Kanada, Avustralya, Yeni Zelanda, İsviçre veya Schengen ülkeleri dışında başka ülkelere gittiniz mi? (Hepsini belirtiniz.)
•	Evet
•	Hayır
•	Evet ise:
o	Gidilen ülke:
o	Seyahat amacı: (Turizm, iş, eğitim, aile ziyareti vb.)
o	Giriş tarihi:
o	Çıkış tarihi:
________________________________________
Vize Durumu:
56.	İngiltere veya başka bir ülke için herhangi bir vize reddi, sınırda giriş izni verilmemesi, kalma veya sığınma talebinin reddi, sürgün edilme ya da ülkeye giriş yasağı gibi bir durum yaşadınız mı?
•	Evet
•	Hayır
•	Evet ise açıklayınız:
•	Hangi ülke?
•	Tarih:
•	Red veya yasağın sebebi:


	Birleşik Krallık ile ilgili herhangi bir güvenlik ihlali vs. bir durum yaşadıysanız lütfen belirtiniz.






*/

  const steps = [
    {
      id: 1,
      label: "Kişisel Bilgiler",
    },
    {
      id: 2,
      label: "Pasaport Bilgileri",
    },
  ];

  const questions = [
    {
      id: 1,
      label: "E-mail adresiniz nedir?",
      name: "email",
      type: "text",
      step: steps[0],
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
      step: steps[1],
    },
    {
      id: 19,
      label: "Kimlik kartınızın geçerlilik tarihi nedir?",
      name: "idExpiryDate",
      type: "calendar",
      step: steps[1],
    },
  ];

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

  // const steps = [
  //   { id: 1, step_name: "Kişisel Bilgiler" },
  //   { id: 2, step_name: "İş/Tecrübe" },
  //   { id: 3, step_name: "Seyahat" },
  // ];
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
          <div className="step">
            <div>
              <label htmlFor="input_1">E-mail adresiniz nedir?</label>
              <InputText
                id="input_1"
                name="input_1"
                value={formik.values.input_1}
                onChange={formik.handleChange}
                placeholder="E-mail adresiniz nedir?"
              />
            </div>

            <div>
              <label htmlFor="input_2">
                Kullandığınız başka e-mail adresiniz var mı?
              </label>
              <InputText
                id="input_2"
                name="input_2"
                value={formik.values.input_2}
                onChange={formik.handleChange}
                placeholder="Kullandığınız başka e-mail adresiniz var mı?"
              />
            </div>

            <div>
              <label htmlFor="input_2">
                Kullandığınız başka e-mail adresiniz var mı?
              </label>
              <InputText
                id="input_2"
                name="input_2"
                value={formik.values.input_2}
                onChange={formik.handleChange}
                placeholder="Kullandığınız başka e-mail adresiniz var mı?"
              />
            </div>

            <div>
              <label htmlFor="input_3">Telefon numaranız nedir?</label>
              <InputText
                id="input_3"
                name="input_3"
                value={formik.values.input_3}
                onChange={formik.handleChange}
                placeholder="Telefon numaranız nedir?"
              />
            </div>

            <div>
              <label htmlFor="input_4">test</label>
              <InputText
                id="input_4"
                name="input_4"
                value={formik.values.input_4}
                onChange={formik.handleChange}
                placeholder="test"
              />
            </div>

            {/* <Calendar
                dateFormat="dd/mm/yy"
                id="idExpiryDate"
                name="idExpiryDate"
                value={formik.values.idExpiryDate}
                onChange={(e) => formik.setFieldValue("idExpiryDate", e.value)}
                locale="tr"
              /> */}

            {/* <div className="buttons center">
              <button onClick={handleNextStep}>İleri</button>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default VisaStepFormTest;
