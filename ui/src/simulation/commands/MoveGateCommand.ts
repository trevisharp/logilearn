import type Konva from "konva";
import type { Command } from "./Command";
import type { VisualItem } from "../rendering/VisualItem";

export class MoveGateCommand implements Command {

    constructor(
        public item: VisualItem, 
        public start: Konva.Vector2d, 
        public end: Konva.Vector2d)
        { }

    do(): boolean {
        if (this.item.group === null) {
            return false
        }
        this.item.group.position(this.end)

        return true
    }

    undo(): void {
        if (this.item.group === null) {
            return
        }
        this.item.group.position(this.start)
    }

}