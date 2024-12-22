import { Node, mergeAttributes } from "@tiptap/core";

const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: "auto" },
      height: { default: "auto" },
      align: { default: "left" },
    };
  },
  parseHTML() {
    return [{ tag: "img[src]" }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return [
      "div",
      mergeAttributes({
        class: "outer-resizable-image-container",
        style: `display: block; position: relative; width: 100%; text-align: ${
          node.attrs.align || ""
        }; margin: ${node.attrs.align === "center" ? "auto" : ""}`,
      }),
      [
        "div",
        mergeAttributes({
          class: "resizable-image-container",
          style: `display: inline-block; position: relative;`,
        }),
        [
          "img",
          mergeAttributes({
            src: HTMLAttributes.src,
            alt: HTMLAttributes.alt,
            width: HTMLAttributes.width,
            height: HTMLAttributes.height,
          }),
        ],
      ],
    ];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.style.width = node.attrs.width;
      img.style.height = node.attrs.height;

      const container = document.createElement("div");
      container.className = "resizable-image-container";
      container.style.display = "inline-block";
      container.style.position = "relative";
      container.appendChild(img);

      const container2 = document.createElement("div");
      container2.className = "outer-resizable-image-container";
      container2.style.display = "block";
      container2.style.position = "relative";
      container2.style.width = "100%";
      container2.style.textAlign = node.attrs.align;
      container2.style.marginLeft = node.attrs.align === "center" ? "auto" : "";
      container2.style.marginRight =
        node.attrs.align === "center" ? "auto" : "";
      container2.appendChild(container);

      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      resizeHandle.style.position = "absolute";
      resizeHandle.style.right = "0px";
      resizeHandle.style.bottom = "0px";
      resizeHandle.style.width = "10px";
      resizeHandle.style.height = "10px";
      resizeHandle.style.cursor = "se-resize";
      resizeHandle.style.backgroundColor = "blue";
      container.appendChild(resizeHandle);

      // Tambahkan tombol hapus
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "x";
      deleteButton.className =
        "delete-button bg-primary-light text-gray-100 rounded-full w-6 h-6 flex items-center justify-center";
      deleteButton.style.position = "absolute";
      deleteButton.style.top = "0px";
      deleteButton.style.right = "0px";
      deleteButton.style.cursor = "pointer";

      container.appendChild(deleteButton);

      let isResizing = false;
      let startX = 0;
      let startY = 0;
      let startWidth = 0;
      let startHeight = 0;
      let aspectRatio = 1;

      const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        startX = event.clientX;
        startY = event.clientY;
        const rect = container.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        aspectRatio = startWidth / startHeight;

        isResizing = true;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (isResizing) {
          const diffX = event.clientX - startX;
          const diffY = event.clientY - startY;
          const newWidth = Math.max(10, startWidth + diffX);
          let newHeight = Math.max(10, startHeight + diffY);

          newHeight = newWidth / aspectRatio;

          container.style.width = `${newWidth}px`;
          container.style.height = `${newHeight}px`;

          if (getPos) {
            const transaction = editor.state.tr.setNodeMarkup(
              getPos(),
              undefined,
              {
                ...node.attrs,
                width: `${newWidth}px`,
                height: `${newHeight}px`,
              }
            );
            editor.view.dispatch(transaction);
          }
        }
      };

      const handleMouseUp = () => {
        isResizing = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      const handleDelete = () => {
        const pos = getPos();
        editor.commands.deleteRange({ from: pos, to: pos + 1 });
      };

      resizeHandle.addEventListener("mousedown", handleMouseDown);
      deleteButton.addEventListener("click", handleDelete);

      return {
        dom: container2,
        update: (updatedNode) => {
          img.src = updatedNode.attrs.src;
          img.alt = updatedNode.attrs.alt || "";
          img.style.width = updatedNode.attrs.width;
          img.style.height = updatedNode.attrs.height;
          node = updatedNode;
          container2.style.textAlign = node.attrs.align;
          container2.style.marginLeft =
            node.attrs.align === "center" ? "auto" : "";
          container2.style.marginRight =
            node.attrs.align === "center" ? "auto" : "";
          return true;
        },
        destroy: () => {
          resizeHandle.removeEventListener("mousedown", handleMouseDown);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          deleteButton.removeEventListener("click", handleDelete);
        },
      };
    };
  },
});

export default ResizableImage;
