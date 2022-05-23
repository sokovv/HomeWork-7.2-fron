/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */

export default class Modal {
  constructor(element, entity, helpDisk, target) {
    if (!element) {
      alert('Переданного элемента не существует');
    } else {
      this.element = element;
      this.entity = entity;
      this.helpDisk = helpDisk;
      this.target = target;
      this.onClose = this.onClose.bind(this);
      this.onOk = this.onOk.bind(this);
      this.registerEvents();
    }
  }

  registerEvents() {
    const dataDismissButton = this.element.querySelectorAll('[data-dismiss="modal"]');
    const dataDismissButtonArr = Array.from(dataDismissButton);
    for (let i = 0; i < dataDismissButtonArr.length; i++) {
      function getlink(i) {
        const linkClick = dataDismissButtonArr[i];
        return linkClick;
      }
      const link = getlink(i);

      link.addEventListener('click', this.onClose);
    }
    const dataSendsButton = this.element.querySelector('[data-sends="modal"]');
    dataSendsButton.addEventListener('click', this.onOk);
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  onOk(e) {
    e.preventDefault();
    this.ok();
  }

  open() {
    this.element.classList.add('hidden');
  }

  close() {
    this.element.classList.remove('hidden');
  }

  ok() {
    if (this.element.id === 'modal-new-ticket') {
      const dataIdName = this.element.querySelector('[data-id="name"]');
      const dataIdDescription = this.element.querySelector('[data-id="description"]');
      this.entity.createTicket(dataIdName.value, dataIdDescription.value);
      this.element.classList.remove('hidden');
      this.helpDisk.redrow();
    }
    if (this.element.id === 'modal-red-ticket') {
      const nameEdit = this.element.querySelector('[data-id="name"]');
      const descriptionEdit = this.element.querySelector('[data-id="description"]');
      this.entity.editTicket(this.target.parentElement.id, nameEdit.value, descriptionEdit.value);
      this.entity.ticketById(this.target.parentElement.id).then((data) => {
        this.target.querySelector('.name').textContent = data.name;
      });
      this.element.classList.remove('hidden');
    }
    if (this.element.id === 'modal-del-ticket') {
      this.entity.deleteTicket(this.target.parentElement.id);
      this.target.remove();
      this.element.classList.remove('hidden');
    }
  }
}
