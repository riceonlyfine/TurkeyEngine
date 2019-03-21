namespace Turkey{

     /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    export class Filter extends HashObject {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        public type:string = null;

        /**
         * @private
         */
        public $id: number = null;


        /**
         * @private 
         */
        public $uniforms:any;

        /**
         * @private 
         */
        protected paddingTop: number = 0;
        /**
         * @private 
         */
        protected paddingBottom: number = 0;
        /**
         * @private 
         */
        protected paddingLeft: number = 0;
        /**
         * @private 
         */
        protected paddingRight: number = 0;
        
        /**
         * @private
         * @native Render
         */
        public $obj: any;

        constructor() {
            super();
            this.$uniforms = {};
        }

        /**
         * @private
         */
        public $toJson():string {
            return '';
        }

        protected updatePadding(): void {

        }

        public onPropertyChange(): void {
            let self = this;
            self.updatePadding();
        }
    }
}