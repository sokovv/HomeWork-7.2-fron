/* eslint-disable linebreak-style */

import Modal from './modal';

export default class HelpDisk {
  constructor(entity) {
    this.entity = entity;
    this.container = null;
    this.addName = this.addName.bind(this);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();
    this.entity.listAllTickets().then((data) => {
      for (let i = 0; i < data.length; i++) {
        const listTicket = document.createElement('div');
        listTicket.classList.add('listTicket');
        const ticket = document.createElement('div');
        ticket.classList.add('ticket');
        listTicket.appendChild(ticket);
        const status = document.createElement('div');
        status.classList.add('status');
        if (data[i].status === 'true') {
          status.textContent = '✔';
        }
        ticket.appendChild(status);
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = data[i].name;
        ticket.appendChild(name);
        const date = document.createElement('div');
        date.classList.add('date');
        date.textContent = data[i].created;
        ticket.appendChild(date);
        const control = document.createElement('div');
        control.classList.add('control');
        ticket.appendChild(control);
        const edit = document.createElement('div');
        edit.classList.add('edit');
        control.appendChild(edit);
        const close = document.createElement('div');
        close.classList.add('close');
        control.appendChild(close);
        listTicket.id = data[i].id;
        const description = document.createElement('div');
        description.classList.add('description');
        ticket.appendChild(description);
        this.container.appendChild(listTicket);
        if (!ticket.classList.contains('listen')) {
          ticket.addEventListener('click', (evt) => {
            ticket.classList.add('listen');
            this.addName(evt);
            this.deleteTicket(evt);
            this.changeStatus(evt);
            this.editTicket(evt);
          });
        }
      }
    });
  }

  addName(evt) {
    const q = evt.currentTarget;
    this.entity.ticketById(evt.currentTarget.parentElement.id).then((data) => {
      if (q.querySelector('.description').textContent === ''
        && !evt.target.classList.contains('close')
        && !evt.target.classList.contains('edit')
        && !evt.target.classList.contains('status')) {
        q.querySelector('.description').textContent = data.description;
      } else {
        q.querySelector('.description').textContent = '';
      }
    });
  }

  deleteTicket(evt) {
    const g = evt.currentTarget;
    const q = evt.target;
    if (q.classList.contains('close')) {
      const delTicket = new Modal(document.querySelector('#modal-del-ticket'), this.entity, 'helpDisk', g);
      delTicket.registerEvents();
      delTicket.open();
    }
  }

  editTicket(evt) {
    const g = evt.currentTarget;
    const q = evt.target;
    if (q.classList.contains('edit')) {
      const redTicket = new Modal(document.querySelector('#modal-red-ticket'), this.entity, 'helpDisk', g);
      redTicket.registerEvents();
      redTicket.open();
    }
  }

  changeStatus(evt) {
    const g = evt.currentTarget;
    const q = evt.target;
    if (q.classList.contains('status')) {
      this.entity.changeStatus(evt.currentTarget.parentElement.id);
      this.entity.ticketById(evt.currentTarget.parentElement.id).then((data) => {
        if (data.status === 'true') {
          g.querySelector('.status').textContent = '✔';
        } else {
          g.querySelector('.status').textContent = '';
        }
      });
    }
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  redrow() {
    const listTicketAll = document.querySelectorAll('.listTicket');
    listTicketAll.forEach((item) => item.remove());
    this.drawUi();
  }
}
