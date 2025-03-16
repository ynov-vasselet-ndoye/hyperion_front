import type { Status } from "./Status";

export type Process = {
    name: string;
    status: Status;
    PID: number;
    CPU: number;
    MEM: number;
}
