export function findChanges<T extends { _id: string }>(
  oldArr: T[],
  newArr: T[],
): { add: T[]; delete: T[] } {
  const added = newArr.filter(
    (newAr) =>
      !oldArr.some((oldAr) => newAr._id.toString() === oldAr._id.toString()),
  );
  const deleted = oldArr.filter(
    (oldAr) =>
      !newArr.some((newAr) => newAr._id.toString() === oldAr._id.toString()),
  );

  return { add: added, delete: deleted };
}
