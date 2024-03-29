namespace Turkey{

    /**
     * Event 类作为创建事件实例的基类，当发生事件时，Event 实例将作为参数传递给事件侦听器。Event 类的属性包含有关事件的基本信息，例如事件
     * 的类型或者是否可以取消事件的默认行为。对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
     * 例如，与触摸关联的事件需要包括有关触摸事件的位置信息。您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
     * Egret API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。Event 类的方法可以在
     * 事件侦听器函数中使用以影响事件对象的行为。某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
     * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
     */
    export class Event extends HashObject {
       
        /**
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static ADDED_TO_STAGE: string = "addedToStage";

        /**
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static REMOVED_FROM_STAGE: string = "removedFromStage";
        
        /**
         * 将显示对象添加到显示列表中时调度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static ADDED: string = "added";

       
        /**
         * 将要从显示列表中删除显示对象时调度。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static REMOVED: string = "removed";

        /**
         * [广播事件] 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static ENTER_FRAME: string = "enterFrame";

       
        /**
         * 渲染事件，监听此事件将会在本帧末即将开始渲染的前一刻触发回调，这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * 注意：每次您希望 Egret 发送 Event.RENDER 事件时，都必须调用 stage.invalidate() 方法，由于每帧只会触发一次屏幕刷新，
         * 若在 Event.RENDER 回调函数执行期间再次调用stage.invalidate()，将会被忽略。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static RENDER: string = "render";

        /**
         * 舞台尺寸或UI组件尺寸发生改变
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static RESIZE: string = "resize";

     
        /**
         * 属性值或状态发生改变。通常是按钮的选中状态，或者列表的选中项索引改变。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static CHANGE: string = "change";

       
        /**
         * 属性值或状态即将发生改变,通常是按钮的选中状态，或者列表的选中项索引改变。可以通过调用 preventDefault() 方法阻止索引发生更改。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static CHANGING: string = "changing";
        

        /**
         * 网络请求加载完成
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static COMPLETE: string = "complete";

       
        /**
         * 循环完成。循环最后一次只派发 COMPLETE 事件，不派发 LOOP_COMPLETE 事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static LOOP_COMPLETE: string = "loopComplete";

        
        /**
         * TextInput实例获得焦点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static FOCUS_IN: string = "focusIn";
        

        /**
         * TextInput实例失去焦点
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static FOCUS_OUT: string = "focusOut";
       


        /**
         * 动画声音等播放完成
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static ENDED: string = "ended";


        /**
         * 游戏激活
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static ACTIVATE: string = "activate";

        /**
         * 取消激活
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static DEACTIVATE: string = "deactivate";

        /**
         * Event.CLOSE 常量定义 close 事件对象的 type 属性的值。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static CLOSE: string = "close";

        /**
         * Event.CONNECT 常量定义 connect 事件对象的 type 属性的值。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static CONNECT: string = "connect";


        /**
         * Event.LEAVE_STAGE 常量定义 leaveStage 事件对象的 type 属性的值。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static LEAVE_STAGE: string = "leaveStage";

        /**
         * Event.SOUND_COMPLETE 常量定义 在声音完成播放后调度。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public static SOUND_COMPLETE: string = "soundComplete";


        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param data 与此事件对象关联的可选数据。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
            super();
            this.$type = type;
            this.$bubbles = !!bubbles;
            this.$cancelable = !!cancelable;
            this.data = data;
        }

      
        /**
         * 与此事件对象关联的可选数据。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public data: any;

        /**
         * @private
         */
        $type: string;

        /**
         * 事件的类型。类型区分大小写。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get type(): string {
            return this.$type;
        }

        /**
         * @private
         */
        $bubbles: boolean;

      
        /**
         * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get bubbles(): boolean {
            return this.$bubbles;
        }

        /**
         * @private
         */
        $cancelable: boolean;
       
        /**
         * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get cancelable(): boolean {
            return this.$cancelable;
        }

        /**
         * @private
         */
        $eventPhase: number = 2;

      
        /**
         * 事件流中的当前阶段。此属性可以包含以下数值：
         * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
         * 目标阶段 (EventPhase.AT_TARGET)。
         * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
         * @see Turkey.EventPhase
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get eventPhase(): number {
            return this.$eventPhase;
        }

        /**
         * @private
         */
        $currentTarget: any = null;

        
        /**
         * 当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
         * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get currentTarget(): any {
            return this.$currentTarget;
        }

        /**
         * @private
         */
        $target: any = null;

       
        /**
         * 事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public get target(): any {
            return this.$target;
        }

        $setTarget(target: any): boolean {
            this.$target = target;
            return true;
        }

        /**
         * @private
         */
        $isDefaultPrevented: boolean = false;

        /**
         * 检查是否已对事件调用 preventDefault() 方法。
         * @returns 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public isDefaultPrevented(): boolean {
            return this.$isDefaultPrevented;
        }

    
        /**
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 您可以使用 Event.cancelable 属性来检查是否可以防止与特定事件关联的默认行为。如果 Event.cancelable 的值为 true，
         * 则可以使用 preventDefault() 来取消事件；否则，preventDefault() 无效。
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public preventDefault(): void {
            if (this.$cancelable)
                this.$isDefaultPrevented = true;
        }

        /**
         * @private
         */
        $isPropagationStopped: boolean = false;

        
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 currentTarget 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public stopPropagation(): void {
            if (this.$bubbles)
                this.$isPropagationStopped = true;
        }

        /**
         * @private
         */
        $isPropagationImmediateStopped: boolean = false;

       
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public stopImmediatePropagation(): void {
            if (this.$bubbles)
                this.$isPropagationImmediateStopped = true;
        }

        
        /**
         * 当事件实例传递给Event.release()静态方法时，实例上的clean()方法将会被自动调用。
         * 若此自定义事件的实例设计为可以循环复用的，为了避免引起内存泄露，自定义事件需要覆盖此方法来确保实例被缓存前断开对外部对象的一切引用。
         * @see Turkey.Event.create()
         * @see Turkey.Event.release()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        protected clean(): void {
            this.data = this.$currentTarget = null;
            this.$setTarget(null);
        }


      
        /**
         * 使用指定的 EventDispatcher 对象来抛出 Event 事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target {Turkey.IEventDispatcher} 派发事件目标
         * @param type {string} 事件类型
         * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param data {any} 事件data
         * @method Turkey.Event.dispatchEvent
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static dispatchEvent(target: IEventDispatcher, type: string, bubbles: boolean = false, data?: any): boolean {
            let event: IOErrorEvent = Event.create(Event, type, bubbles);
            let props: any = Event._getPropertyData(Event);
            if (data != undefined) {
                props.data = data;
            }
            let result = target.dispatchEvent(event);
            Event.release(event);
            return result;
        }

        /**
         * @private
         *
         * @param EventClass
         * @returns
         */
        public static _getPropertyData(EventClass: any): any {
            let props: any = EventClass._props;
            if (!props)
                props = EventClass._props = {};
            return props;
        }

      
        /**
         * 从对象池中取出或创建一个新的事件实例。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：若使用此方法来创建自定义事件的实例，自定义的构造函数参数列表必须跟Event类一致。
         * @param EventClass Event类名。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @example
         * <pre>
         *    let event = Event.create(Event,type, bubbles);
         *    event.data = data;  //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static create<T extends Event>(EventClass: { new(type: string, bubbles?: boolean, cancelable?: boolean): T; eventPool?: Event[] },
            type: string, bubbles?: boolean, cancelable?: boolean): T {
            let eventPool: Event[];
            let hasEventPool = (EventClass as any).hasOwnProperty("eventPool");
            if (hasEventPool) {
                eventPool = EventClass.eventPool;
            }

            if (!eventPool) {
                eventPool = EventClass.eventPool = [];
            }
            if (eventPool.length) {
                let event: T = <T>eventPool.pop();
                event.$type = type;
                event.$bubbles = !!bubbles;
                event.$cancelable = !!cancelable;
                event.$isDefaultPrevented = false;
                event.$isPropagationStopped = false;
                event.$isPropagationImmediateStopped = false;
                event.$eventPhase = EventPhase.AT_TARGET;
                return event;
            }
            return new EventClass(type, bubbles, cancelable);
        }

        /**
         * 释放一个事件对象，并缓存到对象池。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：此方法只能传入由Event.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * @example
         * <pre>
         *    let event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.dispatchEvent(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static release(event: Event): void {
            event.clean();
            let EventClass: any = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        }

    }
}