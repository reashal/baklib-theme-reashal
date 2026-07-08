clickAsideBtn = function () {
    var aside = document.getElementsByTagName('main')[0];
    if (!aside) return;
    var isVisible = aside.classList.contains('aside-show');
    aside.className = isVisible ? 'aside-hide' : 'aside-show';
}

hideAside = function () {
    var aside = document.getElementsByTagName('main')[0];
    if (!aside) return;
    if (aside.classList.contains('aside-show')) {
        aside.className = 'aside-hide';
    } else {
        aside.className = 'aside-init';
    }
}

showAside = function () {
    var aside = document.getElementsByTagName('main')[0];
    if (!aside) return;
    aside.className = 'aside-show';
}
