import { createContext } from "react";
import { Schedule } from "../api/Schedules";

export const ScheduleContext = createContext<Schedule[]>([]);
