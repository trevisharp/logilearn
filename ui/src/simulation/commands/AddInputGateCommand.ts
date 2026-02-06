import type { Circuit } from "../engine/Circuit";
import { InputGate } from "../engine/gates/InputGate";
import type { RenderContext } from "../rendering/RenderContext";
import type { Command } from "./Command";

export class AddInputGateCommand implements Command {
    constructor(
        public circuit: Circuit,
        public ctx: RenderContext,
        public x: number,
        public y: number) 
        { }

    inputGate: InputGate | null = null
    
    do(): void {
        this.inputGate = new InputGate()
        this.inputGate.x = this.x
        this.inputGate.y = this.y

        this.circuit.gates.push(this.inputGate)

        this.inputGate.render(this.ctx)
    }

    undo(): void {
        if (this.inputGate === null) {
            return
        }
        this.circuit.gates = this.circuit.gates.filter(g => g !== this.inputGate)
        this.inputGate.unrender()
    }
}