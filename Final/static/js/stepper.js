var stepperForm

document.addEventListener('DOMContentLoaded', function () {

  var stepperFormEl = document.querySelector('#stepperForm')
  stepperForm = new Stepper(stepperFormEl, {
    animation: true
  })

  var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
  var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'))
  var room_type = document.getElementById('room_type')
  var guest_name = document.getElementById('guest_name')
    var check_in_date = document.getElementById('check_in_date')
    var check_out_date = document.getElementById('check_out_date')
    var contact_email = document.getElementById('contact_email')
    var contact_phone = document.getElementById('contact_phone')
  var form = stepperFormEl.querySelector('.bs-stepper-content form')

  btnNextList.forEach(function (btn) {
    btn.addEventListener('click', function () {
      stepperForm.next()
    })
  })

  stepperFormEl.addEventListener('show.bs-stepper', function (event) {
    form.classList.remove('was-validated')
    var nextStep = event.detail.indexStep
    var currentStep = nextStep

    if (currentStep > 0) {
      currentStep--
    }

    console.log(guest_name.value)

    var stepperPan = stepperPanList[currentStep]
    if ((stepperPan.getAttribute('id') === 'test-form-1' && !room_type.value.length)
    || (stepperPan.getAttribute('id') === 'test-form-2' && !guest_name.value.length
    && !check_in_date.value.length && !check_out_date.value.length 
    && !contact_email.value.length && !contact_phone.value.length)) {
      event.preventDefault()
      form.classList.add('was-validated')
    }
  })
})