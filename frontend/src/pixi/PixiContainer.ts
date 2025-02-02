import { Container, Sprite, Texture, type ContainerChild } from 'pixi.js'



export interface PixiContainerLayoutProps {
    width: number
    height: number
    padding: {
        top: number
        right: number
        bottom: number
        left: number
    }
    layout: 'none' | 'flexRow' | 'flexColumn'
    gap: number
    justifyContent: 'start' | 'center' | 'end'
    alignItems: 'start' | 'center' | 'end'
    background: number | null,
    mask: boolean
}

export class PixiContainer extends Container {
    layoutProps: PixiContainerLayoutProps
    background: Sprite | null = null
    maskSprite: Sprite | null = null

    constructor(layoutProps: Partial<PixiContainerLayoutProps> = {}) {
        super()

        // Default layout properties
        const defaultProps: PixiContainerLayoutProps = {
            width: 100,
            height: 100,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            layout: 'none',
            gap: 0,
            justifyContent: 'start',
            alignItems: 'start',
            background: null,
            mask: false,
        }

        // Merge user-provided properties with defaults
        this.layoutProps = { ...defaultProps, ...layoutProps }

        this.updateBackground()
        this.updateMask()
    }

    applyLayout() {
        console.log('Applying layout to container', this);
    
        const { width, height, padding, layout, alignItems, justifyContent, gap } = this.layoutProps;
        
        // Calculate the available space (excluding padding)
        const availableWidth = width - padding.left - padding.right;
        const availableHeight = height - padding.top - padding.bottom;
    
        if (layout === 'none') return;
    
        // Collect valid children (excluding background & mask)
        const children = this.children.filter(child => child !== this.background && child !== this.maskSprite);
    
        // Calculate total occupied size of children (including gaps)
        const totalChildrenSize = children.reduce((sum, child) => 
            sum + (layout === 'flexRow' ? child.width : child.height), 0
        ) + gap * Math.max(children.length - 1, 0);
    
        // Get starting position based on justifyContent (accounting for left & top padding)
        let currentX = padding.left + this.getJustifyOffset(justifyContent, availableWidth, totalChildrenSize);
        let currentY = padding.top + this.getJustifyOffset(justifyContent, availableHeight, totalChildrenSize);
    
        children.forEach((child) => {
            // Calculate alignment offset (accounts for padding)
            const alignOffset = layout === 'flexRow'
                ? this.getAlignOffset(alignItems, availableHeight, child.height, padding.top, padding.bottom)
                : this.getAlignOffset(alignItems, availableWidth, child.width, padding.left, padding.right);
    
            // Set position based on layout type
            const x = layout === 'flexRow' ? currentX : alignOffset;
            const y = layout === 'flexRow' ? alignOffset : currentY;
    
            child.position.set(x, y);
    
            // Update current position for next child
            if (layout === 'flexRow') currentX += child.width + gap;
            else currentY += child.height + gap;
        });
    }
    
    // Helper: Calculate alignment offset (now includes top/bottom padding)
    private getAlignOffset(align: 'start' | 'center' | 'end', availableSize: number, childSize: number, paddingStart: number, paddingEnd: number): number {
        return align === 'center' ? paddingStart + (availableSize - childSize) / 2
             : align === 'end' ? availableSize + paddingStart - childSize - paddingEnd
             : paddingStart; // 'start' case
    }
    
    // Helper: Calculate justify offset (now includes left/right padding)
    private getJustifyOffset(justify: 'start' | 'center' | 'end', availableSize: number, totalChildrenSize: number): number {
        return justify === 'center' ? (availableSize - totalChildrenSize) / 2
             : justify === 'end' ? (availableSize - totalChildrenSize)
             : 0; // 'start' case
    }
    
    
    

    updateLayoutProps(layoutProps: Partial<PixiContainerLayoutProps>) {
        this.layoutProps = { ...this.layoutProps, ...layoutProps }
        this.updateBackground()
        this.updateMask()
    }

    updateBackground() {
        if (!this.layoutProps.background) {
            return
        }

        this.background = new Sprite(Texture.WHITE)
        // NOTE: the parent might not be available if the container has not been added as a child yet
        // if (this.parent) {
        //   this.setBackgroundRect(0, 0, this.width, this.height)
        // }
        this.background.width = this.layoutProps.width
        this.background.height = this.layoutProps.height
        this.background.tint = this.layoutProps.background!
        this.addChild(this.background)
    }

    updateMask() {
        if (!this.layoutProps.mask) {
            return
        }
        const mask = new Sprite(Texture.WHITE)
        this.addChild(mask)
        mask.x = 0
        mask.y = 0
        mask.width = this.layoutProps.width
        mask.height = this.layoutProps.height
        this.mask = mask
        this.maskSprite = mask
    }
}
