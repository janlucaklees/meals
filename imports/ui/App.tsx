import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addWeeks, previousSaturday, subWeeks } from "date-fns";
import { RecipeFinder } from "./RecipeFinder";
import { WeekView } from "./WeekView";
import { Button } from "./components/Button";

import "./App.css";

export const App = () => {
  const [startDate, setStartDtate] = useState(new Date());
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <div className="p-6 pb-8 flex items-center gap-4 justify-end">
          <Button
            label="<"
            onClick={() => setStartDtate(subWeeks(startDate, 1))}
          />
          <Button label="This Week" onClick={() => setStartDtate(new Date())} />
          <Button
            label="Next Week"
            onClick={() => setStartDtate(addWeeks(new Date(), 1))}
          />
          <Button
            label=">"
            onClick={() => setStartDtate(addWeeks(startDate, 1))}
          />
        </div>
        <WeekView
          startDate={previousSaturday(startDate)}
          slots={["breakfast", "lunch", "dinner"]}
        />
        <RecipeFinder />
      </DndProvider>
    </main>
  );
};
