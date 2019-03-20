namespace Turkey {

    /**
     * @private
     */
    export let $locale_strings:any = Turkey.$locale_strings||{};

    /**
     * @private
     */
    export let $language: string = "en_US";
}

namespace Turkey.sys {

    /**
     * @private
     * 全局多语言翻译函数
     * @param code 要查询的字符串代码
     * @param args 替换字符串中{0}标志的参数列表
     * @returns 返回拼接后的字符串
     */
    export function tr(code:number, ...args):string{
        let text = $locale_strings[$language][code];
        if(!text){
            return "{"+code+"}";
        }
        let length = args.length;
        for(let i=0;i<length;i++){
            text = text.replace("{" + i + "}", args[i]);
        }
        return text;
    }

}