import React, { ChangeEventHandler } from "react";

interface InputProps {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-md
            dark:text-white text-themeDark
            dark:bg-neutral-700 bg-themeLight
            appearance-none
            focus:outline-none
            focus:ring-0
            peer
            invalid:border-b-1
            transition duration-500
        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
            absolute 
            text-md
            text-zinc-400
            duration-150 
            transform 
            -translate-y-3 
            scale-75 
            top-4 
            z-10 
            origin-[0] 
            left-6
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-3
        "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
