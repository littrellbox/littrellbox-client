import axios from 'axios';

class FileAttachmentSubManager {
  submitAttachment(attachment) {
    const formData = new FormData();
    formData.append('file', attachment.data);
    formData.append('name', attachment.name);
    formData.append('token', window.localStorage.getItem("token"));
    let finalData = {type: "file"};
    axios.post(window.serverURL + "/files/upload/file", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformResponse: res => res,
      responseType: 'json'
    }).then(response => {
      console.log(response);
      finalData.id = response.data.id;
    });
    return finalData;
  }
}

export default FileAttachmentSubManager;