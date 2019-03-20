namespace Turkey {

    /**
     * 运行类型的类型。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export namespace RuntimeType {
   
        /**
         * 运行在Web上
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        export const WEB = "web";

        /**
         * 运行在NATIVE上
         * @version Egret 2.4
         * @deprecated
         * @platform Web,Native
         * @language zh_CN
         */
        export const NATIVE = "native";

        /**
         * 运行在Runtime2.0上
         * @version Egret 5.1.5
         * @platform Web,Native
         * @language zh_CN
         */
        export const RUNTIME2 = "runtime2";

  
        /**
         * 运行在微信小游戏上
         * @version Egret 5.1.5
         * @platform All
         * @language zh_CN
         */
        export const WXGAME = "wxgame";
    }


    /**
     * Capabilities 类提供一些属性，这些属性描述了承载应用程序的系统和运行时。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/system/Capabilities.ts
     * @language zh_CN
     */
    export class Capabilities {
        /**
         * 表示运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。<br/>
         * 以下是可能但不限于的语言和值：
         * <ul>
         * <li>简体中文  zh-CN</li>
         * <li>繁体中文  zh-TW</li>
         * <li>英语      en</li>
         * <li>日语      ja</li>
         * <li>韩语      ko</li>
         * </ul>
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly language: string = "zh-CN";

        /**
         * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly isMobile: boolean;


        /**
         * 指示当前的操作系统。os 属性返回下列字符串：
         * <ul>
         * <li>苹果手机操作系统     "iOS"</li>
         * <li>安卓手机操作系统     "Android"</li>
         * <li>微软手机操作系统     "Windows Phone"</li>
         * <li>微软桌面操作系统     "Windows PC"</li>
         * <li>苹果桌面操作系统     "Mac OS"</li>
         * <li>未知操作系统        "Unknown"</li>
         * </ul>
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly os: string = "Unknown";

        /**
         * 指示当前的运行类型。runtimeType 属性返回下列字符串：
         * <ul>
         * <li>运行在Web上     egret.RuntimeType.WEB</li>
         * <li>运行在Runtime2.0上     egret.RuntimeType.RUNTIME2</li>
         * <li>运行在微信小游戏上    egret.RuntimeType.WXGAME</li>
         * </ul>
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly runtimeType: string = Turkey.RuntimeType.WEB;


        /***
         * Egret 的版本号。
         * @type {string}
         * @version Egret 3.2.0
         * @platform Web,Native
         * @language zh_CN
         */
        public static readonly engineVersion:string = "5.3.1";

        /***
         * 当前渲染模式。
         * @type {string}
         * @version Egret 3.0.7
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly renderMode: string = "Unknown";

     
        /***
         * 客户端边界宽度。
         * 该值在文档类初始化之前始终是0。
         * 该值在派发 Event.RESIZE 以及 StageOrientationEvent.ORIENTATION_CHANGE 之后会发生改变。
         * @version Egret 3.1.3
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly boundingClientWidth: number = 0;

  
        /***
         * 客户端边界高度。
         * 该值在文档类初始化之前始终是0。
         * 该值在派发 Event.RESIZE 以及 StageOrientationEvent.ORIENTATION_CHANGE 之后会发生改变。
         * @version Egret 3.1.3
         * @platform Web,Native
         * @language zh_CN
         */
        static readonly boundingClientHeight: number = 0;
    }
}