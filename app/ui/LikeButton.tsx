"use client";
const LikeButton = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("Button Clicked");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default LikeButton;
