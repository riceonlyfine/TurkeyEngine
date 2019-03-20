
///<reference path="./utils/getDefinitionByName.ts"  />

/**
 * 是否为 debug 模式。
 * @version Egret 2.5
 * @platform Web,Native
 * @language zh_CN
 */
declare let DEBUG: boolean;

/**
 * Is release mode.
 * @version Egret 2.5
 * @platform Web,Native
 * @language en_US
 */
/**
 * 是否为 release 模式。
 * @version Egret 2.5
 * @platform Web,Native
 * @language zh_CN
 */
declare let RELEASE: boolean;

global.DEBUG = true;
global.RELEASE = false;

namespace Turkey {
    /**
     * @private
     */
    export declare function $error(code: number, ...params: any[]): void;
    /**
     * @private
     */
    export declare function $warn(code: number, ...params: any[]): void;
    /**
     * @private
     */
    export declare function getString(code: number, ...params: any[]): string;


    /**
     * @private
     */
    function _getString(code: number, ...params: any[]): string {
        return Turkey.sys.tr.apply(Turkey.sys, arguments);
    }
    Turkey.getString = _getString;

    function _error(code: number, ...params: any[]): void {
        let text: string = Turkey.sys.tr.apply(null, arguments);
        console.error.apply(console, text);
    }

    Turkey.$error = _error;

    function _warn(code: number, ...params: any[]): void {
        let text: string = Turkey.sys.tr.apply(null, arguments);
        console.warn.apply(console, text);
    }

    Turkey.$warn = _warn;
}

