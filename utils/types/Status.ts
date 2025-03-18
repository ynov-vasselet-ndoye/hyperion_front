export const STATUS = ["RUNNING", "STOPPED", "IDLE"] as const;
export type Status = typeof STATUS[number];
