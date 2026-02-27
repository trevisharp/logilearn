import type Konva from "konva";
import type { Command } from "./Command";
import type { SimulationItem } from "../engine/SimulationItem";

export class MoveGateCommand implements Command {

    constructor(
        public item: SimulationItem, 
        public start: Konva.Vector2d, 
        public end: Konva.Vector2d)
        { }

    do(): boolean {
        const visual = this.item.getVisualItem()
        if (visual.group === null) {
            return false
        }
        visual.group.position(this.end)

        return true
    }

    undo(): void {
        const visual = this.item.getVisualItem()
        if (visual.group === null) {
            return
        }
        visual.group.position(this.start)
    }

}