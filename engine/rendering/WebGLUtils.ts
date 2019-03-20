
namespace Turkey.WebGLUtils {
    let canUseWebGL: boolean;

    export const checkCanUseWebGL = function (): boolean {
        if (canUseWebGL == undefined) {
            try {
                const canvas = document.createElement("canvas");
                canUseWebGL = !!window["WebGLRenderingContext"]
                    && !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
            }
            catch (e) {
                canUseWebGL = false;
            }
        }
        return canUseWebGL;
    }

    export const deleteWebGLTexture = function (bitmapData): void {
        if (bitmapData) {
            const gl = bitmapData.glContext;
            if (gl) {
                gl.deleteTexture(bitmapData);
            }
        }
    }

    export const setBatchSize = function (size: number): void {
        if (Capabilities.renderMode == "webgl") {
            const web = Turkey["web"];
            const context = web.WebGLRenderContext.getInstance();
            size = +size | 0;
            size = Math.max(1, size);
            context.setBatchSize(size);
        }
    }

    export const bindTexture = function (target: number, texture: Texture): void {
        if (Capabilities.renderMode == "webgl") {
            const web = Turkey["web"];
            const context = web.WebGLRenderContext.getInstance();
            const gl = context.context;
            if (texture && texture.$bitmapData) {
                const webglTexture = context.getWebGLTexture(texture.$bitmapData);
                if (webglTexture) {
                    gl.activeTexture(gl.TEXTURE0 + target);
                    gl.bindTexture(gl.TEXTURE_2D, webglTexture);
                    gl.activeTexture(gl.TEXTURE0);
                }
            }
            else {
                gl.activeTexture(gl.TEXTURE0 + target);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.activeTexture(gl.TEXTURE0);
            }
        }
    }
}