import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record:RecordItem) => recordListModel.create(record),
// tag store
  tagList : tagListModel.fetch(),
  createTag : (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    }
  },

  removeTag : (id: string) => {
    if (tagListModel.remove(id)) {
      return true;
    } else {
      return false;
    }
  },

  updateTag : (id: string, name: string) => {
    return tagListModel.update(id, name);
  },

  findTag  (id: string)  {
    return this.tagList.filter(t => t.id === id)[0];

  }
}

export default store;