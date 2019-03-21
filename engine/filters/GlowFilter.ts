namespace Turkey{

     /**
     * @class egret.GlowFilter
     * @classdesc
     * 使用 GlowFilter 类可以对显示对象应用发光效果。在投影滤镜的 distance 和 angle 属性设置为 0 时，发光滤镜与投影滤镜极为相似。
     * @extends egret.Filter
     * @version Egret 3.1.4
     * @platform Web,Native
     */
    export class GlowFilter extends Filter {
        /**
         * @private
         */
        public $red:number;
        /**
         * @private
         */
        public $green:number;
        /**
         * @private
         */
        public $blue:number;
   
        /**
         * 初始化 GlowFilter 对象
         * @method egret.GlowFilter#constructor
         * @param color {number} 光晕颜色，采用十六进制格式 0xRRGGBB。默认值为 0xFF0000。
         * @param alpha {number} 颜色的 Alpha 透明度值。有效值为 0 到 1。例如，0.25 设置透明度值为 25%。
         * @param blurX {number} 水平模糊量。有效值为 0 到 255（浮点）。
         * @param blurY {number} 垂直模糊量。有效值为 0 到 255（浮点）。
         * @param strength {number} 印记或跨页的强度。该值越高，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。
         * @param quality {number} 应用滤镜的次数。暂未实现。
         * @param inner {boolean} 指定发光是否为内侧发光。值 true 指定发光是内侧发光。值 false 指定发光是外侧发光（对象外缘周围的发光）。
         * @param knockout {number} 指定对象是否具有挖空效果。值为 true 将使对象的填充变为透明，并显示文档的背景颜色。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        constructor(color:number = 0xFF0000, alpha:number = 1.0, blurX:number = 6.0, blurY:number = 6.0, strength:number = 2, quality:number = 1, inner:boolean = false, knockout:boolean = false) {
            super();
            let self = this;
            self.type = "glow";

            self.$color = color;
            self.$blue = color & 0x0000FF;
            self.$green = (color & 0x00ff00) >> 8;
            self.$red = color >> 16;
            self.$alpha = alpha;
            self.$blurX = blurX;
            self.$blurY = blurY;
            self.$strength = strength;
            self.$quality = quality;
            self.$inner = inner;
            self.$knockout = knockout;

            self.$uniforms.color = {x: this.$red / 255, y: this.$green / 255, z: this.$blue / 255, w: 1};
            self.$uniforms.alpha = alpha;
            self.$uniforms.blurX = blurX;
            self.$uniforms.blurY = blurY;
            self.$uniforms.strength = strength;
            // this.$uniforms.quality = quality;
            self.$uniforms.inner = inner ? 1 : 0;
            self.$uniforms.knockout = knockout ? 0 : 1;

            self.$uniforms.dist = 0;
            self.$uniforms.angle = 0;
            self.$uniforms.hideObject = 0;

            self.onPropertyChange();
        }

        /**
         * @private
         */
        public $color:number;

      
        /**
         * 光晕颜色。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get color():number {
            return this.$color;
        }

        public set color(value:number) {
            if(this.$color == value) {
                return;
            }
            this.$color = value;
            this.$blue = value & 0x0000FF;
            this.$green = (value & 0x00ff00) >> 8;
            this.$red = value >> 16;
            this.$uniforms.color.x = this.$red / 255;
            this.$uniforms.color.y = this.$green / 255;
            this.$uniforms.color.z = this.$blue / 255;
        }

        /**
         * @private
         */
        public $alpha:number;

      
        /**
         * 颜色的 Alpha 透明度值。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get alpha():number {
            return this.$alpha;
        }

        public set alpha(value:number) {
            if(this.$alpha == value) {
                return;
            }
            this.$alpha = value;
            this.$uniforms.alpha = value;
        }

        /**
         * @private
         */
        public $blurX:number;

    
        /**
         * 水平模糊量。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get blurX():number {
            return this.$blurX;
        }

        public set blurX(value:number) {
            let self = this;
            if(self.$blurX == value) {
                return;
            }
            self.$blurX = value;
            self.$uniforms.blurX = value;
            self.onPropertyChange();
        }

        /**
         * @private
         */
        public $blurY:number;

        /**
         * 垂直模糊量。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get blurY():number {
            return this.$blurY;
        }

        public set blurY(value:number) {
            let self = this;
            if(self.$blurY == value) {
                return;
            }
            self.$blurY = value;
            self.$uniforms.blurY = value;
            self.onPropertyChange();
        }

        /**
         * @private
         */
        public $strength:number;

    
        /**
         * 印记或跨页的强度。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get strength():number {
            return this.$strength;
        }

        public set strength(value:number) {
            if(this.$strength == value) {
                return;
            }
            this.$strength = value;
            this.$uniforms.strength = value;
        }

        /**
         * @private
         */
        public $quality:number;

    
        /**
         * 应用滤镜的次数。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get quality():number {
            return this.$quality;
        }

        public set quality(value:number) {
            if(this.$quality == value) {
                return;
            }
            this.$quality = value;
        }

        /**
         * @private
         */
        public $inner:boolean;

        /**
         * 指定发光是否为内侧发光。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get inner():boolean {
            return this.$inner;
        }

        public set inner(value:boolean) {
            if(this.$inner == value) {
                return;
            }
            this.$inner = value;
            this.$uniforms.inner = value ? 1 : 0;
        }

        /**
         * @private
         */
        public $knockout:boolean;

 
        /**
         * 指定对象是否具有挖空效果。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        public get knockout():boolean {
            return this.$knockout;
        }

        public set knockout(value:boolean) {
            if(this.$knockout == value) {
                return;
            }
            this.$knockout = value;
            this.$uniforms.knockout = value ? 0 : 1;
        }

        /**
         * @private
         */
        public $toJson():string {
            return '{"color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + '}';
        }

        protected updatePadding():void {
            let self = this;
            self.paddingLeft = self.blurX;
            self.paddingRight = self.blurX;
            self.paddingTop = self.blurY;
            self.paddingBottom = self.blurY;
        }
    }
}