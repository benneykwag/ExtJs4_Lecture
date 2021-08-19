Ext.define('myapp.view.chapter2.DefineClass', { // ①
    extend: 'Ext.panel.Panel', // ②
    alias : 'widget.chapter2-defineclass',
    // xtype: 'chapter2-defineclass',
    initComponent: function () { // ③
        var me = this;
        Ext.apply(this, {
            title: '안녕하세요 환영합니다.^^',
            items: [
                {
                    xtype: 'button',
                    text: 'Click Me!'
                }
            ]
        });
        this.callParent(arguments); // ④
    }
});