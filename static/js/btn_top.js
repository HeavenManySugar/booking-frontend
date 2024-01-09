(() => {
    'use strict'    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    //Get the button
    var mybutton = document.getElementById("btn-back-to-top");
    var tooltip = bootstrap.Tooltip.getInstance(mybutton)

    // When the user scrolls down 20px from the top of the document, show the button with fade-in effect
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            $(mybutton).fadeIn();
        } else {
            $(mybutton).fadeOut();
            $(tooltip).hide();
        }
    }
})()