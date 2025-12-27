import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/grid/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto h-[200px] ">
      <div className="bg-purple-300 md:row-span-2 rounded-xl p-4">1</div>
      <div className="bg-pink-400 md:col-span-2 rounded-xl p-4">2</div>
      <div className="bg-green-400 rounded-xl p-4">3</div>
      <div className="bg-yellow-300 rounded-xl p-4">4</div>
      <div className="bg-orange-400 md:col-span-2 rounded-xl p-4">5</div>
      <div className="bg-blue-400 rounded-xl p-4">6</div>
    </div>
  );
}
