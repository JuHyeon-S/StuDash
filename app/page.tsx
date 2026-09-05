"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="text-center w-full text-white h-screen">
        <p className="text-2xl">Move to Dashboard</p>
        <Link
          href={"/dashboard"}
          className="bg-gray-400 text-black p-3  rounded-md"
        >
          Dashboard
        </Link>
      </div>
    </>
  );
}
