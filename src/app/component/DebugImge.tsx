import { Node, mergeAttributes } from "@tiptap/core";

const DebugImage = Node.create({
  name: "debugImage",

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ node }) => {
      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.style.cursor = "pointer";

      img.addEventListener("mousedown", () => {
        console.log("Mouse Down on Image!");
      });

      return {
        dom: img,
      };
    };
  },
});

export default DebugImage;
