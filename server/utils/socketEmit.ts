import { getIO } from "~~/server/plugins/socket.io";

export function socketEmit(eventName: string, data: any) {
  const io = getIO();
  io.emit(eventName, data);
}
