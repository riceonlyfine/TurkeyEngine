namespace Turkey.sys{

    let displayListPool: DisplayList[] = [];
    let blendModes = ["source-over", "lighter", "destination-out"];
    let defaultCompositeOp = "source-over";

    /**
     * @private
     * 显示列表
     */
    export class DisplayList extends HashObject {

        /**
         * 创建一个DisplayList对象，若内存不足或无法创建RenderBuffer，将会返回null。
         */
        public static create(target: DisplayObject): DisplayList {
            let displayList = new Turkey.sys.DisplayList(target);
            try {
                let buffer = new RenderBuffer();
                displayList.renderBuffer = buffer;
            }
            catch (e) {
                return null;
            }
            displayList.root = target;
            return displayList;
        }


        /**
         * @private
         * 创建一个DisplayList对象
         */
        public constructor(root: DisplayObject) {
            super();
            this.root = root;
            this.isStage = (root instanceof Stage);
        }

        private isStage: boolean = false;
        /**
         * 位图渲染节点
         */
        $renderNode: RenderNode = new BitmapNode();

        /**
         * @private
         * 获取渲染节点
         */
        $getRenderNode(): sys.RenderNode {
            return this.$renderNode;
        }

        /**
         * @private
         */
        public renderBuffer: RenderBuffer = null;
        /**
         * @private
         */
        public offsetX: number = 0;
        /**
         * @private
         */
        public offsetY: number = 0;
        /**
         * @private
         */
        private offsetMatrix: Matrix = new Matrix();
        /**
         * @private
         * 显示列表根节点
         */
        public root: DisplayObject;

        /**
         * @private
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        public setClipRect(width: number, height: number): void {
            width *= DisplayList.$canvasScaleX;
            height *= DisplayList.$canvasScaleY;
            this.renderBuffer.resize(width, height);
        }

        public $canvasScaleX: number = 1;
        public $canvasScaleY: number = 1;

        /**
         * @private
         * 绘制根节点显示对象到目标画布，返回draw的次数。
         */
        public drawToSurface(): number {
            let drawCalls = 0;
            //for 3D&2D
            //主动调用时需要清理，通过stage被动调用不需要

            this.$canvasScaleX = this.offsetMatrix.a = DisplayList.$canvasScaleX;
            this.$canvasScaleY = this.offsetMatrix.d = DisplayList.$canvasScaleY;

            if (!this.isStage) {//对非舞台画布要根据目标显示对象尺寸改变而改变。
                this.changeSurfaceSize();
            }
            let buffer = this.renderBuffer;
            //for 3D&2D
            //主动调用时需要清理，通过stage被动调用不需要

            buffer.clear();


            drawCalls = systemRenderer.render(this.root, buffer, this.offsetMatrix);

            if (!this.isStage) {//对非舞台画布要保存渲染节点。
                let surface = buffer.surface;
                let renderNode = <BitmapNode>this.$renderNode;
                renderNode.drawData.length = 0;
                let width = surface.width;
                let height = surface.height;
                if (!this.bitmapData) {
                    this.bitmapData = new Turkey.BitmapData(surface);
                }
                else {
                    this.bitmapData.source = surface;
                    this.bitmapData.width = width;
                    this.bitmapData.height = height;
                }
                renderNode.image = this.bitmapData;
                renderNode.imageWidth = width;
                renderNode.imageHeight = height;
                renderNode.drawImage(0, 0, width, height, -this.offsetX, -this.offsetY, width / this.$canvasScaleX, height / this.$canvasScaleY);
            }

            return drawCalls;
        }
        /**
         * @private
         * stage渲染
         */
        public $stageRenderToSurface() {
            systemRenderer.render(this.root, this.renderBuffer, this.offsetMatrix);
        }

        private bitmapData: Turkey.BitmapData;

        /**
         * @private
         * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
         */
        public changeSurfaceSize(): void {
            let root = this.root;
            let oldOffsetX = this.offsetX;
            let oldOffsetY = this.offsetY;
            let bounds = this.root.$getOriginalBounds();
            var scaleX = this.$canvasScaleX;
            var scaleY = this.$canvasScaleY;
            this.offsetX = -bounds.x;
            this.offsetY = -bounds.y;
            this.offsetMatrix.setTo(this.offsetMatrix.a, 0, 0, this.offsetMatrix.d, this.offsetX, this.offsetY);
            let buffer = this.renderBuffer;
            //在chrome里，小等于256*256的canvas会不启用GPU加速。
            let width = Math.max(257, bounds.width * scaleX);
            let height = Math.max(257, bounds.height * scaleY);
            if (this.offsetX == oldOffsetX &&
                this.offsetY == oldOffsetY &&
                buffer.surface.width == width &&
                buffer.surface.height == height) {
                return;
            }
            buffer.resize(width, height);
        }

        public static $canvasScaleFactor: number = 1;

        /**
         * @private
         */
        public static $canvasScaleX: number = 1;
        public static $canvasScaleY: number = 1;

        /**
         * @private
         */
        public static $setCanvasScale(x: number, y: number): void {
            DisplayList.$canvasScaleX = x;
            DisplayList.$canvasScaleY = y;
        }
    }
}