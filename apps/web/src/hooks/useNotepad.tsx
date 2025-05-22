import { useEffect, useState } from "react";

type useNotepadParams = {
  initialContent: string;
  onSave: (content: string) => void;
};

const useNotepad = ({ initialContent, onSave }: useNotepadParams) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        onSave(content);
        setContent(initialContent);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content, onSave, initialContent]);

  return { content, setContent };
};

export default useNotepad;
