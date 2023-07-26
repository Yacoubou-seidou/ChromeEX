import { fetchFaviconLink } from './favIcon.js';
const addForm = document.querySelector('.addForm');
const addNewlink = async (array, value) => {
  const icone = await getIcon(value)
  const lead = { link: value, showName: value, icon: icone }
  array.push(lead);
  localStorage.setItem('myLeads', JSON.stringify(array));
  addForm.reset();
};

const deleteTask = (array, id) => {
  array.splice(id, 1);
  localStorage.setItem('myLeads', JSON.stringify(array));
};

const editTask = (array, id, value) => {
  const edit = {
    link: array[id].link, showName: value, icon: array[id].icon, index: id + 1,
  };
  array.splice(id, 1, edit);
  localStorage.setItem('myLeads', JSON.stringify(array));
};

const getIcon = (link) => {
  fetchFaviconLink(link)
    .then((faviconUrl) => {
      console.log(faviconUrl);
      if (faviconUrl) {
        console.log('Favicon link:', faviconUrl);
        return faviconUrl
      } else {
        console.log('Favicon link not found.');
        return ''
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export {
  addNewlink, deleteTask, editTask,
};
