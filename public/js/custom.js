function validatForm(e) {
  'use strict';
  e.preventDefault();
  const forms = document.getElementById('create-page');
  console.log(forms);
  if (forms == null) {
    event.preventDefault();
    event.stopPropagation();
    forms.classList.add('was-validated');
    return false;
  }
  if (!forms.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    forms.classList.add('was-validated');
    return false;
  }

  return submitForm();
}

function submitForm() {
  const nameField = document.getElementById('name');
  const nameFieldValue = nameField.value.split(' ').join('-');
  const nameFieldValueVide = nameField.value.split(' ').join('');

  if (nameFieldValueVide != '') {
    // nameFieldValue = console.log(nameFieldValue);
    console.log(nameFieldValueVide);
    const res = '';
    axios
      .post('/api/pages/', { name: nameFieldValue })
      .then((response) => {
        console.log('response', response);
        if (response.status === 200) {
          alert(`Page ${nameFieldValue} created successfully`);
          window.location.href = '/';
        } else {
          alert('Failed: Page not created');
        }
      })
      .catch((err) => {
        console.log('err ->' + err);
        alert('Failed: Page not created' + err);
      });
  } else {
    const input = document.getElementById('name');
    // docuemnt.querySelectorAll(':invalid');
    input.classList.add('form-invalid');
    document.getElementById('invalid-feedback').setAttribute('style', 'display: block');
  }
  // clearForm();
  // return true;
}

function clearForm() {
  /**
   * Get name field and reset it's value
   */


  document.getElementById('invalid-feedback').setAttribute('style', 'display: none');
  const nameField = document.getElementById('name');
  nameField.classList.remove('form-invalid');
  nameField.value = '';
  /**
   * Remove was-validated class from Form
   */
  const forms = document.getElementById('create-page');
  forms.classList.remove('was-validated');
}
