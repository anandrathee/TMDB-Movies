import React, { useState } from "react";

const Button = ({ text, text2, handleBtn, type = "toggle" }) => {
  // Type 1: Toggle Button (Trending aur FreeToWatch ke liye)
  if (type === "toggle") {
    const [istrue, setIsTrue] = useState(false);
    
    const handleClick = () => {
      setIsTrue(!istrue);
      // Handle different cases properly
      if (istrue) {
        handleBtn(text);  // Text 1 (left side) - Movies/Day
      } else {
        handleBtn(text2); // Text 2 (right side) - TV Shows/Week
      }
    };
    
    return (
      <div 
        onClick={handleClick}
        className="border border-white rounded-full flex items-center justify-between w-50 h-8 px-4 relative cursor-pointer select-none"
      >
        <div
          className={`bg-zinc-600 text-[#64E6B9] font-semibold flex items-center justify-center w-24 left-1 h-6 rounded-full absolute transition-all duration-200 ${istrue ? "translate-x-full" : ""}`}
        >
         
        </div>
        <span className="font-semibold text-white z-10 ml-3">
          {text}
        </span>
        <span className="font-semibold text-white z-10">
          {text2}
        </span>
      </div>
    );
  }

  // Type 2: Multiple Buttons (Latest Trailers ke liye)
  if (type === "multiple") {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const handleButtonClick = (index, btnText) => {
      setActiveIndex(index);
      handleBtn(btnText);
    };
    
    return (
      <div className="flex items-center gap-3">
        {text.map((btnText, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index, btnText)}
            className={`border border-white rounded-full h-8 px-4 transition-all duration-200 font-semibold text-sm capitalize ${
              activeIndex === index 
                ? 'bg-white text-zinc-900' 
                : 'bg-transparent text-white hover:bg-white/10'
            }`}
          >
            {btnText}
          </button>
        ))}
      </div>
    );
  }
  
  return null;
};

export default Button;