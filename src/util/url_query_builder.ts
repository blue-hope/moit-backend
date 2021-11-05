const UrlQueryBuilder = function (url: string) {
  let _url = url;
  return {
    setQuery: function (key: string, value: string) {
      const keyval = `${key}=${value}&`;
      switch (_url.slice(-1)) {
        case '?':
        case '&':
          _url += keyval;
          break;
        default:
          _url += '?' + keyval;
      }
      return this;
    },
    setMultipleQuery: function (payload: { [key: string]: string }) {
      Object.keys(payload).map((key) => this.setQuery(key, payload[key]));
      return this;
    },
    build: function () {
      if (_url.slice(-1) === '&') {
        _url = _url.slice(0, -1);
      }
      return _url;
    },
  };
};

export { UrlQueryBuilder };
