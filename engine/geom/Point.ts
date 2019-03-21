namespace Turkey{

    let pointPool:Point[] = [];
    let DEG_TO_RAD:number = Math.PI / 180;

    
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Point.ts
     * @language zh_CN
     */
    export class Point extends HashObject {

     
        /**
         * 释放一个Point实例到对象池
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static release(point:Point):void {
            if(!point){
                return;
            }
            pointPool.push(point);
        }

      
        /**
         * 从对象池中取出或创建一个新的Point对象。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static create(x:number,y:number):Point {
            let point = pointPool.pop();
            if (!point) {
                point = new Point();
            }
            return point.setTo(x,y);
        }
    
        /**
         * 创建一个 egret.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor(x:number = 0, y:number = 0) {
            super();
            this.x = x;
            this.y = y;
        }

   
        /**
         * 该点的水平坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public x:number;
    
        /**
         * 该点的垂直坐标。
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public y:number;

      
        /**
         * 从 (0,0) 到此点的线段长度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get length():number{
            return Math.sqrt(this.x*this.x+this.y*this.y);
        }

        /**
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public setTo(x:number, y:number):Point {
            this.x = x;
            this.y = y;
            return this;
        }

  
        /**
         * 克隆点对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public clone():Point {
            return new Point(this.x, this.y);
        }


  
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public equals(toCompare:Point):boolean {
            return this.x == toCompare.x && this.y == toCompare.y;
        }

 
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static distance(p1:Point, p2:Point):number {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        }

  
        /**
         * 将源 Point 对象中的所有点数据复制到调用方 Point 对象中。
         * @param sourcePoint 要从中复制数据的 Point 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public copyFrom(sourcePoint:Point):void {
            this.x = sourcePoint.x;
            this.y = sourcePoint.y;
        }

 
        /**
         * 将另一个点的坐标添加到此点的坐标以创建一个新点。
         * @param v 要添加的点。
         * @returns 新点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public add(v:Point):Point {
            return new Point(this.x + v.x, this.y + v.y);
        }


        /**
         * 确定两个指定点之间的点。
         * 参数 f 确定新的内插点相对于参数 pt1 和 pt2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 pt1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 pt2）。
         * @param pt1 第一个点。
         * @param pt2 第二个点。
         * @param f 两个点之间的内插级别。表示新点将位于 pt1 和 pt2 连成的直线上的什么位置。如果 f=1，则返回 pt1；如果 f=0，则返回 pt2。
         * @returns 新的内插点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static interpolate(pt1:Point, pt2:Point, f:number):Point {
            let f1:number = 1 - f;
            return new Point(pt1.x * f + pt2.x * f1, pt1.y * f + pt2.y * f1);
        }

 
        /**
         * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
         * @param thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public normalize(thickness:number):void {
            if (this.x != 0 || this.y != 0) {
                let relativeThickness:number = thickness / this.length;
                this.x *= relativeThickness;
                this.y *= relativeThickness;
            }
        }


        /**
         * 按指定量偏移 Point 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
         * @param dx 水平坐标 x 的偏移量。
         * @param dy 水平坐标 y 的偏移量。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public offset(dx:number, dy:number):void {
            this.x += dx;
            this.y += dy;
        }

        /**
         * 将一对极坐标转换为笛卡尔点坐标。
         * @param len 极坐标对的长度。
         * @param angle 极坐标对的角度（以弧度表示）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static polar(len:number, angle:number):Point {
            return new Point(len * NumberUtils.cos(angle / DEG_TO_RAD), len * NumberUtils.sin(angle / DEG_TO_RAD));
        }

        /**
         * 从此点的坐标中减去另一个点的坐标以创建一个新点。
         * @param v 要减去的点。
         * @returns 新点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public subtract(v:Point):Point {
            return new Point(this.x - v.x, this.y - v.y);
        }


        /**
         * 返回包含 x 和 y 坐标的值的字符串。该字符串的格式为 "(x=x, y=y)"，因此为点 23,17 调用 toString() 方法将返回 "(x=23, y=17)"。
         * @returns 坐标的字符串表示形式。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public toString():string {
            return "(x=" + this.x + ", y=" + this.y + ")";
        }
    }

    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    export let $TempPoint = new Point();
}