import { canUseDOM } from 'exenv';

const PREFIX = 'TOPTAL_PROJECT_';

const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    if (!canUseDOM) { return; }

    if (expires instanceof Date) {
      expires = expires.toUTCString();
    }

    document.cookie = [
      `${PREFIX + name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${expires}`,
    ].join(';');
  },

  unset(name) {
    cookie.set({ name, expires: new Date(0) });
  },

  get(name) {
    const realName = PREFIX + name;
    const re = new RegExp(['(?:^|; )',
      realName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)',
    ].join(''));

    const matches = document.cookie.match(re);

    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
};

export default cookie;
