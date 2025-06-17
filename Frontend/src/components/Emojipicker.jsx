import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerButton = ({ onEmojiClick }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle on click and close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowPicker((prev) => !prev)}
        className="btn btn-circle w-8 h-8 sm:w-9 sm:h-9 text-yellow-400"
      >
        😊
      </button>

      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-12 left-0 z-50 bg-white rounded shadow-lg overflow-hidden"
          style={{ width: "350px", height: "220px" }}
        >
          <EmojiPicker
            onEmojiClick={(emoji, event) => onEmojiClick(emoji, event)}
            previewConfig={{ showPreview: false }}
            skinTonesDisabled
            searchDisabled
            height="100%"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
