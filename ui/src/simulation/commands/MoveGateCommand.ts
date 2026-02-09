import type Konva from "konva";
import type { Command } from "./Command";

export class MoveGateCommand implements Command {

    constructor(
        public group: Konva.Group, 
        public start: Konva.Vector2d, 
        public end: Konva.Vector2d)
        { }

    do(): void {
        this.group.position(this.end)
    }

    undo(): void {
        this.group.position(this.start)
    }

}