import { type FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

type EditorProps = {
  content: string;
  onEditCallback: (content: string) => void;
};

const extensions = [
  Document,
  Heading,
  Text,
  Bold,
  Italic,
  HorizontalRule,
  ListItem,
  Paragraph,
];

const Editor: FC<EditorProps> = ({ content, onEditCallback }) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onEditCallback(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-screen-sm md:max-w-screen-md  box-border mx-auto ",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
