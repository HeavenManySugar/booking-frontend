(() => {
    'use strict'
    window.addEventListener("load", () => {
        var loader = document.querySelector(".loader");
        var preloader = document.querySelector("#preloder");

        // use css to fade out loader
        loader.style.opacity = 0;
        preloader.style.opacity = 0;
        setTimeout(() => {
            loader.style.display = "none";
            preloader.style.display = "none";
        }, 500);
    })

})()