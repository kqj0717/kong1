Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../../res/extjs/ux/');
Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.util.*',
    'Ext.form.field.ComboBox',
    'Ext.form.FieldSet',
    'Ext.tip.QuickTipManager',
    'Ext.ux.data.PagingMemoryProxy'
    
]);

var data, store, columns, queryGrid,pager;
Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.EventManager.onWindowResize(function(){ 
        queryGrid.getView().refresh() ;
    });
    /*自定义table的滚动条*/
    //jscrollBar(".scroll","2");
});
/*init combo */
function initCombo(){
    var data = [
                    {"abbr":"AL","name":"Alabama","slogan":"The Heart of Dixie"},
                    {"abbr":"AK","name":"Alaska","slogan":"The Land of the Midnight Sun"},
                    {"abbr":"AZ","name":"Arizona","slogan":"The Grand Canyon State"}];
    var store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        fields: [
            {type: 'string', name: 'abbr'},
            {type: 'string', name: 'name'},
            {type: 'string', name: 'slogan'}
        ],
        data: data
    });
    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        renderTo: 'simpleCombo',
        displayField: 'name',
        width: 220,
        labelWidth: 130,
        store: store,
        queryMode: 'local',
        typeAhead: true
    });
}
function initGrid(){
    data = [
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx'],
        ['供应商1','电信', '100:1',  10.03,'日结','线下','xxxxx', '151xxxxxxx']
        
    ];

    // create the data store
    store = Ext.create('Ext.data.Store', {
        fields: [
           {name: 'name'},
           {name: 'type',  type: 'float', convert: null,     defaultValue: undefined},
           {name: 'changeRatio', type: 'float', convert: null,     defaultValue: undefined},
           {name: 'price',  type: 'float', convert: null,     defaultValue: undefined},
           {name: 'settlementPeriod', type: 'float', convert: null,   defaultValue: undefined},
           {name: 'settlement', type: 'float', convert: null,  defaultValue: undefined},
           {name: 'contact', type: 'float', convert: null,  defaultValue: undefined},
           {name: 'contactTel', type: 'float', convert: null,  defaultValue: undefined}
        ],  
        remoteSort: true,
        pageSize: 10,
        proxy: {
            //type: 'ajax',
            type: 'pagingmemory',
            // url: '',
            data: data,
            reader: {
                // type: 'json'
                type: 'array'
            }
        }
    });
    // width确定的宽度
    columns = [
            {
                text     : '供应商名称',
                flex     : 1,
                sortable : false,
                dataIndex: 'name',
                renderer : qtips
            },
            {
                text     : '供应商类型',
                width    : 110,
                sortable : true,
                dataIndex: 'type'
            },
            {
                text     : '兑换比率',
                width    : 110,
                sortable : true,
                dataIndex: 'changeRatio',
                align    : 'right'
            },
            {
                text     : '兑换费',
                width    : 110,
                sortable : true,
                dataIndex: 'price',
                align    : 'right'
            },
            {
                text     : '结算周期',
                width    : 120,
                sortable : true,
                dataIndex: 'settlementPeriod',
                align    : 'center'
            },
            {
                text     : '结算方式',
                width    : 110,
                sortable : true,
                dataIndex: 'settlement'
            },
            {
                text     : '联系人',
                width    : 110,
                sortable : true,
                dataIndex: 'contact'
            },
            {
                text     : '联系电话',
                width    : 85,
                sortable : true,
                dataIndex: 'contactTel'
            },
            {
                text: '操作',
                menuDisabled: true,
                sortable: false,
                width: 75,
                renderer: buttonRender,
                align   : 'center'
            }
        ];
    // 操作区域
    var dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'center'
            }
        }, {
            xtype: 'toolbar',
            items: [{
                text:'',
                tooltip:'新建',
                minWidth: 30,
                minHeight:30,
                iconCls:'new-ico'
            }, '-',{
                itemId: 'delAllButton',
                text:'',
                tooltip:'删除',
                minWidth: 30,
                minHeight:30,
                iconCls:'delAll-ico',
                disabled: true
            }]
        }];
    // 多选
    var selModel = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function(sm, selections) {
                queryGrid.down('#delAllButton').setDisabled(selections.length == 0);
            }
        }
    });
    //pager
    pager = Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg : '显示第 {0} 条到 {1} 条记录,一共 {2} 条'
    });
    // create the Grid
    queryGrid = Ext.create('Ext.grid.Panel', {
        store: store,
        stateful: true,
        collapsible: false,
        multiSelect: true,
        stateId: 'stateGrid',
        columns: columns,
        selModel: selModel,
        dockedItems: dockedItems,
        height: 350,
        autoWidth: true,
        renderTo: 'queryGrid',
        /*resizable: {
          handles: 's',
          minHeight: 100
        },*/
        //bbar: pager,
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true,
            deferRowRender : false,
            forceFit : true,
            emptyText : "<font class='emptyText'>没有符合条件的记录</font>",
            autoScroll:true,
            scrollOffset:-10
        }
    });
    store.load();
   
}
/*
* 操作按钮
*/
function buttonRender(value, meta, record, rowIndex, colIndex, store) {
    var returnValue = "";
    var state = record.data.state;
    returnValue += '<em class="modify-ico" title="修改" onclick=""></em>'+
                    '<em class="del-ico" title="删除" onclick=""></em>';
    
    return returnValue;
}
/*
* 提示文字
*/
function qtips(value, cellmeta, record, rowIndex, colIndex, store){
    return '<span  title="'+ value +'">' + value + '</span>';    
}

