namespace Turkey{

    /**
     * 用户将焦点从显示列表中的一个对象更改到另一个对象时，对象将调度 FocusEvent 对象。目前只支持输入文本。
     * 焦点事件：FocusEvent.FOCUS_IN FocusEvent.FOCUS_OUT
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export class FocusEvent extends Turkey.Event {


        /**
         * 获得焦点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static FOCUS_IN:"focusIn" = "focusIn";

 
        /**
         * 失去焦点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static FOCUS_OUT:"focusOut" = "focusOut";


        /**
         * 创建一个 egret.FocusEvent 对象
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);

        }
    }
}