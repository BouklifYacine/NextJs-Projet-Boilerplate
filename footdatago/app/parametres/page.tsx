"use client";
import React, { useState } from "react";

const Parametre = () => {
  const [test, setTest] = useState(false);

  function Enlever() {
    setTest(!test);
  }
  return (
    <div>
      <button onClick={Enlever}> {test ? "Clique pour cacher" : "Clique pour afficher"}</button>
            {test &&  <p> Je suis affiché </p>}
    </div>
  );
};

export default Parametre;
