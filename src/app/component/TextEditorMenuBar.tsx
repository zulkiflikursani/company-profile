// TextEditorMenuBar.tsx
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiListOrdered2,
} from "react-icons/ri";
import { Editor } from "@tiptap/react";
import { AiOutlinePicture, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { BsTypeUnderline } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiLink,
} from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ButtonConfig {
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  value?: string;
}

const Button = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 ${isActive ? "bg-violet-500 text-white rounded-md" : ""}`}
  >
    {children}
  </button>
);

export default function TextEditorMenuBar({
  editor,
  handleOpenLinkModal, // MODIFIED: Terima props handleSetLink
}: {
  editor: Editor | null;
  handleOpenLinkModal: () => void;
  handleSetLink: (editor: Editor) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const uploadImage = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace with your API endpoint or upload logic
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText} - ${message}`
        );
      }
      const result = await response.json();

      setLoading(false);
      return {
        url: result.url,
        name: result.nama,
      };
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
    setLinkUrl("");
  };
  const setLink = () => {
    if (editor) {
      editor.chain().focus().toggleLink({ href: linkUrl }).run();
      closeLinkModal();
    }
  };

  const checkImageAlignment = (align: string) => {
    if (!editor) return false;
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node?.type.name === "div" && node.attrs.style) {
      const styleString = node.attrs.style as string;
      return styleString.includes(`text-align: ${align};`);
    }
    return false;
  };

  // async function waitForImageLoad(url: string) {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => resolve(url);
  //     img.onerror = () => {
  //       setTimeout(() => {
  //         // Retry if loading fails after delay.
  //         waitForImageLoad(url).then(resolve).catch(reject);
  //       }, 1000);
  //     };
  //     img.src = url;
  //   });
  // }

  const buttons: ButtonConfig[] = [
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive("bold") ?? false,
      disabled: !editor,
    },
    {
      icon: <BsTypeUnderline className="size-5" />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: editor?.isActive("underline") ?? false,
      disabled: !editor,
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive("italic") ?? false,
      disabled: !editor,
    },
    {
      icon: <RiStrikethrough className="size-5" />,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editor?.isActive("strike") ?? false,
      disabled: !editor,
    },
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isActive: editor?.isActive("code") ?? false,
      disabled: !editor,
    },
    {
      icon: <FiAlignLeft className="size-5" />,
      onClick: () => editor?.chain().focus().setTextAlign("left").run(),
      isActive: editor?.isActive({ textAlign: "left" }) ?? false,
      disabled: !editor,
    },
    {
      icon: <FiAlignRight className="size-5" />,
      onClick: () => editor?.chain().focus().setTextAlign("right").run(),
      isActive: editor?.isActive({ textAlign: "right" }) ?? false,
      disabled: !editor,
    },
    {
      icon: <FiAlignCenter className="size-5" />,
      onClick: () => editor?.chain().focus().setTextAlign("center").run(),
      isActive: editor?.isActive({ textAlign: "center" }) ?? false,
      disabled: !editor,
    },
    {
      icon: <FiAlignJustify className="size-5" />,
      onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
      isActive: editor?.isActive({ textAlign: "justify" }) ?? false,
      disabled: !editor,
    },
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList") ?? false,
      disabled: !editor,
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList") ?? false,
      disabled: !editor,
    },
    {
      icon: <AiOutlineUndo className="size-5" />,
      onClick: () => editor?.chain().focus().undo().run(),
      isActive: editor?.isActive("undo") ?? false,
      disabled: !editor,
    },
    {
      icon: <AiOutlineRedo className="size-5" />,
      onClick: () => editor?.chain().focus().redo().run(),
      isActive: editor?.isActive("redo") ?? false,
      disabled: !editor,
    },
    {
      icon: <AiOutlinePicture className="size-5" />,
      onClick: async () => {
        if (loading) {
          return;
        }
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            try {
              const url = await uploadImage(file);
              console.log("Image Upload success");
              if (url) {
                const apiImage = ("/api/imageview/?imageName=" +
                  url?.name +
                  `&cache=${Date.now()}`) as string;
                console.log("apiImage Before Set to Editor:", apiImage);
                // const finalUrl = await waitForImageLoad(url.url);
                editor
                  ?.chain()
                  .focus()
                  .insertContent({
                    type: "resizableImage",
                    attrs: { src: apiImage },
                  })
                  .run();
              }
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }
        };
        input.click();
      },
      isActive: editor?.isActive("image") ?? false,
      disabled: !editor || !editor.commands?.setImage,
    },
    {
      icon: <FiAlignLeft className="size-5" />,
      onClick: () => {
        if (editor) {
          alignImage("left", editor);
        }
      },
      isActive: checkImageAlignment("left"),
      disabled: !editor,
    },
    {
      icon: <FiAlignCenter className="size-5" />,
      onClick: () => {
        if (editor) {
          alignImage("center", editor);
        }
      },
      isActive: checkImageAlignment("center"),
      disabled: !editor,
    },
    {
      icon: <FiAlignRight className="size-5" />,
      onClick: () => {
        if (editor) {
          alignImage("right", editor);
        }
      },
      isActive: checkImageAlignment("right"),
      disabled: !editor,
    },
    {
      icon: <FiLink className="size-5" />,
      onClick: () => handleOpenLinkModal(),
      isActive: editor?.isActive("link") ?? false,
      disabled: !editor,
    },
  ];
  const alignImage = (align: string, editor: Editor) => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node?.type.name === "resizableImage") {
      editor
        .chain()
        .focus()
        .updateAttributes("resizableImage", { align })
        .run();
    } else {
      // If the node type is not resizableImage
      const parent = editor.state.doc.resolve(from).parent;
      if (parent && parent.type.name === "paragraph") {
        editor
          .chain()
          .focus()
          .setNode("paragraph", { style: `text-align: ${align};` })
          .run();
      }
    }
  };
  return (
    <>
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative p-8 bg-white rounded-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Insert Link</h2>
            <input
              type="text"
              placeholder="Enter URL"
              className="w-full p-2 border rounded-md mb-4"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                onClick={closeLinkModal}
              >
                Cancel
              </button>
              <button
                className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-md"
                onClick={setLink}
                disabled={!linkUrl}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-2 flex space-x-2">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <Button
            key={index}
            onClick={onClick}
            isActive={isActive}
            disabled={disabled}
          >
            {icon}
          </Button>
        ))}
      </div>
    </>
  );
}
