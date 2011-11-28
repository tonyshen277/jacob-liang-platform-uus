/**
 * 日志列表页面
 * @author lianglp
 * @version 1.0
 * @class com.bhtec.view.business.platform.logger.LoggerList
 * @date 2010-07-12
 */
Ext.namespace('com.bhtec.view.business.platform.logger');
com.bhtec.view.business.platform.logger.LoggerList = function(config){
	var xmlDoc = config.xmlDoc;//域描述信息
	var optModName = 'optModName_q';
	var optName = 'optName_q';
	var optUserName = 'optUserName_q';
	var optUserRole = 'optUserRole_q';
	var optPcIp = 'optPcIp_q';
	var optBusinessId = 'optBusinessId_q';
	var startTime = 'startTime_q';
	var endTime = 'endTime_q';
	var moduleGridId = 'loggerGridId';
	
	/**
	 * 查询条件
	 */
	var queryCondition = function(){ 
		var queryArr = new Array();
		queryArr.push({
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:optModName,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optModName'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				},{
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:optName,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optName'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				},{
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:optUserName,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optUserName'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				});
		queryArr.push({
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:optUserRole,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optUserRole'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				},{
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.textField({
								id:optPcIp,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optPcIp'),
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				},{
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.numberField({
								id:optBusinessId,
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'optBusinessId'),
								allowDecimals : false,
								emptyText:'请输入数字',
								listeners: {
					                specialkey: function(field, e){
					                    if (e.getKey() == e.ENTER) {
					                       query();
					                    }
					                }
					            }
							})]
				});
		queryArr.push({
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.dateField({
								id:startTime,
								format:'Y-m-d',
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'startTime'),
								dateRange:{begin:startTime,end:endTime},
								vtype:'dateRange'
							})]
				},{
					border : false,
					layout : 'form',
					columnWidth : 0.3,
					items : [com.bhtec.view.util.CommonWidgets.prototype.dateField({
								id:endTime,
								format:'Y-m-d',
								width:150,
								fieldLabel : getFormFieldName(xmlDoc,'endTime'),
								dateRange:{begin:startTime,end:endTime},
								vtype:'dateRange'
							})]
				});
		return queryArr;
	}
	/**
	 * 查询操作
	 */
	var query = function(){	
		if(getExtCmpById(startTime).validate() == false
			||getExtCmpById(endTime).validate() == false){
				return;
			}
		var configQuery = {
				url : 'loggerAction!findLoggerByCon.action',
				params : {
					optModName : getExtCmpValueById(optModName),
					optName : getExtCmpValueById(optName),
					optUserName : getExtCmpValueById(optUserName),
					optUserRole : getExtCmpValueById(optUserRole),
					optPcIp : getExtCmpValueById(optPcIp),
					optBusinessId : getExtCmpValueById(optBusinessId),
					startTime : getExtCmpValueById(startTime),
					endTime : getExtCmpValueById(endTime)
				},
				callBack : function(returnData) {
					queryFillGridList(moduleGridId,returnData);
				}
			}
			ajaxRequest(configQuery);
	}
	/**
	 * 重置查询
	 */
	var reset = function(){
		resetCmpValueById(optModName);
		resetCmpValueById(optName);
		resetCmpValueById(optUserName);
		resetCmpValueById(optUserRole);
		resetCmpValueById(optPcIp);
		resetCmpValueById(optBusinessId);
		resetCmpValueById(startTime);
		resetCmpValueById(endTime);
	}
	/**
	 * 模块列模式
	 */
	var cols = function(){
		var colsArr = new Array();
		colsArr.push({
				dataIndex : 'optId',
				hidden:true,
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optModName'),
				dataIndex : 'optModName',
				width : 100,
				renderer:function(value){
					return '<span qtip="'+value+'">'+value+'</span>';
				},
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optName'),
				dataIndex : 'optName',
				width : 100,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optContent'),
				dataIndex : 'optContent',
				width : 150,
				renderer:function(value){
					return '<span qtip="'+value+'">'+value+'</span>';
				},
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optBusinessId'),
				dataIndex : 'optBusinessId',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optPcName'),
				dataIndex : 'optPcName',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optPcIp'),
				dataIndex : 'optPcIp',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optUserName'),
				dataIndex : 'optUserName',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optUserRole'),
				dataIndex : 'optUserRole',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optUserOgan'),
				dataIndex : 'optUserOgan',
				width : basicConstant.GRID_COL_WIDTH,
				sortable: true 
			});
		colsArr.push({
				header : getFormFieldName(xmlDoc,'optTime'),
				dataIndex : 'optTime',
				width : 120,
				sortable: true 
			});
		return colsArr;
	}
	 /**
	  * 模块grid store
	  */
    var moduleStore = new Ext.data.JsonStore({
				fields : ['optId', 'optModName', 'optName','optContent', 
						  'optBusinessId', 'optPcName','optPcIp',
						   'optUserName','optUserRole','optUserOgan','optTime'],
				autoLoad : true,
				totalProperty : 'count',
				root : 'sysPlLoggerServiceList',
				url : 'loggerAction!findLoggerByCon.action'
			});
			
	
	/**
	 * 为翻页加自定义参数
	 */
    moduleStore.on('beforeload', function(thiz,options) {
    	var new_params = {
						optModName : getExtCmpValueById(optModName),
						optName : getExtCmpValueById(optName),
						optUserName : getExtCmpValueById(optUserName),
						optUserRole : getExtCmpValueById(optUserRole),
						optPcIp : getExtCmpValueById(optPcIp),
						optBusinessId : getExtCmpValueById(optBusinessId),
						startTime : getExtCmpValueById(startTime),
						endTime : getExtCmpValueById(endTime)
					}; 
		Ext.apply(options.params,new_params); 
	});	
	
	
	/**
	 * 工具栏按钮
	 */	
    var toolbar = function(){
		var frametoolbar = new Array();
		var modOptList = fourthModOpt[config.moduleId];
		for(i=0;i<modOptList.length;i++){
			var modOpt = modOptList[i];
			var handlerFun = '';
			if(basicConstant.VIEW_OPT_LINK == modOpt.optFunLink){
				handlerFun = config.moduleForm.viewForm;
			}
			frametoolbar.push({
				text:modOpt.modName,
				iconCls:modOpt.modImgCls,
				handler:handlerFun
			},'-');
		}
		
		return frametoolbar;
	};
	
	/**
	 * 查询区
	 */
	var queryPara = {
			query:query,
			reset:reset,
			queryCondition:queryCondition(),
			queryColWidth:0.2,
			currentPosition:basicConstant.PLTM+'日志管理->系统日志管理'
	}
	/**
	 * 列表区
	 */
	var gridListPara = {
			cols:cols(),
			store:moduleStore,
			gridId		:	moduleGridId,
			gridHeight:380
	}
	/**
	 * 按钮区
	 */
	var toolbarPara = {
		toolbar		:	toolbar()
	}
	/**
	 * 整个列表
	 */
	var configList = {
			queryPara:queryPara,
			toolbarPara:toolbarPara,
			gridListPara:gridListPara
	}	
	return configList;
}
