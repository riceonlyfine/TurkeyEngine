namespace Turkey.sys{

      /**
     * @private
     * 粒子渲染节点
     */
    export class ParticleNode extends RenderNode {

        public constructor() {
            super();
            this.type = RenderNodeType.ParticleNode;
            this.renderCount = 1;
        }
        /**
         * 要绘制的位图
         */
        public image: BitmapData = null;
        /**
         * 顶点坐标。
         */
        public vertices: Float32Array;
        /**
         * 使用的混合模式
         */
        public blendMode: number = null;
        /**
         * 粒子绘制数量
         */
        public numParticles: number = null;
        /**
         * 粒子属性数量
         */
        public numProperties: number = null;

        /**
         * 在显示对象的$updateRenderNode()方法被调用前，自动清空自身的drawData数据。
         */
        public cleanBeforeRender(): void {
            
        }
    }
}