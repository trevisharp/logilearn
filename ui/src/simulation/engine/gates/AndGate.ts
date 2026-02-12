import type { RenderContext } from "@/simulation/rendering/RenderContext";
import type { VisualItem } from "@/simulation/rendering/VisualItem";
import type { Gate } from "../Gate";
import { Input } from "../Input";
import { Output } from "../Output";
import type { Signal } from "../Signal";
import Konva from "konva";

export class AndGate implements Gate {

    width = 40
    height = 30

    x: number = 0
    y: number = 0
    type: string = 'and'

    state: Signal = null
    inputA = new Input()
    inputB = new Input()
    output = new Output()
    item: VisualItem = { group: null }

    visualInputA: Konva.Circle | null = null
    visualInputB: Konva.Circle | null = null
    visualOutput: Konva.Circle | null = null

    inputs: Input[] = []
    outputs: Output[] = []

    constructor() {
        this.inputs.push(this.inputA)
        this.inputs.push(this.inputB)
        this.outputs.push(this.output)

        this.inputA.y += 0.2 * this.height
        this.inputB.y += 0.8 * this.height
        this.output.x += this.width
        this.output.y += this.height / 2

        const updateState = () => {
            if (this.inputA.state == 1 && this.inputB.state == 1) {
                this.state = 1
                return
            }

            if (this.inputA.state != null && this.inputB.state != null) {
                this.state = 0
                return
            }

            this.state = null
        }

        this.inputA.subscribe(updateState)
        this.inputB.subscribe(updateState)
    }
    
    showBestInput(x: number, y: number): void {
        const best = this.getBestInput(x, y)
        if (best === null)
            return
        
        if (this.inputA == best)
        {
            this.visualInputA?.fill("yellow")
            this.visualInputB?.fill("red")
        }
        else
        {
            this.visualInputB?.fill("yellow")
            this.visualInputA?.fill("red")
        }
    }

    hideBestInput(): void {
        this.visualInputA?.fill("red")
        this.visualInputB?.fill("red")
    }

    showBestOutput(): void {
        this.visualOutput?.fill("yellow")
    }

    hideBestOutput(): void {
        this.visualOutput?.fill("red")
    }


    onTick(): void {
        if (this.output.state != this.state)
            this.output.sendSignal(this.state)
    }

    getBestInput(x: number, y: number): Input | null {
        if (y - this.y < this.height / 2 && !this.inputA.connected)
            return this.inputA

        return this.inputB.connected ? null : this.inputB
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
                ctx.lineTo(width / 2, 0)
                ctx.arc(width / 2, height / 2, height / 2, -Math.PI / 2, Math.PI / 2)
                ctx.lineTo(0, height)
                ctx.closePath()

                ctx.fillStrokeShape(shape)
            },
            fill: "#e0e0e0",
            stroke: "black",
            strokeWidth: 2
        })

        this.visualInputA = new Konva.Circle({
            x: 0,
            y: height * 0.2,
            radius: 4,
            fill: "red",
            name: "input"
        })

        this.visualInputB = new Konva.Circle({
            x: 0,
            y: height * 0.8,
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
        group.add(this.visualInputA)
        group.add(this.visualInputB)
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