// Behaviour for the home and ICE2THRUST pages (loaded with defer).

// Project preview videos play only while on screen. Under
// prefers-reduced-motion they stay on their poster frame.
(function () {
    var videos = document.querySelectorAll('video[data-preview]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!videos.length || reducedMotion) return;

    function play(video) {
        var promise = video.play();
        if (promise && promise.catch) promise.catch(function () {});
    }

    if (!('IntersectionObserver' in window)) {
        videos.forEach(play);
        return;
    }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) play(entry.target);
            else entry.target.pause();
        });
    }, { rootMargin: '100px' });
    videos.forEach(function (video) { observer.observe(video); });
})();

// Email links are assembled here to keep the address out of the HTML source.
document.querySelectorAll('[data-mail-user]').forEach(function (link) {
    link.href = 'mailto:' + link.getAttribute('data-mail-user') + '@' + link.getAttribute('data-mail-domain');
});
