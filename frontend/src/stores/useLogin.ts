import { create } from "zustand";
import api from "../apis/api";
import { connectSocket } from "../utils/socket";
import { NavigateFunction } from "react-router-dom";

interface UserLogin {
  id: string;
  socket_id?: string;
  name: string;
  login: (email: string, password: string, navigator: NavigateFunction) => void;
}

const useLogin = create<UserLogin>(set => ({
  id: "",
  socket_id: "",
  name:"",
  login: async (email: string, password: string, navigator: NavigateFunction) => {
    await api
      .post("/users/login", { email: email, password: password })
      .then(res => {
        alert("로그인이 성공했습니다." + res);
        console.log(res);
        set({ id: res.data.user.user._id });
        set({name: res.data.user.user.name});
        const socket = connectSocket();
        socket.emit("login", res.data.user.user._id);
        sessionStorage.setItem("jwt", res.data.token);
        navigator("/main");
      })
      .catch(err => console.log("로그인에 실패했습니다", err));
  },
}));

export { useLogin };
