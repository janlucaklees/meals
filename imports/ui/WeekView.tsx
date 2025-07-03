import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { format, addDays } from "date-fns";

import { ScheduleCollection } from "/imports/api/Schedules";
import { Day } from "/imports/ui/WeekView/Day";
import { ScheduleContext } from "./ScheduleContext";

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

  return (
    <div className="w-screen grid grid-cols-7 overflow-x-auto">
      <ScheduleContext.Provider value={schedules}>
        {days.map((date) => {
          return (
            <Day date={date} slots={slots} key={format(date, "yyyy-MM-dd")} />
          );
        })}
      </ScheduleContext.Provider>
    </div>
  );
};
