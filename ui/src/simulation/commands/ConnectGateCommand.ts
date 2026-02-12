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

    do(): boolean {
        const output = this.startGate.getBestOutput(
            this.ctx.connectInfo.startX,
            this.ctx.connectInfo.startY
        )
        const input = this.endGate.getBestInput(
            this.ctx.connectInfo.finalX,
            this.ctx.connectInfo.finalY
        )
        if (output === null || input === null) {
            return false
        }

        this.wire = new Wire(output)
        this.wire.Sended = input

        const group = new Konva.Group()
        
        const line = new Konva.Line({
            points: [ 
                this.startGate.x + output.x, 
                this.startGate.y + output.y,
                this.endGate.x + input.x,
                this.endGate.y + input.y
            ],
            stroke: '#999',
            strokeWidth: 2
        })

        group.add(line)

        const updateLine = () => {
            line.points([ 
                this.startGate.x + output.x, 
                this.startGate.y + output.y,
                this.endGate.x + input.x,
                this.endGate.y + input.y
            ])
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

        return true
    }

    undo(): void {
        this.wire?.remove()
        this.wire?.getVisualItem().group?.destroy()
    }

}