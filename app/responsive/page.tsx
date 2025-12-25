import React from "react";

function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[100px] md:h-[200px]">
      <div className="bg-red-500 rounded-xl p-4">
        <p className="text-tiny">1</p>
        <p className="text-small">2</p>
        <p className="text-base">3</p>
        <p className="text-giant">4</p>
      </div>
      <div className="bg-green-500 rounded-xl p-spacing-2xl">2</div>
      <div className="bg-blue-500 rounded-xl p-4">3</div>
      <div className="bg-yellow-500 rounded-xl p-4">4</div>
    </div>
  );
}

export default BentoGrid;
