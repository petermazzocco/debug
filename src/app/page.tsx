import Link from "next/link";
import Image from "next/image";
import bug from "../app/public/img/bug.svg";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="hero min-h-screen bg-base">
        <div className="hero-content text-center">
          <div className="max-w-md grid justify-center place-items-center">
            <div className="flex flex-row">
              <h1 className="text-5xl font-bold flex flex-row">
                debug.{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bug-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z" />
                  <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z" />
                </svg>
              </h1>
            </div>
            <p className="py-6">
              Activities to help debug the brain, improve mental health, and
              earn rewards for relieving anxiety.
            </p>
            <Link href="/activities">
              <button className="btn btn-accent btn-sm">Open Activities</button>
            </Link>
            <div className="mt-10 flex flex-row space-x-10">
              <button className="btn btn-sm btn-link text-secondary">
                About
              </button>
              <button className="btn btn-sm btn-link text-secondary">
                FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
