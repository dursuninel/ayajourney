export default function FormatUserName(fullname) {
  if (!fullname) return ""; // Boş veri kontrolü

  const parts = fullname.trim().split(" ");
  const lastNameInitial = parts[parts.length - 1][0].toUpperCase() + "."; // Soyadın ilk harfi

  if (parts.length === 1) {
    return parts[0]; // Tek bir isim varsa onu döndür
  }

  const rest = parts.slice(0, -1).join(" "); // Soyad haricindeki kısım
  return `${rest} ${lastNameInitial}`;
}
