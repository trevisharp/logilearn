import type { Circuit } from "../engine/Circuit"
import { AndGate } from "../engine/gates/AndGate"
import type { RenderContext } from "../rendering/RenderContext"

export class AddAndGateCommand {
    constructor(
        public circuit: Circuit,
        public ctx: RenderContext,
        public x: number,
        public y: number) 
        { }

    inputGate: AndGate = new AndGate()
    
    do(): boolean {
        this.inputGate.x = this.x
        this.inputGate.y = this.y

        this.circuit.gates.push(this.inputGate)

        this.inputGate.render(this.ctx)

        return true
    }

    undo(): void {
        if (this.inputGate === null) {
            return
        }
        this.circuit.gates = this.circuit.gates.filter(g => g !== this.inputGate)
        this.inputGate.unrender(this.ctx)
    }

}