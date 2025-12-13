import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, className = "", type = "button", to, variant = "dark", ...props }) {
  // base styles by variant — keep them clean to avoid opposing Tailwind utilities
  const baseDark = "bg-black text-white px-4 py-2 rounded-lg font-semibold border-2 border-black hover:bg-white hover:text-black transition-transform duration-150 active:scale-95";
  const baseLight = "bg-white text-black px-4 py-2 rounded-lg font-semibold border border-neutral-200 hover:bg-neutral-100 hover:shadow-md transition-transform duration-150 active:scale-95"; 
  const classes = `${variant === "light" ? baseLight : baseDark} ${className}`;

  if (to) {
    // render a Link styled as a button when 'to' is provided
    return (
      <Link to={to} {...props} className={classes} role="button">
        {children}
      </Link>
    );
  }

  return (
    <button type={type} {...props} className={classes}>
      {children}
    </button>
  );
}
