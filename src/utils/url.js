import { patientDetails } from "../actions/patientAction";

// const basePath = "https://doctor-app-backend-express.herokuapp.com";
const basePath = "http://localhost:3000";
const patient = "patient";
const doctor = "doctor";

const urlMapping = {
  login: `${basePath}/${doctor}/login`,
  profile: `${basePath}/profile`,
  logout: `${basePath}/logout`,
  patientRegistration: `${basePath}/${patient}/registration`,
  patientDetails: `${basePath}/${patient}/details`
};

export { urlMapping };
