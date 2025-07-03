import React from "react";
import { format } from "date-fns";
import { MealSlot } from "/imports/ui/WeekView/MealSlot";

type DayProps = {
  date: Date;
  slots: string[];
};

export const Day: React.FC<DayProps> = ({ date, slots }) => {
  return (
    <div className="flex flex-col min-w-[120px] bg-gray-50 border border-gray-300 grow">
      <div className="text-center font-semibold bg-gray-200 py-2 border-b border-gray-300">
        {format(date, "EEE, MMM d")} {/* e.g., Tue, Jul 1 */}
      </div>

      <div className={`grid grid-rows-${slots.length} p-2 gap-2`}>
        {slots.map((slot) => (
          <MealSlot date={date} slot={slot} key={slot} />
        ))}
      </div>
    </div>
  );
};
