import { GenericResponse } from "../../models/GenericResponse";

function isGenericResponseString(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): obj is GenericResponse<string> {
  return (
    obj &&
    typeof obj === "object" &&
    "data" in obj &&
    typeof obj.data === "string" &&
    "status" in obj &&
    typeof obj.status === "number"
  );
}

export { isGenericResponseString };
