import type { Circuit } from "../engine/Circuit";
import { OutputGate } from "../engine/gates/OutputGate";
import type { RenderContext } from "../rendering/RenderContext";
import type { Command } from "./Command";

export class AddOutputGateCommand implements Command {
    
    constructor(
        public circuit: Circuit,
        public ctx: RenderContext,
        public x: number,
        public y: number) 
        { }

    gate: OutputGate = new OutputGate()
    
    do(): boolean {
        this.gate.x = this.x
        this.gate.y = this.y

        this.circuit.gates.push(this.gate)

        this.gate.render(this.ctx)

        return true
    }

    undo(): void {
        if (this.gate === null) {
            return
        }
        this.circuit.gates = this.circuit.gates.filter(g => g !== this.gate)
        this.gate.unrender(this.ctx)
    }
}