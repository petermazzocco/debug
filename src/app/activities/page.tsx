import activities from "../lib/activities";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold text-center">debug.activities</h2>
      <div className="grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-24 m-24 justify-center place-items-center">
        {activities.map((activity, i) => (
          <div key={i} className="card col-span-1 w-96 bg-neutral shadow-xl">
            <figure>
              <Image
                src={activity.image}
                alt={activity.name}
                width={384}
                height={288}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{activity.name}</h2>
              <p>{activity.bio}</p>
              <div className="card-actions justify-end">
                <Link href={activity.link}>
                  <button className="btn btn-accent btn-sm">Open</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
