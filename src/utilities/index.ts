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

export const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/.test(password);

export const fetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'GET',
    });
    const res = await response.json();
    const userData = res.data.user;

    const user = { id: userData.ID as String, name: userData.NAME as String };
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const addComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isDivisibleByFive = (num: string) => {
  const number = Number(num);
  return number % 5 === 0;
};

export const isRemainderOne = (num: string) => {
  const number = Number(num);
  return number % 5 === 1;
};
