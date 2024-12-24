import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

export default function VisaCalculate() {
    const questions = [
        { id: 'age', label: 'Yaşınız', type: 'dropdown', options: [
            { label: '0-18', value: 10 },
            { label: '18-26', value: -5 },
            { label: '26-30', value: 0 },
            { label: '30-35', value: 5 },
            { label: '35-45', value: 10 },
            { label: '45+', value: 20 },
        ] },
        { id: 'gender', label: 'Cinsiyetiniz', type: 'dropdown', options: [
            { label: 'Erkek', value: 0 },
            { label: 'Kadın', value: 5 },
        ] },
        { id: 'maritalStatus', label: 'Medeni haliniz', type: 'dropdown', options: [
            { label: 'Bekar', value: 0 },
            { label: 'Evli', value: 5 },
        ] },
        { id: 'children', label: 'Varsa çocuklarınızın sayısı', type: 'number', multiplier: 2 },
        { id: 'travelAbroad', label: 'Daha önce yurtdışına çıktınız mı?', type: 'dropdown', options: [
            { label: 'Evet', value: 10 },
            { label: 'Hayır', value: -5 },
        ] },
        { id: 'travelCategory', label: 'Hangi kategoride hangi ülkeye gittiniz?', type: 'text' },
        { id: 'schengenCount', label: 'Pasaportunuza basılmış Schengen vizesi sayısı', type: 'number', multiplier: 10 },
        { id: 'travelCompanion', label: 'Tek mi eşinizle birlikte mi seyahat edileceği', type: 'text' },
        { id: 'usaFamily', label: 'ABD’de yaşayan birinci derece akrabanız var mı?', type: 'dropdown', options: [
            { label: 'Evet', value: -5 },
            { label: 'Hayır', value: 0 },
        ] },
        { id: 'profession', label: 'Mesleğiniz', type: 'text' },
        { id: 'yearsProfession', label: 'Kaç yıldır mesleğinizi yapıyorsunuz?', type: 'dropdown', options: [
            { label: '5 yıl ve üstü', value: 10 },
            { label: '1-2 yıl', value: -5 },
            { label: '2-5 yıl', value: 0 },
        ] },
        { id: 'income', label: 'Aylık geliriniz', type: 'dropdown', options: [
            { label: '0-50 bin', value: 0 },
            { label: '50-100 bin', value: 5 },
            { label: '100 bin üstü', value: 10 },
        ] },
        { id: 'englishLevel', label: 'İngilizce seviyeniz', type: 'dropdown', options: [
            { label: 'Mülakat yapabilecek', value: 15 },
            { label: 'Orta seviye', value: 5 },
            { label: 'Hiç yok', value: 0 },
        ] },
        { id: 'usaVisa', label: 'Daha önce ABD vizesi aldınız mı?', type: 'dropdown', options: [
            { label: 'Evet', value: 20 },
            { label: 'Hayır', value: 0 },
        ] },
        { id: 'usaVisaRejection', label: 'ABD vize reddi aldınız mı?', type: 'dropdown', options: [
            { label: 'Son 2 yıl', value: -10 },
            { label: 'Son 5 yıl', value: 0 },
            { label: 'Son 10 yıl', value: 0 },
        ] },
        { id: 'education', label: 'Eğitim durumunuz', type: 'dropdown', options: [
            { label: 'Lisans', value: 5 },
            { label: 'Yüksek Lisans', value: 10 },
            { label: 'Doktora', value: 15 },
        ] },
        { id: 'interviewAnxiety', label: 'Mülakatlarda heyecanlanır mısınız?', type: 'dropdown', options: [
            { label: 'Evet', value: -1 },
            { label: 'Hayır', value: 1 },
        ] },
        { id: 'assets', label: 'Bankadaki varlıklarınız (USD)', type: 'dropdown', options: [
            { label: '0-100 bin', value: 0 },
            { label: '100-250 bin', value: 10 },
            { label: '250 bin+', value: 20 },
        ] },
        { id: 'awards', label: 'Uluslararası bir ödülünüz var mı?', type: 'dropdown', options: [
            { label: 'Evet', value: 20 },
            { label: 'Hayır', value: 0 },
        ] },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const formik = useFormik({
        initialValues: questions.reduce((values, question) => {
            values[question.id] = '';
            return values;
        }, {}),
        onSubmit: (values) => {
            let totalScore = 0;

            questions.forEach((question) => {
                if (typeof values[question.id] === 'number') {
                    totalScore += values[question.id] * (question.multiplier || 1);
                } else if (question.options) {
                    const selectedOption = question.options.find(option => option.value === values[question.id]);
                    if (selectedOption) totalScore += selectedOption.value;
                }
            });

            alert(`Vize alma ihtimaliniz: ${totalScore} puan.`);
        },
    });

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <label htmlFor={questions[currentStep].id}>{questions[currentStep].label}</label>
                {questions[currentStep].type === 'text' && (
                    <InputText
                        id={questions[currentStep].id}
                        name={questions[currentStep].id}
                        value={formik.values[questions[currentStep].id]}
                        onChange={formik.handleChange}
                        placeholder={questions[currentStep].label}
                    />
                )}
                {questions[currentStep].type === 'dropdown' && (
                    <Dropdown
                        id={questions[currentStep].id}
                        name={questions[currentStep].id}
                        value={formik.values[questions[currentStep].id]}
                        options={questions[currentStep].options}
                        onChange={(e) => formik.setFieldValue(questions[currentStep].id, e.value)}
                        placeholder={questions[currentStep].label}
                    />
                )}
                {questions[currentStep].type === 'number' && (
                    <InputText
                        id={questions[currentStep].id}
                        name={questions[currentStep].id}
                        type="number"
                        value={formik.values[questions[currentStep].id]}
                        onChange={formik.handleChange}
                        placeholder={questions[currentStep].label}
                    />
                )}
            </div>

            <div className="buttons">
                {currentStep > 0 && (
                    <Button type="button" label="Geri" onClick={handlePrevious} />
                )}
                {currentStep < questions.length - 1 && (
                    <Button type="button" label="İleri" onClick={handleNext} />
                )}
                {currentStep === questions.length - 1 && (
                    <Button type="submit" label="Sonucu Göster" />
                )}
            </div>
        </form>
    );
};
