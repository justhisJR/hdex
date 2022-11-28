window.onload =function() {
    var container = $('.slide_wrapper'),
            slideGroup = container.find('.slide_slides'),
            slides = slideGroup.find('a');
            nav = container.find('.slideShow_nav'),
            indicator = container.find('.indicator'),
            slideCount = slides.length,
            indicatorHtml = '',
            currentIndex = 0,
            duration = 500,
            easing = 'easeInOutExpo',
            interval = 3500,
            timer = '';
            /* slideGroup = $('.slideShow .slideShow_slides')로 해도 잘 잡히지만
            불필요하게 찾는 일이 발생 더욱 오래걸려서 변수로 지정한 곳에서 찾으라고 변수로
            찾아줌
            css의 선택자로 봤을 때 공백이 없으면 find, 공백이 있으면 filter 
            slideCount = 슬라이드의 길이를 파악하여 언제든 자유롭게 늘리고 줄일 수 있음
            indicator = 태그를 한꺼번에 넣을 수 있는 그릇, 안에는 a태그의 길이에 따라서 
                        변하기 때문에 값을 지정해 줄 수 없음
            currentIndex = 처음인지 끝인지 구분할 수 있는 시작점 첫번째를 보고 있어야 하니 0으로지정
            duration = 500, 슬라이드가 움직이는 시간을 변수로 지정 0.5초라는 뜻
            easing = 'easeInOutExpo' animate 문법 중 하나
            interval = 3500 3.5초라는 뜻, 일정시간마다 슬라이드가 사라지고 나타나는 시간
            timer = 마우스가 슬라이드에 올라가져 있을 때 슬라이드를 멈추게 하는 변수를 지정*/

            //슬라이드를 가로로 배열
            //slides 마다 할 일, left 0%, 100%, 200%, 300%

            console.log(slides);
            slides.each(function(i) {
                var newLeft=i * 100 + '%';
                $(this).css({
                    left:newLeft
                });
                //<a href="">1</a> 주석처리한 .indicatort에 html을 삽입
                // var i = 2; , i = i+2; , i+=2;
                //indicatorHtml = indicatorHtml + ??
                //indicatorHtml += ??
                indicatorHtml += "<a href=''>"+(i + 1)+"</a>";
                console.log(indicatorHtml);
            });//slides.each
            /* 변수명 slides의 어떤 값이 적용되었는지 확인 
            left에 들어올 새로운 변수를 newLeft로 만들고 퍼센트로 값을 넣어준다.
            */
            //A.text(B); a요소의 b내용을 글씨 형태로 추가 괄호 안에 B의 내용이 없으면 추가 내용이 있으면 그 내용으로 교체
            //A.html(B); a요소의 b내용을 html 형태로 추가 괄호 안에 B의 내용이 없으면 추가 내용이 있으면 그 내용으로 교체
            //indicator.text(indicatorHtml);
            indicator.html(indicatorHtml);

            //슬라이드 이동 함수
            // index 0 left: 0% , index 1 left: -100%
            function goToSlide(index) {
                slideGroup.animate({
                    left: -100 * index + "%"
                }, duration, easing);
                currentIndex = index;
                console.log(currentIndex);

                updateNav(); //처음인지, 마지막인지 검사  .active
            }
            
            function updateNav() {
                var navPrev = nav.find('.prev');
                var navNext = nav.find('.next');
                //처음 currentIndex 0, 이전 버튼이 안보이도록
                // 참일때
                if(currentIndex == 0) {
                    navPrev.addClass('disabled');
                }else {
                    navPrev.removeClass('disabled');
                }
                // 거짓일 때
                if(currentIndex == slideCount -1) {
                    navNext.addClass('disabled');
                }else {
                    navNext.removeClass('disabled');
                }
                //보고 있는 페이지에 active클래스 추가
                //마지막 currentIndex 3, 다음 버튼이 안보이도록

                /*indicator.find('a').removeClass('active');
                // .eq(숫자), 요소를 순번을 통해서 선택 할 때
                indicator.find('a').eq(currentIndex).addClass('active');*/
                //모든 요소에서 active 빼고, 원하는 요소에만 active 추가

                // 원하는 요소에만 active를 추가하고 나머지에서 active빼기
                //형제 자매는 영어로 siblings
                indicator.find('a').eq(currentIndex).addClass('active').siblings().removeClass('active');
            }

            //인디케이터로 이동하기
            indicator.find('a').click(function(e) {
                e.preventDefault();
                var idx =  $(this).index();
                //console.log(idx);
                goToSlide(idx);
                
            });
            /* a태그는 고유의 링크 동작을 하기 때문에 할일을 매개변수로 이벤트를 지정하고
            그 이벤트를 e.preventDefault(); 라고 해야 링크 기능을 없앨 수 있다.*/

            //좌우 버튼으로 이동하기
            //다음버튼 클릭 c+1->goToSlide(?);
            //이전버튼 클릭 c-1->goToSlide(?);
            nav.find('a').click(function(e){
                e.preventDefault();
                if($(this).hasClass('prev')){
                    goToSlide(currentIndex - 1);    
                }else {
                    goToSlide(currentIndex + 1);
                }
                //var i = currentIndex - 1;
                //var i = currentIndex + 1;
            });
            /*nav.find('.prev').click(function(e){
                e.preventDefault();
                if($(this).hasClass('prev')){
                    goToSlide(currentIndex - 1);    
                }else {
                    goToSlide(currentIndex + 1);
                }
            });
            nav.find('.next').click(function(e){
                e.preventDefault();
                if($(this).hasClass('next')){
                    goToSlide(currentIndex + 1);    
                }else {
                    goToSlide(currentIndex - 1);
                }
            });*/

            //겉에다가 빼면 시작하자마자 updateNav가 실행됨
            updateNav();

            //자동 슬라이드 함수
            function startTimer() {
                //일정시간 마다 할일
                //setInterval(할일, 시간), clearInterval(이름) => 인터벌을 멈출 수 있음
                // 할일(함수) function(){실제로 할일}
                timer = setInterval(function() {
                    //nextIndex c0 n1, c1 n2, ...c3 n0
                    // (0+1)%4 = 1, (3+1)%4 = 0
                    var nextIndex = (currentIndex + 1) % slideCount;
                    goToSlide(nextIndex);
                }, interval);
            }
            startTimer();

            function stopTimer() {
                clearInterval(timer);
            }
            container.mouseenter(function () {
                stopTimer();
            }).mouseleave(function () {
                startTimer();
            })
}