export function useClipboard() {
  const copyToClipboard = async (text: string): Promise<void> => {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not supported");
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      throw error;
    }
  };

  return { copyToClipboard };
}
