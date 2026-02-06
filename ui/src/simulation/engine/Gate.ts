import type { RenderContext } from "../rendering/RenderContext";
import type { Input } from "./Input";
import type { Output } from "./Output";

export interface Gate {
    x: number
    y: number
    type: string,
    inputs: Input[]
    outputs: Output[]
    
    onTick(dt: number): void
    
    render(ctx: RenderContext): void
    unrender(): void
}