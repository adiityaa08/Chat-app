import React from "react";
import { AuroraBackground } from "./ui/aurora-backgound";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
      <AuroraBackground>
       <h2 className="text-2xl font-bold mb-4">{title}</h2>
       <p className="text-base-content/60">{subtitle}</p>
      </AuroraBackground>
  );
};

export default AuthImagePattern;