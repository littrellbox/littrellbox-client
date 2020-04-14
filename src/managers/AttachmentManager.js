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
    this.submitAttachmentFunctions = [];

    //bind class functions
    this.addDefaultAttachments = this.addDefaultAttachments.bind(this);
    this.addAttachmentToArray = this.addAttachmentToArray.bind(this);
    this.submitAttachments = this.submitAttachments.bind(this);

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

  addAttachmentToArray(attachment) {
    this.attachments.push(attachment);
    for(let i = 0; i < this.newAttachmentFunctions.length; i++) {
      this.newAttachmentFunctions[i](attachment);
    }
  }

  submitAttachments() {
    let attachmentsFinal = [];
    for(let i = 0; i < this.attachments.length; i++) {
      attachmentsFinal.push(this.attachmentTypes[this.attachments[i].type].subManager.submitAttachment(this.attachments[i]));
    }
    this.attachments = [];
    for(let i = 0; i < this.submitAttachmentFunctions.length; i++) {
      this.submitAttachmentFunctions[i]();
    }
    return attachmentsFinal;
  }
}

export default AttachmentManager;