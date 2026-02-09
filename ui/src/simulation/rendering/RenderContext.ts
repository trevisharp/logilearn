import type Konva from "konva";
import type { SimulationItem } from "../engine/SimulationItem";

export interface RenderContext {
    layer: Konva.Layer,
    map: Map<Konva.Group, SimulationItem>
}