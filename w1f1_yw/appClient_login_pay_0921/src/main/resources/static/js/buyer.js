document.write("<script src='js/_define.js'></script>");



/***** buyer : aside 구매자 MyOrder ************************************************************************/
/***** - 내구매글 리스트 / 현황별 기능(참여신청, 참여취소, QR보기, 평점등록, 글숨김) **********/

//var loginInfo = sessionStorage.getItem("loginInfo");
//var loginMidx = sessionStorage.getItem("loginMidx");
//var loginName = sessionStorage.getItem("loginName");



// aside 영역 관련 -----------------------------------------------------------------------------------

var stateToggleNav = 1;

function toggleNav() {

	if(stateToggleNav == 1){
		openNav();
		stateToggleNav = 0;
	}
	else {
		closeNav();
		stateToggleNav = 1;
	}
}

function openNav() {
    $("#mySidenav").css("width","400px");
    $("#mySidenav").css("left","0px");
    $("#main").css("margin-left","400px");
    $("#main").css("margin-right","100px");
    $('.asideContext').css('display','inline-block');
}
  
function closeNav() {
    $("#mySidenav").css("width","0px");
    $("#mySidenav").css("left","-100px");
    $("#main").css("margin-left","200px");
    $("#main").css("margin-right","200px");
    $('.asideContext').css('display','none');
}








// 리스트 관련 --------------------------------------------------------------------------------------

/* 내 구매현황 탭 클릭 */
$('.btn_myOderlist').click(function(){

	selectedMyOrder();

});


function selectedMyOrder() {
    $('.aside_myItemlist').css('display','none');
    $('.aside_myOrderlist').css('display','block');
    $('.btn_myItemlist').css('background-color','purple');
    $('.btn_myOderlist').css('background-color','rgb(87, 2, 87)');
    myOrder(loginMidx);

};


/* 내 구매현황 출력*/
function myOrder(loginMidx){

    $.ajax({
        url : domain+'/orders/'+loginMidx,
        type : 'GET',
        success: function(data){
            
            var html = '';
			for(var i=0; i<data.length; i++){
				var state= '';
				var stateColor= '';
				

				// order가 숨김처리 되있을 때, 출력안함
				if(data[i].ostate == -2){
					continue;

				} else if(data[i].label=="참여중"){
					state = 0;
                    stateColor = 'aside_mystate join';
                    btn_buyerActionName = 'cancel';
				
				} else if(data[i].label=="다음기회에..."){
					state = 1;
                    stateColor = 'aside_mystate next';
                    btn_buyerActionName = 'X';
                
                    
				} else if(data[i].label=="구매자"){
					state = 2;
                    stateColor = 'aside_mystate buyer';
                    
					
				} else if(data[i].label=="구매완료"){
					state = 3;
                    stateColor = 'aside_mystate review';
                    btn_buyerAction = '$(".reviewForm").toggle()';
				}	
				

				html += '<div class="aside_mycard iidx'+data[i].iidx+'">';
				html += '	<div class="aside_mystatewrap aside_state '+stateColor+'"></div>';
                html += '   <span>'+data[i].label+'</span><span class="alarm ba'+data[i].iidx+'" onclick="cancleAlarm('+data[i].iidx+','+data[i].buyer+')">a</span>';
                
                if(state==1 || state==3){
                html += '     <button type="button" class="delOrder" onclick="delOrder('+data[i].oidx+','+data[i].pidx+')">X</button>';
                }
                
                html += '  	<button type="button" class="aside_item_title" onclick="showDetails('+data[i].iidx+','+loginMidx+')">'+data[i].iidx+'. '+data[i].title+'</button>';
                
                // 참여중 ㅡ> 참여취소 버튼 활성화
                if(state ==0 ){
                    html += '  	  <button type="button" class="btn_buyerAction cancleOrder" onclick="cancleOrder('+data[i].oidx+','+state+')">cancel</button>';
                
                    // 구매자 ㅡ> QR보기 버튼 활성화
                } else if(state==2){                    
                    html += '  	  <button type="button" class="btnStyleQR" onclick="viewQR('+data[i].oidx+')">QRcode</button>';
                    
                    // 구매완료 ㅡ> 평점등록 버튼 활성화
                } else if(state==3){
                    html += '  	  <button type="button" class="btn_buyerAction reviewSeller" onclick="reviewForm_toggle('+data[i].iidx+')">review</button>';
                    html += '         <form class="reviewForm_'+data[i].iidx+'" onsubmit="return false;" style="display:none">';
                    html += '           <input class="score_s_'+data[i].seller+'" type="number">';
                    html += '           <div class="rating-stars text-center">';
                    html += '               <ul class="stars" class="score_s_'+data[i].seller+'">';
                    html += '                   <li class="star" data-value="1"><i class="fa fa-star fa-fw"></i></li>';
                    html += '                   <li class="star" data-value="2"><i class="fa fa-star fa-fw"></i></li>';
                    html += '                   <li class="star" data-value="3"><i class="fa fa-star fa-fw"></i></li>';
                    html += '                   <li class="star" data-value="4"><i class="fa fa-star fa-fw"></i></li>';
                    html += '                   <li class="star" data-value="5"><i class="fa fa-star fa-fw"></i></li>';
                    html += '               </ul>';
                    html += '           </div>';
					html += '           <input class="insert_rvs_'+data[i].seller+'" type="submit" value="ok" onclick="reviewSeller('+data[i].iidx+','+data[i].seller+','+$(".rating-stars").val()+')" >';
					html += '         </form>';
					// html += '     <button type="button" class="btn_buyerAction hideOrder" onclick="hideOrder('+data[i].oidx+')">hide</button>';
					
                    
                }
                
                html += '</div>';

			} // for end
            
            
			$('#aside_myOrderlist').html(html);
            $(".reviewForm").hide();
            
			
			
		} // success end

    })




};





// 현황별 기능 관련 --------------------------------------------------------------------------------------


    /* 참여신청 */
    function regOrder(loginMidx, iidx){

        $.ajax({
            url : domain+'/orders/'+loginMidx+'/'+iidx,
            type : 'POST',
            success : function(data){

                if(data == -1){
                    alert('이미 신청하신 내역이 있습니다.');
                }else if(data == -2){
                    alert('신청하신 공구의 참여인원이 마감되어, 참여신청이 불가합니다. ');
                }else if(data == 1){
                    alert('참여신청이 완료되었습니다.');
                }

                myOrder(loginMidx);
            },
            Error : function(e){
                alert('참여신청 에러발생');

                myOrder(loginMidx);
            }

        });

    };




    /* 나의 공구구매현황[참여중][다음기회에..] - 참여취소 (글삭제) */
    function cancleOrder(oidx, state){

        var msg1='';
        var msg2='';
        var msg3='';
        
        switch(state){
            
            case 0:
                msg1 = "참여신청을 취소하시겠습니까?";
                msg2 = "참여신청이 취소되었습니다.";
                msg3 = '참여신청이 정상처리되지 않았습니다. 다시 시도해주세요.';
            break;

            case 1:
                msg1 = "글을 삭제하시겠습니까?";
                msg2 = "글이 정상적으로 삭제되었습니다.";
                msg3 = '글이 정상 삭제처리되지 않았습니다. 다시 시도해주세요.';
            break;
        
        };
        
        
        if(confirm(msg1)){

            $.ajax({
                url : domain+'/orders/'+oidx,
                type : 'DELETE',
                success : function(data){

                    if(data==1){
                        alert(msg2);
                    } else {
                        alert(msg3);
                    }
                    
                    myOrder(loginMidx);
                }
            }); 
        };
    };



    /* 평점등록 폼 토글 */
    function reviewForm_toggle(iidx){
        $(".reviewForm_"+iidx).toggle();
    };


    /* 나의 공구구매현황[구매완료] - 평점등록 */
    function reviewSeller(iidx, seller, score_s){
        
        if(confirm('평점등록 후 수정이 불가합니다. 등록하시겠습니까?')){

            //var score_s = $(".score_s_"+seller).val();
            //alert("score_s : "+score_s);

            var regRvFormData = new FormData();
            regRvFormData.append('score_s',score_s);
            regRvFormData.append('midx',seller);
            regRvFormData.append('iidx',iidx);
            
            
            $.ajax({
                url : domain+'/orders/',
                type : 'POST',
                processData: false, // File 전송시 필수
                contentType: false, // multipart/form-data
                data : regRvFormData,
                success : function(data){

                    $(".score_s_"+seller).attr("disabled",true);
                    $(".insert_rvs_"+seller).css("display","none");
                    
                    alert(iidx+'번 글의 판매자 '+seller+'님의 평점 '+data+'건을 등록했습니다.')
                    
                }

            });

        };	

    };




    /* 나의 공구구매현황[구매완료] - 글숨김 */
    function hideOrder(oidx){
        
        if(confirm('글 숨김 처리 후 다시 해제할 수 없습니다. 글 숨김 하시겠습니까?')){

            $.ajax({
                url : domain+'/orders/'+oidx,
                type : 'PUT',
                success : function(data){

                    if(data==1){
                        alert('글이 숨김처리 되었습니다.');
                    } else {
                        alert('글이 숨김처리 되지 않았습니다. 다시 시도해주세요.');
                    }

                    myOrder(loginMidx);
                }
            });
        };	
    };



    /* 나의 공구구매현황[구매완료] - 주문글삭제 */
    function delOrder(oidx, pidx){
        
        if(confirm('글을 삭제하시겠습니까?')){

            $.ajax({
                url : domain+'/orders/'+oidx +'/'+pidx,
                type : 'DELETE',
                success : function(data){

                    if(data==2){
                        alert('글이 삭제처리 되었습니다.');
                    } else {
                        alert('글이 정상적으로 삭제처리 되지 않았습니다. 다시 시도해주세요.');
                    }

                    myOrder(loginMidx);

                }
            });
        };	
    };




