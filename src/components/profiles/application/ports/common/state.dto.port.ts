import { IState } from "@profiles/domain/entities";

export interface IStateDTO extends Pick<IState, "id" | "name"> {}
