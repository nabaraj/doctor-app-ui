// const basePath = "https://doctor-app-backend-express.herokuapp.com";
const basePath = "http://localhost:3000";

const urlMapping = {
  login: `${basePath}/doctor/login`,
  profile: `${basePath}/profile`,
  logout: `${basePath}/logout`,
};

export { urlMapping };
