import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { format, addDays } from "date-fns";

import { ScheduleCollection } from "/imports/api/Schedules";
import { ScheduleContext } from "./ScheduleContext";
import { MealSlot } from "./WeekView/MealSlot";

type WeekViewProps = {
  startDate: Date;
  slots: string[];
};

export const WeekView: React.FC<WeekViewProps> = ({ startDate, slots }) => {
  const isLoading = useSubscribe("schedules");
  const schedules = useFind(() => ScheduleCollection.find());

  console.log("s", schedules);

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const items = days
    .map((date) => slots.map((slot) => ({ date, slot })))
    .flat();

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className="grid grid-cols-7 gap-4 px-4">
        {days.map((date) => {
          return (
            <div
              className="font-semibold h-8 flex items-center justify-center"
              key={format(date, "yyyy-MM-dd")}
            >
              {format(date, "EEE, MMM d")} {/* e.g., Tue, Jul 1 */}
            </div>
          );
        })}
      </div>
      <ScheduleContext.Provider value={schedules}>
        <div className="p-4 grid grid-cols-7 grid-rows-3 gap-4 min-h-0">
          <>
            {items.map((item) => {
              return (
                <MealSlot
                  date={item.date}
                  slot={item.slot}
                  key={`${format(item.date, "yyyy-MM-dd")}_${item.slot}`}
                />
              );
            })}
          </>
        </div>
      </ScheduleContext.Provider>
    </div>
  );
};
