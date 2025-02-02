import { PixiContainer } from "@/pixi/PixiContainer";
import type { City } from "@/types/types";

export class PixiCity extends PixiContainer {
    constructor(width: number, height: number) {
        super({
            width,
            height,
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            layout: 'flexColumn',
            gap: 10,
            justifyContent: 'end',
            alignItems: 'center',
            background: 0x333333,
            mask: false,
        })
    }
}