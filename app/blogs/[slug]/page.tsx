import React from "react";
import DisLikeButton from "./../../ui/DisLikeButton";

const BlogsSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      BlogsSlugPage : {slug}
      <DisLikeButton blogSlug={slug}></DisLikeButton>
    </div>
  );
};

export default BlogsSlugPage;
