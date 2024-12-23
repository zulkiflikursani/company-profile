"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
// Asumsi ResizeImage adalah komponen React yang menangani resize,
// jika tidak, ini mungkin perlu diubah atau dipindahkan ke ekstensi yang tepat
import ResizableImage from "./ResizeImage";
import { useState, useEffect } from "react";

interface TiptapProps {
  initialContent?: string; // optional initial content props
  onChange?: (content: string) => void;
  toolbarPosition?: "top" | "bottom";
}

const Tiptap: React.FC<TiptapProps> = ({
  initialContent = "",
  onChange,
  toolbarPosition = "top",
}) => {
  // State untuk menyimpan konten editor
  const [content, setContent] = useState(initialContent);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  // MODIFIED: Menambahkan state untuk editor
  const [editor, setEditor] = useState<Editor | null>(null);

  // MODIFIED: Fungsi untuk membuka modal
  const handleOpenLinkModal = () => {
    setIsLinkModalOpen(true);
    setLinkUrl("");
  };

  // MODIFIED: Fungsi untuk menutup modal
  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setLinkUrl("");
  };

  // MODIFIED: Fungsi untuk set link
  const handleSetLink = () => {
    if (editor) {
      editor.chain().focus().toggleLink({ href: linkUrl }).run();
      handleCloseLinkModal();
    }
  };
  const editorInstance = useEditor({
    // Mengatur agar render terjadi secara manual untuk kontrol lebih lanjut
    // immediatelyRender: false,
    onBeforeCreate({ editor }) {
      setEditor(editor); // MODIFIED: Inisialisasi editor
    },
    extensions: [
      StarterKit,
      ResizableImage, // Pastikan ResizableImage terimplementasi dengan benar dan berfungsi sebagai Tiptap extension
      Underline,
      Paragraph,
      Heading,
      BulletList,
      Image,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content, // Menggunakan state untuk konten
    // Fungsi untuk menangani perubahan konten editor
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      onChange?.(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  // Effect untuk menginisialisasi content saat pertama kali render
  useEffect(() => {
    if (initialContent && editor) {
      setContent(initialContent);
      (editor as Editor).commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div
      className={`editor border border-primary-light ${
        toolbarPosition === "bottom" ? "flex-col-reverse" : ""
      } flex-col relative`}
    >
      {/* MODIFIED: Modal Sekarang Berada di Dalam Tiptap */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-[9999]">
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
                onClick={handleCloseLinkModal}
              >
                Cancel
              </button>
              <button
                className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-md"
                onClick={handleSetLink}
                disabled={!linkUrl}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODIFIED: Menambahkan props handleOpenLinkModal dan handleSetLink */}
      {toolbarPosition === "top" && (
        <TextEditorMenuBar
          editor={editorInstance}
          handleOpenLinkModal={handleOpenLinkModal}
          handleSetLink={handleSetLink}
        />
      )}
      <div className="overflow-y-auto max-h-[400px]">
        {" "}
        {/* Scrollable container here */}
        <EditorContent
          className="border min-h-[300px] "
          editor={editorInstance}
        />
      </div>
      {toolbarPosition === "bottom" && (
        <TextEditorMenuBar
          editor={editorInstance}
          handleOpenLinkModal={handleOpenLinkModal}
          handleSetLink={handleSetLink}
        />
      )}
    </div>
  );
};

export default Tiptap;
