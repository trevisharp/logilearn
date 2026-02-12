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

    gate: AndGate = new AndGate()
    
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