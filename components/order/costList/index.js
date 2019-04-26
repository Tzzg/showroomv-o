Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderFeeDisplay:{
            type:Boolean,
            value:false
        },
        goodsTotal:{
            type:Number,
            value: null
        },
        freight: {
            type: Number,
            value: null
        },
        customsClearanceTax: {
            type: Number,
            value: null
        },
        totalCost: {
            type: Number,
            value: null
        }
    },
    methods: {
        orderCostToggle () {
            let feeBoxDisplay = this.data.orderFeeDisplay === false ? true : false;

            this.setData({
                orderFeeDisplay: feeBoxDisplay
            })
        }
    }
});
