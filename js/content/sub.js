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
    }
};

(() => {
    goInit();
})();
