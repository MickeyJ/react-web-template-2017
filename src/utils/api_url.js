
export const basePath = `/example/v1`;

export const getApiURL = (ENV=process.env.NODE_ENV, path=basePath) => {

  const domain = `${process.env.API_DOMAIN}${path}`;

  let protocol = 'https://';

  if(ENV !== 'staging' && ENV !== 'production'){
    protocol = 'http://';
  }

  return `${protocol}${domain}`;
};

export const API_URL = getApiURL();
