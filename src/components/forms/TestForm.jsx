import React from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

const SchengenVisaForm = () => {
  const formik = useFormik({
    initialValues: {
      surname: "",
      previousSurname: "",
      firstName: "",
      birthDate: null,
      birthPlace: "",
      birthCountry: "",
      nationality: "",
      gender: "",
      maritalStatus: "",
      guardianInfo: "",
      nationalID: "",
      address: "",
      phone: "",
      passportType: "",
      passportNumber: "",
      passportIssueDate: null,
      passportExpiryDate: null,
      passportIssuer: "",
      euFamilyMember: {
        surname: "",
        firstName: "",
        birthDate: null,
        nationality: "",
        documentNumber: "",
        relationship: "",
      },
      occupation: "",
      employerInfo: "",
      travelPurpose: [],
      additionalInfo: "",
      mainDestination: "",
      entryCountry: "",
      entryCount: "",
      plannedEntryDate: null,
      plannedExitDate: null,
      previousVisa: "",
      previousVisaDate: null,
      inviteeInfo: "",
      inviteeAddress: "",
      inviteeContact: "",
      inviteeEmail: "",
      inviteeCompany: "",
      inviteeRepresentative: "",
      financialSupport: "",
      financialDetails: [],
      sponsorDetails: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const genderOptions = [
    { label: "Erkek", value: "Erkek" },
    { label: "Kadın", value: "Kadın" },
  ];

  const maritalStatusOptions = [
    "Bekar",
    "Evli",
    "Kayıtlı birliktelik",
    "Aynı",
    "Boşanmış",
    "Dul",
    "Diğer",
  ];

  const passportTypes = [
    "Normal pasaport",
    "Diplomatik pasaport",
    "Hizmet pasaportu",
    "Resmi pasaport",
    "Özel pasaport",
    "Diğer seyahat belgesi",
  ];

  const entryCounts = ["Tek giriş", "İki giriş", "Çok girişli"];

  const travelPurposes = [
    "Turistik",
    "Aile veya arkadaş ziyareti",
    "Kültürel",
    "Sportif",
    "Resmi ziyaret",
    "Sağlık sebepleri",
    "Eğitim",
    "Havalimanı transit",
    "Diğer",
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="surname">Soyadınız (Aile adı)</label>
        <InputText
          id="surname"
          name="surname"
          value={formik.values.surname}
          onChange={formik.handleChange}
          placeholder="Soyadınızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="previousSurname">Önceki soyadınız</label>
        <InputText
          id="previousSurname"
          name="previousSurname"
          value={formik.values.previousSurname}
          onChange={formik.handleChange}
          placeholder="Önceki soyadınızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="firstName">Adınız</label>
        <InputText
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          placeholder="Adınızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="birthDate">Doğum tarihiniz (gün-ay-yıl)</label>
        <Calendar
          id="birthDate"
          name="birthDate"
          value={formik.values.birthDate}
          onChange={(e) => formik.setFieldValue("birthDate", e.value)}
          placeholder="Doğum tarihinizi seçiniz"
        />
      </div>

      <div>
        <label htmlFor="birthPlace">Doğum yeriniz</label>
        <InputText
          id="birthPlace"
          name="birthPlace"
          value={formik.values.birthPlace}
          onChange={formik.handleChange}
          placeholder="Doğum yerinizi giriniz"
        />
      </div>

      <div>
        <label htmlFor="birthCountry">Doğum ülkeniz</label>
        <InputText
          id="birthCountry"
          name="birthCountry"
          value={formik.values.birthCountry}
          onChange={formik.handleChange}
          placeholder="Doğum ülkenizi giriniz"
        />
      </div>

      <div>
        <label htmlFor="nationality">Uyruğunuz</label>
        <InputText
          id="nationality"
          name="nationality"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          placeholder="Uyruğunuzu giriniz"
        />
      </div>

      <div>
        <label htmlFor="gender">Cinsiyet</label>
        <Dropdown
          id="gender"
          name="gender"
          value={formik.values.gender}
          options={genderOptions}
          onChange={formik.handleChange}
          placeholder="Cinsiyetinizi seçiniz"
        />
      </div>

      <div>
        <label htmlFor="maritalStatus">Medeni hal</label>
        <Dropdown
          id="maritalStatus"
          name="maritalStatus"
          value={formik.values.maritalStatus}
          options={maritalStatusOptions.map((status) => ({
            label: status,
            value: status,
          }))}
          onChange={formik.handleChange}
          placeholder="Medeni halinizi seçiniz"
        />
      </div>

      <div>
        <label htmlFor="guardianInfo">
          (Reşit değilse) Ebeveyn yetkisi sahibi/yasal velinin bilgileri
        </label>
        <InputText
          id="guardianInfo"
          name="guardianInfo"
          value={formik.values.guardianInfo}
          onChange={formik.handleChange}
          placeholder="Velinizin bilgilerini giriniz"
        />
      </div>

      <div>
        <label htmlFor="nationalID">
          Ulusal Kimlik Numarası / TC Vatandaşları için TC Kimlik No (var ise)
        </label>
        <InputText
          id="nationalID"
          name="nationalID"
          value={formik.values.nationalID}
          onChange={formik.handleChange}
          placeholder="Kimlik numaranızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="address">
          Başvuru sahibinin ev adresi ve e-posta adresi
        </label>
        <InputText
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Adresinizi giriniz"
        />
      </div>

      <div>
        <label htmlFor="phone">Telefon numaranız</label>
        <InputText
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Telefon numaranızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="passportType">Pasaport türünüz</label>
        <Dropdown
          id="passportType"
          name="passportType"
          value={formik.values.passportType}
          options={passportTypes.map((type) => ({ label: type, value: type }))}
          onChange={formik.handleChange}
          placeholder="Pasaport türünüzü seçiniz"
        />
      </div>

      <div>
        <label htmlFor="passportNumber">Pasaport numaranız</label>
        <InputText
          id="passportNumber"
          name="passportNumber"
          value={formik.values.passportNumber}
          onChange={formik.handleChange}
          placeholder="Pasaport numaranızı giriniz"
        />
      </div>

      <div>
        <label htmlFor="passportIssueDate">Pasaport veriliş tarihi</label>
        <Calendar
          id="passportIssueDate"
          name="passportIssueDate"
          value={formik.values.passportIssueDate}
          onChange={(e) => formik.setFieldValue("passportIssueDate", e.value)}
          placeholder="Pasaport veriliş tarihini seçiniz"
        />
      </div>

      <div>
        <label htmlFor="passportExpiryDate">
          Pasaport son geçerlilik tarihi
        </label>
        <Calendar
          id="passportExpiryDate"
          name="passportExpiryDate"
          value={formik.values.passportExpiryDate}
          onChange={(e) => formik.setFieldValue("passportExpiryDate", e.value)}
          placeholder="Pasaport son geçerlilik tarihini seçiniz"
        />
      </div>

      <div>
        <label htmlFor="passportIssuer">Pasaport düzenleyen makam</label>
        <InputText
          id="passportIssuer"
          name="passportIssuer"
          value={formik.values.passportIssuer}
          onChange={formik.handleChange}
          placeholder="Pasaport düzenleyen makamı giriniz"
        />
      </div>

      <div>
        <label htmlFor="plannedEntryDate">Planlanan giriş tarihi</label>
        <Calendar
          id="plannedEntryDate"
          name="plannedEntryDate"
          value={formik.values.plannedEntryDate}
          onChange={(e) => formik.setFieldValue("plannedEntryDate", e.value)}
          placeholder="Planlanan giriş tarihini seçiniz"
        />
      </div>

      <div>
        <label htmlFor="plannedExitDate">Planlanan çıkış tarihi</label>
        <Calendar
          id="plannedExitDate"
          name="plannedExitDate"
          value={formik.values.plannedExitDate}
          onChange={(e) => formik.setFieldValue("plannedExitDate", e.value)}
          placeholder="Planlanan çıkış tarihini seçiniz"
        />
      </div>

      <h2>
        AB, EEA (Avrupa Ekonomik Alanı) veya İsviçre vatandaşlarının aile
        üyelerinin kişisel verileri, var ise:
      </h2>

      <div>
        <label htmlFor="euFamilyMember.surname">Aile üyesi soyadı</label>
        <InputText
          id="euFamilyMember.surname"
          name="euFamilyMember.surname"
          value={formik.values.euFamilyMember.surname}
          onChange={formik.handleChange}
          placeholder="Aile üyesinin soyadını giriniz"
        />
      </div>

      <div>
        <label htmlFor="euFamilyMember.firstName">Aile üyesi adı</label>
        <InputText
          id="euFamilyMember.firstName"
          name="euFamilyMember.firstName"
          value={formik.values.euFamilyMember.firstName}
          onChange={formik.handleChange}
          placeholder="Aile üyesinin adını giriniz"
        />
      </div>

      <div>
        <label htmlFor="euFamilyMember.birthDate">
          Aile üyesi doğum tarihi
        </label>
        <Calendar
          id="euFamilyMember.birthDate"
          name="euFamilyMember.birthDate"
          value={formik.values.euFamilyMember.birthDate}
          onChange={(e) =>
            formik.setFieldValue("euFamilyMember.birthDate", e.value)
          }
          placeholder="Aile üyesinin doğum tarihini seçiniz"
        />
      </div>

      <div>
        <label htmlFor="euFamilyMember.nationality">Aile üyesi uyruğu</label>
        <InputText
          id="euFamilyMember.nationality"
          name="euFamilyMember.nationality"
          value={formik.values.euFamilyMember.nationality}
          onChange={formik.handleChange}
          placeholder="Aile üyesinin uyruğunu giriniz"
        />
      </div>

      <div>
        <label htmlFor="euFamilyMember.documentNumber">
          Aile üyesi belge numarası
        </label>
        <InputText
          id="euFamilyMember.documentNumber"
          name="euFamilyMember.documentNumber"
          value={formik.values.euFamilyMember.documentNumber}
          onChange={formik.handleChange}
          placeholder="Aile üyesinin belge numarasını giriniz"
        />
      </div>

      <div>
        <label htmlFor="euFamilyMember.relationship">
          Aile üyesi ile ilişki
        </label>
        <InputText
          id="euFamilyMember.relationship"
          name="euFamilyMember.relationship"
          value={formik.values.euFamilyMember.relationship}
          onChange={formik.handleChange}
          placeholder="Aile üyesi ile ilişkinizi giriniz"
        />
      </div>

      <h2>Çalışma Hayatı</h2>

      <div>
        <label htmlFor="occupation">Meslek</label>
        <InputText
          id="occupation"
          name="occupation"
          value={formik.values.occupation}
          onChange={formik.handleChange}
          placeholder="Mesleğinizi giriniz"
        />
      </div>

      <div>
        <label htmlFor="employerInfo">İşveren bilgisi</label>
        <InputText
          id="employerInfo"
          name="employerInfo"
          value={formik.values.employerInfo}
          onChange={formik.handleChange}
          placeholder="İşveren bilgilerinizi giriniz"
        />
      </div>

      <h2>Seyahat Planı:</h2>

      <div>
        <label htmlFor="travelPurpose">Seyahat amacı</label>
        <Dropdown
          id="travelPurpose"
          name="travelPurpose"
          value={formik.values.travelPurpose}
          options={travelPurposes.map((purpose) => ({
            label: purpose,
            value: purpose,
          }))}
          onChange={formik.handleChange}
          placeholder="Seyahat amacınızı seçiniz"
        />
      </div>

      <button type="submit">Gönder</button>
    </form>
  );
};

export default SchengenVisaForm;
