import Link from "next/link";

function page() {
  return (
    <div className=" w-screen flex justify-center items-center h-screen">
      <Link
        className=" px-6 py-3 border-2 border-indigo-600 m-auto"
        href="/msg"
      >
        Go To Customer Support
      </Link>
    </div>
  );
}

export default page;
