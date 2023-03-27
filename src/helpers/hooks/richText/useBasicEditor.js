import { useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";

// import { useMention } from "./useMention";

export const useBasicEditor = ({
  size,
  placeholder,
  limit = 1000,
  extensions = [],
  keyboardShortcuts = [],
  props = {},
} = {}) => {
  // const { extension: mentionExtension } = useMention();
  let ParagraphExtended = Paragraph.configure({
    HTMLAttributes: {
      class: "basic-editor-paragraph",
    },
  });
  if (keyboardShortcuts.length) {
    ParagraphExtended = ParagraphExtended.extend({
      addKeyboardShortcuts() {
        const map = {};
        keyboardShortcuts
          .filter((shortcut) => shortcut.key && shortcut.handler)
          .forEach((shortcut) => {
            map[shortcut.key] = () => shortcut.handler(this.editor);
          });
        return map;
      },
    });
  }

  const editor = useEditor({
    extensions: [
      Document,
      ParagraphExtended,
      Text,
      Link.configure({
        protocols: [{ scheme: "farcaster", optionalSlashes: true }],
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "basic-editor-rich-link",
        },
        openOnClick: false,
      }),
      History,
      HardBreak,
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
      CharacterCount.configure({
        limit: parseInt(limit, 10),
      }),
      // mentionExtension,
      ...extensions,
    ],
    content: null,
    ...props,
    editorProps: {
      attributes: {
        class: size === "lg" ? "basic-editor lg" : "basic-editor",
      },
    },
  });

  const setContent = (content) => {
    if (!editor || !content) return;
    editor?.commands?.setContent?.(content);
  };
  const getContent = () => {
    const json = JSON.stringify(editor.getJSON());
    const html = editor.getHTML();
    const raw = editor.getText();
    return { json, html, raw };
  };

  return {
    setContent,
    getContent,
    editor,
  };
};
