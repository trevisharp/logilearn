import type { Gate } from "../engine/Gate";
import type { RenderContext } from "./RenderContext";

export interface GateRender {
    render(gate: Gate, ctx: RenderContext): void
}