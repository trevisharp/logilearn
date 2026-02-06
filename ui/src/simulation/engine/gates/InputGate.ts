import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { Gate } from "../Gate";
import { Output } from "../Output";
import type { Signal } from "../Signal";
import Konva from "konva";

export class InputGate implements Gate {
    type = "input"

    state: Signal = 0
    x: number = 0
    y: number = 0

    inputs = []
    outputs = [ new Output() ]

    group: Konva.Group | null = null

    onTick(): void {
        this.outputs[0]?.sendSignal(this.state)
    }
    
    render(ctx: RenderContext): void {
        this.group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: true
        })
        
        this.group.add(new Konva.Circle({ fill: 'white', radius: 10 }))
        this.group.add(new Konva.Circle({ fill: 'black', radius: 8 }))

        const innercircle = new Konva.Circle({ fill: 'black', radius: 7 })
        this.group.add(innercircle)

        this.group.addEventListener('click', () => {
            if (this.state == 1) {
                this.state = 0
                innercircle.fill('black')
            }
            else {
                this.state = 1
                innercircle.fill('white')
            }
        })

        ctx.layer.add(this.group)
    }

    unrender(): void {
        if (this.group === null) {
            return
        }

        this.group.destroy()
    }
}