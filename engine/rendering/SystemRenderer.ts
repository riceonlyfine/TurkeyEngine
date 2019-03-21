namespace Turkey.sys{

     /**
     * @private
     */
    export let systemRenderer:SystemRenderer;
    /**
     * @private
     * 用于碰撞检测绘制
     */
    export let canvasRenderer:SystemRenderer;
    /**
     * @private
     * 显示渲染器接口
     */
    export interface SystemRenderer {

        /**
         * 渲染一个显示对象
         * @param displayObject 要渲染的显示对象
         * @param buffer 渲染缓冲
         * @param matrix 要叠加的矩阵
         * @param forRenderTexture 绘制目标是RenderTexture的标志
         * @returns drawCall触发绘制的次数
         */
        render(displayObject:DisplayObject, buffer:RenderBuffer, matrix:Matrix, forRenderTexture?:boolean):number;

        
        /**
         * 将一个RenderNode对象绘制到渲染缓冲
         * @param node 要绘制的节点
         * @param buffer 渲染缓冲
         * @param matrix 要叠加的矩阵
         * @param forHitTest 绘制结果是用于碰撞检测。若为true，当渲染GraphicsNode时，会忽略透明度样式设置，全都绘制为不透明的。
         */
        drawNodeToBuffer(node:sys.RenderNode, buffer:RenderBuffer, matrix:Matrix, forHitTest?:boolean):void;
    }

}