import { TBoard } from "../common/types";

//Копія ігрового поля
export const deepCopyField = (field): TBoard => JSON.parse(JSON.stringify(field));
