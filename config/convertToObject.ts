// type Data = {
//   content: string;
//   title: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// };

// type BSONValue =
//   | string
//   | number
//   | boolean
//   | null
//   | undefined
//   | Date
//   | Buffer
//   | { [key: string]: BSONValue }
//   | BSONValue[];

export function convertToObject(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(convertToObject);
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;

    if (
      "_bsontype" in obj &&
      obj._bsontype === "ObjectID" &&
      typeof obj.toString === "function"
    ) {
      return obj.toString();
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (
      Buffer.isBuffer(value) ||
      "buffer" in obj ||
      typeof obj.toJSON === "function"
    ) {
      return value.toString();
    }

    const plain: Record<string, unknown> = {};
    for (const key in obj) {
      plain[key] = convertToObject(obj[key]);
    }
    return plain;
  }

  return value;
}
