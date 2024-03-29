namespace Turkey{

    let PI = Math.PI;
    let TwoPI = PI * 2;
    let DEG_TO_RAD: number = PI / 180;

    let matrixPool: Matrix[] = [];

    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     * @language zh_CN
     */
    export class Matrix extends HashObject {

     
        /**
         * 释放一个Matrix实例到对象池
         * @param matrix 需要回收的 matrix
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static release(matrix: Matrix): void {
            if (!matrix) {
                return;
            }
            matrixPool.push(matrix);
        }

      
        /**
         * 从对象池中取出或创建一个新的Matrix对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static create(): Matrix {
            let matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        }

    
        /**
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {
            super();
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

     
        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public a: number;
     
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public b: number;
 
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public c: number;
 
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public d: number;
 
        /**
         * 沿 x 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public tx: number;

  
        /**
         * 沿 y 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public ty: number;

        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public clone(): Matrix {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        }

        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。在数学术语中，将两个矩阵连接起来与使用矩阵乘法将它们结合起来是相同的。
         * @param other 要连接到源矩阵的矩阵。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public concat(other: Matrix): void {
            let a = this.a * other.a;
            let b = 0.0;
            let c = 0.0;
            let d = this.d * other.d;
            let tx = this.tx * other.a + other.tx;
            let ty = this.ty * other.d + other.ty;

            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += this.b * other.c;
                d += this.c * other.b;
                b += this.a * other.b + this.b * other.d;
                c += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }

            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

    
        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         * @param other 要拷贝的目标矩阵
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public copyFrom(other: Matrix): Matrix {
            this.a = other.a;
            this.b = other.b;
            this.c = other.c;
            this.d = other.d;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        }


        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public identity(): void {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        }


        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public invert(): void {
            this.$invertInto(this);
        }

        /**
         * @private
         */
        $invertInto(target: Matrix): void {
            let a = this.a;
            let b = this.b;
            let c = this.c;
            let d = this.d;
            let tx = this.tx;
            let ty = this.ty;
            if (b == 0 && c == 0) {
                target.b = target.c = 0;
                if (a == 0 || d == 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }

                return;
            }
            let determinant = a * d - b * c;
            if (determinant == 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            let k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        }

  
        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public rotate(angle: number): void {
            angle = +angle;
            if (angle !== 0) {
                angle = angle / DEG_TO_RAD;
                let u = Turkey.NumberUtils.cos(angle);
                let v = Turkey.NumberUtils.sin(angle);
                let ta = this.a;
                let tb = this.b;
                let tc = this.c;
                let td = this.d;
                let ttx = this.tx;
                let tty = this.ty;
                this.a = ta * u - tb * v;
                this.b = ta * v + tb * u;
                this.c = tc * u - td * v;
                this.d = tc * v + td * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        }


        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public scale(sx: number, sy: number): void {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        }


        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        }


        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public transformPoint(pointX: number, pointY: number, resultPoint?: Point): Point {
            let x = this.a * pointX + this.c * pointY + this.tx;
            let y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new Point(x, y);
        }

   
        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public translate(dx: number, dy: number): void {
            this.tx += dx;
            this.ty += dy;
        }

        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public equals(other: Matrix): boolean {
            return this.a == other.a && this.b == other.b &&
                this.c == other.c && this.d == other.d &&
                this.tx == other.tx && this.ty == other.ty;
        }

      
        /**
         * 前置矩阵
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx 沿 x 轴平移每个点的距离
         * @param ty 沿 y 轴平移每个点的距离
         * @returns 矩阵自身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix {
            let tx1 = this.tx;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                let a1 = this.a;
                let c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;
        }


        /**
         * 后置矩阵
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param b 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param c 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @param tx 沿 x 轴平移每个点的距离
         * @param ty 沿 y 轴平移每个点的距离
         * @returns 矩阵自身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public append(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix {
            let a1 = this.a;
            let b1 = this.b;
            let c1 = this.c;
            let d1 = this.d;
            if (a != 1 || b != 0 || c != 0 || d != 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        }

        /**
         * 如果给定预转换坐标空间中的点，则此方法返回发生转换后该点的坐标。
         * 与使用 transformPoint() 方法应用的标准转换不同，deltaTransformPoint() 方法的转换不考虑转换参数 tx 和 ty。
         * @param point 想要获得其矩阵转换结果的点
         * @returns 由应用矩阵转换所产生的点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public deltaTransformPoint(point: Point): Point {
            let self = this;
            let x = self.a * point.x + self.c * point.y;
            let y = self.b * point.x + self.d * point.y;
            return new Turkey.Point(x, y);
        }

      
        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public toString(): string {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        }


        /**
         * 包括用于缩放、旋转和转换的参数。当应用于矩阵时，该方法会基于这些参数设置矩阵的值。
         * @param scaleX 水平缩放所用的系数
         * @param scaleY 垂直缩放所用的系数
         * @param rotation 旋转量（以弧度为单位）
         * @param tx 沿 x 轴向右平移（移动）的像素数
         * @param ty 沿 y 轴向下平移（移动）的像素数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public createBox(scaleX: number, scaleY: number, rotation: number = 0, tx: number = 0, ty: number = 0): void {
            let self = this;
            if (rotation !== 0) {
                rotation = rotation / DEG_TO_RAD;
                let u = Turkey.NumberUtils.cos(rotation);
                let v = Turkey.NumberUtils.sin(rotation);
                self.a = u * scaleX;
                self.b = v * scaleY;
                self.c = -v * scaleX;
                self.d = u * scaleY;
            } else {
                self.a = scaleX;
                self.b = 0;
                self.c = 0;
                self.d = scaleY;
            }
            self.tx = tx;
            self.ty = ty;
        }


        /**
         * 创建 Graphics 类的 beginGradientFill() 和 lineGradientStyle() 方法所需的矩阵的特定样式。
         * 宽度和高度被缩放为 scaleX/scaleY 对，而 tx/ty 值偏移了宽度和高度的一半。
         * @param width 渐变框的宽度
         * @param height 渐变框的高度
         * @param rotation 旋转量（以弧度为单位）
         * @param tx 沿 x 轴向右平移的距离（以像素为单位）。此值将偏移 width 参数的一半
         * @param ty 沿 y 轴向下平移的距离（以像素为单位）。此值将偏移 height 参数的一半
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public createGradientBox(width: number, height: number, rotation: number = 0, tx: number = 0, ty: number = 0): void {
            this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
        }

        /**
         * @private
         */
        $transformBounds(bounds: Rectangle): void {
            let a = this.a;
            let b = this.b;
            let c = this.c;
            let d = this.d;
            let tx = this.tx;
            let ty = this.ty;

            let x = bounds.x;
            let y = bounds.y;
            let xMax = x + bounds.width;
            let yMax = y + bounds.height;

            let x0 = a * x + c * y + tx;
            let y0 = b * x + d * y + ty;
            let x1 = a * xMax + c * y + tx;
            let y1 = b * xMax + d * y + ty;
            let x2 = a * xMax + c * yMax + tx;
            let y2 = b * xMax + d * yMax + ty;
            let x3 = a * x + c * yMax + tx;
            let y3 = b * x + d * yMax + ty;

            let tmp = 0;

            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }

            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);

            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }

            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        }

        /**
         * @private
         */
        private getDeterminant() {
            return this.a * this.d - this.b * this.c;
        }

        /**
         * @private
         */
        $getScaleX(): number {
            let m = this;
            if (m.b == 0) {
                return m.a;
            }
            let result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        }

        /**
         * @private
         */
        $getScaleY(): number {
            let m = this;
            if (m.c == 0) {
                return m.d;
            }
            let result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        }

        /**
         * @private
         */
        $getSkewX(): number {
            if (this.d < 0) {
                return Math.atan2(this.d, this.c) + (PI / 2);
            }
            else {
                return Math.atan2(this.d, this.c) - (PI / 2);
            }
        }

        /**
         * @private
         */
        $getSkewY(): number {
            if(this.a < 0) {
                return Math.atan2(this.b, this.a) - PI;
            }
            else {
                return Math.atan2(this.b, this.a);
            }
        }

        /**
         * @private
         */
        $updateScaleAndRotation(scaleX: number, scaleY: number, skewX: number, skewY: number) {
            if ((skewX == 0 || skewX == TwoPI) && (skewY == 0 || skewY == TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            skewX = skewX / DEG_TO_RAD;
            skewY = skewY / DEG_TO_RAD;
            let u = Turkey.NumberUtils.cos(skewX);
            let v = Turkey.NumberUtils.sin(skewX);
            if (skewX == skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            } else {
                this.a = Turkey.NumberUtils.cos(skewY) * scaleX;
                this.b = Turkey.NumberUtils.sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        }

        /**
         * @private
         * target = other * this
         */
        $preMultiplyInto(other: Matrix, target: Matrix): void {
            let a = other.a * this.a;
            let b = 0.0;
            let c = 0.0;
            let d = other.d * this.d;
            let tx = other.tx * this.a + this.tx;
            let ty = other.ty * this.d + this.ty;

            if (other.b !== 0.0 || other.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a += other.b * this.c;
                d += other.c * this.b;
                b += other.a * this.b + other.b * this.d;
                c += other.c * this.a + other.d * this.c;
                tx += other.ty * this.c;
                ty += other.tx * this.b;
            }

            target.a = a;
            target.b = b;
            target.c = c;
            target.d = d;
            target.tx = tx;
            target.ty = ty;
        }

    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    export let $TempMatrix = new Matrix();

}