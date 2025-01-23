import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Alert(
  title,
  text,
  icon,
  confirmButtonText,
  cancelButtonText
) {
  const { t } = useTranslation();

  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText || t("input.ok"),
    cancelButtonText: cancelButtonText || t("input.ok"),
  });
}
