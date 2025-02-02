import { PixiContainer } from "@/pixi/PixiContainer";
import { PixiText } from "@/pixi/PixiText";
import type { City } from "@/types/types";
import { PixiHero } from "@/pixi/PixiHero";

export class PixiCity extends PixiContainer {
    pixiHeroContainer: PixiContainer
    text: PixiText

    constructor(city: City) {
        super({
            width: 100,
            height: 200,
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            layout: 'flexColumn',
            gap: 5,
            justifyContent: 'end',
            alignItems: 'center',
            background: null,
            mask: false,
        })

        this.pixiHeroContainer = new PixiContainer({
            width: 100,
            height: 200,
            // padding: { top: 10, right: 10, bottom: 10, left: 10 },
            layout: 'flexColumn',
            gap: 10,
            justifyContent: 'end',
            alignItems: 'center',
            background: null,
            mask: false,
        })
        this.addChild(this.pixiHeroContainer)

        this.text = new PixiText({
            text: city.name,
            style: {
                fill: 0x000000,
                fontSize: 12,
                fontFamily: 'Arial',
                fontWeight: 'bold'
            },
        })
        this.addChild(this.text)

        this.applyLayout()
    }

    addHero(pixiHero: PixiHero) {
        this.pixiHeroContainer.addChild(pixiHero)
        this.pixiHeroContainer.applyLayout()
    }
}