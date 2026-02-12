import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { VisualItem } from "@/simulation/rendering/VisualItem";
import type { Gate } from "../Gate";
import { Input } from "../Input";
import type { Signal } from "../Signal";
import Konva from "konva";
import type { Output } from "../Output";

export class OutputGate implements Gate {
    type = "output"

    state: Signal = 0
    x: number = 0
    y: number = 0

    private input: Input
    inputs: Input[] = [ ]
    outputs: Output[] = [ ]

    item: VisualItem = { group: null }
    innercircle: Konva.Circle | null = null

    visualInput = new Konva.Circle({ fill: 'black', radius: 8 })

    constructor() {
        this.input = new Input()
        this.inputs.push(this.input)

        this.input.x += 10 / 2
        this.input.y += 10 / 2
    }

    showBestInput(): void {
        this.visualInput.fill('yellow')
    }
    hideBestInput(): void {
        this.visualInput.fill('black')
    }

    showBestOutput(): void { }
    hideBestOutput(): void { }

    onTick(): void {
        if (this.innercircle === null) {
            return
        }
        
        this.innercircle.fill(this.input.state === 1 ? 'white' : 'black')
    }
    
    render(ctx: RenderContext): void {
        const group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: true
        })
        
        group.add(new Konva.Circle({ fill: 'white', radius: 10 }))
        this.visualInput = new Konva.Circle({ fill: 'black', radius: 8 })
        group.add(this.visualInput)

        this.innercircle = new Konva.Circle({ fill: 'black', radius: 7 })
        group.add(this.innercircle)

        group.on('xChange', () => {
            this.x = group.x()
        })

        group.on('yChange', () => {
            this.y = group.y()
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

    getVisualItem(): VisualItem {
        return this.item
    }

    
    getBestInput(): Input | null {
        if (this.input.connected)
            return null
        return this.input
    }
    
    getBestOutput(): Output | null {
        return null
    }
}