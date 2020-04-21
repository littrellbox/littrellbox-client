import {faFile, faPoll} from '@fortawesome/free-solid-svg-icons';
import FileAttachment from '../attachments/FileAttachment';
import NoComponentAttachment from "../attachments/NoComponentAttachment";
import FileAttachmentSubManager from "./attachmentsubs/FileAttachmentSubManager";

class AttachmentManager {
  constructor() {
    //create critical arrays and objects
    this.attachments = [];
    this.attachmentTypes = {};

    //create attachment handler function array
    this.newAttachmentFunctions = [];
    this.clearAttachmentFunctions = [];

    //bind class functions
    this.addDefaultAttachments = this.addDefaultAttachments.bind(this);
    this.addAttachmentToArray = this.addAttachmentToArray.bind(this);
    this.clearAttachments = this.clearAttachments.bind(this);
    this.submitAttachments = this.submitAttachments.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);

    this.addDefaultAttachments();
  }

  addDefaultAttachments() {
    this.attachmentTypes["file"] = {
      type: "file",
      friendly: "File",
      icon: faFile,
      component: FileAttachment,
      subManager: new FileAttachmentSubManager()
    };
    this.attachmentTypes["poll"] = {
      type: "poll",
      friendly: "Poll",
      icon: faPoll,
      component: NoComponentAttachment
    };
  }

  removeAttachment(index) {
    this.attachments.splice(index, 1);
    for(let i = 0; i < this.clearAttachmentFunctions.length; i++) {
      this.clearAttachmentFunctions[i]();
    }
  }

  addAttachmentToArray(attachment) {
    this.attachments.push(attachment);
    for(let i = 0; i < this.newAttachmentFunctions.length; i++) {
      this.newAttachmentFunctions[i](attachment);
    }
  }

  clearAttachments() {
    this.attachments = [];
    for(let i = 0; i < this.clearAttachmentFunctions.length; i++) {
      this.clearAttachmentFunctions[i]();
    }
  }

  submitAttachments(attachments, messageId) {
    for(let i = 0; i < attachments.length; i++) {
      this.attachmentTypes[attachments[i].type].subManager.submitAttachment(attachments[i], messageId);
    }
  }
}

export default AttachmentManager;