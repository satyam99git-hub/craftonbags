import React from "react";

import CollectionHero from "./collection/CollectionHero";
import CollectionGrid from "./collection/CollectionGrid";

const Collection = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <CollectionHero />

      <CollectionGrid />
    </div>
  );
};

export default Collection;
