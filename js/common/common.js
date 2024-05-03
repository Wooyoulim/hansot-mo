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

// 메뉴바 아이콘
const change = () => {
    let $inner = get('#subheader .inner');
    let $menu = get('#subheader .all_menu .icon');
    let $span = getAll('#subheader .all_menu .icon span');
    let $subMenu = get('#subheader .all_menu .sub_menu');
    let isplay = true;

    $menu.addEventListener('click', (e) => {
        if (isplay === true) {
            $span.forEach((span, idx) => {
                span.classList.add('on');
                isplay = false;
                $subMenu.style.left = '0px';
                $inner.style.height = '100vh';
                $inner.style.zInedx = '1000';
            });
        } else {
            $span.forEach((span, idx) => {
                span.classList.remove('on');
                isplay = true;
                $subMenu.style.left = '360px';
                $inner.style.height = '60px';
                $inner.style.transition = '1s';
                $inner.style.zInedx = '1';
            });
        }
    });
};

// 메뉴바 상태
const move = () => {
    let $header = get('#subheader ');
    let $inner = get('#subheader .inner ');
    let $logo = get('#subheader h1 img');
    let y = '';
    window.addEventListener('scroll', (e) => {
        y = window.scrollY;
        if (y >= 230) {
            $header.classList.add('sticky');
            $logo.setAttribute('src', './images/common/logo-mo.png');
            $inner.style.zInedx = '1000';
        } else if (y < 200) {
            $header.classList.remove('sticky');
            $logo.setAttribute('src', './images/common/sub-logo.png');
        }
    });
};

//헤더, 푸터
const comInit = () => {
    const getPage = (page, tag) => {
        fetch(page)
            .then((res) => res.text())
            .then((res) => {
                get(tag).innerHTML = res;
                change();
                move();
                prevent();
            });
    };
    getPage('page/subheader.html', '#subheader');
    getPage('page/footer.html', '#footer');
};
(() => {
    comInit();
})();
