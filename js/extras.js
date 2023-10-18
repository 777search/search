window.addEventListener('scroll', function() {
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPosition = window.scrollY;
    var opacity = 1 - scrollPosition / scrollHeight * 1.25;

    scrollmore.style.opacity = opacity;
});