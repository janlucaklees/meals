import React from "react";

type Props = {
  label: string;
};

export const Button: React.FC<Props> = ({ label }) => {
  return (
    <button
      type="button"
      className="px-4 h-10 cursor-pointer rounded-lg bg-lime-500 border-gray-400 border text-sm flex items-center justify-center shadow-md shadow-gray-400 active:shadow-none active:scale-99 transition"
    >
      {label}
    </button>
  );
};
