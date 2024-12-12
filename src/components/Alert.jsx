import Swal from "sweetalert2";

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
    confirmButtonText: confirmButtonText || "Tamam",
    cancelButtonText: cancelButtonText || "Tamam",
  });
}
