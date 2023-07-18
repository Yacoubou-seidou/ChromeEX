import {
  addNewlink, editTask, deleteTask,
} from './functionality.js';
let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const todoPlaceholder = document.querySelector('.todoPlaceholder');
const allLinks = document.querySelector('.allLinks');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const lead = { link: tabs[0].url, showName: tabs[0].url }
    myLeads.push(lead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(myLeads) {
  const element = document.querySelector('.listContent');
  console.log(myLeads);
  const filteredArray = myLeads.sort((a, b) => a.index - b.index);
  let content = "";
  filteredArray.forEach((lead) => {
    content += `
    <li class='borderStyle d-flex justify-content-center align-items-center col-12'>
    <fieldset>
    <legend> <a href='${lead.link}' class='leLien' target="_blank" rel="noopener noreferrer">
    ${lead.showName.substring(0, 18)}</a ></legend >
    <div class='d-flex'>
        <input class='formel edition' type="text" id="description" name="description" value='${lead.showName}'>

        <span class='Edittable'><i class="bi bi-pencil-fill"></i></span>
        <span class='spanbtn'><i class="bi bi-trash3-fill"></i></span></div>
      </fieldset>
    </li >
      `;
  });
  element.innerHTML = content;

}
const listContent = document.querySelector('.listContent');
const deleteFunction = () => {
  const supp = document.querySelectorAll(".spanbtn");
  supp.forEach((element) => {
    element.addEventListener("click", () => {
      let idx = parseInt(element.parentNode.getAttribute("data-iden"));
      deleteTask(myLeads, idx)
      let removeEl = element.parentNode.parentNode;
      removeEl.remove();
    });
  });
};

const editFunction = () => {
  const formsElements = document.querySelectorAll('.formel');
  formsElements.forEach((formel, index) => {
    formel.addEventListener('input', (e) => {
      e.preventDefault();
      editTask(myLeads, index, e.target.value);
    });
  });
};

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
});
const isLink = (value) => {
  var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/i;
  return urlPattern.test(value);
}
const toggleInput = (id) => {
  const billingItems = document.querySelectorAll('.formel');
  billingItems[id].classList.toggle('edition');
  if (billingItems[id].classList.contains('edition')) {
    render(myLeads)
    deleteFunction();
    editFunction();
  }
}
const toggleEdit = () => {

  const edittable = document.querySelectorAll('.Edittable');
  edittable.forEach((edit, index) => {
    edit.addEventListener('click', () => {
      console.log(index);
      toggleInput(index)
      deleteFunction();
      editFunction();
    });
  });
}
inputBtn.addEventListener("click", function () {
  if (isLink(inputEl.value)) {
    const elements = document.querySelector('.listContent');
    addNewlink(myLeads, inputEl.value)
    render(myLeads);
    let element = '';
    myLeads.forEach((lead) => {
      element += `
    <li class='borderStyle d-flex justify-content-center align-items-center col-12'>
    <fieldset>
    <legend> <a href='${lead.link}' class='leLien' target="_blank" rel="noopener noreferrer">
    ${lead.showName.substring(0, 18)}</a ></legend >
    <div class='d-flex'>
        <input class='formel edition' type="text" id="description" name="description" value='${lead.showName}'>

        <span class='Edittable'><i class="bi bi-pencil-fill"></i></span>
        <span class='spanbtn'><i class="bi bi-trash3-fill"></i></span></div>
      </fieldset>
    </li >
    `;
    });
    elements.innerHTML = element
    deleteFunction();
    editFunction();
    toggleEdit()
  }
});
deleteFunction()
editFunction()
toggleEdit()