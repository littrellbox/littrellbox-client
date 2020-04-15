import axios from 'axios';

class FileAttachmentSubManager {
  submitAttachment(attachment) {
    const formData = new FormData();
    formData.append('file', attachment.data);
    formData.append('name', attachment.name);
    formData.append('token', window.localStorage.getItem("token"));
    axios.post(window.serverURL + "/files/upload/file", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformResponse: res => res,
      responseType: 'json'
    })
  }
}

export default FileAttachmentSubManager;