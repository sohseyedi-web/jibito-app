import { toast } from "vue-sonner";

export function showToast(type: "error" | "success", message: string) {
  toast[type](message, {
    duration: 2000,
    style: {
      padding: "1rem",
      fontSize: "1.1rem",
      direction:"rtl"
    },
  });
}
