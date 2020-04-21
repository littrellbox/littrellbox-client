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

    this.addDefaultAttachments();
  }

  addDefaultAttachments() {
    this.attachmentTypes["file"] = {
      type: "file",
      friendly: "File",
      icon: faFile,
      component: NoComponentAttachment,
      subManager: new FileAttachmentSubManager()
    };
    this.attachmentTypes["poll"] = {
      type: "poll",
      friendly: "Poll",
      icon: faPoll,
      component: NoComponentAttachment
    };
  }

  addAttachmentToArray(attachment) {
    this.attachments.push(attachment);
    for(let i = 0; i < this.newAttachmentFunctions.length; i++) {
      this.newAttachmentFunctions[i](attachment);
    }
  }

  clearAttachments() {
    this.attachments = [];
    console.log(this.clearAttachmentFunctions);
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