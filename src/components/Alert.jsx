import Swal from "sweetalert2";
import { t } from "i18next";

export default function Alert(
  title,
  text,
  icon,
  confirmButtonText,
  cancelButtonText
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText || t("input.ok"),
    cancelButtonText: cancelButtonText || t("input.ok"),
  });
}
