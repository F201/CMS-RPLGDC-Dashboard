const ls = sessionStorage;

export default {
  get() {
    return ls.getItem('rplgdcToken');
  },
  set(value) {
    ls.setItem('rplgdcToken', value);
  },
  remove() {
    ls.removeItem('rplgdcToken');
  },
  exists() {
    return !!this.get();
  },
  clear() {
    ls.clear();
  }
};
