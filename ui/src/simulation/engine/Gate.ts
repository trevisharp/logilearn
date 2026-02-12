import type { RenderContext } from "../rendering/RenderContext";
import type { Input } from "./Input";
import type { Output } from "./Output";
import type { SimulationItem } from "./SimulationItem";

export interface Gate extends SimulationItem {
    x: number
    y: number
    type: string,
    inputs: Input[]
    outputs: Output[]
    
    onTick(dt: number): void

    getBestInput(x: number, y: number): Input | null
    getBestOutput(x: number, y: number): Output | null

    showBestInput(x: number, y: number): void
    hideBestInput(): void

    showBestOutput(x: number, y: number): void
    hideBestOutput(): void
    
    render(ctx: RenderContext): void
    unrender(ctx: RenderContext): void
}