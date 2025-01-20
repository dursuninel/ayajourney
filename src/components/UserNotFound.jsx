import Alert from "./Alert";

export default function UserNotFound() {
  Alert(
    "Başarısız",
    "Kullanıcı bilginiz alınamadı, Lüften hesabınıza tekrar giriş yapıp deneyiniz",
    "error"
  );
}
