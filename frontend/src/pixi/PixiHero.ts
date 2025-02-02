import { PixiContainer } from "@/pixi/PixiContainer";

export class PixiHero extends PixiContainer {
    constructor(width: number, height: number) {
        super({
            width,
            height,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            layout: 'flexColumn',
            justifyContent: 'start',
            alignItems: 'start',
            background: 0xff4444,
            mask: false,
        })
    }
}