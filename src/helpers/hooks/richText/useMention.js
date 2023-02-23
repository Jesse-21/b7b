import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";
import Mention from "@tiptap/extension-mention";

import { MentionList } from "../../../components/richText/MentionList";

import { useAccountSearch } from "../graphql/useAccountSearch";

export const useMention = () => {
  const { searchAccountByUsername, loading, error } = useAccountSearch();

  let component;
  let popup;

  const suggestion = {
    items: async ({ query }) => {
      const res = await searchAccountByUsername(query);
      return res.data?.SearchQuery?.searchAccountByUsernameOrAddressOrEns || [];
    },
    render: () => {
      return {
        onStart: (props = {}) => {
          component = new ReactRenderer(MentionList, {
            props: {
              ...props,
              loading: loading,
              error: error,
            },
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props?.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },
        onUpdate(props = {}) {
          component?.updateProps(props);

          popup?.[0]?.setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props = {}) {
          if (props.event?.key === "Escape") {
            popup?.[0]?.hide();

            return true;
          }

          return component?.ref?.onKeyDown(props);
        },

        onExit() {
          popup?.[0]?.destroy();
          component?.destroy();
        },
      };
    },
  };
  const extension = Mention.extend({
    addCommands: () => {
      return {
        destroyMenton: () => () => {
          return popup?.[0]?.hide?.();
        },
      };
    },
  });

  const extendedExtension = extension.configure({
    HTMLAttributes: {
      class: "basic-editor-mention",
    },
    suggestion,
    renderLabel({ options, node }) {
      return `${options?.suggestion?.char}${
        node?.attrs?.label ?? node?.attrs?.id
      }`;
    },
  });

  return {
    extension: extendedExtension,
  };
};
