namespace Turkey.sys{

    
    /**
     * @private
     * 位图渲染节点
     */
    export class NormalBitmapNode extends RenderNode {

        public constructor() {
            super();
            this.type = RenderNodeType.NormalBitmapNode;
            //todo 保存到 Texture
            this.uvs = new Uint32Array(4);
        }
        /**
         * 要绘制的位图
         */
        public image: BitmapData = null;
        /**
         * 控制在缩放时是否对位图进行平滑处理。
         */
        public smoothing: boolean = true;
        /**
         * 图片宽度。WebGL渲染使用
         */
        public imageWidth: number;
        /**
         * 图片高度。WebGL渲染使用
         */
        public imageHeight: number;
        /**
         * 翻转
         */
        public rotated: boolean = false;

        public sourceX: number;
        public sourceY: number;
        public sourceW: number;
        public sourceH: number;
        public drawX: number;
        public drawY: number;
        public drawW: number;
        public drawH: number;
        /**
         * 存放uv信息,
         * 会适应rotated进行调整
         * 存放uv四个顶点的信息
         */
        public uvs: Uint32Array;

        /**
         * 绘制一次位图
         */
        public drawImage(sourceX: number, sourceY: number, sourceW: number, sourceH: number,
            drawX: number, drawY: number, drawW: number, drawH: number): void {
            const self = this;
            self.sourceX = sourceX;
            self.sourceY = sourceY;
            self.sourceW = sourceW;
            self.sourceH = sourceH;
            self.drawX = drawX;
            self.drawY = drawY;
            self.drawW = drawW;
            self.drawH = drawH;
            self.renderCount = 1;

            const _sourceX = self.sourceX / this.imageWidth;
            const _sourceY = self.sourceY / this.imageHeight;
            let _sourceWidth: number;
            let _sourceHeight: number;
            let x0: number;
            let x1: number;
            let x2: number;
            let x3: number;
            let y0: number;
            let y1: number;
            let y2: number;
            let y3: number;
            if (this.rotated) {
                //逆时针旋转
                _sourceWidth = self.sourceH / this.imageWidth;
                _sourceHeight = self.sourceW / this.imageHeight;

                x0 = _sourceX + _sourceWidth;
                y0 = _sourceY;
                x1 = _sourceX + _sourceWidth;
                y1 = _sourceY + _sourceHeight;
                x2 = _sourceX;
                y2 = _sourceY + _sourceHeight;
                x3 = _sourceX;
                y3 = _sourceY;

            } else {
                _sourceWidth = self.sourceW / this.imageWidth;
                _sourceHeight = self.sourceH / this.imageHeight;

                x0 = _sourceX;
                y0 = _sourceY;
                x1 = _sourceX + _sourceWidth;
                y1 = _sourceY;
                x2 = _sourceX + _sourceWidth;
                y2 = _sourceY + _sourceHeight;
                x3 = _sourceX;
                y3 = _sourceY + _sourceHeight;
            }

            this.uvs[0] = ((y0 * 65535) << 16) | (x0 * 65535);
            this.uvs[1] = ((y1 * 65535) << 16) | (x1 * 65535);
            this.uvs[2] = ((y2 * 65535) << 16) | (x2 * 65535);
            this.uvs[3] = ((y3 * 65535) << 16) | (x3 * 65535);
        }

        /**
         * 在显示对象的$updateRenderNode()方法被调用前，自动清空自身的drawData数据。
         */
        public cleanBeforeRender(): void {
            super.cleanBeforeRender();
            this.image = null;
        }
    }

}