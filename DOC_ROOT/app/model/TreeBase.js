Ext.define('ext5.model.TreeBase', {
    extend: 'Ext.data.TreeModel',  // #1
    requires: ['Ext.data.proxy.JsonP'],

    schema: {   // #2
        id: 'tree',
        namespace: 'ext5.model.tree'
    }
});
