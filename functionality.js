const addForm = document.querySelector('.addForm');
const addNewlink = (array, value) => {
  const lead = { link: value, showName: value }
  array.push(lead);
  localStorage.setItem('myLeads', JSON.stringify(array));
  addForm.reset();
};

const deleteTask = (array, id) => {
  array.splice(id, 1);
  for (let index = 0; index < array.length; index += 1) {
    array[index].index = index + 1;
  }
  localStorage.setItem('myLeads', JSON.stringify(array));
};

const editTask = (array, id, value) => {
  const edit = {
    link: array[id].link, showName: value, index: id + 1,
  };
  array.splice(id, 1, edit);
  localStorage.setItem('myLeads', JSON.stringify(array));
};

export {
  addNewlink, deleteTask, editTask,
};