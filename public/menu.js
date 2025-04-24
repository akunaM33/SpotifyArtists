var color;
// -------------------- //
// Function definitions //
// -------------------- //

function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;

  var optList = select.querySelector('.optList');

  optList.classList.add('hidden');
  select.classList.remove('active');
}

function activeSelect(select, selectList) {
  if (select.classList.contains('active')) return;

  selectList.forEach(deactivateSelect);
  select.classList.add('active');
};

function toggleOptList(select, show) {
  var optList = select.querySelector('.optList');

  optList.classList.toggle('hidden');
}

function highlightOption(select, option) {
  var optionList = select.querySelectorAll('.option');

  optionList.forEach(function (other) {
    other.classList.remove('highlight');
    other.classList.remove(color);
  });

  option.classList.add('highlight');
  color = option.getAttribute('data-value');
  option.classList.add(color);

};

function updateValue(select, index) {
  var nativeWidget = select.previousElementSibling;
  var value = select.querySelector('.value');
  var optionList = select.querySelectorAll('[role="option"]');

  optionList.forEach(function (other) {
    other.setAttribute('aria-selected', 'false');
  });

  optionList[index].setAttribute('aria-selected', 'true');

  nativeWidget.selectedIndex = index;
  value.innerHTML = optionList[index].innerHTML;
  highlightOption(select, optionList[index]);
};

// GET VALUE from DROPDOWN:
function showOption(select, index) {
    let optionList = select.querySelectorAll('[role="option"]');

  const selectedValue = optionList[index].getAttribute('data-value');
  let form1Div = document.getElementById('form1');
  let form2Div = document.getElementById('form2');

  form1Div.style.display = 'none';
  form2Div.style.display = 'none';

  form1Div.classList.add('active');
  form2Div.classList.add('active');

  if (selectedValue === 'green') {
    form1Div.style.display = 'block';
    form2Div.classList.toggle('active'); console.log("Form1" + form1Div.getAttribute('class'));
    console.log("Form2" + form2Div.getAttribute('class'));
  } else if (selectedValue === 'blue') {
    form2Div.style.display = 'block';
    form1Div.classList.toggle('active'); console.log("Form1" + form1Div.getAttribute('class'));
    console.log("Form2" + form2Div.getAttribute('class'));
  }
  const borderColor = document.getElementById('select');
  borderColor.style.borderColor = selectedValue;
 
};

//HELPER FUNCTION:
function getIndex(select) {
  var nativeWidget = select.previousElementSibling;

  return nativeWidget.selectedIndex;
};

// ------------- //
// Event binding //
// ------------- //

window.addEventListener("load", function () {
  var form = document.querySelector('form');

  form.classList.remove("no-widget");
  form.classList.add("widget");
});

window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option'),
      selectedIndex = getIndex(select);

    select.tabIndex = 0;
    select.previousElementSibling.tabIndex = -1;

    updateValue(select, selectedIndex);

    optionList.forEach(function (option, index) {
      option.addEventListener('mouseover', function (evt) {
        highlightOption(select, option);

      });

      option.addEventListener('click', function (event) {
        updateValue(select, index);
      });

      option.addEventListener('click', function (event) {
        showOption(select, index);
      });
      option.addEventListener('keydown', function (event) {
        if (event.keyCode === 13 || event.key === 'Enter') {

          console.log('Enter key was pressed');

          showOption(select, index);
        }

      });
    });

    select.addEventListener('click', function (event) {
      toggleOptList(select);
    });

    select.addEventListener('focus', function (event) {
      activeSelect(select, selectList);
    });

    select.addEventListener('blur', function (event) {
      deactivateSelect(select);
    });

    select.addEventListener('keyup', function (event) {
      var length = optionList.length,
        index = getIndex(select);

      if (event.keyCode === 27) { deactivateSelect(select); }
      if (event.keyCode === 40 && index < length - 1) { index++; }
      if (event.keyCode === 38 && index > 0) { index--; }

      updateValue(select, index);
    });
  });
});