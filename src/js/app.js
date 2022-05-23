/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable guard-for-in */

import HelpDisk from './HelpDisk';
import Entity from './Entity';
import Modal from './modal';

const entity = new Entity();
const helpDisk = new HelpDisk(entity);
helpDisk.bindToDOM(document.querySelector('.tickets'));
helpDisk.drawUi();

const createTicket = new Modal(document.querySelector('#modal-new-ticket'), entity, helpDisk);
createTicket.registerEvents();

const addTicket = document.querySelector('.addTicket');

addTicket.onclick = function () {
  createTicket.open();
};
