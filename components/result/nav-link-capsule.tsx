import React from "react";

interface Props {
  href: string;
  label : string;
  isActive : boolean;
}

const NavCapsule: React.FC<Props> = ({ href, label ,isActive = false }) => {
  return (
    <a
      href={href}
      className={`w-full ${isActive ? 'bg-green-300' : 'bg-white'} rounded-lg text-black text-center p-2 font-semibold text-xl`}
    >
      {label}
    </a>
  );
};

export default NavCapsule;
