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
    if (!footer) return;

    var status = moments.querySelector('[data-moments-status]');
    var pageSize = parseInt(pagination.dataset.pageSize, 10) || 3;
    var observer;
    var requestController;
    var loading = false;
    var armed = false;
    var disposed = false;
    var lastScrollY = window.scrollY;

    function nextUrl() {
        return pagination.dataset.nextUrl || '';
    }

    function legacyCards() {
        return Array.from(moments.querySelectorAll('.moment[data-moment-legacy="true"]'));
    }

    function hiddenLegacyCards() {
        return legacyCards().filter(function(card) { return card.hidden; });
    }

    function hasMore() {
        return Boolean(nextUrl()) || hiddenLegacyCards().length > 0;
    }

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function updateStatus() {
        setStatus(hasMore() ? '继续下滑' : '故事暂且讲到这里');
    }

    function prepareInitialLegacyCards() {
        var nativeCount = moments.querySelectorAll('.moment:not([data-moment-legacy="true"])').length;
        var visibleLegacyCount = Math.max(0, pageSize - nativeCount);

        legacyCards().forEach(function(card, index) {
            card.hidden = index >= visibleLegacyCount;
        });
    }

    function revealLegacyBatch(limit) {
        var cards = hiddenLegacyCards().slice(0, limit);
        cards.forEach(function(card) { card.hidden = false; });
        return cards.length;
    }

    function disarmLoader() {
        if (!armed) return;
        armed = false;
        observer.unobserve(pagination);
    }

    function armLoader() {
        if (disposed || loading || armed || !hasMore()) return;
        armed = true;
        observer.observe(pagination);
    }

    function appendCards(sourceDocument) {
        var knownIds = new Set(Array.from(moments.querySelectorAll('.moment[id]')).map(function(card) {
            return card.id;
        }));
        var result = { appended: 0, native: 0, legacy: 0 };

        sourceDocument.querySelectorAll('.moments > .moment').forEach(function(card) {
            if (card.id && knownIds.has(card.id)) return;
            var importedCard = document.importNode(card, true);
            var isLegacy = importedCard.dataset.momentLegacy === 'true';
            if (isLegacy) importedCard.hidden = true;
            moments.insertBefore(importedCard, footer);
            if (card.id) knownIds.add(card.id);
            result.appended += 1;
            result[isLegacy ? 'legacy' : 'native'] += 1;
        });

        return result;
    }

    function finishBatch() {
        loading = false;
        requestController = null;
        updateStatus();
    }

    function revealNextLegacyBatch() {
        if (disposed || loading) return;
        loading = true;
        setStatus('正在加载...');
        revealLegacyBatch(pageSize);
        document.dispatchEvent(new CustomEvent('moments:appended'));
        finishBatch();
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

            if (!nextUrl() && appended.legacy > 0) {
                revealLegacyBatch(Math.max(0, pageSize - appended.native));
            }

            document.dispatchEvent(new CustomEvent('moments:appended'));
            finishBatch();

            if (appended.appended === 0 && nextUrl()) {
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
        if (nextUrl()) {
            loadNextPage();
        } else {
            revealNextLegacyBatch();
        }
    }

    observer = new IntersectionObserver(function(entries) {
        if (armed && entries.some(function(entry) { return entry.isIntersecting; })) {
            processNextBatch();
        }
    }, { rootMargin: '0px 0px 80px 0px' });

    function onScrollIntent(event) {
        if (event.type === 'keydown') {
            var acceptedKeys = ['ArrowDown', 'PageDown', 'End', ' '];
            if (!acceptedKeys.includes(event.key)) return;
        }
        if (event.type === 'scroll') {
            var currentScrollY = window.scrollY;
            var scrollingDown = currentScrollY > lastScrollY;
            lastScrollY = currentScrollY;
            if (!scrollingDown) return;
        }
        armLoader();
    }

    prepareInitialLegacyCards();
    updateStatus();

    window.addEventListener('wheel', onScrollIntent, { passive: true });
    window.addEventListener('touchmove', onScrollIntent, { passive: true });
    window.addEventListener('scroll', onScrollIntent, { passive: true });
    window.addEventListener('keydown', onScrollIntent);

    function cleanup() {
        disposed = true;
        if (observer) observer.disconnect();
        if (requestController) requestController.abort();
        window.removeEventListener('wheel', onScrollIntent);
        window.removeEventListener('touchmove', onScrollIntent);
        window.removeEventListener('scroll', onScrollIntent);
        window.removeEventListener('keydown', onScrollIntent);
        document.removeEventListener('turbo:before-cache', cleanup);
        if (window.__momentsInfiniteLoaderCleanup === cleanup) {
            window.__momentsInfiniteLoaderCleanup = null;
        }
    }

    window.__momentsInfiniteLoaderCleanup = cleanup;
    document.addEventListener('turbo:before-cache', cleanup, { once: true });
})();
