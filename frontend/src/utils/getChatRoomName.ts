export function getChatRoomName(roomName: string, myName: string) {
    const names = roomName.split(",");
    const filteredRoomName = names.filter((name) => name !== myName);
    return filteredRoomName[0];
}