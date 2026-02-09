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

    outputGate: OutputGate = new OutputGate()
    
    do(): void {
        this.outputGate.x = this.x
        this.outputGate.y = this.y

        this.circuit.gates.push(this.outputGate)

        this.outputGate.render(this.ctx)
    }

    undo(): void {
        if (this.outputGate === null) {
            return
        }
        this.circuit.gates = this.circuit.gates.filter(g => g !== this.outputGate)
        this.outputGate.unrender(this.ctx)
    }
}