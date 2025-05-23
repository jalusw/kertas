import { useEffect, useState, type FC } from "react";
import useNotesStore from "../stores/useNotesStore";
import { useNavigate, useParams } from "react-router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const useNotepad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, add, update } = useNotesStore();
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-full md:max-w-screen-sm  box-border mx-auto ",
      },
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        const content = editor?.getHTML();

        if (id) {
          const note = notes.find((note) => note.id === id);
          if (note) {
            update(id, {
              ...note,
              content: content ?? "",
              updatedAt: new Date(),
            });
          }
          return;
        }
        const uid = crypto.randomUUID();
        const title = `Note${new Date().toLocaleString()}`;
        add({
          id: uid,
          title,
          content: content ?? "",
          archived: false,
          bookmarked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        navigate(`/${uid}`);
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "n") {
        event.preventDefault();
        add({
          id: crypto.randomUUID(),
          title: `Note ${new Date().toLocaleString()}`,
          content,
          archived: false,
          bookmarked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        navigate(`/${id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content, add, navigate, editor, id, update, notes]);

  useEffect(() => {
    if (!id) {
      setContent("");
      editor?.commands.setContent("");
      editor?.commands.focus();
      return;
    }

    const note = notes.find((note) => note.id === id);
    if (!note) {
      navigate("/");
      return;
    }

    if (note) {
      editor?.commands.setContent(note.content);
      editor?.commands.focus();
    }
  }, [id, notes, navigate, editor]);

  useEffect(() => {
    editor?.commands.focus();
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        setContent(editor.getHTML());
      });
    }
  }, [editor]);

  return { content, setContent, editor };
};

const Index: FC = () => {
  return (
    <div className="w-full py-20">
      <div className="max-w-screen-md mx-auto">
        <EditorContainer />
      </div>
    </div>
  );
};

const EditorContainer: FC = () => {
  const { editor } = useNotepad();
  return (
    <div className="max-w-screen-md mx-auto">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Index;
