// components/Tabbar/tabbar.js
const { broadcast } = require('../../utils/broadcast')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: Array,
        type: String
    },
    data: {
        isIphoneX: wx.getStorageSync('isIphoneX'),
        showDot: true
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
        var index = 0;
        if (this.properties.type == 'manage') {
            var index = 0;
        }
        if (this.properties.type == 'user') {
            var index = 2;
        }
        this.setData({
            list_index: index
        })
    }, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function() {},
    /**
     * 组件的初始数据
     */
    data: {
        list_index: 0, //初始化默认为第一个tab,
        dpr: wx.getStorageSync('dpr')
    },

    /**
     * 组件的方法列表
     */
    methods: {
      
    }
})