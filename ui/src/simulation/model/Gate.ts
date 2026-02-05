import type { Input } from "./Input";
import type { Output } from "./Output";

export interface Gate {
    type: string,
    Inputs: Input[]
    Output: Output[]
}