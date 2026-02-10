import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { VisualItem } from "@/simulation/rendering/VisualItem";
import type { Gate } from "../Gate";
import type { Input } from "../Input";
import type { Output } from "../Output";

export class AndGate implements Gate {
    x: number = 0
    y: number = 0
    type: string = 'and'
    inputs: Input[] = []
    outputs: Output[] = []

    onTick(dt: number): void {
        throw new Error("Method not implemented.");
    }

    getBestInput(x: number, y: number): Input | null {
        throw new Error("Method not implemented.");
    }

    getBestOutput(x: number, y: number): Output | null {
        throw new Error("Method not implemented.");
    }

    render(ctx: RenderContext): void {
        throw new Error("Method not implemented.");
    }

    unrender(ctx: RenderContext): void {
        throw new Error("Method not implemented.");
    }

    getVisualItem(): VisualItem {
        throw new Error("Method not implemented.");
    }

}