//공통

import { faqPosts } from '../data.js';

const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

// 한솥이야기

//  .//한솥이야기

// 전체메뉴
const product = () => {
    let $productLi = getAll('.product .product_list > li');
    let $menuUl = getAll('.product .product_all');
    let current, old;

    $productLi.forEach((li, index) => {
        li.addEventListener('click', (e) => {
            current = index;
            if (current !== old) {
                $productLi.forEach((liItem, index) => {
                    liItem.classList.remove('on');
                });
                $productLi[index].classList.add('on');
                $menuUl.forEach((ul, idx) => {
                    $menuUl[idx].classList.remove('on');
                });
                $menuUl[index].classList.add('on');
            } else {
                $productLi[current].classList.toggle('on');
                $menuUl[current].classList.toggle('on');
            }
            old = current;
        });
    });
};

//  .//전체메뉴

// 꿀조합 레시피

//  .//꿀조합 레시피

// 점포찾기

const store = () => {
    var markers = [];
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 1,
        };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var ps = new kakao.maps.services.Places();
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    searchPlaces();

    function searchPlaces() {
        var keyword = '한솥';
        ps.keywordSearch(keyword, placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    function displayPlaces(places) {
        var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        removeAllChildNods(listEl);
        removeMarker();

        for (var i = 0; i < Math.min(4, places.length); i++) {
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]);

            bounds.extend(placePosition);

            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }

        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        map.setBounds(bounds);
    }

    function getListItem(index, places) {
        var el = document.createElement('li'),
            itemStr =
                '<span class="markerbg marker_' +
                (index + 1) +
                '"></span>' +
                '<div class="info">' +
                '   <h5>' +
                places.place_name +
                '</h5>';

        if (places.road_address_name) {
            itemStr +=
                '    <span>' +
                places.road_address_name +
                '</span>' +
                '   <span class="jibun gray">' +
                places.address_name +
                '</span>';
        } else {
            itemStr += '    <span>' + places.address_name + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

    function addMarker(position, idx, title) {
        var imageSrc = '../../images/content/store/css_sprites.png',
            imageSize = new kakao.maps.Size(50, 40),
            imgOptions = {
                spriteSize: new kakao.maps.Size(45, 730),
                spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
                offset: new kakao.maps.Point(13, 37),
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position,
                image: markerImage,
            });

        marker.setMap(map);
        markers.push(marker);

        return marker;
    }

    function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;

            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function (i) {
                    return function () {
                        pagination.gotoPage(i);
                    };
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    function displayInfowindow(marker, title) {
        var content = '<div style="padding:1.3889vw;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    }
};

//  .//점포찾기

// 가맹점 소개

//  .//가맹점 소개

// 고객의 소리

// 공통

const common = () => {
    let $fqaBtn = get('.select .choice .faqbtn');
    let $vocBtn = get('.select .choice .vocbtn');
    console.log($fqaBtn);

    $fqaBtn.addEventListener('click', (e) => {
        $fqaBtn.classList.add(on);
        $vocBtn.classList.remove(on);
        window.open('frequentlyasked.html');
    });
    $vocBtn.addEventListener('click', (e) => {
        $fqaBtn.classList.remove(on);
        $vocBtn.classList.add(on);
        window.open('voc.html');
    });
};

//자주묻는 질문

const fqa = () => {
    let $faqTbody = get('.sub_fqa .faq tbody');
    let $paging = get('.sub_fqa .faq_paging');

    let row = '',
        postPerPage = 10,
        currentPage = 1;
    let firstPost, lastPost, postMod, pageNumber;
    let a = '',
        old = 0;
    let $sortLi = getAll('.faq_group ul li');

    let sortArr1 = faqPosts.filter((element) => element.sort === $sortLi[1].textContent);
    let sortArr2 = faqPosts.filter((element) => element.sort === $sortLi[2].textContent);
    let sortArr3 = faqPosts.filter((element) => element.sort === $sortLi[3].textContent);
    let sortArr4 = faqPosts.filter((element) => element.sort === $sortLi[4].textContent);
    let sortArr5 = faqPosts.filter((element) => element.sort === $sortLi[5].textContent);

    let pageList = (num, array) => {
        row = '';
        lastPost = num * postPerPage;
        firstPost = lastPost - postPerPage;

        if (postMod !== 0 && num === pageNumber) {
            lastPost = firstPost + postMod;
        }
        for (let i = firstPost; i < lastPost; i++) {
            row += `<tr>
          <td>${array[i].title}</td>
          </tr>`;
        }
        $faqTbody.innerHTML = row;
    };

    let getData = (arr) => {
        let totalPost = arr.length;
        postMod = totalPost % postPerPage;
        pageNumber = Math.ceil(totalPost / postPerPage);
        pageList(currentPage, arr);

        for (let i = 1; i <= pageNumber; i++) {
            a += `<a href="#">${i}</a>`;
        }
        $paging.innerHTML = a;

        let aAll = getAll('.faq_paging a');
        aAll[currentPage - 1].classList.add('on');

        aAll.forEach((a, index) => {
            a.addEventListener('click', (e) => {
                currentPage = index + 1;
                if (old !== index) {
                    aAll[index].classList.add('on');
                    aAll[old].classList.remove('on');
                    pageList(currentPage, arr);
                    old = index;
                }
            });
        });
    };

    $sortLi.forEach((li, index) => {
        li.addEventListener('click', (e) => {
            $sortLi.forEach((liItem, index) => {
                liItem.classList.remove('on');
            });
            $sortLi[index].classList.add('on');
            row = '';
            a = '';
            currentPage = 1;
            if (li.textContent === sortArr1[0].sort) {
                getData(sortArr1);
            } else if (li.textContent === sortArr2[0].sort) {
                getData(sortArr2);
            } else if (li.textContent === sortArr3[0].sort) {
                getData(sortArr3);
            } else if (li.textContent === sortArr4[0].sort) {
                getData(sortArr4);
            } else if (li.textContent === sortArr5[0].sort) {
                getData(sortArr5);
            } else if (li.textContent === '전체') {
                getData(faqPosts);
            }
        });
    });
    getData(faqPosts);
};

//voc

const voc = () => {
    let get = (target) => document.querySelector(target);
    let getAll = (target) => document.querySelectorAll(target);

    let vocButton = get('.voc .faq_button ');

    vocButton.addEventListener('click', (e) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.border = '1px solid #303030';
    });
};

//  .//고객의 소리

//실행
const goInit = () => {
    if (location.pathname.split('/').pop() === 'product.html') {
        product();
    } else if (location.pathname.split('/').pop() === 'frequentlyasked.html') {
        fqa();
        common();
    } else if (location.pathname.split('/').pop() === 'voc.html') {
        voc();
        common();
    } else if (location.pathname.split('/').pop() === 'store.html') {
        store();
    }
};

(() => {
    goInit();
})();
