import type Konva from "konva";
import type { SimulationItem } from "../engine/SimulationItem";
import type { Wire } from "../engine/Wire";
import type { Gate } from "../engine/Gate";

export interface RenderContext {
    layer: Konva.Layer,
    map: Map<Konva.Group, SimulationItem>,
    connectMode: boolean,
    currentWire: Wire | null,
    currentWireGate: Gate | null
}