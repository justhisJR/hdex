$(function() {
    var $top_menu = $(".top_menu > li");
    var $sub = $(".sub");
    var headerMin = $(".cate_section").height();
    var headerMax = headerMin + $sub.innerHeight();
    var speed = 200;
    var flag = false;
    $sub.hide();
 
    $top_menu.mouseenter( function () {
        if (!flag) {
            $(".cate_section").stop().animate({
                height: headerMax
            }, speed, function () {
                $sub.stop().fadeIn(speed);
            });
            flag= true;
        }
        $(this).find("a").addClass(".on");
        $(this).find("ul").addClass(".on");
        $(".menu_section").mouseleave(function () {
        $sub.stop().fadeOut(speed, function() {
            $(".cate_section").stop().animate({
                height:headerMin
            }, speed);
        });
            flag=false;
        });
        $(".top_menu li a").focus(function() {
            $(".cate_section").stop().animate({
                height:headerMax
            }, speed);
            $sub.stop().fadeIn(speed);
        }).blur(function () {
            $(".cate_section").stop().animate({
                height:headerMin
            }, speed);
            $sub.stop().fadeOut(speed);
        })
    });

    console.log("mamamamama");
 
 
 
     /*
     var header = document.querySelector('.header'),
         menuSection = document.querySelector(".menu_section");
         subMenu = document.querySelectorAll('.sub'),
         headerHeight = header.offsetHeight;
         subMenuHeight = 0;
     console.log(subMenu);
     /* menu_section에 마우스를 올리면 header의 높이가 270으로
     나가면 header의 높이가 다시 60으로 변경*/
     /*
     menuSection.addEventListener('mouseover', function () {
         header.style.height='400px';
     });
     menuSection.addEventListener('mouseout', function () {
         header.style.height='60px';
     });
     */
     /*menu_section에 마우스를 올리면 header의 headerHeight subMenuHeight를 더한 최종크기로 변경
       menu_section에 마우스가 나가면 headerHeight로 변경
     
     */
    /*
     //2차 메뉴 숨기기
     $('.sub').hide();
     //호버 기능으로 2차메뉴 슬라이딩
     $('.top_menu > li').hover(function () {
         $(this).find('.sub').show(200);
         //slideDown과 비슷한 예로 fadeIn을 사용하면된다
     }, function () {
         $(this).find('.sub').hide(200);
         
         //slideDown과 비슷한 예로 fadeOut을 사용하면된다
     });
     */
});
    
