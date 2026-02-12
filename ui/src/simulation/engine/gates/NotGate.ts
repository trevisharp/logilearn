import type { VisualItem } from "@/simulation/rendering/VisualItem";
import type { Gate } from "../Gate";
import { Input } from "../Input";
import { Output } from "../Output";
import type { Signal } from "../Signal";
import Konva from "konva";
import type { RenderContext } from "@/simulation/rendering/RenderContext";

export class NotGate implements Gate {
    
    constructor() {
        this.inputs.push(this.input)
        this.outputs.push(this.output)

        this.input.y += this.height / 2
        this.output.x += this.width
        this.output.y += this.height / 2

        this.input.subscribe(() => this.state = this.input.state == 1 ? 0 : 1)
    }

    width = 40
    height = 30

    x: number = 0
    y: number = 0
    type: string = 'not'

    state: Signal = 1
    input = new Input()
    output = new Output()
    item: VisualItem = { group: null }

    visualInput: Konva.Circle | null = null
    visualOutput: Konva.Circle | null = null

    inputs: Input[] = []
    outputs: Output[] = []
    
    showBestInput(): void {
        this.visualInput?.fill("yellow")
    }

    hideBestInput(): void {
        this.visualInput?.fill("red")
    }

    showBestOutput(): void {
        this.visualOutput?.fill("yellow")
    }

    hideBestOutput(): void {
        this.visualOutput?.fill("red")
    }

    onTick(): void {
        this.output.sendSignal(this.state)
    }

    getBestInput(): Input | null {
        return this.input
    }

    getBestOutput(): Output | null {
        return this.output
    }

    render(ctx: RenderContext): void {
        const group = new Konva.Group({
            x: this.x,
            y: this.y,
            draggable: true,
            name: "and-gate"
        })
        
        group.on('xChange', () => {
            this.x = group.x()
        })

        group.on('yChange', () => {
            this.y = group.y()
        })

        const width = this.width
        const height = this.height

        const body = new Konva.Shape({
            sceneFunc(ctx, shape) {
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(width, height / 2)
                ctx.lineTo(0, height)
                ctx.closePath()

                ctx.fillStrokeShape(shape)
            },
            fill: "#e0e0e0",
            stroke: "black",
            strokeWidth: 2
        })

        this.visualInput = new Konva.Circle({
            x: 0,
            y: height / 2,
            radius: 4,
            fill: "red",
            name: "input"
        })

        this.visualOutput = new Konva.Circle({
            x: width - 2,
            y: height / 2,
            radius: 4,
            fill: "red",
            name: "output"
        })

        group.add(body)
        group.add(this.visualInput)
        group.add(this.visualOutput)

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