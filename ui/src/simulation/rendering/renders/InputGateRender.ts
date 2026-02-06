import type { Gate } from "@/simulation/engine/Gate";
import Konva from "konva";
import type { GateRender } from "../GateRender";
import type { RenderContext } from "../RenderContext";

export class InputGateRender implements GateRender {
    render(gate: Gate, ctx: RenderContext) {
        const group = new Konva.Group({
            x: gate.x,
            y: gate.y,
            draggable: true
        })

        group.add(new Konva.Circle({ fill: 'white', radius: 20 }))

        ctx.layer.add(group)
    }
}