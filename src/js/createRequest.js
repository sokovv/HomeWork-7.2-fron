/* eslint-disable linebreak-style */
/* eslint-disable no-empty */
/* eslint-disable guard-for-in */

export default function createRequest(options) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    if (options.method === 'GET') {
      const params = new URLSearchParams();
      if (options.data) {
        for (const key in options.data) {
          params.append(key, options.data[key]);
          xhr.open(options.method, `${options.url}?${params}`);
        }
        xhr.send();
      }
    } else {
      const formData = new FormData();
      if (options.data) {
        for (const key in options.data) {
          formData.append(key, options.data[key]);
        }
        xhr.open(options.method, options.url);
        xhr.send(formData);
      }
    }
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (e) {
        }
      }
    });
  });
}
