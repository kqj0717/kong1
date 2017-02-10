$(function(){
	stepTab();
});
/* step tab */
var idx;
function stepTab(){
	$(".alter-step li").click(function(){
		idx = $(this).index();
		$(this).addClass("cur");
		$(".alter-cnt").addClass("undis");
		$(".alter-cnt").eq(idx).removeClass("undis");
	});
}
/* next step */
function nextStep(idx){
	$(".alter-step li").eq(idx - 1).addClass("cur");
	$(".alter-cnt").addClass("undis");
	$(".alter-cnt").eq(idx - 1).removeClass("undis");
	
}
