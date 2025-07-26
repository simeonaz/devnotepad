import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();

export function useClipboard() {
  const copyToClipboard = async (text: string): Promise<void> => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported", {
        position: "bottom-right",
        duration: 3000,
      });
      throw new Error("Clipboard API not supported");
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied to clipboard!", {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      toast.error("Failed to copy text to clipboard", {
        position: "bottom-right",
        duration: 3000,
      });
      throw error;
    }
  };

  return { copyToClipboard };
}
