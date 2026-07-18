(function() {
    var imageGroups = {};
    var currentGroupId = null;
    var currentIndex = 0;
    var previousBodyOverflow = '';
    var viewImg;
    var viewBox;
    var viewPrev;
    var viewNext;
    var viewCounter;
    var viewClose;

    function getMainElement() {
        return document.querySelector('main');
    }

    function initElements() {
        viewImg = document.getElementById('view-img');
        viewBox = document.getElementById('view-box');
        viewPrev = document.getElementById('view-prev');
        viewNext = document.getElementById('view-next');
        viewCounter = document.getElementById('view-counter');
        viewClose = document.getElementById('view-close');
    }

    function collectImages() {
        imageGroups = {};
        var mainEl = getMainElement();
        if (!mainEl) return;

        var imageSections = Array.from(document.querySelectorAll('.moment-images'));
        var articleSection = document.querySelector('.article-container.doc');
        if (articleSection) imageSections.push(articleSection);

        imageSections.forEach(function(imageSection, groupIndex) {
            var moment = imageSection.closest('.moment');
            var groupId = imageSection.getAttribute('data-moment-id') || (moment && moment.id ? moment.id : 'image-group-' + groupIndex);
            var images = Array.from(imageSection.querySelectorAll('img:not(.view-none)'));
            var imageList = Array.from(imageSection.querySelectorAll('.image-viewer-item')).map(function(item) {
                return {
                    url: item.dataset.imageUrl,
                    localUrl: item.dataset.localUrl || item.dataset.imageUrl,
                    alt: item.dataset.imageAlt || ''
                };
            }).filter(function(item) {
                return item.url;
            });

            if (imageList.length === 0) {
                imageList = images.map(function(img) {
                    return {
                        url: img.currentSrc || img.src,
                        localUrl: img.currentSrc || img.src,
                        alt: img.alt || ''
                    };
                });
            }

            if (imageList.length === 0) return;
            imageGroups[groupId] = imageList;

            function openImage(imageIndex) {
                if (!imageList[imageIndex] || mainEl.classList.contains('aside-show')) return false;
                currentGroupId = groupId;
                currentIndex = imageIndex;
                showImage();
                viewBox.classList.remove('view-box-hide');
                viewBox.classList.add('view-box-show');
                previousBodyOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return true;
            }

            images.forEach(function(img, imageIndex) {
                if (img.dataset.imageViewerBound === 'true') return;
                img.dataset.imageViewerBound = 'true';
                img.addEventListener('click', function(event) {
                    if (imageList[imageIndex]) imageList[imageIndex].url = img.currentSrc || img.src;
                    if (openImage(imageIndex)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            });

            var overlay = imageSection.querySelector('.img-mask-overlay');
            if (overlay && imageList[8] && overlay.dataset.imageViewerBound !== 'true') {
                overlay.dataset.imageViewerBound = 'true';
                overlay.addEventListener('click', function(event) {
                    if (openImage(8)) event.stopPropagation();
                });
            }
        });
    }

    function showImage() {
        var imageList = imageGroups[currentGroupId];
        if (!imageList || !imageList[currentIndex]) return;

        var currentImage = imageList[currentIndex];
        viewImg.onerror = null;
        if (currentImage.localUrl && currentImage.localUrl !== currentImage.url) {
            viewImg.onerror = function() {
                viewImg.onerror = null;
                currentImage.url = currentImage.localUrl;
                viewImg.src = currentImage.localUrl;
            };
        }
        viewImg.src = currentImage.url;
        viewImg.alt = currentImage.alt || '';

        if (imageList.length > 1) {
            viewCounter.textContent = (currentIndex + 1) + ' / ' + imageList.length;
            viewPrev.style.display = 'flex';
            viewNext.style.display = 'flex';
            viewCounter.style.display = 'block';
            viewPrev.disabled = currentIndex === 0;
            viewNext.disabled = currentIndex === imageList.length - 1;
        } else {
            viewPrev.style.display = 'none';
            viewNext.style.display = 'none';
            viewCounter.style.display = 'none';
        }
    }

    function closeView() {
        if (!viewBox) return;
        viewBox.classList.remove('view-box-show');
        viewBox.classList.add('view-box-hide');
        document.body.style.overflow = previousBodyOverflow;
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            showImage();
        }
    }

    function showNext() {
        var imageList = imageGroups[currentGroupId];
        if (imageList && currentIndex < imageList.length - 1) {
            currentIndex += 1;
            showImage();
        }
    }

    function bindEvents() {
        viewClose.addEventListener('click', function(event) {
            event.stopPropagation();
            closeView();
        });
        viewPrev.addEventListener('click', function(event) {
            event.stopPropagation();
            showPrev();
        });
        viewNext.addEventListener('click', function(event) {
            event.stopPropagation();
            showNext();
        });
        viewBox.addEventListener('click', function(event) {
            if (event.target === viewBox) closeView();
        });

        if (window.__imageViewerKeydownHandler) {
            document.removeEventListener('keydown', window.__imageViewerKeydownHandler);
        }
        window.__imageViewerKeydownHandler = function(event) {
            if (!viewBox.classList.contains('view-box-show')) return;
            if (event.key === 'Escape') closeView();
            if (event.key === 'ArrowLeft') showPrev();
            if (event.key === 'ArrowRight') showNext();
        };
        document.addEventListener('keydown', window.__imageViewerKeydownHandler);
    }

    function init() {
        initElements();
        if (!viewImg || !viewBox || !viewPrev || !viewNext || !viewCounter || !viewClose) return;
        collectImages();
        bindEvents();
    }

    if (window.__momentsImageViewerHandler) {
        document.removeEventListener('moments:appended', window.__momentsImageViewerHandler);
    }
    window.__momentsImageViewerHandler = collectImages;
    document.addEventListener('moments:appended', window.__momentsImageViewerHandler);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
