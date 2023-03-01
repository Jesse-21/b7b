import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";

/**
 * Custom TipTap Extension for inserting images on paste and drop
 * @returns {TipTapPlugin} extension
 */
export const useDropPasteImage = (upload) => {
  const DropPasteImage = Extension.create({
    name: "drop-paste-image",
    schema: {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
      },
      group: "inline",
      draggable: true,
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs: (dom) => ({
            src: dom.getAttribute("src"),
            title: dom.getAttribute("title"),
            alt: dom.getAttribute("alt"),
          }),
        },
      ],
      toDOM: (node) => ["img", node.attrs],
    },
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("eventHandler"),
          props: {
            handleDOMEvents: {
              paste(view, event) {
                const items = (
                  event.clipboardData || event.originalEvent.clipboardData
                ).items;
                const type = items?.[0]?.type;
                if (!type) return false;

                if (type.indexOf("image") === 0) {
                  event.preventDefault();
                  const image = items[0].getAsFile();

                  upload?.(image);
                } else if (type.indexOf("text/html") === 0) {
                  items[0].getAsString((s) => {
                    if (s) {
                      try {
                        const parent = document.createElement("div");
                        parent.innerHTML = s;
                        const tmpImg = parent?.querySelector("img");
                        const src = tmpImg?.getAttribute?.("src");
                        if (!src) return false;
                        event.preventDefault();
                        upload?.(src);
                      } catch (e) {
                        // @TODO do something with error pasting image
                      }
                    }
                  });
                }
                return false;
              },
            },
          },
        }),
      ];
    },
  });

  return {
    extension: DropPasteImage,
  };
};
