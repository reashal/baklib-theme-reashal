(function initMomentsInfiniteLoader() {
    if (window.__momentsTurboLoadHandler !== initMomentsInfiniteLoader) {
        if (window.__momentsTurboLoadHandler) {
            document.removeEventListener('turbo:load', window.__momentsTurboLoadHandler);
        }
        window.__momentsTurboLoadHandler = initMomentsInfiniteLoader;
        document.addEventListener('turbo:load', window.__momentsTurboLoadHandler);
    }

    if (window.__momentsInfiniteLoaderCleanup) {
        window.__momentsInfiniteLoaderCleanup();
    }

    var moments = document.querySelector('.moments');
    var pagination = document.getElementById('moments-pagination');
    if (!moments || !pagination) return;

    var footer = pagination.closest('.moments-footer');
    var status = moments.querySelector('[data-moments-status]');
    var scrollContainer = document.querySelector('.main');
    if (!footer) return;

    var observer;
    var requestController;
    var intentTimer;
    var loading = false;
    var armed = false;
    var gestureLocked = false;
    var disposed = false;
    var lastScrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    var lastTouchY = null;

    function nextUrl() {
        return pagination.dataset.nextUrl || '';
    }

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function updateStatus() {
        setStatus(nextUrl() ? '继续下滑' : '故事暂且讲到这里');
    }

    function disarmLoader() {
        if (!armed) return;
        armed = false;
        observer.unobserve(pagination);
    }

    function armLoader() {
        if (disposed || loading || armed || !nextUrl()) return;
        armed = true;
        observer.observe(pagination);
    }

    function appendCards(sourceDocument) {
        var knownIds = new Set(Array.from(moments.querySelectorAll('.moment[id]')).map(function(card) {
            return card.id;
        }));
        var appended = 0;

        sourceDocument.querySelectorAll('.moments > .moment').forEach(function(card) {
            if (card.id && knownIds.has(card.id)) return;
            var importedCard = document.importNode(card, true);
            moments.insertBefore(importedCard, footer);
            if (card.id) knownIds.add(card.id);
            appended += 1;
        });

        return appended;
    }

    function finishBatch() {
        loading = false;
        requestController = null;
        updateStatus();
    }

    async function loadNextPage() {
        var url = nextUrl();
        if (disposed || loading || !url) return;

        loading = true;
        setStatus('正在加载...');
        requestController = new AbortController();

        try {
            var response = await fetch(url, {
                credentials: 'same-origin',
                headers: { 'Accept': 'text/html' },
                signal: requestController.signal
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);

            var html = await response.text();
            var sourceDocument = new DOMParser().parseFromString(html, 'text/html');
            var sourcePagination = sourceDocument.getElementById('moments-pagination');
            if (!sourcePagination) throw new Error('Missing moments pagination state');

            var appended = appendCards(sourceDocument);
            pagination.dataset.nextUrl = sourcePagination.dataset.nextUrl || '';
            document.dispatchEvent(new CustomEvent('moments:appended'));
            finishBatch();

            if (appended === 0 && nextUrl()) {
                loadNextPage();
            }
        } catch (error) {
            loading = false;
            requestController = null;
            if (error.name !== 'AbortError') {
                setStatus('加载失败，继续下滑重试');
            }
        }
    }

    function processNextBatch() {
        disarmLoader();
        loadNextPage();
    }

    observer = new IntersectionObserver(function(entries) {
        if (armed && entries.some(function(entry) { return entry.isIntersecting; })) {
            processNextBatch();
        }
    }, {
        root: scrollContainer || null,
        rootMargin: '0px 0px 80px 0px'
    });

    function unlockGestureAfterIdle() {
        window.clearTimeout(intentTimer);
        intentTimer = window.setTimeout(function() {
            gestureLocked = false;
        }, 180);
    }

    function acceptDownwardIntent(event) {
        if (event.type === 'wheel') return event.deltaY > 0;
        if (event.type === 'keydown') {
            return ['ArrowDown', 'PageDown', 'End', ' '].includes(event.key);
        }
        if (event.type === 'touchmove') {
            if (!event.touches.length) return false;
            var currentTouchY = event.touches[0].clientY;
            var movingDown = lastTouchY !== null && currentTouchY < lastTouchY;
            lastTouchY = currentTouchY;
            return movingDown;
        }
        if (event.type === 'scroll') {
            var currentScrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
            var scrollingDown = currentScrollTop > lastScrollTop;
            lastScrollTop = currentScrollTop;
            return scrollingDown;
        }
        return false;
    }

    function onScrollIntent(event) {
        if (!acceptDownwardIntent(event)) return;
        if (!gestureLocked) {
            gestureLocked = true;
            armLoader();
        }
        unlockGestureAfterIdle();
    }

    function onTouchStart(event) {
        lastTouchY = event.touches.length ? event.touches[0].clientY : null;
    }

    updateStatus();

    window.addEventListener('wheel', onScrollIntent, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onScrollIntent, { passive: true });
    window.addEventListener('keydown', onScrollIntent);
    (scrollContainer || window).addEventListener('scroll', onScrollIntent, { passive: true });

    function cleanup() {
        disposed = true;
        window.clearTimeout(intentTimer);
        if (observer) observer.disconnect();
        if (requestController) requestController.abort();
        window.removeEventListener('wheel', onScrollIntent);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onScrollIntent);
        window.removeEventListener('keydown', onScrollIntent);
        (scrollContainer || window).removeEventListener('scroll', onScrollIntent);
        document.removeEventListener('turbo:before-cache', cleanup);
        if (window.__momentsInfiniteLoaderCleanup === cleanup) {
            window.__momentsInfiniteLoaderCleanup = null;
        }
    }

    window.__momentsInfiniteLoaderCleanup = cleanup;
    document.addEventListener('turbo:before-cache', cleanup, { once: true });
})();
