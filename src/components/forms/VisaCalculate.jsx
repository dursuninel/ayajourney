import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import GaugeChart from "../GaugeChart";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";

export default function VisaCalculate() {
  const questions = [
    {
      id: "age",
      label: "Yaşınız",
      type: "dropdown",
      options: [
        { id: "age_0_18", label: "0-18", value: 10 },
        { id: "age_18_26", label: "18-26", value: -5 },
        { id: "age_26_30", label: "26-30", value: 0 },
        { id: "age_30_35", label: "30-35", value: 5 },
        { id: "age_35_45", label: "35-45", value: 10 },
        { id: "age_45_plus", label: "45+", value: 20 },
      ],
    },
    {
      id: "gender",
      label: "Cinsiyetiniz",
      type: "dropdown",
      options: [
        { id: "gender_male", label: "Erkek", value: 0 },
        { id: "gender_female", label: "Kadın", value: 5 },
      ],
    },
    {
      id: "maritalStatus",
      label: "Medeni haliniz",
      type: "dropdown",
      options: [
        { id: "status_single", label: "Bekar", value: 0 },
        { id: "status_married", label: "Evli", value: 5 },
      ],
    },
    {
      id: "children",
      label: "Çocuklarınızın sayısı",
      type: "dropdown",
      options: [
        { id: "children_0", label: "0", value: 0 * 2 },
        { id: "children_1", label: "1", value: 1 * 2 },
        { id: "children_2", label: "2", value: 2 * 2 },
        { id: "children_3", label: "3", value: 3 * 2 },
        { id: "children_4", label: "4", value: 4 * 2 },
        { id: "children_5", label: "5", value: 5 * 2 },
        { id: "children_6", label: "6", value: 6 * 2 },
        { id: "children_7", label: "7", value: 7 * 2 },
        { id: "children_8", label: "8", value: 8 * 2 },
        { id: "children_9", label: "9", value: 9 * 2 },
        { id: "children_10", label: "10", value: 10 * 2 },
      ],
    },
    {
      id: "travelAbroad",
      label:
        "Komşu ülkeler (Gürcistan, Irak, Azerbaycan vb) hariç, son 5 yılda yurtdışına çıktınız mı ?",
      type: "dropdown",
      options: [
        { id: "travel_abroad_yes", label: "Evet", value: 10 },
        { id: "travel_abroad_no", label: "Hayır", value: -5 },
      ],
    },
    {
      id: "travelCategory",
      label: "Son 5 yılda ...",
      type: "dropdown",
      options: [
        {
          id: "travel_canada_uk",
          label:
            "Kanada, İngiltere, Avustralya veya Yeni Zelanda vizesi aldım.",
          value: 8,
        },
        {
          id: "travel_eu",
          label: "En az bir Schengen vizesi aldım",
          value: 5,
        },
        {
          id: "travel_high_tier",
          label:
            "Japonya, Güney Kore, Singapur, Hindistan, Malezya, Güney Afrika gibi ülkelere gittim",
          value: 3,
        },
        {
          id: "travel_no",
          label:
            "Sadece vizesiz ülkelere gittim (komşu ülkeler, Kuzey Afrika ve Orta Asya ülkeleri dahil)",
          value: 1,
        },
        {
          label: "Komşu ülkelere gittim",
          id: "travel_neighbour",
          value: 0,
        },
      ],
    },
    {
      id: "schengenCount",
      label:
        "Varsa, pasaportunuza basılmış toplam vize etiketi sayısı (Schengen, Kanada, İngiltere vb dahil)",
      type: "dropdown",
      options: [
        { id: "schengen_0", label: "0", value: 0 },
        { id: "schengen_1", label: "1", value: 5 },
        { id: "schengen_2", label: "2", value: 10 },
        { id: "schengen_3", label: "3", value: 15 },
        { id: "schengen_4", label: "4", value: 20 },
        { id: "schengen_4", label: "5", value: 25 },
        { id: "schengen_4", label: "6", value: 30 },
      ],
    },
    {
      id: "travelCompanion",
      label: "Tek mi, eşinizle birlikte mi seyahat edeceksiniz?",
      type: "dropdown",
      options: [
        {
          id: "travel_private_single",
          label: "Özel sektörde tek kişi",
          value: 10, // Özel sektör + Tek kişi: +10 puan
        },
        {
          id: "travel_public_couple",
          label: "Kamu çalışanı eşimle",
          value: 10, // Kamu çalışanı + Eşli seyahat: +10 puan
        },
        {
          id: "travel_private_couple",
          label: "Özel sektörde eşimle",
          value: 0, // Özel sektör + Eşli seyahat: 0 puan
        },
        {
          id: "travel_public_single",
          label: "Kamu çalışanı tek kişi",
          value: 0, // Kamu çalışanı + Tek kişi: 0 puan
        },
        {
          id: "travel_other",
          label: "Diğer",
          value: 0, // Diğer tüm durumlar: 0 puan
        },
      ],
    },

    {
      id: "usaFamily",
      label: "ABD’de yaşayan birinci derece akrabanız var mı?",
      type: "dropdown",
      options: [
        { id: "usa_family_no", label: "Hayır", value: 0 },
        { id: "usa_family_yes", label: "Evet", value: -5 },
      ],
    },
    {
      id: "profession",
      label: "Mesleğiniz",
      type: "dropdown",
      options: [
        { id: "profession_doctor", label: "Doktor", value: 10 },
        { id: "profession_engineer", label: "Mühendis-Mimar", value: 6 },
        { id: "profession_teacher", label: "Öğretmen", value: 4 },
        { id: "profession_technician", label: "Teknisyen", value: 3 },
        { id: "profession_manager", label: "Yönetici", value: 7 },
        {
          id: "profession_public_basic",
          label: "Kamu temel çalışan",
          value: 2,
        },
        { id: "profession_public_expert", label: "Uzman memur", value: 5 },
        {
          id: "profession_public_manager",
          label: "Kamuda yönetici",
          value: 10,
        },
        { id: "profession_blue_collar", label: "Mavi yaka", value: 2 },
        { id: "profession_white_collar", label: "Beyaz yaka", value: 4 },
        { id: "profession_academician", label: "Akademisyen", value: 8 },
        { id: "profession_lawyer", label: "Avukat", value: 7 },
      ],
    },
    {
      id: "yearsProfession",
      label: "Kaç yıldır mesleğinizi yapıyorsunuz?",
      type: "dropdown",
      options: [
        { id: "profession_5_plus", label: "5 yıl ve üstü", value: 10 },
        { id: "profession_1_2", label: "1-2 yıl", value: -5 },
        { id: "profession_2_5", label: "2-5 yıl", value: 0 },
      ],
    },
    {
      id: "income",
      label: "Aylık geliriniz",
      type: "dropdown",
      options: [
        { id: "income_0_50", label: "0-50 bin", value: 0 },
        { id: "income_50_100", label: "50-100 bin", value: 5 },
        { id: "income_100_plus", label: "100 bin üstü", value: 10 },
      ],
    },
    {
      id: "englishLevel",
      label: "İngilizce seviyeniz",
      type: "dropdown",
      options: [
        {
          id: "english_fluent",
          label: "B2 ve üstü – mülakatı ingilizce yapabilecek seviyede",
          value: 15,
        },
        {
          id: "english_intermediate",
          label:
            "Orta ve altı – mülakatı İngilizce yapamaz, Türkçe tercih eder",
          value: 5,
        },
        { id: "english_none", label: "Yok veya çok az", value: 0 },
      ],
    },
    {
      id: "usaVisa",
      label: "Daha önce ABD vizesi aldınız mı? (Work and Travel hariç)",
      type: "dropdown",
      options: [
        { id: "visa_yes", label: "Evet", value: 20 },
        { id: "visa_no", label: "Hayır", value: 0 },
      ],
    },
    {
      id: "usaVisaRejection",
      label: "ABD vize reddi aldınız mı?",
      type: "dropdown",
      options: [
        {
          id: "rejection_2_years",
          label: "Son 2 yıl içinde aldım",
          value: -10,
        },
        { id: "rejection_5_years", label: "Son 5 yıl içinde aldım", value: 0 },
        {
          id: "rejection_10_years",
          label: "Son 10 yıl içinde aldım",
          value: 0,
        },
        { id: "rejection_no", label: "Almadım", value: 0 },
      ],
    },
    {
      id: "education",
      label: "Eğitim durumunuz",
      type: "dropdown",
      options: [
        { id: "education_high_school", label: "Lise", value: 0 },
        { id: "education_on_bachelor", label: "Ön Lisans", value: 0 },
        { id: "education_bachelor", label: "Lisans", value: 5 },
        { id: "education_master", label: "Yüksek Lisans", value: 10 },
        { id: "education_phd", label: "Doktora", value: 15 },
      ],
    },
    {
      id: "interviewAnxiety",
      label: "Mülakatlarda heyecanlanır mısınız?",
      type: "dropdown",
      options: [
        { id: "anxiety_yes", label: "Evet", value: -1 },
        { id: "anxiety_no", label: "Hayır", value: 1 },
      ],
    },
    {
      id: "assets",
      label: "Bankadaki varlıklarınız (USD)",
      type: "dropdown",
      options: [
        { id: "assets_0_100", label: "0-100 bin", value: 0 },
        { id: "assets_100_250", label: "100-250 bin", value: 10 },
        { id: "assets_250_plus", label: "250 bin+", value: 20 },
      ],
    },
    {
      id: "awards",
      label:
        "Spor, sanat, akademi gibi alanlarda, uluslararası bir ödülünüz var mı?",
      type: "dropdown",
      options: [
        { id: "awards_yes", label: "Evet", value: 20 },
        { id: "awards_no", label: "Hayır", value: 0 },
      ],
    },
  ];
  const [showScoreChart, setShowScoreChart] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1); // -1 başlangıç adımını temsil eder
  const [formValues, setFormValues] = useState(
    questions.reduce((values, question) => {
      values[question.id] = undefined; // Başlangıç değeri undefined
      return values;
    }, {})
  );
  const { activeLanguage } = useLanguage();
  const toast = useRef(null);

  const [formId, setFormId] = useState(null);

  const [errors, setErrors] = useState({});
  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    email: "",
  });
  const [basicInfoErrors, setBasicInfoErrors] = useState({});

  const handleInputChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Hata mesajını temizle
  };

  const validateBasicInfo = () => {
    const newErrors = {};
    if (!basicInfo.fullName.trim()) {
      newErrors.fullName = "Lütfen adınızı giriniz.";
    }
    if (
      !basicInfo.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email)
    ) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    }
    setBasicInfoErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBasicInfoSubmit = () => {
    if (validateBasicInfo()) {
      setCurrentStep(0); // Step formuna geç
    }
  };

  const validateStep = () => {
    const currentQuestion = questions[currentStep];
    if (formValues[currentQuestion.id] === undefined) {
      setErrors((prev) => ({
        ...prev,
        [currentQuestion.id]: `${currentQuestion.label} zorunludur.`,
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const allValid = questions.every(
      (question) => formValues[question.id] !== undefined
    );
    if (!allValid) {
      const newErrors = {};
      questions.forEach((question) => {
        if (formValues[question.id] === undefined) {
          newErrors[question.id] = `${question.label} zorunludur.`;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Puan hesaplama
    let totalScore = 0;
    questions.forEach((question) => {
      const selectedOption = question.options?.find(
        (option) => option.id === formValues[question.id]
      );
      if (selectedOption) {
        totalScore += selectedOption.value;
      }
    });
    totalScore = totalScore > 100 ? 100 : totalScore < 0 ? 0 : totalScore;

    const selectedValues = questions.reduce((result, question) => {
      const selectedOption = question.options.find(
        (option) => option.id === formValues[question.id]
      );
      if (selectedOption) {
        result[question.id] = {
          id: selectedOption.id,
          title: question.label, // Sorunun başlığı
          label: selectedOption.label, // Seçilen seçeneğin etiketi
          value: selectedOption.value, // Seçilen seçeneğin puanı
        };
      }
      return result;
    }, {});

    // Konsola yazdırma
    console.log("Form Cevapları:", {
      basicInfo: basicInfo,
      datas: selectedValues,
    });

    const response = await axios.post("/addCalculateValue", {
      values: {
        basicInfo: basicInfo,
        datas: selectedValues,
      },
      totalScore: totalScore,
      lang: activeLanguage.code,
    });

    if (response.data.insertId) {
      setFormId(response.data.insertId);
      setTotalScore(totalScore);
      setShowScoreChart(true);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail: "Form gönderilirken bir hata oluştu",
        life: 2000,
      });
    }
  };

  const resetForm = () => {
    setCurrentStep(-1); // Başlangıç adımına dön
    setFormValues(
      questions.reduce((values, question) => {
        values[question.id] = undefined;
        return values;
      }, {})
    );
    setShowScoreChart(false);
    setBasicInfo({ fullName: "", email: "" });
    setBasicInfoErrors({});
  };

  const updateReach = async () => {
    const response = await axios.post("/updateCalculateReach", {
      formId: formId,
    });

    if (response.data.affectedRows) {
      Swal.fire(
        "Teşekkürler",
        "En kısa sürede sizinle iletişime geçeceğiz.",
        "success"
      );
      setFormId(null);
    } else {
      Swal.fire("Hata", "Bir hata oluştu", "error");
    }
  };

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <div className="visa-form-container container-center">
        {showScoreChart && (
          <>
            <GaugeChart value={totalScore} />
            <div className="buttons">
              <Button
                type="button"
                label="Tekrar Hesapla"
                onClick={resetForm}
              />

              {formId && (
                <Button
                  type="button"
                  label="Size bu konuda ulaşalım mı ?"
                  onClick={updateReach}
                />
              )}
            </div>
          </>
        )}
        {!showScoreChart && currentStep === -1 && (
          <>
            <form>
              <div className="step">
                <div className="field">
                  <label htmlFor="fullName">Ad-Soyad</label>
                  <InputText
                    id="fullName"
                    value={basicInfo.fullName}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, fullName: e.target.value })
                    }
                    placeholder="Ad-Soyad"
                  />
                  {basicInfoErrors.fullName && (
                    <small className="p-error">
                      {basicInfoErrors.fullName}
                    </small>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="email">E-posta Adresi</label>
                  <InputText
                    id="email"
                    value={basicInfo.email}
                    onChange={(e) =>
                      setBasicInfo({ ...basicInfo, email: e.target.value })
                    }
                    placeholder="E-posta"
                  />
                  {basicInfoErrors.email && (
                    <small className="p-error">{basicInfoErrors.email}</small>
                  )}
                </div>

                <div className="buttons">
                  <Button
                    type="button"
                    label="Devam Et"
                    onClick={handleBasicInfoSubmit}
                  />
                </div>
              </div>
            </form>
          </>
        )}
        {!showScoreChart && currentStep >= 0 && (
          <>
            <form>
              <div className="step">
                <div className="field">
                  <label htmlFor={questions[currentStep].id}>
                    {questions[currentStep].label}
                  </label>
                  {questions[currentStep].type === "dropdown" && (
                    <Dropdown
                      id={questions[currentStep].id}
                      value={formValues[questions[currentStep].id]}
                      options={questions[currentStep].options.map((option) => ({
                        label: option.label,
                        value: option.id,
                      }))}
                      optionLabel="label"
                      onChange={(e) =>
                        handleInputChange(questions[currentStep].id, e.value)
                      }
                      placeholder={questions[currentStep].label}
                    />
                  )}
                  {errors[questions[currentStep].id] && (
                    <small className="p-error">
                      {errors[questions[currentStep].id]}
                    </small>
                  )}
                </div>
              </div>

              <div className="buttons">
                {currentStep > 0 && (
                  <Button type="button" label="Geri" onClick={handlePrevious} />
                )}
                {currentStep < questions.length - 1 && (
                  <Button type="button" label="İleri" onClick={handleNext} />
                )}
                {currentStep === questions.length - 1 && (
                  <Button
                    type="button"
                    label="Sonucu Göster"
                    onClick={handleSubmit}
                  />
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
