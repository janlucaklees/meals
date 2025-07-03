import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecipeFinder } from "./RecipeFinder";
import { WeekView } from "./WeekView";

export const App = () => {
  return (
    <main className="flex flex-col w-screen h-screen">
      <DndProvider backend={HTML5Backend}>
        <div className="h-2/5">
          <div>persons</div>
          <WeekView
            startDate={new Date()}
            slots={["breakfast", "lunch", "dinner"]}
          />
        </div>
        <RecipeFinder />
      </DndProvider>
    </main>
  );
};
