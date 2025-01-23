import { useTranslation } from "react-i18next";
import Alert from "./Alert";

export default function UserNotFound() {
  const { t } = useTranslation();

  return Alert(t("swal.error"), t("swal.userNotFound"), "error");
}
