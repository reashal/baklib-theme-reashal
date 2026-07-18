(function() {
    if (window.__momentsInfiniteLoaderCleanup) {
        window.__momentsInfiniteLoaderCleanup();
    }

    var moments = document.querySelector('.moments');
    var pagination = document.getElementById('moments-pagination');
    if (!moments || !pagination) return;

    var status = moments.querySelector('[data-moments-status]');
    var observer;
    var requestController;
    var retryHandler;
    var loading = false;
    var disposed = false;

    function nextUrl() {
        return pagination.dataset.nextUrl || '';
    }

    function setStatus(message) {
        if (status) status.textContent = message;
    }

    function clearRetryHandler() {
        if (!retryHandler) return;
        window.removeEventListener('wheel', retryHandler);
        window.removeEventListener('touchmove', retryHandler);
        retryHandler = null;
    }

    function retryOnNextScroll() {
        clearRetryHandler();
        if (!disposed && nextUrl()) {
            observer.observe(pagination);
        }
    }

    function appendCards(sourceDocument) {
        var knownIds = new Set(Array.from(moments.querySelectorAll('.moment[id]')).map(function(card) {
            return card.id;
        }));
        var appended = 0;

        sourceDocument.querySelectorAll('.moments > .moment').forEach(function(card) {
            if (card.id && knownIds.has(card.id)) return;
            var importedCard = document.importNode(card, true);
            moments.insertBefore(importedCard, pagination);
            if (card.id) knownIds.add(card.id);
            appended += 1;
        });

        return appended;
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

            if (nextUrl()) {
                setStatus('继续下滑');
            } else {
                setStatus('故事暂且讲到这里');
                observer.disconnect();
            }

            loading = false;
            requestController = null;

            if (appended === 0 && nextUrl()) {
                loadNextPage();
            }
        } catch (error) {
            loading = false;
            requestController = null;
            if (error.name !== 'AbortError') {
                setStatus('加载失败，继续下滑重试');
                observer.unobserve(pagination);
                clearRetryHandler();
                retryHandler = retryOnNextScroll;
                window.addEventListener('wheel', retryHandler, { once: true, passive: true });
                window.addEventListener('touchmove', retryHandler, { once: true, passive: true });
            }
        }
    }

    observer = new IntersectionObserver(function(entries) {
        if (entries.some(function(entry) { return entry.isIntersecting; })) {
            loadNextPage();
        }
    }, { rootMargin: '0px 0px 160px 0px' });

    if (nextUrl()) {
        observer.observe(pagination);
    } else {
        setStatus('故事暂且讲到这里');
    }

    function cleanup() {
        disposed = true;
        if (observer) observer.disconnect();
        if (requestController) requestController.abort();
        clearRetryHandler();
        document.removeEventListener('turbo:before-cache', cleanup);
        if (window.__momentsInfiniteLoaderCleanup === cleanup) {
            window.__momentsInfiniteLoaderCleanup = null;
        }
    }

    window.__momentsInfiniteLoaderCleanup = cleanup;
    document.addEventListener('turbo:before-cache', cleanup, { once: true });
})();
