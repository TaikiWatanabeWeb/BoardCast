//最初のページ読み込み処理
$(function () {

    var dash = $('.dashboard');
    var sideMenubtn = $('#side-menu-btn');
    //body.hide();

    //console.log(body);

    imagesProgress();

    function imagesProgress() {

        var $container = $('#progress'),
            $progressBar = $container.find('.progress-bar'),
            $progressText = $container.find('.progress-text'),

            imgLoad = imagesLoaded('body'),
            imgTotal = imgLoad.images.length,

            imageLoaded = 0,
            current = 0,

            progressTimer = setInterval(updateProgress, 1000 / 60);
        imgLoad.on('progress', function () {
            imageLoaded++;
        });

        function updateProgress() {
            var target = (imageLoaded / imgTotal) * 100;
            current += (target - current) * 0.1;

            $progressBar.css({
                width: current + '%'
            });
            $progressText.text(Math.floor(current) + '%');

            //終了処理
            if (current >= 100) {
                clearInterval(progressTimer);
                $container.addClass('progress-complete');
                $progressBar.add($progressText)
                    .delay(500)
                    .animate({
                        opacity: 0
                    }, 250, function () {
                        $container.animate({
                            top: '-100%'
                        }, 1000);
                    });

                dash.delay(780).queue(function () {
                    dash.css({
                        display: 'flex'
                    });


                });

                sideMenubtn.delay(780).queue(function () {
                    sideMenubtn.css({
                        display: 'flex'
                    });
                });
            }

            if (current > 99.9) {
                current = 100;


            }
        }
    }
});

function MainPageEvent() {
    //メインページのイベントハンドラ
    $(function () {
        $('#title').textillate({
            loop: true,
            minDisplayTime: 3000,
            initialDelay: 1000,
            autoStart: true,

            in: {
                effect: 'rotateInDownLeft',
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: false
            },

            out: {
                effect: 'rollOut',
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: false
            }
        });

        var anitime = 500;

        $('.names').mouseover(function () {
            $(this).stop(true).animate({
                fontSize: '17px'
            }, anitime);
        });

        $('.names').mouseout(function () {
            $(this).stop(true).animate({
                fontSize: '15px'
            }, anitime);
        });

        $('.icon-name').mouseover(function () {

            //console.log($(this).prev());

            var images_ico = $(this).prev();
            var texts = $(this).children();

            $(this).stop(true).animate({
                backgroundColor: '#ae5e9b',
                color: '#ffffff'
            }, anitime);

            images_ico.rotate({
                animateTo: 360
            });
        });

        $('.icon-name').mouseout(function () {

            var images_ico = $(this).prev();

            $(this).stop(true).animate({
                backgroundColor: '#ffffff',
                color: '#333631'
            }, anitime);

            images_ico.rotate({
                animateTo: 0
            });
        });

        //モーダルウィンドウ
        $('.compose').click(function () {
            $('.js-modal').fadeIn();
            return false;
        });

        $('.js-modal-close').click(function () {
            $('.js-modal').fadeOut();
            return false;
        });
    });

    //サイドメニュー

    $(document).ready(function () {
        $('.drawer').drawer();
    });
}
//以下普通のJavaScript

//ページのロードが終わったら実行
window.onload = function () {
    MainPageEvent();
    ClickEventListener();
    TextInputListener();
    DragMouseEventListener();
    //AudioPlayListener();
}

//ドラッグマウスイベント
function DragMouseEventListener() {
    //カード要素のマウスドラッグイベント
    var CardList = document.getElementById('scroll_cards');
    var Sort = Sortable.create(CardList, {
        animation: 300
    });
    //wrapper2要素のマウスドラッグイベント
    var IconList = document.getElementById('wrapper2');
    var SortIcon = Sortable.create(IconList, {
        animation: 300
    });
}

//テキストインプットの値取得
function TextInputListener() {
    var card_id = document.getElementById('card_clone');
    var card = document.getElementsByClassName('card');

    $(function () {
        $(".js-modal-close").click(function () {
            var TextChannelName = $(".input1").val();

            //JQuery
            var cards_count = $('.card').length
            console.log(cards_count);

            var card_node = $('#card_clone').clone().removeAttr('id').insertAfter($('.card').eq(cards_count - 1)).find('.mail-info').text(TextChannelName);

            ClickEventListener();
        });
    });
}


//要素のクリックイベント
function ClickEventListener() {
    //Card要素がクリックされたら実行するイベント

    $(function () {
        $('.card').click(function () {

            $(this).stop(true).animate({
                backgroundColor: '#a6a5c4'
            }, 1000);

            var TitleText = $(this).find('.mail-info').text();

            $('.big-inbox').stop(true).text("#" + TitleText).css({
                opacity: 0
            }).animate({
                opacity: 1
            }, 500);

        });

        $('.card').hover(function () {
                ; //特に何もしないけど必要な関数
            },
            function () {
                $(this).stop(true).animate({
                    backgroundColor: '#fff'
                }, 500);
            });
    });
}

function AudioPlayListener() {
    $('body').click(function () {
        document.getElementById('sounds').currentTime = 0;
        $('#sounds').get(0).play();
    });
}
