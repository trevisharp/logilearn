import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { VisualItem } from "@/simulation/rendering/VisualItem";
import type { Gate } from "../Gate";
import { Input } from "../Input";
import type { Signal } from "../Signal";
import Konva from "konva";

export class OutputGate implements Gate {
    type = "output"

    state: Signal = 0
    x: number = 0
    y: number = 0

    inputs = [ new Input() ]
    outputs = [ ]

    item: VisualItem = { group: null }
    innercircle: Konva.Circle | null = null

    onTick(): void {
        if (this.innercircle === null) {
            return
        }
        
        const input = this.inputs[0];
        if (input === undefined) {
            return
        }

        this.innercircle.fill(input.state === 1 ? 'white' : 'black')
    }
    
    render(ctx: RenderContext): void {
        const group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: true
        })
        
        group.add(new Konva.Circle({ fill: 'white', radius: 10 }))
        group.add(new Konva.Circle({ fill: 'black', radius: 8 }))

        this.innercircle = new Konva.Circle({ fill: 'black', radius: 7 })
        group.add(this.innercircle)

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

    getVisualItem(): VisualItem {
        return this.item
    }

}