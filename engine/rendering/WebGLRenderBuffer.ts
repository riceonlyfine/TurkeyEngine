namespace Turkey.web {

    /**
     * @private
     * WebGL渲染缓存
     */
    export class WebGLRenderBuffer extends HashObject implements sys.RenderBuffer {

        public static autoClear: boolean = true;

        /**
         * 渲染上下文
         */
        public context: WebGLRenderContext;

        /**
         * 如果是普通缓存，为renderTarget
         */
        public surface: WebGLRenderTarget;

        /**
         * root render target
         * 根渲染目标，用来执行主渲染
         */
        public rootRenderTarget: WebGLRenderTarget;


        public constructor(width?: number, height?: number) {
            super();
            // 获取webglRenderContext
            this.context = WebGLRenderContext.getInstance();

            // buffer 对应的 render target
            this.rootRenderTarget = new WebGLRenderTarget(this.context.context, 3, 3);
            if (width && height) {
                this.resize(width, height);
            }

            // 由于创建renderTarget造成的frameBuffer绑定，这里重置绑定
            let lastBuffer = this.context.activatedBuffer;
            if (lastBuffer) {
                lastBuffer.rootRenderTarget.activate();
            }
            this.rootRenderTarget.initFrameBuffer();
            this.surface = this.rootRenderTarget;
            
        }

        public globalAlpha: number = 1;
        /**
         * stencil state
         * 模版开关状态
         */
        private stencilState: boolean = false;
        public $stencilList: { x: number, y: number, width: number, height: number }[] = [];
        public stencilHandleCount: number = 0;

        public enableStencil(): void {
            if (!this.stencilState) {
                this.context.enableStencilTest();
                this.stencilState = true;
            }
        }

        public disableStencil(): void {
            if (this.stencilState) {
                this.context.disableStencilTest();
                this.stencilState = false;
            }
        }

        public restoreStencil(): void {
            if (this.stencilState) {
                this.context.enableStencilTest();
            } else {
                this.context.disableStencilTest();
            }
        }

        /**
         * scissor state
         * scissor 开关状态  
         */
        public $scissorState: boolean = false;
        private scissorRect: Rectangle = new Turkey.Rectangle();
        public $hasScissor: boolean = false;

        public enableScissor(x: number, y: number, width: number, height: number): void {
            if (!this.$scissorState) {
                this.$scissorState = true;
                this.scissorRect.setTo(x, y, width, height);
                this.context.enableScissorTest(this.scissorRect);
            }
        }

        public disableScissor(): void {
            if (this.$scissorState) {
                this.$scissorState = false;
                this.scissorRect.setEmpty();
                this.context.disableScissorTest();
            }
        }

        public restoreScissor(): void {
            if (this.$scissorState) {
                this.context.enableScissorTest(this.scissorRect);
            } else {
                this.context.disableScissorTest();
            }
        }

        /**
         * 渲染缓冲的宽度，以像素为单位。
         * @readOnly
         */
        public get width(): number {
            return this.rootRenderTarget.width;
        }

        /**
         * 渲染缓冲的高度，以像素为单位。
         * @readOnly
         */
        public get height(): number {
            return this.rootRenderTarget.height;
        }

        /**
         * 改变渲染缓冲的大小并清空缓冲区
         * @param width 改变后的宽
         * @param height 改变后的高
         * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
         */
        public resize(width: number, height: number, useMaxSize?: boolean): void {
            width = width || 1;
            height = height || 1;
            this.context.pushBuffer(this);
            // render target 尺寸重置
            if (width != this.rootRenderTarget.width || height != this.rootRenderTarget.height) {
                this.context.drawCmdManager.pushResize(this, width, height);
                // 同步更改宽高
                this.rootRenderTarget.width = width;
                this.rootRenderTarget.height = height;
            }
            // surface大小不随之改变
            this.context.clear();
            this.context.popBuffer();
        }


        public $pushResize(width: number, height: number) {
            this.context.drawCmdManager.pushResize(this, width, height);
        }

        /**
         * 获取指定区域的像素
         */
        public getPixels(x: number, y: number, width: number = 1, height: number = 1): number[] {
            let pixels = new Uint8Array(4 * width * height);

            
            let useFrameBuffer = this.rootRenderTarget.useFrameBuffer;
            this.rootRenderTarget.useFrameBuffer = true;
            this.rootRenderTarget.activate();

            this.context.getPixels(x, y, width, height, pixels);

            this.rootRenderTarget.useFrameBuffer = useFrameBuffer;
            this.rootRenderTarget.activate();
            
            //图像反转
            let result = new Uint8Array(4 * width * height);
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    let index1 = (width * (height - i - 1) + j) * 4;
                    let index2 = (width * i + j) * 4;
                    let a = pixels[index2 + 3];
                    result[index1] = Math.round(pixels[index2] / a * 255);
                    result[index1 + 1] = Math.round(pixels[index2 + 1] / a * 255);
                    result[index1 + 2] = Math.round(pixels[index2 + 2] / a * 255);
                    result[index1 + 3] = pixels[index2 + 3];
                }
            }

            return <number[]><any>result;
        }

        /**
         * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
         * @param type 转换的类型，如: "image/png","image/jpeg"
         */
        public toDataURL(type?: string, encoderOptions?: number): string {
            return this.context.surface.toDataURL(type, encoderOptions);
        }

        /**
         * 销毁绘制对象
         */
        public destroy(): void {
            this.context.destroy();
        }

        public onRenderFinish(): void {
            this.$drawCalls = 0;
        }
      

        /**
         * 清空缓冲区数据
         */
        public clear(): void {
            this.context.pushBuffer(this);
            this.context.clear();
            this.context.popBuffer();
        }

        public $drawCalls: number = 0;
        public $computeDrawCall: boolean = false;

        public globalMatrix: Matrix = new Matrix();
        public savedGlobalMatrix: Matrix = new Matrix();

        public $offsetX: number = 0;
        public $offsetY: number = 0;

        public setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
            // this.globalMatrix.setTo(a, b, c, d, tx, ty);
            let matrix = this.globalMatrix;
            matrix.a = a;
            matrix.b = b;
            matrix.c = c;
            matrix.d = d;
            matrix.tx = tx;
            matrix.ty = ty;
        }

        public transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void {
            let matrix = this.globalMatrix;
            let a1 = matrix.a;
            let b1 = matrix.b;
            let c1 = matrix.c;
            let d1 = matrix.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                matrix.a = a * a1 + b * c1;
                matrix.b = a * b1 + b * d1;
                matrix.c = c * a1 + d * c1;
                matrix.d = c * b1 + d * d1;
            }
            matrix.tx = tx * a1 + ty * c1 + matrix.tx;
            matrix.ty = tx * b1 + ty * d1 + matrix.ty;
        }

        public useOffset(): void {
            let self = this;
            if (self.$offsetX != 0 || self.$offsetY != 0) {
                self.globalMatrix.append(1, 0, 0, 1, self.$offsetX, self.$offsetY);
                self.$offsetX = self.$offsetY = 0;
            }
        }

        public saveTransform(): void {
            let matrix = this.globalMatrix;
            let sMatrix = this.savedGlobalMatrix;
            sMatrix.a = matrix.a;
            sMatrix.b = matrix.b;
            sMatrix.c = matrix.c;
            sMatrix.d = matrix.d;
            sMatrix.tx = matrix.tx;
            sMatrix.ty = matrix.ty;
        }

        public restoreTransform(): void {
            let matrix = this.globalMatrix;
            let sMatrix = this.savedGlobalMatrix;
            matrix.a = sMatrix.a;
            matrix.b = sMatrix.b;
            matrix.c = sMatrix.c;
            matrix.d = sMatrix.d;
            matrix.tx = sMatrix.tx;
            matrix.ty = sMatrix.ty;
        }

        /**
         * 创建一个buffer实例
         */
        public static create(width: number, height: number): WebGLRenderBuffer {
            let buffer = renderBufferPool.pop();
            if (buffer) {
                buffer.resize(width, height);
                var matrix = buffer.globalMatrix;
                matrix.a = 1;
                matrix.b = 0;
                matrix.c = 0;
                matrix.d = 1;
                matrix.tx = 0;
                matrix.ty = 0;
                buffer.globalAlpha = 1;
                buffer.$offsetX = 0;
                buffer.$offsetY = 0;
            }
            else {
                buffer = new WebGLRenderBuffer(width, height);
                buffer.$computeDrawCall = false;
            }
            return buffer;
        }

        /**
         * 回收一个buffer实例
         */
        public static release(buffer: WebGLRenderBuffer): void {
            renderBufferPool.push(buffer);
        }

    }

    let renderBufferPool: WebGLRenderBuffer[] = [];//渲染缓冲区对象池
}
