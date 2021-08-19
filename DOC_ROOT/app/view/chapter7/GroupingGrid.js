Ext.define('ext5.view.chapter7.GroupingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.chapter7-groupinggrid',
    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.grid.column.Action',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Boolean',
        'ext5.model.smpl.Order',
        'ext5.view.chapter7.GroupChangeCombo'
    ],
    height: 400,
    columnLines: true,
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            fields: [
                'customName',   // 주문자 명
                'orderDate',    // 주문일자
                'orderDesc',    // 주문내역
                {name: 'orderCnt'},     // 주문 수량
                {name: 'orderAmount', type: 'float'},  // 주문금액
                {name: 'accrueAmount', type: 'float'},  // 누적 주문액
                {name: 'isMember'},    // 회원주문여부,
                'orderDetail',  // 주문 상세
                'estimate',      //고객평가
                'areaNm',        // 주문 지역
                'id','name','lastname'
            ],
            proxy : {
                type : 'ajax',
                url : '/resources/data/Order.json',
                reader : {             // #11
                    type : 'json',
                    root : 'entitys'
                }
            }
        });

        Ext.apply(this, {
            features: [groupingSummary],
            listeners: {
                click: {
                    element: 'body',
                    delegate: '.x-grid-row-summary',
                    fn: function (e, target) {
                        console.log(arguments);
                        var orderAmount = 'orderAmount',
                            records = me.getStore().getRange(),
//                            sum = me.getStore().getSum(records, orderAmount),   // #7
                            average = me.getStore().getAverage(records, orderAmount),   // #8
                            min = me.getStore().getMin(records, orderAmount),       // #9
                            max = me.getStore().getMax(records, orderAmount);
                        console.log( average, min, max);
                    }
                }
            },
            features: [
                {
                    ftype: 'summary'
                }
            ],
            tbar: [
                {
                    xtype: 'chapter7-grpchgcbx',
                    labelAlign: 'right',
                    labelWidth: 70,
                    fieldLabel: '그룹변경',
                    listeners: {
                        change: function (radio, newValue, oldValue) {
                            me.getStore().group(newValue);
                            me.getView().refresh();
                        }
                    }
                }
            ],
            store:store,
            columns: this.getColumnConfig()
        });
        me.callParent(arguments);
    },

    getColumnConfig: function () {
        var me = this;
        return   [

            {
                 text: '주문지역',
                 align: 'center',
                 width: 100,
                 dataIndex: 'areaNm'
            },
            {
                 text:'고객평가',
                 align: 'center',
                 width: 70,
                 dataIndex: 'estimate',
                 summaryType:'count',
                 summaryRenderer: function(value){
                     return '총 '+ value + '건';
                 }
            },
            {
                 text: '주문자',
                 align: 'center',
                 width: 70,
                 dataIndex: 'customName',
                 renderer: function (value) {
                     return value + '님';
                 }
            },
            {
                 text: '주문일자',
                 align: 'center',
                 width: 100,
                 dataIndex: 'orderDate',
                 renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                   if ((rowIndex % 2) == 0) {
                         metaData.align = 'left';
                         metaData.style = 'color:red';
                     } else {
                         metaData.align = 'right';
                         metaData.style = 'color:blue';
                     }
                     return Ext.util.Format.date(value, 'Y-m-d');
                 }
            },
            {
                text: '주문금액',
                style: 'text-align:center',
                align: 'right',
                width: 100,
                summaryType: 'sum',
                dataIndex: 'orderAmount',
                renderer: function (value) {
                    return this.setMoney(value, 'Korea');
                }
            },
            {
                text: '주문수량',
                style: 'text-align:center',
                align: 'right',
                width: 60,
                dataIndex: 'orderCnt',
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return '총 ' + value + '개';
                }
            },
            {
                text: '고객평가',
                align: 'center',
                width: 70,
                dataIndex: 'estimate',
                renderer: function (value, metaData) {
                    metaData.tdCls = 'thumb-' + value;    // #11
                    return '';
                },
                summaryType: 'count', // #12
//                summaryRenderer: function(value, summaryData, dataIndex) {
//                     return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
//                }
                summaryRenderer: function (value) {
                     return '총 ' + value + '건';
                }
            },
            {
                text: '누적금액',
                style: 'text-align:center',
                align: 'right',
                flex: 1,
                name: 'accrueAmount',
                dataIndex: 'accrueAmount',
                summaryType: 'average',
                summaryRenderer: function (value) {
                    return '평균 ' + Ext.util.Format.number(value, '0') + '원';
                },
                renderer: function (value) {
                    return this.setMoney(value, 'Korea');   // #12
                }
            }
            // {
            //     text: '회원여부',
            //     align: 'center',
            //     width: 100,
            //     dataIndex: 'isMember',
            //     xtype: 'booleancolumn',
            //     trueText: '회원구매',
            //     falseText: '비회원구매'
            // },
            // {
            //     xtype: 'actioncolumn',
            //     text: '주문변경',
            //     align:'center',
            //     width: 100,
            //     tdCls : 'my-action-col-cell',
            //     items: [
            //         {
            //             icon: '/resources/images/Save.png',
            //             handler: function () {
            //                 alert('update')
            //             }
            //         },
            //         {
            //             icon : '/resources/images/Schedule.png',
            //             handler: function(){
            //                 alert('delete')
            //             }
            //         }
            //     ]
            // }
        ];
    },
    /**
     * 국가 코드에 맞는 통화형식을 설정한다.
     * @param value
     * @param nation
     */
    setMoney: function (value, nation) {    // #13
        if (nation == 'Korea')
            nation = '￦';
        else if (nation == 'US')
            nation = '$';
        else if (nation == 'EU')
            nation = '€';
        else if (nation == 'UK')
            nation = '￡';
        else if (nation == 'JP')
            nation = '￥';
        return Ext.util.Format.currency(value, nation, 0); // #14
    }
});
