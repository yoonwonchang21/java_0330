document.write("<script src='js/_define.js'></script>");




/***** seller : aside 판매자 MySale ************************************************************************/
/***** - 내판매글 리스트 / 참여자 리스트 / 현황별 기능(구매자선정,거절,자동거절,평점,글숨김) **********/

//var loginInfo = sessionStorage.getItem("loginInfo");
//var loginMidx = sessionStorage.getItem("loginMidx");
//var loginName = sessionStorage.getItem("loginName");



$(document).ready(function(){

	openNav();
	selectedMyOrder();
	
	/* ing 나의 공구구매현황[구매자] - 평점등록  */
    /* 별 표시  */
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('.stars li').mouseover(function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
    
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('.star').each(function(e){
        if (e < onStar) {
            //$(this).addClass('hover');
            $(this).css('color','#FFCC36');
        }
        else {
            //$(this).removeClass('hover');
            $(this).css('color','#ccc');
        }
        });
    
    }).mouseout(function(){
        $(this).parent().children('.star').each(function(e){
            //$(this).removeClass('hover');
            $(this).css('color','#ccc');
        });
    });
    


    /* ing 나의 공구구매현황[구매자] - 평점등록  */
    /* 별 표시 - 평점계산  */
    /* 2. Action to perform on click */
    $('.stars li').click(function(){

        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('.star');

        for (i = 0; i < stars.length; i++) {
            //$(stars[i]).removeClass('selected');
            $(stars[i]).css('color','#ccc');
        }

        for (i = 0; i < onStar; i++) {
            //$(stars[i]).addClass('selected');
            $(stars[i]).css('color','#FF912C');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        alert('ratingValue : '+ratingValue);

        $(this).parent().eq(2).data('value',ratingValue);

    });
	



});  // ready end





// 리스트 관련 --------------------------------------------------------------------------------------

function checkQR(oidx){
  
  url = "https://www.dreambal.com/w1f1/qrcheck.php";
  window.open(url,"checkQR","width=300,height=300");

}

	/* 내 구매현황 탭 클릭 */
	$('.btn_myItemlist').click(function(){
		selectedMySale();
	});

	function selectedMySale() {
		$('.aside_myOrderlist').css('display','none');
		$('.aside_myItemlist').css('display','block');
		$('.btn_myItemlist').css('background-color','rgb(87, 2, 87)');
		$('.btn_myOderlist').css('background-color','purple');
		myitem(loginMidx);
	};



	/* 내 판매글 리스트보기  */
	/* midx 받아서 ㅡ> 판매글 목록(상태라벨, 제목) 화면출력 */
	function myitem(loginMidx) {

		$.ajax({
			url: domain+'/items/myitem/'+loginMidx,
			type: 'GET',
			success: function(data){
				
				var html = '';
				var state= '';
				var stateColor= '';
				
				for(var i=0; i<data.length; i++){
					state= '';
					stateColor= '';					
					
					if(data[i].label=="모집중"){
						state = 0;
						stateColor = 'aside_mystate joinIng';


					} else if(data[i].label=="모집완료"){
						state = 1;
						stateColor = 'aside_mystate joinCom';
					
						
					} else if(data[i].label=="판매완료"){
						state = 2;
						stateColor = 'aside_mystate saleCom';
						

					} else if(data[i].label=="판매실패"){
						state = 3;
						stateColor = 'aside_mystate saleFail';
					}	
					

					html += '<div class="aside_mycard iidx'+data[i].iidx+'">';
					html += '	<div class="aside_mystatewrap aside_state '+stateColor+'"></div>';
					html += '   <span>'+data[i].label+'</span><span class="alarm sa'+data[i].iidx+'" onclick="cancleAlarm('+data[i].iidx+','+data[i].buyer+')">a</span>';
					
					if(state==0){
					html += '  	  	  <span class="aside_'+data[i].iidx+'">현재참여자 : '+data[i].cntBuyer+'명 / 구매정원 :'+data[i].count_m+'명</span>';
					}
					
					html += '	<button type="button" class="aside_item_title" onclick="showDetails('+data[i].iidx+','+loginMidx+')">'+data[i].iidx+'. '+data[i].title+'</button>';
					html += '	<button type="button" class="btn_mybuyer_view" onclick="mybuyer_toggle('+data[i].iidx+')"> ▼ </button>';
					html += '	<div class="aside_mybuyer_list_'+data[i].iidx+'" style="display: block;"></div>';
					html += '</div>';

					// 해당 판매글의 참여자 리스트
					mybuyer(data[i].iidx, state, data[i].count_m, stateColor);

				}
				
				$('#aside_myItemlist').html(html);
				
				
				
			} // for end
		}); // ajax end
	}; // myitem end





	/* 내 판매글 참여자 리스트보기  */
	/* iidx 받아서 ㅡ> 구매자 목록(구매자 이름, 평균평점, 총평점개수 + ostate, pstate선택) 화면출력 */
	function mybuyer(iidx, state, count_m, stateColor) {

		$.ajax({
			url: domain+'/items/mybuyer/'+iidx,
			type: 'GET',
			success: function(data){
				
				var buyerState = '';
				var btn_sellerActionName = '';
				var btn_sellerAction = '';
				//var stateColor= '';
				var html = '';
				
				html += '<hr style="clear: both;width:75%">';
				for(var i=0; i<data.length; i++){
					
					switch(state){

						// 판매글 상태 : 모집중 ㅡ>	거절버튼, 구매자선정 버튼
						case 0:
							buyerState = '참여중';
							stateColor = '';
							btn_sellerActionName = '거절';
							btn_sellerAction = '';
							break;
							
						// 판매글 상태 : 모집완료 ㅡ> 큐알발급버튼, 발급큐알보기버튼
						case 1:
							buyerState = '구매자';
							stateColor = '';
							if(data[i].qr==0){
								btn_sellerActionName = 'QR발급';
								btn_sellerAction = 'insertQR';
							} else {
								btn_sellerActionName = 'QRcode체크';
								btn_sellerAction = 'checkQR';
							}
							break;
						
						// 판매글 상태 : 판매완료 ㅡ> 구매자평점등록버튼, 글숨김버튼
						case 2:
							if(data[i].pstate==0){
								buyerState = '미수령';
								stateColor = '';
							} else{
								buyerState = '수령';
								stateColor = '';
							}
							btn_sellerActionName = '평점등록';
							btn_sellerAction = 'review';
							break;
						
						// 판매글 상태 : 판매실패 ㅡ> 글숨김버튼
						case 3: 
							buyerState = '자동참여거절';
							stateColor = '';
							btn_sellerActionName = '거절';
							btn_sellerAction = 'reject';
							break;
						
					}
					
					// 참여자(또는 구매자) 이름. 평균평점. 총평점수 - 기본출력
					
						html += '<hr style="clear: both;width:50%">';						 
						html += '<div class="aside_mybuyer iidx'+data[i].iidx+' '+stateColor+'">';						
						html += '   <span class="buyerState '+stateColor+'">'+buyerState+' | </span>';
						html += '	<span class="buyer_name midx'+data[i].buyer+'">'+data[i].name+'</span>';
						html += '  	<span class="rvb_avg">별'+data[i].rvb_avg+'</span><span class="rvb_total">/'+data[i].rvb_totalRow+'</span><br>';
					
					
					// 모집중 일때, 참여자 거절 또는 구매자 선정 버튼 출력
					if(state==0){
						html += '    	<input type="checkbox" name="select_buyer" class="btn_sellerAction select_buyer" value="'+data[i].oidx+'">선정</button>';
						html += '    	<button type="button" name="select_reject" class="btn_sellerAction select_reject" onclick="rejectBuyer('+data[i].iidx+','+data[i].oidx+')">참여거절</button>';
						

					// 모집완료 일때, QR 생성 또는 보기 버튼 출력   
					} else if(state==1){						
						html += '    <button type="button" class="btnStyleQR '+btn_sellerAction+'" onclick="'+btn_sellerAction+'('+data[i].oidx+')">'+btn_sellerActionName+'</button>';
						

					// 판매완료 일때, 평점등록 버튼 출력 	
					} else if(state==2){
						html += '<form class="reviewForm" onsubmit="return false;">';
						html += '      <input class="btn_sellerAction score_b_'+data[i].buyer+'" type="number">';
						html += '      <input class="btn_sellerAction insert_rvb_'+data[i].buyer+'" type="submit" value="평점 등록" onclick="reviewBuyer('+data[i].iidx+','+data[i].buyer+')" >';
						html += '</form>';
					

					// 판매실패 이고, ostate가 0일때, 자동거절처리 위한 참여자배열에 저장
					//} else if(state==3){
					// } else if(state==3 && data[i].ostate==0){
						// 서버에서 처리하는 걸로 변경
						//autoRejectArr.push(data[i].oidx);   // 자동 거절처리되는 참여자배열

					};
					
				} //for end
			

				// 모집중 일때, 거절 또는 구매자선정 최종확인 버튼 출력
				if(state==0){					
					html += '    	<br><br><br><span class="select_buyer_msg">*구매자 확정은 구매자를 모두 선정 한 후, 한번에 하실 수 있습니다. </span>';
					html += '    	<input type="button" class="btn_sellerAction select_buyer_ok" onclick="selectBuyer('+iidx+','+count_m+')" value="구매자 선정 확인">';
					html += '    	<input type="button" class="btn_sellerAction delitem" onclick="delItem('+iidx+')" value="글삭제">';
					//html += '    </form>';
				}
				
				
				// 판매완료 일때, 글숨김 버튼 출력. 	 
				else if(state==2){
					html += '       <input type="submit" class="purchase_del" onclick="itemHide('+iidx+')" value="글숨김">';
					html += '    	<input type="submit" class="btn_sellerAction delitem" onclick="delItem('+iidx+')" value="글삭제">';
				}
				
				// 판매실패 일때, 글숨김 버튼 출력
				else if(state==3){
					html += '       <br><span class="select_buyer_msg">*판매실패로 참여자는 모두 참여거절처리되었습니다. </span>';
					html += '       <input type="button" class="item_hide" onclick="itemHide('+iidx+')" value="글숨김">';
					html += '    	<input type="submit" class="btn_sellerAction delitem" onclick="delItem('+iidx+')" value="글삭제">';
					
					// ★자바스크립트에서 빈배열 확인할때 어떻게 하는지 다시공부필요!
					// alert('autoRejectArr != null :'+autoRejectArr != null);  //빈배열일 때도, true가 나옴... 
					// alert('!autoRejectArr.length :'+!autoRejectArr.length);  //빈배열일 때도, true가 나옴... 

					//if( !autoRejectArr.isEmpty() || autoRejectArr != null) {
					// if( autoRejectArr.length > 0) {
					// 	//alert('메서드 보내기전 확인 autoRejectArr :'+autoRejectArr);
					// 	autoRejectBuyer(iidx, autoRejectArr);
						
					// }
				}
				

				html += '</div>';


				$(".aside_mybuyer_list_"+iidx).html(html);
				//$("#qrCheckBtn").className="btn_QRCheck";
				$(".aside_mybuyer_list_"+iidx).hide();
				
			}  //success end
		});
	};  // mybuyer end



	/* 내 판매글 참여자 리스트 - 토글  */
	function mybuyer_toggle(iidx){
		
		$(".aside_mybuyer_list_"+iidx).toggle();

	}





// 판매현황별 기능관련 --------------------------------------------------------------------------------------

	var buyerArr = [];    // 선택한 구매자 담는 배열
	var rejectArr = [];   // 선택한 구매자 외 자동거절처리 참여자 담는 배열


	/* ing 나의 공구판매현황[모집중] - 참여자 ㅡ> (분기) 구매자 선정체크 또는 거절  */
	/* 서버에서의 처리문제 수정중 */
	function selectBuyer(iidx, count_m){

		alert('체크된 갯수 : '+$('input:checkbox[name="select_buyer"]:checked').length);

		// 체크된 개수 !=  구매정원 ㅡ> 다시 선택
		if($('input:checkbox[name="select_buyer"]:checked').length > count_m){
			alert('구매정원보다 체크된 구매자 수가 많습니다. 구매정원 확인 후 다시 선택해주세요.');

		} else if($('input:checkbox[name="select_buyer"]:checked').length < count_m){
			alert('구매정원보다 체크된 구매자 수가 적습니다. 구매정원 확인 후 다시 선택해주세요.');


		// 	체크된 개수 = 구매정원 ㅡ> 확정. 자동거절 처리
		} else {
			// 체크되지 않은 값 가져오기 ㅡ> 자동 거절처리 기능호출
			if($('input[name="select_buyer"]:not(:checked)').length != 0){
				
				$('input[name="select_buyer"]:not(:checked)').each(function(i) { 
					rejectArr.push($(this).val()); 
				
				});

				alert('배열에 담긴 <거절>한 참여자 확인 : '+ rejectArr);
				autoRejectBuyer(iidx, rejectArr);
			};


			// 체크된 값 가져오기 ㅡ> 구매자 확정처리 기능호출
			$('input[name="select_buyer"]:checked').each(function(i) { 
		
				buyerArr.push($(this).val()); 
			});

				alert('배열에 담긴 <선정>된 구매자 확인 : '+ buyerArr);
				selectBuyer_ok(iidx, buyerArr);
			
		};
	};




	/* 나의 공구판매현황[모집중] - 참여자 구매자 선정 ㅡ> 확정 처리 */
	function selectBuyer_ok(iidx, oidxArr){
		
		var selectData = { "list" : oidxArr };
		//var selectData = { "oidxArr" : oidxArr };		
		//alert('selectData.buyerArr : '+ selectData.oidxArr);

		// var selectData = {
		// 	iidx : iidx,
		// 	buyerArr : buyerArr,
		// };

		alert('참여자 자동 <구매자>처리 ajax전: '+iidx+'번 글. 매개변수 oidxArr배열확인 : '+oidxArr);
		
		$.ajaxSettings.traditional = true;

		$.ajax({
			url : domain+'/items/mybuyer',
			type : 'POST',
			//traditional : true,
			//processData: false, // File 전송시 필수
			//contentType: false, // multipart/form-data
			contentType: "application/json",
			//contentType :   "application/x-www-form-urlencoded",
			//dataType: "json",
			data : JSON.stringify(selectData),
			//data : oidxArr,

			
			success : function(data){

				if(data ==0){
					alert('data : '+data+', 선택하신 참여자'+oidxArr+'의 구매자 등록 처리가 실패했습니다. 다시 시도해주세요.');
				} 

				alert('선정한 구매자 등록 : ' + data);
				buyerArr = [];   // 배열 초기화
				myitem(loginMidx);
				$(".aside_mybuyer_list_"+iidx).show();

			},
			error:function(jqXHR, textStatus, errorThrown){
				alert("구매자 확정 에러 발생~~ \n" + textStatus + " : " + errorThrown);
			}
		});

	};




	/* 나의 공구판매현황[모집중] - 참여자 거절하기 */ 
	function rejectBuyer(iidx,oidx){

		if(confirm('선택하신 참여자의 참여를 거절하시겠습니까?')){
			$.ajax({
				url : domain+'/items/rejectBuyer/'+oidx,
				type : 'PUT',
				success : function(data){
					if(data != 1){
						alert('data : '+data+', 선택하신 참여자의 참여거절 처리가 실패했습니다. 다시시도해주세요.');
						myitem(loginMidx);
						$(".aside_mybuyer_list_"+iidx).show();
					}
						alert('data : '+data+', 선택하신 참여자가 참여거절 처리 되었습니다.');
						myitem(loginMidx);
						$(".aside_mybuyer_list_"+iidx).show();

				},
				error:function(jqXHR, textStatus, errorThrown){
					alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
				}
			})
		}
	};



	/* 나의 공구판매현황[모집중] - 참여자 자동거절처리 */
	/* 구매자 선정하면 나머지 선택하지 않은 참여자 */ 
	/* 판매실패하면 참여자 자동 거절처리(이때의 처리는 서버에서) */ 
	function autoRejectBuyer(iidx,oidxArr){

		alert('참여자 자동 <거절>처리: '+iidx+'번 글. 매개변수 oidxArr배열확인 : '+oidxArr);
		
		var rejectData = { oidxArr : oidxArr };
		alert('rejectData.oidxArr : '+ rejectData.oidxArr);

		$.ajax({
			url : domain+'/items/rejectBuyer',
			type : 'PUT',
			data : JSON.stringify(rejectData),
			contentType: "application/json",
			//contentType :   "application/x-www-form-urlencoded",
			//dataType: "json",
			success : function(data){
				if(data ==0){
					alert('data : '+data+', 선택하신 참여자'+oidxArr+'가 <자동 참여거절> 처리 실패했습니다. 다시 시도해주세요.');
				} 
				alert('data : '+data+', 선택하신 참여자'+oidxArr+'가 <자동 참여거절> 처리 되었습니다.');
				rejectArr=[];	// 배열초기화
				myitem(loginMidx);

			},
			error:function(jqXHR, textStatus, errorThrown){
				alert("자동거절처리 에러 발생~~ \n" + textStatus + " : " + errorThrown);
			}
		});

	};


	/* ing 나의 공구판매현황[모집완료] - 구매자 QR발급 */
	function insertQR(oidx){
	}
		
		
	/* 나의 공구판매현황[모집완료] - 구매자 QR보기 */
	function viewQR(oidx){
		
		$.ajax({
			url : domain+'/items/qr/'+oidx,
			type : 'GET',
			success : function(data){
			
				document.getElementById('qrCodeArea').style.display = 'block';
				document.getElementById('qrCodeIn').innerHTML = '';
				jQuery('#qrCodeIn').qrcode({
				      render	: "canvas",
				      width : 200,
				      height : 200,
				      text	: data
				});
			
				
			}

		})
	}

	function closeQrCode() {
		document.getElementById('qrCodeArea').style.display = 'none';
		document.getElementById('qrCodeIn').innerHTML = '';
	}

	/* 나의 공구판매현황[판매완료] - 구매자 평점등록하기 */
	function reviewBuyer(iidx, buyer){

		if(confirm('평점등록 후 수정이 불가합니다. 등록하시겠습니까?')){

			var score_b = $(".score_b_"+buyer).val();
			alert(score_b)

			var regRvFormData = new FormData();
			regRvFormData.append('score_b',score_b);
			regRvFormData.append('midx',buyer);
			regRvFormData.append('iidx',iidx);
			
			
			$.ajax({
				url : domain+'/items/review',
				type : 'POST',
				processData: false, // File 전송시 필수
				contentType: false, // multipart/form-data
				data : regRvFormData,
				success : function(data){
					$(".score_b_"+buyer).attr("disabled",true);
					$(".insert_rvb_"+buyer).css("display","none");
					alert(iidx+'번 글의 구매자 '+buyer+'님의 평점 '+data+'건을 등록했습니다.')
				}

			});

		}	
	}


	/* 나의 공구판매현황[판매완료, 판매실패] - 글숨김 */
	function itemHide(iidx){

		$.ajax({
			url : domain +'/items/hide/'+iidx,
			type : 'PUT',
			success : function(data){
				myitem(loginMidx);
				allItemlist();

			}

		});
	};

	/* 나의 공구판매현황[판매완료, 판매실패] - 글삭제 ㅡ> item.js에 포함 */