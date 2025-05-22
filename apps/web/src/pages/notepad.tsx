import type { FC } from "react";
import { useParams, useNavigate } from "react-router";
import useNotesStore from "../stores/useNotesStore";
import Editor from "../components/editor";
import useNotepad from "../hooks/useNotepad";

const Notepad: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, update } = useNotesStore();
  const { content, setContent } = useNotepad({
    initialContent: notes.find((note) => note.id === id)?.content || "",
    onSave: (content) => {
      if (id) {
        const note = notes.find((note) => note.id === id);
        if (note) {
          update(id, { ...note, content });
        }
      }
    },
  });

  const note = notes.find((note) => note.id === id);

  if (!note) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex-1">
      <div className="max-w-screen-md mx-auto py-20">
        <Editor content={content} onEditCallback={setContent} />
      </div>
    </div>
  );
};

export default Notepad;
