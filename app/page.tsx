import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello World!! Blog Page <Link href={"/blogs"}>Blogs</Link>
    </div>
  );
}
