import type { Gate } from "../Gate";
import { Output } from "../Output";
import type { Signal } from "../Signal";

export class InputGate implements Gate {
    type = "input"

    state: Signal = 0
    x: number = 0
    y: number = 0

    inputs = []
    outputs = [ new Output() ]

    onTick(): void {
        this.outputs[0]?.sendSignal(this.state)
    }

    onClick(): void {
        this.state = this.state == 0 ? 1 : 0;
    }
}