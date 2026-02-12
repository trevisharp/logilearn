import Konva from "konva";
import { TwoInputGate } from "./TwoInputGate";

export class OrGate extends TwoInputGate {

    constructor() {

        super('or', 
            (a, b) => {
                if (a == 1 || b == 1) {
                    return 1
                }

                if (a != null || b != null) {
                    return 0
                }

                return null
            },
            (width, height) => {
                return new Konva.Shape({
                    sceneFunc(ctx, shape) {
                        ctx.beginPath()
                        ctx.moveTo(0, 0)
                        ctx.lineTo(width / 2, 0)
                        ctx.arc(width / 2, height / 2, height / 2, -Math.PI / 2, Math.PI / 2)
                        ctx.lineTo(0, height)
                        ctx.arc(0, height / 2, height / 3, Math.PI / 2, -Math.PI / 2, true)
                        ctx.closePath()
        
                        ctx.fillStrokeShape(shape)
                    },
                    fill: "#e0e0e0",
                    stroke: "black",
                    strokeWidth: 2
                })
            }
        );
    }
}