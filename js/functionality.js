import { fetchFaviconLink } from './favIcon.js';
const addForm = document.querySelector('.addForm');
const addNewlink = async (array, value) => {
  const icone = await getIcon(value)
  const lead = { link: value, showName: value, icon: icone }
  array.push(lead);
  localStorage.setItem('myLeads', JSON.stringify(array));
  addForm.reset();
};

const deleteLink = (array, id) => {
  array.splice(id, 1);
  localStorage.setItem('myLeads', JSON.stringify(array));
};

const editLink = (array, id, value) => {
  const edit = {
    link: array[id].link, showName: value, icon: array[id].icon, index: id + 1,
  };
  array.splice(id, 1, edit);
  localStorage.setItem('myLeads', JSON.stringify(array));
};

const getIcon = (link) => {
  return fetchFaviconLink(link)
}

export {
  addNewlink, deleteLink, editLink, getIcon
};
