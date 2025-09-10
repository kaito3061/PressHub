import { useState } from "react";

const useSaveArticle = (title: string, content: string) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveArticle = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/press-releases/new`, {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return { saveArticle, isSaving };
};
export default useSaveArticle;
