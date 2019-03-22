///<reference path="../utils/DataStructure.ts"  />

namespace Turkey{

    /**
     * BitmapData 对象是一个包含像素数据的数组。此数据可以表示完全不透明的位图，或表示包含 Alpha 通道数据的透明位图。
     * 以上任一类型的 BitmapData 对象都作为 32 位整数的缓冲区进行存储。每个 32 位整数确定位图中单个像素的属性。<br/>
     * 每个 32 位整数都是四个 8 位通道值（从 0 到 255）的组合，这些值描述像素的 Alpha 透明度以及红色、绿色、蓝色 (ARGB) 值。
     * （对于 ARGB 值，最高有效字节代表 Alpha 通道值，其后的有效字节分别代表红色、绿色和蓝色通道值。）
     * @see Turkey.Bitmap
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export class BitmapData extends HashObject {
  
        /**
         * 位图图像的宽度，以像素为单位。
         * @readOnly
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        width: number;
    
        /**
         * 位图图像的高度，以像素为单位。
         * @readOnly
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        height: number;

    
        /**
         * 原始位图图像。
         * HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         * @language zh_CN
         */
        source: any;

      
        /**
         * WebGL纹理。
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         * @language zh_CN
         */
        webGLTexture: any;

   
        /**
         * 纹理格式。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        format: string = "image";

        /**
         * @private
         * webgl纹理生成后，是否删掉原始图像数据
         */
        $deleteSource: boolean = true;

        /**
         * @private
         * id
         */
        public $bitmapDataId: number;

    
        /**
         * 创建一个引用指定 source 实例的 BitmapData 对象
         * @param source 被引用的 source 实例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        constructor(source) {
            super();
            this.source = source;
            this.width = source.width;
            this.height = source.height;
        }

        public static create(type: "arraybuffer", data: ArrayBuffer, callback?: (bitmapData: BitmapData) => void): BitmapData;
        public static create(type: "base64", data: string, callback?: (bitmapData: BitmapData) => void): BitmapData;
        public static create(type: "arraybuffer" | "base64", data: ArrayBuffer | string, callback?: (bitmapData: BitmapData) => void): BitmapData {
            let base64 = "";
            if (type === "arraybuffer") {
                base64 = Turkey.Base64Util.encode(data as ArrayBuffer);
            }
            else {
                base64 = data as string;
            }
            let imageType = "image/png";//default value
            if (base64.charAt(0) === '/') {
                imageType = "image/jpeg";
            } else if (base64.charAt(0) === 'R') {
                imageType = "image/gif";
            } else if (base64.charAt(0) === 'i') {
                imageType = "image/png";
            }
            let img: HTMLImageElement = new Image();
            img.src = "data:" + imageType + ";base64," + base64;
            img.crossOrigin = '*';
            let bitmapData = new BitmapData(img);
            img.onload = function () {
                img.onload = undefined;
                bitmapData.source = img;
                bitmapData.height = img.height;
                bitmapData.width = img.width;
                if (callback) {
                    callback(bitmapData);
                }
            }
            return bitmapData;
        }

        public $dispose(): void {
            if (Capabilities.renderMode == "webgl" && this.webGLTexture) {
                Turkey.WebGLUtils.deleteWebGLTexture(this.webGLTexture);
                this.webGLTexture = null;
            }

            // WebGLRenderTarget
            if (this.source && this.source.dispose) {
                this.source.dispose();
            }
            this.source = null;
            BitmapData.$dispose(this);
        }



        private static _displayList = Turkey.createMap<DisplayObject[]>();
        static $addDisplayObject(displayObject: DisplayObject, bitmapData: BitmapData): void {
            if (!bitmapData) {
                return;
            }
            let hashCode: number = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                BitmapData._displayList[hashCode] = [displayObject];
                return;
            }
            let tempList: Array<DisplayObject> = BitmapData._displayList[hashCode];
            if (tempList.indexOf(displayObject) < 0) {
                tempList.push(displayObject);
            }
        }

        static $removeDisplayObject(displayObject: DisplayObject, bitmapData: BitmapData): void {
            if (!bitmapData) {
                return;
            }
            let hashCode: number = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            let tempList: Array<DisplayObject> = BitmapData._displayList[hashCode];
            let index: number = tempList.indexOf(displayObject);
            if (index >= 0) {
                tempList.splice(index, 1);
            }
        }

        static $invalidate(bitmapData: BitmapData): void {
            if (!bitmapData) {
                return;
            }
            let hashCode: number = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            let tempList: Array<DisplayObject> = BitmapData._displayList[hashCode];
            for (let i: number = 0; i < tempList.length; i++) {
                if (tempList[i] instanceof Turkey.Bitmap) {
                    (<Turkey.Bitmap>tempList[i]).$refreshImageData();
                }
                let bitmap = tempList[i];
                bitmap.$renderDirty = true;
                let p = bitmap.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                let maskedObject = bitmap.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
        }

        static $dispose(bitmapData: BitmapData): void {
            if (!bitmapData) {
                return;
            }
            let hashCode: number = bitmapData.hashCode;
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            let tempList = BitmapData._displayList[hashCode];
            for (let node of tempList) {
                if (node instanceof Turkey.Bitmap) {
                    node.$bitmapData = null;
                }
                node.$renderDirty = true;
                let p = node.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                let maskedObject = node.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
            delete BitmapData._displayList[hashCode];
        }
    }
}