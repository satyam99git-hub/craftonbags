import React from "react";

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-3.5 text-zinc-400"
          />
        )}

        <input
          type={type}
          {...props}
          className="w-full border border-zinc-300 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-black transition-all"
        />
      </div>
    </div>
  );
};

export default InputField;