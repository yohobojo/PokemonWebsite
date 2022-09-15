export default class Utilities {
  constructor() {
    this.files = {};
  }
  getQueryString(options) {
    return (
      '?sortCol=' +
      options.sortCol +
      '&sortDir=' +
      options.sortDir +
      '&filterCol=' +
      options.filterCol +
      '&filterStr=' +
      options.filterStr +
      '&limit=' +
      options.limit +
      '&offset=' +
      options.offset
    );
  }
  async getFileContents(url) {
    return await $.get(url);
  }
}
