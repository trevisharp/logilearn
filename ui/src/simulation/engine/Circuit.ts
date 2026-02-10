import type { Gate } from "./Gate";

export class Circuit {
    gates: Gate[] = []

    onTick(dt: number): void {
        this.gates.forEach(gate => {
            gate.onTick(dt)
        });
    }
}