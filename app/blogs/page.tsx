const BlogsPage = async () => {
  const post = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postData = await post.json();
  console.log(postData);
  return <div>Blogs Page</div>;
};

export default BlogsPage;