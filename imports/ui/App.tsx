import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecipeFinder } from "./RecipeFinder";
import { WeekView } from "./WeekView";
import { Button } from "./components/Button";

import "./App.css";

export const App = () => {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <div className="p-6 pb-8 flex items-center gap-4 justify-end">
          <Button label="<" />
          <Button label="This Week" />
          <Button label="Next Week" />
          <Button label=">" />
        </div>
        <WeekView
          startDate={new Date()}
          slots={["breakfast", "lunch", "dinner"]}
        />
        <RecipeFinder />
      </DndProvider>
    </main>
  );
};
