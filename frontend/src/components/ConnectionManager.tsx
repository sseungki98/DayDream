import { useSocket } from "../stores/useSocket";

export function ConnectionManager() {
  const { currentSocket } = useSocket();
  function connect() {
    console.log("currentSocket:", currentSocket);
    currentSocket!.connect();
    console.log(currentSocket);
  }

  function disconnect() {
    currentSocket!.disconnect();
  }
  const sendMessage = () => {
    currentSocket!.emit("reply", { message: "Hello" });
  };

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={sendMessage}>메세지보내기</button>
    </>
  );
}
