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
    initGrid();
    
});
function initGrid(){
    data = [
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1'],
        ['供应商1']
        
    ];

    // create the data store
    store = Ext.create('Ext.data.Store', {
        fields: [
           {name: 'name'}
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
            }
        ];
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
        autoHeight: true,
        autoWidth: true,
        renderTo: 'queryGrid',
        /*resizable: {
          handles: 's',
          minHeight: 100
        },*/
        bbar: pager,
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
/*
* 提示文字
*/
function qtips(value, cellmeta, record, rowIndex, colIndex, store){
    return '<span  title="'+ value +'">' + value + '</span>';    
}

var setting = {
			check: {
				enable: true,
				chkboxType: { "Y": "p", "N": "s" }
			},
			data: {
				simpleData: {
					enable: true,
					idKey:'funcId',
					pIdKey:'supFuncId'
				}
			}
		};

		var zNodes =[
			{ funcId:1, supFuncId:0, name:"父节点1 - 展开", open:true},
			{ funcId:11, supFuncId:1, name:"父节点11 - 折叠", checked:true},
			{ funcId:111, supFuncId:11, name:"叶子节点111"},
			{ funcId:112, supFuncId:11, name:"叶子节点112"},
			{ funcId:113, supFuncId:11, name:"叶子节点113"},
			{ funcId:114, supFuncId:11, name:"叶子节点114"},
			{ funcId:12, supFuncId:1, name:"父节点12 - 折叠"},
			{ funcId:121, supFuncId:12, name:"叶子节点121"},
			{ funcId:122, supFuncId:12, name:"叶子节点122"},
			{ funcId:123, supFuncId:12, name:"叶子节点123"},
			{ funcId:124, supFuncId:12, name:"叶子节点124"},
			{ funcId:13, supFuncId:1, name:"父节点13 - 没有子节点"},
			{ funcId:2, supFuncId:0, name:"父节点2 - 折叠"},
			{ funcId:21, supFuncId:2, name:"父节点21 - 展开", open:true},
			{ funcId:211, supFuncId:21, name:"叶子节点211"},
			{ funcId:212, supFuncId:21, name:"叶子节点212"},
			{ funcId:213, supFuncId:21, name:"叶子节点213"},
			{ funcId:214, supFuncId:21, name:"叶子节点214"},
			{ funcId:22, supFuncId:2, name:"父节点22 - 折叠"},
			{ funcId:221, supFuncId:22, name:"叶子节点221"},
			{ funcId:222, supFuncId:22, name:"叶子节点222"},
			{ funcId:223, supFuncId:22, name:"叶子节点223"},
			{ funcId:224, supFuncId:22, name:"叶子节点224"},
			{ funcId:23, supFuncId:2, name:"父节点23 - 折叠"},
			{ funcId:231, supFuncId:23, name:"叶子节点231"},
			{ funcId:232, supFuncId:23, name:"叶子节点232"},
			{ funcId:233, supFuncId:23, name:"叶子节点233"},
			{ funcId:234, supFuncId:23, name:"叶子节点234"},
			{ funcId:3, supFuncId:0, name:"父节点3 - 没有子节点", isParent:true}
		];

		$(document).ready(function(){
			if(treeObj != null){
				treeObj.destroy();
			}
			//初始化树，按配置进行渲染
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			//获取ztree对象
			var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			//获取到所有选择状态的节点
			var nodes = treeObj.getCheckedNodes(true);
			//遍历所有节点，并展开，注意：只作用于父节点，因为子节点无法展开
			for (var i = 0; i < nodes.length; i++) {
				treeObj.expandNode(nodes[i], true, true, true);
			}
		});