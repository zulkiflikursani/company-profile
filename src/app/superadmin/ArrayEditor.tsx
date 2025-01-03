import React from "react";
// import FieldEditor from './FieldEditor';

interface ArrayEditorProps<T> {
  label: string;
  items: T[];
  onItemsChange: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    onChange: (index: number, updatedItem: T) => void
  ) => React.ReactNode;
  addItem: () => void;
  removeItem: (index: number) => void;
}

const ArrayEditor = <T,>({
  label,
  items,
  onItemsChange,
  renderItem,
  addItem,
  removeItem,
}: ArrayEditorProps<T>) => {
  const handleItemChange = (index: number, updatedItem: T) => {
    const newItems = items.map((item, i) => (i === index ? updatedItem : item));
    onItemsChange(newItems);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 capitalize">{label}</h3>
      {items.map((item, index) => (
        <div key={index} className="border p-4 rounded-md my-2">
          {renderItem(item, index, handleItemChange)}
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Hapus
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Tambah Item
      </button>
    </div>
  );
};

export default ArrayEditor;
