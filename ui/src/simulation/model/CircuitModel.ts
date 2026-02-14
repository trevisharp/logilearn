import type { GateModel } from "./GateModel";
import type { WireModel } from "./WireModel";

export interface CircuitModel {
    gates: GateModel[]
    wires: WireModel[]
}