namespace Turkey.web {

    /**
     * @private
     * WebGLRenderTarget类
     * 一个WebGL渲染目标，拥有一个frame buffer和texture
     */
    export class WebGLRenderTarget extends HashObject {

        private gl: WebGLRenderingContext;

        /**
         * 存储着绘制结果的texture
         * 某些场景下是否需要一个切换方法？
         */
        public texture: WebGLTexture;

        /**
         * 是否启用frame buffer, 默认为true
         */
        public useFrameBuffer: boolean = true;
        private frameBuffer: WebGLFramebuffer;

        private stencilBuffer: WebGLRenderbuffer;

        /**
         * render target 的尺寸，与texture和stencil buffer的尺寸一致
         */
        public width: number;
        public height: number;

        /**
         * 清除色
         */
        public clearColor = [0, 0, 0, 0];

        public constructor(gl: WebGLRenderingContext, width: number, height: number) {
            super();
            this.gl = gl;

            // 如果尺寸为 0 chrome会报警
            this.width = width || 1;
            this.height = height || 1;
        }

        /**
         * 重置render target的尺寸
         */
        public resize(width: number, height: number): void {
            let gl = this.gl;
            this.width = width;
            this.height = height;

            if (this.frameBuffer) {
                // 设置texture尺寸
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                // gl.bindTexture(gl.TEXTURE_2D, null);
            }

            if (this.stencilBuffer) {
                gl.deleteRenderbuffer(this.stencilBuffer);
                this.stencilBuffer = null;
            }
        }

        /**
         * 激活此render target
         */
        public activate(): void {
            let gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.getFrameBuffer());
        }

        /**
         * 获取frame buffer
         */
        private getFrameBuffer(): WebGLFramebuffer {
            if (!this.useFrameBuffer) {
                return null;
            }
            return this.frameBuffer;
        }

        public initFrameBuffer(): void {
            if (!this.frameBuffer) {
                let gl = this.gl;
                // 创建材质
                this.texture = this.createTexture();

                // 创建frame buffer
                this.frameBuffer = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

                // 绑定材质
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
            }
        }

        /**
         * 创建材质
         * TODO 创建材质的方法可以合并
         */
        private createTexture(): WebGLTexture {
            let gl = this.gl;

            let texture: WebGLTexture = gl.createTexture();
            texture["glContext"] = gl;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            return texture;
        }

        /**
         * 清除render target颜色缓存
         */
        public clear(bind?: boolean) {
            let gl = this.gl;

            if (bind) {
                this.activate();
            }

            gl.colorMask(true, true, true, true);
            gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        public enabledStencil(): void {
            if (!this.frameBuffer || this.stencilBuffer) {
                return;
            }
            let gl = this.gl;

            // 设置render buffer的尺寸
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);// 是否需要强制绑定？

            // 绑定stencil buffer
            this.stencilBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencilBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencilBuffer);

            // 此处不解绑是否会造成bug？
            // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        public dispose():void {
            WebGLUtils.deleteWebGLTexture(this.texture);
        }
    }
}