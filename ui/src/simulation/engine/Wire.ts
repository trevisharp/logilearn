import type { Input } from "./Input";
import type { Output } from "./Output";

export class Wire {
    constructor(public Received: Output, public Sended: Input) {
        Received.subscribe(this.event)
    }

    remove() {
        this.Received.unsubscribe(this.event)
    }

    private event(output: Output) {
        this.Sended.reciveSignal(output.state)
    }
}