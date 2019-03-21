namespace Turkey.web{

    /**
     * @private
     * 顶点数组管理对象
     * 用来维护顶点数组
     */
    export class WebGLVertexArrayObject {

        private size: number;
        private vertexMaxSize: number;
        private indicesMaxSize: number;
        public vertSize: number = 4;

        private indices: Uint16Array;
        public indicesForMesh: Uint16Array;

        //为了实现drawNormalImage绘制，将这三个属性设为public
        public float32Array: Float32Array;
        public uint32Array: Uint32Array;
        public vertexIndex: number = 0;
        public indexIndex: number = 0;

        public hasMesh: boolean = false;

        private vertexActualSize: number;

        public constructor() {

        }

        public setBatchSize(size: number): boolean {
            if (this.size != size) {
                this.size = size;
                this.vertexMaxSize = this.size * 4;
                this.indicesMaxSize = this.size * 6;
                let numVerts = this.vertexMaxSize * this.vertSize;
                let numIndices = this.indicesMaxSize;

                const buffer = new ArrayBuffer(numVerts * 4);
                this.float32Array = new Float32Array(buffer);
                this.uint32Array = new Uint32Array(buffer);
                this.indices = new Uint16Array(numIndices);
                this.indicesForMesh = new Uint16Array(numIndices);
                for (let i = 0, j = 0; i < numIndices; i += 6, j += 4) {
                    this.indices[i + 0] = j + 0;
                    this.indices[i + 1] = j + 1;
                    this.indices[i + 2] = j + 2;
                    this.indices[i + 3] = j + 0;
                    this.indices[i + 4] = j + 2;
                    this.indices[i + 5] = j + 3;
                }
                //用于drawImageByRenderNode 计算
                this.vertexActualSize = this.vertexMaxSize - 4;
                return true;
            }
            return false;
        }

        /**
         * 获取缓存完成的顶点数组
         */
        public getVertices(): any {
            let view = this.float32Array;
            return view;
        }

        /**
         * 获取缓存完成的索引数组
         */
        public getIndices(): any {
            return this.indices;
        }

        /**
         * 获取缓存完成的mesh索引数组
         */
        public getMeshIndices(): any {
            return this.indicesForMesh;
        }

        /**
         * 切换成mesh索引缓存方式
         */
        public changeToMeshIndices(): void {
            if (!this.hasMesh) {
                // 拷贝默认index信息到for mesh中
                for (let i = 0, l = this.indexIndex; i < l; ++i) {
                    this.indicesForMesh[i] = this.indices[i];
                }

                this.hasMesh = true;
            }
        }

        /**
         * 缓存一组顶点
         */
        public cacheArrays(buffer: WebGLRenderBuffer, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number,
            destX: number, destY: number, destWidth: number, destHeight: number, textureSourceWidth: number, textureSourceHeight: number,
            meshUVs?: number[], meshVertices?: number[], meshIndices?: number[], rotated?: boolean): void {
            let alpha = buffer.globalAlpha;
            //计算出绘制矩阵，之后把矩阵还原回之前的
            let locWorldTransform = buffer.globalMatrix;

            let a = locWorldTransform.a;
            let b = locWorldTransform.b;
            let c = locWorldTransform.c;
            let d = locWorldTransform.d;
            let tx = locWorldTransform.tx;
            let ty = locWorldTransform.ty;

            let offsetX = buffer.$offsetX;
            let offsetY = buffer.$offsetY;
            if (offsetX != 0 || offsetY != 0) {
                tx = offsetX * a + offsetY * c + tx;
                ty = offsetX * b + offsetY * d + ty;
            }

            if (!meshVertices) {
                if (destX != 0 || destY != 0) {
                    tx = destX * a + destY * c + tx;
                    ty = destX * b + destY * d + ty;
                }

                let a1 = destWidth / sourceWidth;
                if (a1 != 1) {
                    a = a1 * a;
                    b = a1 * b;
                }
                let d1 = destHeight / sourceHeight;
                if (d1 != 1) {
                    c = d1 * c;
                    d = d1 * d;
                }
            }

            if (meshVertices) {
                // 计算索引位置与赋值
                let float32Array = this.float32Array;
                let uint32Array = this.uint32Array;
                let index = this.vertexIndex * this.vertSize;
                // 缓存顶点数组
                let i = 0, iD = 0, l = 0;
                let u = 0, v = 0, x = 0, y = 0;
                for (i = 0, l = meshUVs.length; i < l; i += 2) {
                    iD = index + i * 4 / 2;
                    x = meshVertices[i];
                    y = meshVertices[i + 1];
                    u = meshUVs[i];
                    v = meshUVs[i + 1];
                    // xy
                    float32Array[iD + 0] = a * x + c * y + tx;
                    float32Array[iD + 1] = b * x + d * y + ty;
                    // uv
                    if (rotated) {
                        uint32Array[iD + 2] = (((sourceY + u * sourceWidth) / textureSourceHeight * 65535) << 16) | ((sourceX + (1.0 - v) * sourceHeight) / textureSourceWidth * 65535)
                    }
                    else {
                        uint32Array[iD + 2] = (((sourceY + v * sourceHeight) / textureSourceHeight * 65535) << 16) | ((sourceX + u * sourceWidth) / textureSourceWidth * 65535);
                    }
                    // alpha
                    float32Array[iD + 3] = alpha;
                }
                // 缓存索引数组
                if (this.hasMesh) {
                    for (let i = 0, l = meshIndices.length; i < l; ++i) {
                        this.indicesForMesh[this.indexIndex + i] = meshIndices[i] + this.vertexIndex;
                    }
                }
                this.vertexIndex += meshUVs.length / 2;
                this.indexIndex += meshIndices.length;
            } else {
                let width = textureSourceWidth;
                let height = textureSourceHeight;
                let w = sourceWidth;
                let h = sourceHeight;
                sourceX = sourceX / width;
                sourceY = sourceY / height;
                let float32Array = this.float32Array;
                let uint32Array = this.uint32Array;
                let index = this.vertexIndex * this.vertSize;
                if (rotated) {
                    let temp = sourceWidth;
                    sourceWidth = sourceHeight / width;
                    sourceHeight = temp / height;
                    // xy
                    float32Array[index++] = tx;
                    float32Array[index++] = ty;
                    // uv
                    uint32Array[index++] = ((sourceY * 65535) << 16) | ((sourceWidth + sourceX) * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = a * w + tx;
                    float32Array[index++] = b * w + ty;
                    // uv
                    uint32Array[index++] = (((sourceHeight + sourceY) * 65535) << 16) | ((sourceWidth + sourceX) * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = a * w + c * h + tx;
                    float32Array[index++] = d * h + b * w + ty;
                    // uv
                    uint32Array[index++] = (((sourceHeight + sourceY) * 65535) << 16) | (sourceX * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = c * h + tx;
                    float32Array[index++] = d * h + ty;
                    // uv
                    uint32Array[index++] = ((sourceY * 65535) << 16) | (sourceX * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                }
                else {
                    sourceWidth = sourceWidth / width;
                    sourceHeight = sourceHeight / height;
                    // xy
                    float32Array[index++] = tx;
                    float32Array[index++] = ty;
                    // uv
                    uint32Array[index++] = ((sourceY * 65535) << 16) | (sourceX * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = a * w + tx;
                    float32Array[index++] = b * w + ty;
                    // uv
                    uint32Array[index++] = ((sourceY * 65535) << 16) | ((sourceWidth + sourceX) * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = a * w + c * h + tx;
                    float32Array[index++] = d * h + b * w + ty;
                    // uv
                    uint32Array[index++] = (((sourceHeight + sourceY) * 65535) << 16) | ((sourceWidth + sourceX) * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                    // xy
                    float32Array[index++] = c * h + tx;
                    float32Array[index++] = d * h + ty;
                    // uv
                    uint32Array[index++] = (((sourceHeight + sourceY) * 65535) << 16) | (sourceX * 65535);
                    // alpha
                    float32Array[index++] = alpha;
                }
                // 缓存索引数组
                if (this.hasMesh) {
                    let indicesForMesh = this.indicesForMesh;
                    indicesForMesh[this.indexIndex + 0] = 0 + this.vertexIndex;
                    indicesForMesh[this.indexIndex + 1] = 1 + this.vertexIndex;
                    indicesForMesh[this.indexIndex + 2] = 2 + this.vertexIndex;
                    indicesForMesh[this.indexIndex + 3] = 0 + this.vertexIndex;
                    indicesForMesh[this.indexIndex + 4] = 2 + this.vertexIndex;
                    indicesForMesh[this.indexIndex + 5] = 3 + this.vertexIndex;
                }

                this.vertexIndex += 4;
                this.indexIndex += 6;
            }
        }

        public clear(): void {
            this.hasMesh = false;
            this.vertexIndex = 0;
            this.indexIndex = 0;
        }

    }

}