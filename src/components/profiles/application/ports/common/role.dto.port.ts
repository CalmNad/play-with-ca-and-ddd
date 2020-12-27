import { IRole } from "@profiles/domain/entities";

export interface IRoleDTO extends Pick<IRole, "id" | "name"> {}
