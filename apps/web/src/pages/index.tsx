import { type FC } from "react";
import Editor from "../components/editor";
import useNotesStore from "../stores/useNotesStore";
import useNotepad from "../hooks/useNotepad";
import { useNavigate } from "react-router";

const defaultContents = ["<h1>Write your note here...</h1>"];

const Index: FC = () => {
  const { add } = useNotesStore();
  const navigate = useNavigate();
  const { content, setContent } = useNotepad({
    initialContent: defaultContents[0],
    onSave: (content) => {
      const id = crypto.randomUUID();
      add({
        id,
        title: `Note ${new Date().toLocaleString()}`,
        archived: false,
        bookmarked: false,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate(`/${id}`);
    },
  });
  return (
    <div className="w-full py-20">
      <Editor content={content} onEditCallback={setContent} />
    </div>
  );
};

export default Index;
