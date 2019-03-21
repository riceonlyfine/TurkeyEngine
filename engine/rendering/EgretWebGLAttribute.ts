namespace Turkey.web{
     /**
     * @private  
     */
    export const enum WEBGL_ATTRIBUTE_TYPE {
        FLOAT_VEC2 = 0x8B50,
        FLOAT_VEC3 = 0x8B51,
        FLOAT_VEC4 = 0x8B52,
        FLOAT = 0x1406,
        BYTE = 0x1400,
        UNSIGNED_BYTE = 0x1401,
        UNSIGNED_SHORT = 0x1403
    }

    /**
     * @private 
     */
    export class EgretWebGLAttribute {

        private gl:WebGLRenderingContext;

        private name:string;

        private type:WEBGL_ATTRIBUTE_TYPE;

        private size:number;

        public location:number;

        constructor(gl:WebGLRenderingContext, program:WebGLProgram, attributeData:any) {
            this.gl = gl;

            this.name = attributeData.name;

            this.type = attributeData.type;

            this.size = attributeData.size;

            this.location = gl.getAttribLocation(program, this.name);

            this.count = 0;
            this.initCount(gl);
            this.format = gl.FLOAT;
            this.initFormat(gl);
        }

        public count:number;
        private initCount(gl:WebGLRenderingContext):void {
            let type = this.type;

            switch (type) {
                case WEBGL_ATTRIBUTE_TYPE.FLOAT:
                case WEBGL_ATTRIBUTE_TYPE.BYTE:
                case WEBGL_ATTRIBUTE_TYPE.UNSIGNED_BYTE:
                case WEBGL_ATTRIBUTE_TYPE.UNSIGNED_SHORT:
                    this.count = 1;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC2:
                    this.count = 2;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC3:
                    this.count = 3;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC4:
                    this.count = 4;
                    break;
            }
        }

        public format:number;
        private initFormat(gl:WebGLRenderingContext):void {
            let type = this.type;

            switch (type) {
                case WEBGL_ATTRIBUTE_TYPE.FLOAT:
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC2:
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC3:
                case WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC4:
                    this.format = gl.FLOAT;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.UNSIGNED_BYTE:
                    this.format = gl.UNSIGNED_BYTE;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.UNSIGNED_SHORT:
                    this.format = gl.UNSIGNED_SHORT;
                    break;
                case WEBGL_ATTRIBUTE_TYPE.BYTE:
                    this.format = gl.BYTE;
                    break;
            }
        }
    }

}