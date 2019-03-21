namespace Turkey{

    /**
     * 使用 ColorMatrixFilter 类可以将 4 x 5 矩阵转换应用于输入图像上的每个像素的 RGBA 颜色和 Alpha 值，以生成具有一组新的 RGBA 颜色和 Alpha 值的结果。
     * 该类允许饱和度更改、色相旋转、亮度为 Alpha 以及各种其他效果。
     * @version Egret 3.1.0
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947 颜色矩阵滤镜
     * @language zh_CN
     */
    export class ColorMatrixFilter extends Filter {
        /**
         * @private
         */
        public $matrix:number[] = [];
        /**
         * @private
         */
        private matrix2:number[] = [];

  
        /**
         * 创建一个 ColorMatrixFilter 对象。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        constructor(matrix:number[] = null) {
            super();
            this.type = "colorTransform";
            this.$uniforms.matrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            this.$uniforms.colorAdd = {x: 0, y: 0, z: 0, w: 0};
            this.setMatrix(matrix);
            this.onPropertyChange(); 
        }


        /**
         * 构成应用于所呈示的元素的一个 4x5 矩阵的、以逗号分隔的 20 个双精度数的列表。
         * 矩阵以行作为主要顺序，即用第一行五个元素乘以矢量 [srcR,srcG,srcB,srcA,1] 以确定输出的红色值，用第二行的五个元素确定输出的绿色值，等等。
         * 该值必须为 20 个数字组成的数组或以逗号分隔的字符串。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        public get matrix():number[] {
            for (let i = 0; i < 20; i++) {
                this.matrix2[i] = this.$matrix[i];
            }
            return this.matrix2;
        }

        public set matrix(value:number[]) {
            this.setMatrix(value);
        }

        /**
         * @private
         */
        private setMatrix(value:number[]):void {
            if(value) {
                for (let i = 0; i < 20; i++) {
                    this.$matrix[i] = value[i];
                } 
            } else {
                for (let i = 0; i < 20; i++) {
                    this.$matrix[i] = (i == 0 || i == 6 || i == 12 || i == 18) ? 1 : 0;
                } 
            }

            let $matrix = this.$matrix;
            let matrix = this.$uniforms.matrix;
            let colorAdd = this.$uniforms.colorAdd;

            for(let i = 0, j = 0; i < $matrix.length; i++) {
                if(i === 4) {
                    colorAdd.x = $matrix[i] / 255;
                } else if(i === 9) {
                    colorAdd.y = $matrix[i] / 255;
                } else if(i === 14) {
                    colorAdd.z = $matrix[i] / 255;
                } else if(i === 19) {
                    colorAdd.w = $matrix[i] / 255;
                } else {
                    matrix[j] = $matrix[i];
                    j++;
                }
            }
            this.onPropertyChange();
        }

        /**
         * @private
         */
        public $toJson():string {
            return '{"matrix": [' + this.$matrix.toString() + ']}';
        }
    }

}