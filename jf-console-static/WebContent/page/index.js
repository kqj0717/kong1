Ext.onReady(function(){
	Ext.QuickTips.init();
    getMenu();
    menuOpera();
});

/**
 * 得到所有菜单
 */
function getMenu() {
	var homePage = null;
	var menuData ="";
	// 数据示例1
	/*var menuData = [{"children":[{"funcCode":"SHANGPINLIEBIAO","funcId":2,"funcLevel":2,"funcName":"商品列表","funcOrder":2,
		"funcUrl":"item/itemMgnt.html"}],"funcCode":"SHANGPINGUANLI","funcId":1,"funcLevel":1,"funcName":"商品管理","funcOrder":1,
		"funcUrl":"*.jsp"},{"children":[{"funcCode":"SHANGJIADINGDAN","funcId":12,"funcLevel":2,"funcName":"广告位管理",
			"funcOrder":12,"funcUrl":"pageManagement/bannerMgnt.jsp"}],"funcCode":"DINGDANGUANLI","funcId":11,"funcLevel":1,"funcName":
				"页面管理","funcOrder":11,"funcUrl":"*.jsp"},{"children":[],"funcCode":"YOUHUIQUANXIAOFEI","funcId":14,
					"funcLevel":1,"funcName":"优惠券消费列表","funcOrder":14,"funcUrl":"order/couponUse.jsp"}]*/
	// 数据示例2
	var menuData = [{"children":[{"funcCode":"SHANGJIADINGDAN","funcId":12,"funcLevel":2,"funcName":"广告位管理",
			"funcOrder":12,"funcUrl":"demo/grid.html"}],"funcCode":"DINGDANGUANLI","funcId":11,"funcLevel":1,"funcName":
				"页面管理","funcOrder":11,"funcUrl":"*.jsp"}];
	var firstCount = 0; //记录当前菜单箭头位置，用于子菜单显示时确定自己的位置
	for(var i = 0; i < menuData.length; i++) {
		var menu = menuData[i];
		var menuHtml="";
		var secondMenuHtml="";
		var oper = ""; //点击动作字符串
		var css = ""; //css
		//排除“首页”这个菜单
		if (menu != null && menu != ""  &&  menu.funcLevel == "1") {
			//如果链接为空，则输入默认点击操作
			if(menu.funcUrl != null && menu.funcUrl != "" && menu.funcUrl != "*.jsp") {
				oper = 'onclick=\'$("#indexiframe").attr("src","' + menu.funcUrl + '");$("#cnt-title").html("'+menu.funcName+'");\'';
				//给首页赋值
				if(i==0)homePage = menu.funcUrl;
			}
			//根据code判断菜单小图标
			if (menu.funcCode == "LIVING_HALL") {
				css += "acc-ico";
			} else if (menu.funcCode == "ABILITY_CUBE") {
				css += "acc-ico";
			} else if (menu.funcCode == "STRATEGY_CENTER") {
				css += "acc-ico";
			} else if (menu.funcCode == "ELEMENT_MGNT") {
				css += "acc-ico";
			} else if (menu.funcCode == "SYS_MGNT") {
				css += "acc-ico";
			} else if (menu.funcCode == "MAINTENANCE_MENT") {
				css +="acc-ico";
			}else if (menu.funcCode == "SHANGPINGUANLI") {
				css +="goods-ico";
			}else if (menu.funcCode == "DINGDANGUANLI") {
				css +="busi-ico";
			}else {
				css +="acc-ico";
			}
			css =" class=\""+css+"\" ";
			if(menu.children != null && menu.children.length > 0) {
				secondMenuHtml="<ul class=\"second-menu\">";
				for (var y = 0; y < menu.children.length; y++) {
					var secondMenu = menu.children[y];
					var secondeOper = "";
					if (secondMenu.funcUrl != null && secondMenu.funcUrl != "" && secondMenu.funcUrl != "*.jsp") {
						secondeOper = 'onclick=\'$("#indexiframe").attr("src","' + secondMenu.funcUrl + '");$("#cnt-title").html("'+secondMenu.funcName+'");\'';
						if(y==0){
							secondMenuHtml+="<li id=\"defaultPage"+firstCount+"\" idsrc=\""+secondMenu.funcUrl+"\" "+secondeOper+">"+secondMenu.funcName+"</li>"
							//给首页赋值
							firstCount++;
						}else{
							secondMenuHtml+="<li "+secondeOper+">"+secondMenu.funcName+"</li>"
						}
					}
				}
				secondMenuHtml+="</ul>"
				menuHtml = "<li class=\"frt hasMenu\"><span "+oper+" ><i id=\""+menu.funcId+"\"" +css+"></i>"+menu.funcName+"</span><em class=\"m-arrow\">></em>"+secondMenuHtml+"</li>";
			} else {
				menuHtml = "<li id=\"defaultPage"+firstCount+"\" idsrc=\"+"+menu.funcUrl+"\" class=\"frt\"><span "+oper+" ><i id=\""+menu.funcId+"\"" +css+"></i>"+menu.funcName+"</span></li>";
				firstCount++;
			}
			$("#menu").append(menuHtml);
			
			
			//默认选中菜单，主页通用js中
			setDefaultPage();
		}
	}

};

