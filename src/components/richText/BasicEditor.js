import { EditorContent } from "@tiptap/react";

/** Editor with link and mention */
export const BasicEditor = ({ editor, id }) => {
  return (
    <>
      <EditorContent editor={editor} id={id} />
    </>
  );
};
