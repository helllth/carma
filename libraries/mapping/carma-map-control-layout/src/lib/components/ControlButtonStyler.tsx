import React, { CSSProperties, ReactNode } from "react";

interface ControlButtonStylerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
  singleButtonClick?: () => void;
}

const ControlButtonStyler: React.FC<ControlButtonStylerProps> = ({
  children,
  width = "34px",
  height = "34px",
  fontSize = "18px",
  singleButtonClick = () => {},
  ...props
}) => {
  const iconPadding = {
    backgroundColor: "#fff",
    border: "2px solid rgba(0, 0, 0, .3)",
    borderRadius: "4px",
    width,
    height,
    textAlign: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize,
    // fontWeight: 700,
  } as CSSProperties;
  return (
    <button
      className="text-center flex flex-col text-red-500 justify-center items-center w-60 h-60"
      onClick={singleButtonClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ControlButtonStyler;
