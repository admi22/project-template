import { Application, Container, Texture, Graphics, Rectangle } from 'pixi.js'
import { PixiContainer } from '@/pixi/PixiContainer'

export class PixiApp extends Application {
    public root: PixiContainer = new PixiContainer()

  constructor(canvasElement: HTMLCanvasElement, width: number, height: number, backgroundColor: number) {
    super()

    // init app
    this.init({
      canvas: canvasElement,
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      antialias: true,
      resolution: 2,
      // autoDensity: true, // not sure what this does
    })

    this.root.updateLayoutProps({
        width: width,
        height: height,
        padding: { top: 10, right: 10, bottom: 10, left: 10 },
        layout: 'flexRow',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        background: null,
        mask: false,
    })

    this.stage.addChild(this.root)
  }

  addContainer(container: Container) {
    this.root.addChild(container)
    this.root.applyLayout()
  }
}
