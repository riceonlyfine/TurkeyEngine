namespace Turkey{

    /**
     * 可使用 BlurFilter 类将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。
     * 您可以生成一些模糊效果，范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
     * @version Egret 3.1.0
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947#模糊滤镜 模糊滤镜
     * @language zh_CN
     */
    export class BlurFilter extends Filter {
  
        /**
         * 创建一个 BlurFilter 对象。
         * @param blurX {number} 水平模糊量。有效值为 0 到 255（浮点）。
         * @param blurY {number} 垂直模糊量。有效值为 0 到 255（浮点）。
         * @param quality {number} 应用滤镜的次数。暂未实现。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        constructor(blurX:number = 4, blurY:number = 4, quality:number = 1) {
            super();
            let self = this;
            self.type = "blur";
            self.$blurX = blurX;
            self.$blurY = blurY;
            self.$quality = quality;

            self.blurXFilter = new BlurXFilter(blurX);

            self.blurYFilter = new BlurYFilter(blurY);

            self.onPropertyChange();
        }

        /**
         * @private
         */
        public blurXFilter:IBlurXFilter;

        /**
         * @private
         */
        public blurYFilter:IBlurYFilter;

        /**
         * @private
         */
        public $quality:number;
        
     
        /**
         * 水平模糊量。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        public get blurX():number {
            return this.$blurX;
        }

        public set blurX(value:number) {
            let self = this;
            if (self.$blurX == value) {
                return;
            }
            self.$blurX = value;
            self.blurXFilter.blurX = value;
            self.onPropertyChange();
        }
        
        /**
         * @private
         */
        public $blurX:number;
        

        /**
         * 垂直模糊量。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        public get blurY():number {
            return this.$blurY;
        }

        public set blurY(value:number) {
            let self = this;
            if (self.$blurY == value) {
                return;
            }
            self.$blurY = value;
            self.blurYFilter.blurY = value;
            self.onPropertyChange();
        }
        
        /**
         * @private
         */
        public $blurY:number;

        /**
         * @private
         */
        public $toJson():string {
            return '{"blurX": ' + this.$blurX + ', "blurY": ' + this.$blurY + ', "quality": 1}';
        }

        protected updatePadding(): void {
            let self = this;
            self.paddingLeft = self.blurX;
            self.paddingRight = self.blurX;
            self.paddingTop = self.blurY;
            self.paddingBottom = self.blurY;
        }

        public onPropertyChange(): void {
            let self = this;
            self.updatePadding();
        }
    }

    /**
     * @private 
     */
    export interface IBlurXFilter extends Filter {
        type:string;
        $uniforms:any;
        blurX:number;
    }

    /**
     * @private 
     */
    export interface IBlurYFilter extends Filter {
        type:string;
        $uniforms:any;
        blurY:number;
    }

    class BlurXFilter extends Filter implements IBlurXFilter {
        constructor(blurX:number = 4) {
            super();

          
            this.type = "blurX";
            

            this.$uniforms.blur = { x: blurX, y: 0 };
            this.onPropertyChange();
        }

        public set blurX(value:number) {
            this.$uniforms.blur.x = value;
        }

        public get blurX():number {
            return this.$uniforms.blur.x;
        }
    }

    class BlurYFilter extends Filter implements IBlurYFilter {
        constructor(blurY:number = 4) {
            super();

            
            this.type = "blurY";

            this.$uniforms.blur = { x: 0, y: blurY };
            this.onPropertyChange();
        }

        public set blurY(value:number) {
            this.$uniforms.blur.y = value;
        }

        public get blurY():number {
            return this.$uniforms.blur.y;
        }
    }
}