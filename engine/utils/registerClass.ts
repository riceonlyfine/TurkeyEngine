namespace Turkey{

    
    /**
     * 为一个类定义注册运行时类信息,用此方法往类定义上注册它自身以及所有接口对应的字符串。
     * 在运行时，这个类的实例将可以使用 egret.is() 方法传入一个字符串来判断实例类型。
     * @example 以下代码演示了如何为EventDispatcher类注册运行时类信息并判断类型：
     * <pre>
     *      //为egret.EventDispatcher类注册运行时类信息，由于它实现了IEventDispatcher接口，这里应同时传入接口名对应的字符串。
     *      egret.registerClass(egret.EventDispatcher,"egret.EventDispatcher",["egret.IEventDispatcher"]);
     *      let dispatcher = new egret.EventDispatcher();
     *      egret.log(egret.is(dispatcher, "egret.IEventDispatcher"));  //true。
     *      egret.log(egret.is(dispatcher, "egret.EventDispatcher"));   //true。
     *      egret.log(egret.is(dispatcher, "egret.Bitmap"));   //false。
     * </pre>
     * 注意：若您使用 TypeScript 来编写程序，egret 命令行会自动帮您生成类信息注册代码行到最终的 Javascript 文件中。因此您不需要手动调用此方法。
     *
     * @param classDefinition 要注册的类定义。
     * @param className 要注册的类名。
     * @param interfaceNames 要注册的类所实现的接口名列表。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export function registerClass(classDefinition:any, className:string, interfaceNames?:string[]):void {
        if (DEBUG) {
            if (!classDefinition) {
                $error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                $error(1012, "classDefinition")
            }
            if (className === void 0) {
                $error(1003, "className");
            }
        }
        let prototype:any = classDefinition.prototype;
        prototype.__class__ = className;
        let types = [className];
        if (interfaceNames) {
            types = types.concat(interfaceNames);
        }
        let superTypes = prototype.__types__;
        if (prototype.__types__) {
            let length = superTypes.length;
            for(let i=0;i<length;i++){
                let name = superTypes[i];
                if(types.indexOf(name)==-1){
                    types.push(name);
                }
            }
        }
        prototype.__types__ = types;
    }
}