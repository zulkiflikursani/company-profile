import React, { ChangeEvent } from "react";

interface FieldEditorProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type?: string;
  rows?: number;
}

const FieldEditor: React.FC<FieldEditorProps> = ({
  label,
  value = "",
  onChange,
  type = "text",
  rows = 1,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2 capitalize"
        htmlFor={label.toLowerCase()}
      >
        {label}:
      </label>
      {type === "textarea" ? (
        <textarea
          id={label.toLowerCase()}
          value={value}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={rows}
        />
      ) : (
        <input
          id={label.toLowerCase()}
          type={type}
          value={value}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  );
};

export default FieldEditor;
