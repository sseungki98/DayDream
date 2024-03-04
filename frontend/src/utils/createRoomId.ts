export function createRoomId(id1: string, id2: string) {
  return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
}
