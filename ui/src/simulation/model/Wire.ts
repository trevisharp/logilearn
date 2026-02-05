import type { Input } from "./Input";
import type { Output } from "./Output";

export class Wire {
    constructor(public Received: Output, public Sended: Input) {
        Received.onSignalChange = output => {
            Sended.reciveSignal(output.state)
        }
    }
}