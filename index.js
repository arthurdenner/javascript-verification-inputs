const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');

function submitFormIfFilled() {
  if (Array.from(inputs).every(input => !!input.value)) {
    form.submit();
  }
}

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
    input.nextElementSibling.select();
    return;
  }

  if (input.previousElementSibling && !input.value) {
    input.previousElementSibling.focus();
    input.previousElementSibling.select();
    return;
  }

  submitFormIfFilled();
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
    input.value = paste[i] || '';
  });

  submitFormIfFilled();
}

inputs[0].addEventListener('paste', handlePaste);

form.addEventListener('input', handleInput);

// 1. select the text when the next input is focused
// 2. Auto submit the form if all fields are filled after a paste
// 3. support for backspacing from 1 input to another
