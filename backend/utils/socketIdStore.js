// socketIdStore.js
let currentSocket;
const userSocket = {};

const setSocketId = (id) => {
  currentSocket = id;
};
const getSocketId = () => currentSocket;

module.exports = { userSocket, setSocketId, getSocketId };
