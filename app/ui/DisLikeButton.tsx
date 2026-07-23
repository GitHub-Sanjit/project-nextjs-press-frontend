"use client";

const DisLikeButton = ({ blogSlug }: { blogSlug: string }) => {
  return (
    <button
      onClick={() => {
        console.log(`Dislike Buttong Clicked For Blog ${blogSlug}`);
      }}
    >
      Dislike : {blogSlug}
    </button>
  );
};

export default DisLikeButton;
