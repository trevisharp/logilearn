import Konva from "konva";
import type { Gate } from "../engine/Gate";
import type { RenderContext } from "../rendering/RenderContext";
import type { Command } from "./Command";
import { Wire } from "../engine/Wire";

export class ConnectGateCommand implements Command {

    private wire: Wire | null = null

    constructor(
        public startGate: Gate,
        public endGate: Gate,
        public ctx: RenderContext
    ) { }

    do(): void {
        const output = this.startGate.outputs[0]
        const input = this.endGate.inputs[0]
        if (output === undefined || input === undefined) {
            return
        }

        this.wire = new Wire(output)
        this.wire.Sended = input

        const group = new Konva.Group()
        
        const line = new Konva.Line({
            points: [ this.startGate.x, this.startGate.y, this.endGate.x, this.endGate.y ],
            stroke: '#999',
            strokeWidth: 2
        })

        group.add(line)

        const updateLine = () => {
            line.points([ this.startGate.x, this.startGate.y, this.endGate.x, this.endGate.y ])
        }

        const startGroup = this.startGate?.getVisualItem().group
        if (startGroup !== null && startGroup !== undefined) {
            startGroup.on('xChange', updateLine)
            startGroup.on('yChange', updateLine)
        }

        const endGroup = this.endGate.getVisualItem().group
        if (endGroup !== null && startGroup !== undefined) {
            endGroup.on('xChange', updateLine)
            endGroup.on('yChange', updateLine)
        }
        
        this.ctx.layer.add(group)
        this.wire.getVisualItem().group = group  
    }

    undo(): void {
        this.wire?.remove()
        this.wire?.getVisualItem().group?.destroy()
    }

}