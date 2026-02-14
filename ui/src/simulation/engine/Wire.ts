import type { VisualItem } from "../rendering/VisualItem";
import type { Input } from "./Input";
import type { Output } from "./Output";
import type { SimulationItem } from "./SimulationItem";

export class Wire implements SimulationItem {
    item: VisualItem = { group: null }

    constructor(public Received: Output) {
      Received.subscribe(this.event)
    }

    connectInput(input: Input) {
      if (this.Sended != null) {
        return
      }

      this.Sended = input
      this.Sended.reciveSignal(this.Received.state)
    }

    private Sended: Input | null = null

    remove() {
      this.Sended?.unsubscribe()
      this.Received.unsubscribe(this.event)
    }

    private event = (output: Output) => {
      this.Sended?.reciveSignal(output.state)
    }

    getVisualItem(): VisualItem {
      return this.item
    }
}