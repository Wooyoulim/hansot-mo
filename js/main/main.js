const get = (target) => {
    return document.querySelector(target);
};
const getAll = (target) => {
    return document.querySelectorAll(target);
};

const prevent = () => {
    let $links = getAll('a[href="#"]');
    $links.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
};
const change = () => {
    let $inner = get('#header .inner');
    let $pic = get('#header .inner h1 img');
    let $icon = get('#header h1 .all_menu .icon');
    let $menu = get('#header .all_menu .icon');
    let $span = getAll('#header .all_menu .icon span');
    let $subMenu = get('#header .all_menu .sub_menu');
    let isplay = true;

    $menu.addEventListener('click', (e) => {
        if (isplay === true) {
            $span.forEach((span, idx) => {
                span.classList.add('on');
                isplay = false;
                $subMenu.style.left = '0px';
                $inner.style.height = '100vh';
                $pic.style.postion = 'sticky';
                // $inner.style.zInedx = '1000';
            });
        } else {
            $span.forEach((span, idx) => {
                span.classList.remove('on');
                isplay = true;
                $subMenu.style.left = '360px';
                $inner.style.height = '60px';
                $inner.style.transition = '1s';
                // $inner.style.zInedx = '1';
            });
        }
    });
};

const main = () => {
    let $content = get('#content');
    let $image = get('#visual img');
    let targetY = $content.getBoundingClientRect().y;
    let ty = 0;
    window.addEventListener('scroll', (e) => {
        ty = window.scrollY;
        if (ty > targetY) {
            $image.style.opacity = 0;
        } else {
            $image.style.opacity = 1;
        }
    });
    AOS.init();
};

//헤더, 푸터
const comInit = () => {
    const getPage = (page, tag) => {
        fetch(page)
            .then((res) => res.text())
            .then((res) => {
                get(tag).innerHTML = res;
                change();
                prevent();
                main();
            });
    };
    getPage('page/header.html', '#header');
    getPage('page/footer.html', '#footer');
};
(() => {
    comInit();
})();
