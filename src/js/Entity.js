/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import createRequest from './createRequest';

export default class Entity {
  listAllTickets() {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'allTickets',
        },
        method: 'GET',
      }).then((data) => {
        resolve(data);
      });
    });
  }

  ticketById(id) {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'ticketById',
          id,
        },
        method: 'GET',
      }).then((data) => {
        resolve(data);
      });
    });
  }

  deleteTicket(idDel) {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'deleteTicket',
          idDel,
        },
        method: 'GET',
      }).then((data) => {
        resolve(data);
      });
    });
  }

  changeStatus(idStat) {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'changeStatus',
          idStat,
        },
        method: 'GET',
      }).then((data) => {
        resolve(data);
      });
    });
  }

  createTicket(name, description) {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'createTicket',
          name,
          description,
        },
        method: 'POST',
      }).then((data) => {
        resolve(data);
      });
    });
  }

  editTicket(id, nameEdit, descriptionEdit) {
    return new Promise((resolve) => {
      createRequest({
        url: 'http://localhost:7060',
        data: {
          method: 'editTicket',
          id,
          nameEdit,
          descriptionEdit,
        },
        method: 'POST',
      }).then((data) => {
        resolve(data);
      });
    });
  }
}
