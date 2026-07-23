import Link from "next/link";
import LikeButton from "./ui/LikeButton";

export default function Home() {
  return (
    <div>
      Hello World!! Blog Page <Link href={"/blogs"}>Blogs</Link>
      <LikeButton />
    </div>
  );
}
