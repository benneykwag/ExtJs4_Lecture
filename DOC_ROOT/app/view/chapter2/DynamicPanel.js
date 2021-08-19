Ext.define('myapp.view.chapter2.DynamicPanel', {
    extend: 'Ext.panel.Panel',
    requires: ['myapp.view.chapter2.RequireClass'],  // #1
    xtype : 'chapter2-dynamicloading',
    title: 'DynamicPanel',

    items: [{
        xtype: 'chapter2-requireclass'  // #3
    }]
});
