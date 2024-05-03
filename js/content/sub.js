//공통

import {
    faqPosts,
    seoulArr,
    incheonArr,
    daejeonArr,
    gwangjuArr,
    daeguArr,
    ulsanArr,
    busanArr,
    gyeonggiArr,
    gwangwonArr,
    northCungcheongArr,
    southCungcheongArr,
    northJeonraArr,
    southJeonraArr,
    northGyeongsangArr,
    southGyeongsangArr,
    jejuArr,
} from '../data.js';
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
        var imageSrc = '../../images/content/store/csssprites.png',
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

    let $selectCity = get('.voc .voc_second #city');
    let $selectBorough = get('.voc .voc_second #borough');
    let $vocButton = get('.voc .faq_button');
    let $fileTarget = get('.voc .voc_fourth .voc_file_wrap input');
    let $fileB = get('.voc .voc_fourth .voc_file_wrap b');

    $vocButton.addEventListener('click', (e) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.border = '1px solid #303030';
    });

    $selectCity.innerHTML = `<option value='시/도 선택'>시/도 선택</option>
        <option value="인천광역시">인천광역시</option>
        <option value="서울특별시">서울특별시</option>
        <option value="대전광역시">대전광역시</option>
        <option value="광주광역시">광주광역시</option>
        <option value="대구광역시">대구광역시</option>
        <option value="울산광역시">울산광역시</option>
        <option value="부산광역시">부산광역시</option>
        <option value="경기도">경기도</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="전라북도">전라북도</option>
        <option value="전라남도">전라남도</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="제주도">제주도</option>
      `;

    $selectCity.addEventListener('change', (e) => {
        $selectBorough.innerHTML = '';
        if ($selectCity.value === '시/도 선택') {
            $selectBorough.innerHTML = `<option>군/구 선택</option>`;
        } else if ($selectCity.value === '서울특별시') {
            seoulArr.forEach((seoul, index) => {
                $selectBorough.innerHTML += `<option>${seoul}</option>`;
            });
        } else if ($selectCity.value === '인천광역시') {
            incheonArr.forEach((incheon, index) => {
                $selectBorough.innerHTML += `<option>${incheon}</option>`;
            });
        } else if ($selectCity.value === '대전광역시') {
            daejeonArr.forEach((daejeon, index) => {
                $selectBorough.innerHTML += `<option>${daejeon}</option>`;
            });
        } else if ($selectCity.value === '광주광역시') {
            gwangjuArr.forEach((gwangju, index) => {
                $selectBorough.innerHTML += `<option>${gwangju}</option>`;
            });
        } else if ($selectCity.value === '대구광역시') {
            daeguArr.forEach((daegu, index) => {
                $selectBorough.innerHTML += `<option>${daegu}</option>`;
            });
        } else if ($selectCity.value === '울산광역시') {
            ulsanArr.forEach((ulsan, index) => {
                $selectBorough.innerHTML += `<option>${ulsan}</option>`;
            });
        } else if ($selectCity.value === '부산광역시') {
            busanArr.forEach((busan, index) => {
                $selectBorough.innerHTML += `<option>${busan}</option>`;
            });
        } else if ($selectCity.value === '경기도') {
            gyeonggiArr.forEach((gyeonggi, index) => {
                $selectBorough.innerHTML += `<option>${gyeonggi}</option>`;
            });
        } else if ($selectCity.value === '강원도') {
            gwangwonArr.forEach((gwangwon, index) => {
                $selectBorough.innerHTML += `<option>${gwangwon}</option>`;
            });
        } else if ($selectCity.value === '충청북도') {
            northCungcheongArr.forEach((northCungcheong, index) => {
                $selectBorough.innerHTML += `<option>${northCungcheong}</option>`;
            });
        } else if ($selectCity.value === '충청남도') {
            southCungcheongArr.forEach((southCungcheong, index) => {
                $selectBorough.innerHTML += `<option>${southCungcheong}</option>`;
            });
        } else if ($selectCity.value === '전라북도') {
            northJeonraArr.forEach((northJeonra, index) => {
                $selectBorough.innerHTML += `<option>${northJeonra}</option>`;
            });
        } else if ($selectCity.value === '전라남도') {
            southJeonraArr.forEach((southJeonra, index) => {
                $selectBorough.innerHTML += `<option>${southJeonra}</option>`;
            });
        } else if ($selectCity.value === '경상북도') {
            northGyeongsangArr.forEach((northGyeongsang, index) => {
                $selectBorough.innerHTML += `<option>${northGyeongsang}</option>`;
            });
        } else if ($selectCity.value === '경상남도') {
            southGyeongsangArr.forEach((southGyeongsang, index) => {
                $selectBorough.innerHTML += `<option>${southGyeongsang}</option>`;
            });
        } else if ($selectCity.value === '제주도') {
            jejuArr.forEach((jeju, index) => {
                $selectBorough.innerHTML += `<option>${jeju}</option>`;
            });
        }
    });
    $fileTarget.addEventListener('change', (e) => {
        let files,
            fileArr = [];
        files = $fileTarget.files;
        for (let i = 0; i < files.length; i++) {
            fileArr.push(files[i].name);
            $fileB.textContent = fileArr.join(',');
        }
    });
};

const vocSub = () => {
    const handleSubmit = () => {
        // 동의 확인
        let agree = document.getElementById('chk1');
        if (!agree.checked) {
            alert('개인정보 동의가 필요합니다.');
            return;
        }

        let radios = getAll('input[name="division"]');
        let title = document.getElementById('inquiry_title');
        let content = document.getElementById('inquiry_content');
        let store = document.getElementById('store_name');
        let borough = document.getElementById('borough').value;
        let city = document.getElementById('city').value;
        //라디오 선택
        let selected = false;

        radios.forEach((radio) => {
            if (radio.checked) {
                selected = true;
            }
        });

        //문의구분 선택하기
        if (!selected) {
            alert('문의 구분을 선택하세요.');
            return;
        }

        // 점포명 입력안하면

        if (!store.value.trim()) {
            alert('점포명을 입력하세요.');
            store.focus();
            return;
        }

        // 제목 과 내용 입력 안하면
        if (!title.value.trim() || !content.value.trim()) {
            title.focus();
            content.focus();
            alert('제목과 내용을 입력하세요.');
            return;
        }
        // 시/도 선택 확인
        if (city === '시/도 선택') {
            alert('시/도를 선택하세요.');
            return;
        }

        // 군/구 선택 확인
        if (borough === '군/구 선택') {
            alert('군/구를 선택하세요.');
            return;
        }

        alert('제출완료');
    };
    // 문의 버튼
    let submitButton = get('.faq_button a');
    submitButton.addEventListener('click', handleSubmit);
};

//  .//고객의 소리

//실행
const goInit = () => {
    if (location.pathname.split('/').pop() === 'product.html') {
        product();
    } else if (location.pathname.split('/').pop() === 'frequentlyasked.html') {
        fqa();
    } else if (location.pathname.split('/').pop() === 'voc.html') {
        voc();

        vocSub();
    } else if (location.pathname.split('/').pop() === 'store.html') {
        store();
    }
};

(() => {
    goInit();
})();
