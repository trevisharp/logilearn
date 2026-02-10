import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { Gate } from "../Gate";
import { Output } from "../Output";
import type { Signal } from "../Signal";
import Konva from "konva";
import type { VisualItem } from "@/simulation/rendering/VisualItem";
import { Wire } from "../Wire";

export class InputGate implements Gate {
    type = "input"

    state: Signal = 0
    x: number = 0
    y: number = 0

    inputs = []
    outputs = [ new Output() ]

    item: VisualItem = { group: null }

    onTick(): void {
        this.outputs[0]?.sendSignal(this.state)
    }

    getVisualItem(): VisualItem {
        return this.item
    }
    
    render(ctx: RenderContext): void {
        const group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: true
        })
        
        group.add(new Konva.Circle({ fill: 'white', radius: 10 }))
        group.add(new Konva.Circle({ fill: 'black', radius: 8 }))

        const innercircle = new Konva.Circle({ fill: 'black', radius: 7 })
        group.add(innercircle)

        group.addEventListener('mousedown', () => {
            if (!ctx.connectMode) {
                return
            }

            const output = this.outputs[0]
            if (output === undefined) {
                return
            }
            ctx.currentWire = new Wire(output)
            ctx.currentWireGate = this
        })

        group.addEventListener('mouseup', () => {
            this.x = group.x()
            this.y = group.y()
            
            if (!ctx.connectMode) {
                return
            }
            ctx.currentWire = null
        })

        group.addEventListener('click', () => {
            if (this.state == 1) {
                this.state = 0
                innercircle.fill('black')
            }
            else {
                this.state = 1
                innercircle.fill('white')
            }
        })
        this.item.group = group

        ctx.layer.add(this.item.group)
        ctx.map.set(this.item.group, this)
    }

    unrender(ctx: RenderContext): void {
        if (this.item.group === null) {
            return
        }
        
        ctx.map.delete(this.item.group)
        this.item.group.destroy()
        this.item.group = null
    }
}