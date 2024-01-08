var stepperForm

document.addEventListener('DOMContentLoaded', function () {

    var stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true
    })

    var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'));
    var room_type = document.getElementById('room_type');
    var guest_name = document.getElementById('guest_name');
    var check_in_date = document.getElementById('check_in_date');
    var check_out_date = document.getElementById('check_out_date');
    var contact_email = document.getElementById('contact_email');
    var contact_phone = document.getElementById('contact_phone');
    var form = stepperFormEl.querySelector('.bs-stepper-content form');



    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        form.classList.remove('was-validated');
        var nextStep = event.detail.indexStep;
        var currentStep = nextStep;

        if (currentStep > 0) {
            currentStep--;
        }


        var stepperPan = stepperPanList[currentStep]
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (stepperPan.getAttribute('id') === 'test-form-1' && !room_type.value.length) {
            event.preventDefault();
            form.classList.add('was-validated');
        }
        check_in_date.addEventListener("input", (event) => {
            if (check_in_date.value >= check_out_date.value) {
                check_in_date.setCustomValidity("Check-in date must be before check-out date");
            } else {
                check_in_date.setCustomValidity("");
            }
        });
        check_out_date.addEventListener("input", (event) => {
            if (check_out_date.validity.typeMismatch) {
                check_out_date.setCustomValidity("Check-in date must be before check-out date");
            } else {
                check_out_date.setCustomValidity("");
            }
        });

        if (stepperPan.getAttribute('id') === 'test-form-2') {
            if (!check_in_date.value.length) {
                event.preventDefault();
                form.classList.add('was-validated');
                check_in_date.classList.add('is-invalid');
                check_in_date.classList.remove('is-valid');
            }
            else {
                check_in_date.classList.remove('is-invalid');
                check_in_date.classList.add('is-valid');
            }
            if (!check_out_date.value.length) {
                event.preventDefault();
                form.classList.add('was-validated');
                check_out_date.classList.add('is-invalid');
                check_out_date.classList.remove('is-valid');
            }
            else {
                check_out_date.classList.remove('is-invalid');
                check_out_date.classList.add('is-valid');
            }
            if (!guest_name.value.length || !check_in_date.value.length || !check_out_date.value.length
                || !contact_email.value.length || !contact_phone.value.length) {
                event.preventDefault();
                form.classList.add('was-validated');
            }
            else {
                if (check_in_date.value >= check_out_date.value) {
                    event.preventDefault();
                    form.classList.add('was-validated');
                    check_in_date.classList.add('is-invalid');
                    check_in_date.classList.remove('is-valid');
                    check_out_date.classList.add('is-invalid');
                    check_out_date.classList.remove('is-valid');
                }
                else {
                    check_in_date.classList.remove('is-invalid');
                    check_in_date.classList.add('is-valid');
                    check_out_date.classList.remove('is-invalid');
                    check_out_date.classList.add('is-valid');
                }
                if (!emailRegex.test(contact_email.value)) {
                    event.preventDefault();
                    form.classList.add('was-validated');
                }
            }
        }
    })
})