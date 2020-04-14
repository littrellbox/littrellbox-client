import {faFile, faPoll} from '@fortawesome/free-solid-svg-icons';
import FileAttachment from '../attachments/FileAttachment';
import NoComponentAttachment from "../attachments/NoComponentAttachment";
import FileAttachmentSubManager from "./attachmentsubs/FileAttachmentSubManager";

class AttachmentManager {
  constructor() {
    //create critical arrays
    this.attachments = [];
    this.attachmentTypes = [];

    //create attachment handler function array
    this.newAttachmentFunctions = [];

    //bind class functions
    this.addDefaultAttachments = this.addDefaultAttachments.bind(this);
    this.addAttachmentToArray = this.addAttachmentToArray.bind(this);
    this.submitAttachments = this.submitAttachments.bind(this);

    this.addDefaultAttachments();
  }

  addDefaultAttachments() {
    this.attachmentTypes.push({
      type: "file",
      friendly: "File",
      icon: faFile,
      component: FileAttachment,
      subManager: new FileAttachmentSubManager()
    });
    this.attachmentTypes.push({
      type: "poll",
      friendly: "Poll",
      icon: faPoll,
      component: NoComponentAttachment
    });
  }

  addAttachmentToArray(attachment) {
    this.attachments.push(attachment);
    console.log(this.attachments);
    for(let i = 0; i < this.newAttachmentFunctions.length - 1; i++) {
      this.newAttachmentFunctions[i](attachment);
    }
  }

  submitAttachments(attachments) {
    //this should return an array of Attachment objects
    return [];
  }
}

export default AttachmentManager;