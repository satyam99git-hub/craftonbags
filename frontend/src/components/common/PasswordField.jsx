import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  label,
  name,
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-700">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-3 top-3.5 text-zinc-400"
        />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-zinc-300 rounded-xl py-3 pl-10 pr-12 text-sm outline-none focus:border-black"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 text-zinc-500"
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;