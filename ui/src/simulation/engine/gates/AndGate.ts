import Konva from "konva";
import { TwoInputGate } from "./TwoInputGate";

export class AndGate extends TwoInputGate {
    constructor() {

        super('and', 
            (a, b) => {
                if (a == 1 && b == 1) {
                    return 1
                }

                return 0
            },
            (width, height) => {
                return new Konva.Shape({
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
            }
        );
    }
}