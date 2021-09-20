export default class HttpRequestHandler {
  constructor() {
    this.headers = new Headers();

    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("GET", "POST", "OPTIONS");
  }
  fetchDrawing = async (url) => {
    try {
      const response = await fetch(url, {
        headers: this.headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  fetchNoBckGrdImage = async (fileContent, url = "/imgconvert") => {
    try {
     
      let headers = new Headers();
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("GET", "POST", "OPTIONS");
      headers.append('Content-Type', 'application/json');
      headers.append("Accept", "application/json");
     // let formData = new FormData();
      //formData.append("file",fileContent);
      var fileData = {
        file : fileContent
      };
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(fileData),
        headers: headers,
        redirect: 'follow'
      });
     
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
}
