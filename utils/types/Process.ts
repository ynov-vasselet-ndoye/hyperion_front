import type { Status } from "./Status";

export type Process = {
    name: string;
    status: Status;
    pid: number;
    cpu_percent: number;
    memory_percent: number;
}
