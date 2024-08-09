import MapView from "@/components/MapView";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen justify-between overflow-hidden">
        <MapView />
      </div>
    </>
  );
}
