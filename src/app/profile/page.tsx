import ClaimTokens from "./ProfileTable";

export default function Page() {
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold text-center">debug.profile</h2>
      <div className="grid justify-center items-center">
        <ClaimTokens />
      </div>
    </div>
  );
}
