import type { VisualItem } from "../rendering/VisualItem";
import type { Input } from "./Input";
import type { Output } from "./Output";
import type { SimulationItem } from "./SimulationItem";

export class Wire implements SimulationItem {
    item: VisualItem = { group: null }

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

    getVisualItem(): VisualItem {
      return this.item
    }
}