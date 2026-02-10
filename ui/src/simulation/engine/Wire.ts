import type { Input } from "./Input";
import type { Output } from "./Output";

export class Wire {
    constructor(public Received: Output) {
        Received.subscribe(this.event)
    }

    public Sended: Input | null = null

    remove() {
        this.Received.unsubscribe(this.event)
    }

  private event = (output: Output) => {
    this.Sended?.reciveSignal(output.state)
  }
}