import React from "react";

function BentoGrid() {
  return (
    <div className="p-4 max-w-5xl mx-auto min-h-screen">
      {/* --- PARENT (À configurer en Grid) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 md:h-[650px]">
        {/* BLOC 1 : VIOLET - Customization */}
        <div className="bg-purple-200 text-purple-900 p-6 rounded-3xl flex flex-col justify-between md:row-span-2">
          <h2 className="text-2xl font-bold">Customization</h2>
          <p className="text-sm">
            Use a pre-designed template or personalize...
          </p>
        </div>

        {/* BLOC 2 : ROSE - Scheduling */}
        <div className="bg-pink-200 text-pink-900 p-6 rounded-3xl md:col-span-2">
          <h2 className="text-2xl font-bold">Scheduling</h2>
          <p className="text-sm">Schedule all your cards and gifts now...</p>
        </div>

        {/* BLOC 3 : VERT - Wallet */}
        <div className="bg-green-100 text-green-900 p-6 rounded-3xl">
          <h2 className="text-xl font-bold">Wallet</h2>
          <p className="text-sm">Access all your gifts...</p>
        </div>

        {/* BLOC 4 : JAUNE - Inbox */}
        <div className="bg-yellow-100 text-yellow-900 p-6 rounded-3xl">
          <h2 className="text-xl font-bold">Inbox</h2>
          <p className="text-sm">Track your gifts...</p>
        </div>

        {/* BLOC 5 : ORANGE - Send Gift */}
        <div className="bg-orange-100 text-orange-900 p-6 rounded-3xl md:col-span-2">
          <h2 className="text-2xl font-bold">Send Gifts</h2>
          <p className="text-sm">Send as a group with friends...</p>
        </div>

        {/* BLOC 6 : BLEU - Reminders */}
        <div className="bg-blue-100 text-blue-900 p-6 rounded-3xl">
          <h2 className="text-xl font-bold">Reminders</h2>
          <p className="text-sm">Never miss a birthday...</p>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;
