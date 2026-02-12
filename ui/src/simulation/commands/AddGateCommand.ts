import type { Circuit } from "../engine/Circuit";
import type { Gate } from "../engine/Gate";
import type { RenderContext } from "../rendering/RenderContext";

export class AddGateCommand<T extends Gate> {

    constructor(
        public gate: T,
        public circuit: Circuit,
        public ctx: RenderContext,
        public x: number,
        public y: number) 
        { }
    
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