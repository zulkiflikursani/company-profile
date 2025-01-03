import React, { useState } from "react";
import FieldEditor from "./FieldEditor";

interface Pengurus {
  img: string;
  name: string;
  position: string;
}

interface PengurusArrayEditorWithImageProps {
  label: string;
  title: string;
  onTitleChange: (title: string) => void;
  items: Pengurus[];
  onItemsChange: (items: Pengurus[]) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  renderItem: (
    item: Pengurus,
    index: number,
    onChange: (index: number, updatedItem: Pengurus) => void
  ) => React.ReactNode;
}

const PengurusArrayEditorWithImage: React.FC<
  PengurusArrayEditorWithImageProps
> = ({ items, onItemsChange, title, addItem, removeItem, renderItem }) => {
  const [titleInput, setTitleInput] = useState(title);

  const handleTitleInputChange = (value: string) => {
    setTitleInput(value);
  };

  return (
    <div>
      <div className="p-4">
        <FieldEditor
          label="Title"
          value={titleInput}
          onChange={handleTitleInputChange}
        />
      </div>

      {items.map((item, index) => (
        <div key={index} className="border p-4 rounded-md my-2">
          {renderItem(item, index, (index, updatedItem) => {
            const newItems = items.map((item, i) =>
              i === index ? updatedItem : item
            );
            onItemsChange(newItems);
          })}
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Hapus
          </button>
        </div>
      ))}
      <div className="border p-4 rounded-md my-2">
        <h3 className="text-lg font-semibold mb-2">Tambah Pengurus Baru</h3>
        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Tambah
        </button>
      </div>
    </div>
  );
};

export default PengurusArrayEditorWithImage;
