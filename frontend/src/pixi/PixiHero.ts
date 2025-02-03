import { PixiContainer } from "@/pixi/PixiContainer";
import { PixiText } from "@/pixi/PixiText";
import type { Hero } from "@/types/types";

export class PixiHero extends PixiContainer {
    text: PixiText

    constructor(hero: Hero, hoverCallback: (heroId: number | null) => void) {
        super({
            width: 100,
            height: 50,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            layout: 'flexColumn',
            justifyContent: 'center',
            alignItems: 'center',
            background: 0xffffff,
            mask: false,
        })

        this.text = new PixiText({
            text: hero.name,
            style: {
                fill: 0x000000,
                fontSize: 12,
                fontFamily: 'Arial',
            },
        })
        this.addChild(this.text)
        this.applyLayout()


        // event listeners
        this.eventMode = 'static'

        this.on('mouseover', () => {
            hoverCallback(hero.id!)
        })

        this.on('mouseout', () => {
            hoverCallback(null)
        })
    }

    updateHighlightedDisplay(isHighlighted: boolean) {
        if (isHighlighted) {
            this.updateLayoutProps({ background: 0xdddddd })
        } else {
            this.updateLayoutProps({ background: 0xffffff })
        }
    }
}