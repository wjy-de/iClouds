
	var app=angular.module('test',[]);
	app.controller('textCtrl',['$scope',function($scope){
		if(localStorage.r){
			$scope.colors=JSON.parse(localStorage.r);
		}else{
			$scope.colors=[
				{
					id:1001,
					name:'新列表1',
					them: 'one',
					todos:[
					{
						title:'王姣姣',
						state: 0
					}
					]
			}
			];
		}
//		if(localStorage.r1){
//			$scope.color1s=JSON.parse(localStorage.r1);
//		}else{
//			$scope.color1s=[];
//		}
		$scope.save2local=function(){
				localStorage.r=JSON.stringify($scope.colors);
				localStorage.r1=JSON.stringify($scope.color1s);
		}
		$scope.cu=0;
		$scope.cu1=0;
		var color = ['one','two','three','four','five','six','seven'];
		$scope.color1 = ['one','two','three','four','five','six','seven'];
		$scope.color2 = [
			{color:"purple"},
			{color:"green"},
			{color:"blue"},
			{color:"yellow"},
			{color:"black"},
			{color:"red"},
			{color:"orange"},
		]
		function maxId(){
			var max=-Infinity;
			for(var i=0;i<$scope.colors.length;i++)
				var v=$scope.colors[i];
				if(v.id>max){
					max=v.id;
				}
			return (max===-Infinity)?100:max;
		}
		$scope.addList = function(){
			var len=$scope.colors.length;
			var index = len%7;
			var v = {
					id:maxId+1,
					name:'新列表' + (len+1),
					them: color[index],
					todos:[
					{
						title:'王姣姣',
						state: 0
					}
					]
			}
			$scope.colors.push(v);	
		}
		$scope.finished1=function(){
			$scope.colors[$scope.cu].them==$scope.color1[$scope.cu1];
			$scope.cu=$scope.cu1;
			$(".dhk").removeClass("s-h");
			$scope.save2local();
		}
		$scope.qx=function(){
			$(".dhk").removeClass("s-h");
		}
		$scope.remove=function(){
			var list1=$(".noFinish").find(".list");
			var index=list1.index();
			if(index==-1){
				return ;
			}
			$scope.colors.splice(index,1);
			$(".dhk").removeClass("s-h");
			$scope.save2local();
		}
		
		$scope.count=function(){
			var r=0;
			$scope.colors[$scope.cu].todos.forEach(function(v,i){
				if(v.state===1){
					r++;
				}
			})
			return r;
		}
		$scope.clear=function(){
			console.log(1)
			var newarr = [];
			$scope.colors[$scope.cu].todos.forEach(function(v,i){
				if(v.state===0){
					newarr.push(v);
				}
			});
			$scope.colors[$scope.cu].todos=newarr;
		}
//		$scope.delete3=function(){
////       	$scope.colors[$scope.cu].todos.splice(index,1);
//			$(".wwc-box").find(".wwc-list").removeClass("no");
//			$(this).find(".wwc-list").addClass("no");
//			
//      }
	}])
	

/*js*/
app.directive('myUl',[function(){
	return {
		restrict:'A',
		replace:true,
		template: '<ul class="list-group"><div ng-transclude></div></ul>',
		transclude:true,  //在一个div里写ng-transclude，避免页面中div里面嵌套的东西也被替换了
		link:function($scope,el){
			$(el).on('click','.list',function(){
				$(el).find(".list").removeClass("active");
				$(this).addClass("active");
				var that=this;
				$scope.$apply(function(){
					$scope.cu=$(that).index();
				});
			})
			$(document).on('keyup',function(e){
				if(e.keyCode===46){
					var index=$('.active').index();
				}
				if(index==-1){
					return ;
				}
				$scope.$apply(function(){
					$scope.colors.splice(index,1);
					$scope.save2local();
				})
			})
			$(el).on('keyup',false);
			$(":input").on('keyup',false);
			$(".list2").on('keyup','.xinxi',function(){
				console.log(1);
				return false;
			});
			$(".ywc-list").on('keyup','.xinxi',function(){
				console.log(1);
				return false;
			});
		}
		
	}
}])

app.directive('addBtn',[function(){
	return {
		restrict:'A',
		replace:true,
		link:function($scope,el){
			$(el).on('click',function(){
				$(".dhk").toggleClass("s-h");
				return false;
			});
			$(".dhk").on('click',false);
			$(document).on('click',function(){
				$(".dhk").removeClass("s-h");
			})
		}
	}
}])

app.directive('finished',function(){
	return {
		restrict:'A',
		replace:true,
		link:function($scope,el){
			$(el).on('click','.color-list',function(){
				$(".color-list").addClass('active1');
				$(this).removeClass('active1');
				var index=$(this).index();
				$scope.$apply(function(){
					$scope.cu1=index;
				})
			})
			
			$(".ywc-btn").on('click',function(){
				$(".ywc-btn span").toggleClass("active2");
				$(".ywc-list").toggleClass("active4");
				$(".qc").toggleClass("qc1");
				return false;
			})
			$(".list2").children(".new-pro").on('click',function(){
				$(".list2").children(".wwc-box").addClass("active3");
				return false;
			})
//			var color=[
//				{
//					border	
//				}
//			]
			$(".wwc-box").on('click','.wwc-list',function(){
				$(".wwc-box").find('.xinxi').css({"background":"transparent","border":"none"});
				$(this).find(".xinxi").css({'border':'1px solid #b14bc9','border-left':'none','border-right':'none','background':'#f3e9f6','opacity':0.5});
				$(".wwc-box").find(".button2").css('display','none');
				$(this).find(".button2").css('display','block');
				return false;
			})
			$(".ywc-list").on('click','.wwc-list',function(){
				$(".ywc-list").find('.xinxi').css({"background":"transparent","border":"none"});
				$(this).find(".xinxi").css({'border':'1px solid #b14bc9','border-left':'none','border-right':'none','background':'#f3e9f6','opacity':0.5});
				$(".ywc-list").find(".button2").css('display','none');
				$(this).find(".button2").css('display','block');
				return false;
			})
//			$(document).on('click',function(){
//				$(".list2").children(".wwc-box").removeClass("active3");
//				console.log(2)
//			})
			$(".wwc-box").on('click','.button',function(){
				$(".wwc-box").find("wwc-list").removeClass('no');
				$(this).closest(".wwc-list").addClass('no');
				return false;
			})
			$(".ywc-list").on('click','.button',function(){
				$(".ywc-list").find("wwc-list").removeClass('no');
				$(this).closest(".wwc-list").addClass('no');
				return false;
			})
			
		}
	}
})
