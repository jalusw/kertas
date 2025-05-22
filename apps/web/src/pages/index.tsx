import { type FC } from "react";
import Editor from "../components/editor";
import useNotesStore from "../stores/useNotesStore";
import useNotepad from "../hooks/useNotepad";

const defaultContents = ["<h1>Write your note here...</h1>"];

const Index: FC = () => {
  const { add } = useNotesStore();
  const { content, setContent } = useNotepad({
    initialContent: defaultContents[0],
    onSave: (content) => {
      add({
        id: crypto.randomUUID(),
        title: `Note ${new Date().toLocaleString()}`,
        archived: false,
        bookmarked: false,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  });
  return (
    <div className="w-full py-20">
      <Editor content={content} onEditCallback={setContent} />
    </div>
  );
};

export default Index;
