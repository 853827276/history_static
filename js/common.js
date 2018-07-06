/**
 * 公共的js
 */
var contextPath='/history/'
var domain = document.location.origin+contextPath;

var bgUrl ='http://127.0.0.1:10086/';
var uploadPath=bgUrl+'upload/file';
var registerPath=bgUrl+'register';
var loginPath=bgUrl+'login';//login/{userName}/{password}

var carouselPath=bgUrl+'index/carouselList';
var profilePath=bgUrl+'index/findById';

$(function(){
	//加载轮播
	ajaxUtil.get(true,'',carouselPath,carouseCallback);	
	function carouseCallback(res){
		if(res.status){
			var html='';
			$.each(res.data,function(i,item){
				html +='<div style="background-image: url('+item.url+');background-size: cover;"></div>';
//				console.log("item ="+JSON.stringify(item));
			});
			$('#loadCarousel').empty().html(html);
			//常规轮播
			layui.carousel.render({
				elem : '#carousel',
				arrow : 'always',
				full:false,
				width: '100%',
				height: '1000px',
				interval: 5000
			});
		}
	}
	
	//处理菜单
	ajaxUtil.get(true,'',profilePath,profileCallback);	
	function profileCallback(res){
		if(res.status&&res.data!=null){
			$('#login').hide();
			$('#register').hide();
		}else{
			$('#login').show();
			$('#register').show();
		}
	}
});


new BaiduMap({
	id : "map",
	title : {
		text : "沈阳师范大学",
		className : "title"
	},
	content : {
		className : "content",
		text : [ "地址：沈阳市黄河北大街253号", "邮编：110034" ]
	},
	point : {
		lng : "123.4152600000",
		lat : "41.9087810000"
	},
	level : 15,
	zoom : true,
	type : [ "地图", "卫星", "三维" ],
	width : 320,
	height : 70,
	icon : {
		url : "./imgs/icon.png",
		width : 36,
		height : 36
	}
});

var ajaxUtil=(function(){		
	return {
		jsonp: function(async,data,url,callback){
			$.ajax({
				url:url,
				type:'get',
				dataType:'jsonp',
				jsonp:"callback",
				data:data,
				async:async,
				success:function(res){
					callback(res);
				}
			});
		},
		get: function(async,data,url,callback){
			$.ajax({
				url:url,
				type:'get',
				data:data,
				async:async,
				success:function(res){
					callback(res);
				}
			});
		},
		post: function(async,data,url,callback){
			$.ajax({
				url:url,
				type:'post',
				data:data,
				async:async,
				success:function(res){
					callback(res);
				}
			});
		}
	}
})()