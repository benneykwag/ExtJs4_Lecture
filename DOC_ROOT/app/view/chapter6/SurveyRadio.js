Ext.define('myapp.view.chapter6.SurveyRadio', {
    extend: 'Ext.container.Container',
    xtype: 'chapter6-surveyradio',
    requires: ['myapp.view.chapter6.DataSet', 'myapp.model.smpl.Data'],
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            items: [
                {
                    xtype: 'component',		// #1
                    html: me.label,			// #2
                    cls: 'x-form-check-group-label'	// #3
                }
            ]
        });
        this.callParent();
        this.on('render', function () {
            var store = new Ext.data.Store({
                model: myapp.model.smpl.Data,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'array'
                    }
                },
                data: eval('myapp.view.chapter6.DataSet.'+me.code)
            });
            store.each(function(item, idx){
                console.log('No:', idx, 'Value', item.data)
                me.add({
                    xtype: 'radiofield',
                    name : me.code,
                    inputValue : item.get('code'),
                    boxLabel: item.get('name')
                });
            });

        })

    }
});