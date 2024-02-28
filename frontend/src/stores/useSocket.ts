import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type State = {
  currentSocket: Socket | null;
  setSocket: (socket: Socket | null) => void;
};

const useSocket = create<State>(set => ({
  currentSocket: null,
  setSocket: (socket: Socket | null) => {
    set({ currentSocket: socket });
  },
}));

export { useSocket };
