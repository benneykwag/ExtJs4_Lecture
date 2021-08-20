Ext.define('myapp.view.chapter1.HelloWorld', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.helloworld',
    title: 'HelloWorld',
    initComponent: function(){
        var me = this;
        Ext.apply(this, {
            buttons: [
                {
                    xtype: 'button',
                    text: 'Save',
                    listeners: {
                        click: {
                            scope: me,
                            fn: function(){
                                // console.log(this.up('panel').save())
                                this.save();
                            }
                        }
                    }
                }
            ]
        })
        this.callParent(arguments);
    },
    save: function(){
        console.log('save')
        return 'aa'
    },
    listeners: {
        render: function(){
            console.log('render')
        }
    }
});