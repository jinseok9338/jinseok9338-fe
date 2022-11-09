export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);



export const isValidId = (id: string): boolean => /^[a-zA-Z0-9]{5,30}$/.test(id);


export const isValidPassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(password);
