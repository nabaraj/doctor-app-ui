// const basePath = "https://doctor-app-backend-express.herokuapp.com";
let basePath = "http://localhost:3000";
const patient = "patient";
const doctor = "doctor";
if (process.env.NODE_ENV === "production") {
  basePath = "https://doctor-app-backend-express.herokuapp.com";
}
const urlMapping = {
  base: basePath,
  login: `${basePath}/${doctor}/login`,
  profile: `${basePath}/profile`,
  logout: `${basePath}/logout`,
  patientRegistration: `${basePath}/${patient}/registration`,
  patientDetails: `${basePath}/${patient}/details`,
  patientHistory: `${basePath}/${patient}/history`,
  search: `${basePath}/${patient}/search`,
  postPrescription: `${basePath}/${patient}/prescription`,
};

export { urlMapping };
