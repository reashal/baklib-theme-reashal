function setAsideState(state) {
    var main = document.getElementsByTagName('main')[0];
    if (!main) return;
    main.classList.remove('aside-init', 'aside-show', 'aside-hide');
    main.classList.add(state);
}

window.clickAsideBtn = function () {
    var main = document.getElementsByTagName('main')[0];
    if (!main) return;
    setAsideState(main.classList.contains('aside-show') ? 'aside-hide' : 'aside-show');
};

window.hideAside = function () {
    var main = document.getElementsByTagName('main')[0];
    if (!main) return;
    if (main.classList.contains('aside-show')) {
        setAsideState('aside-hide');
    } else {
        setAsideState('aside-init');
    }
};

window.showAside = function () {
    setAsideState('aside-show');
};
