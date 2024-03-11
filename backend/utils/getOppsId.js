exports.getOppsId = (roomId, myId) => {
  console.log(typeof myId);
  const IdArray = roomId.split("_");
  const filteredId = IdArray.filter((id) => id !== myId);
  console.log(filteredId);
  return filteredId[0];
};
