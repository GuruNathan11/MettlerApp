import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      username: null,
      role: null,
      jwt: null,
      secretKey: null,
    },
    organization: [],
    allPatients: [],
    patientVitals: {},
    q15Location: [],
    q15Activity: [],
    q15Config: [],
    q15Completed: [],
    q15Incompleted: [],
    registeredNurse: [],
    socialWorkers: [],
    todayStaffs: [],
    allShiftStaffs: [],
    allergyData: [],
    patientVisits: [],
    patientProblem: [],
    immunizationData: [],
    allergyNames: [],
    natureOfReactions: [],
    symptoms: [],
    problemCategory: [],
    problemImmediacy: [],
    problemDescription: [],
    immunizationRoute: [],
    anatomicLocation: [],
    location: [],
    treatmentFactors: [],
    patientPosition: [],
    todayRN: null,
    lastVisitId: null,
    startTime: null,
    duration: null,
    q15Load: false,
    pending: false,
    retrive: false,
    secretKeyPage: false,
    mainStack: false,
    success: false,
    error: null,
  },
  reducers: {
    apiCallStart: state => {
      state.pending = true;
      state.error = null;
    },
    apiCallError: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    orgSuccess: (state, action) => {
      state.pending = false;
      state.error = null;
      state.organization = action.payload;
    },
    selectedOrg: (state, action) => {
      state.pending = false;
      state.userInfo.organization = action.payload;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.username = action.payload.username;
      state.userInfo.jwt = action.payload.jwt;
      state.userInfo.role = action.payload.role;
      state.success = true;
      state.secretKeyPage = true;
      state.error = null;
    },
    sKeyVerifySuccess: state => {
      state.pending = false;
      state.secretKeyPage = false;
      state.retrive = false;
      state.mainStack = true;
    },
    logoutSuccess: state => {
      state.pending = false;
      state.userInfo.username = null;
      state.userInfo.jwt = null;
      state.userInfo.role = null;
      // state.success = false;
      state.retrive = false;
      state.mainStack = false;
      state.organization = [];
      state.allPatients = [];
      state.allShiftStaffs = [];
      state.duration = null;
      state.error = null;
      state.patientVitals = [];
    },
    retriveLoginSuccess: state => {
      state.pending = false;
      state.retrive = true;
      state.success = true;
    },
    apiCallSuccess: state => {
      state.pending = false;
    },
    allPatientsSuccess: (state, action) => {
      state.pending = false;
      state.allPatients = action.payload;
    },
    getVitalByPatientIdSuccess: (state, action) => {
      state.pending = false;
      state.patientVitals = action.payload;
    },
    getQ15LocationSuccess: (state, action) => {
      state.pending = false;
      state.q15Location = action.payload;
    },
    getQ15ActivitySuccess: (state, action) => {
      state.pending = false;
      state.q15Activity = action.payload;
    },
    postQ15EntrySuccess: state => {
      state.pending = false;
      state.q15Load = !state.q15Load;
    },
    getQ15ConfigSuccess: (state, action) => {
      state.pending = false;
      state.q15Config = action.payload;
    },
    getCompletedQ15Success: (state, action) => {
      state.pending = false;
      state.q15Completed = action.payload;
    },
    getIncompletedQ15Success: (state, action) => {
      state.pending = false;
      state.q15Incompleted = action.payload;
    },
    getShiftStartTimesSuccess: (state, action) => {
      state.pending = false;
      state.startTime = action.payload;
    },
    getShiftDurationSuccess: (state, action) => {
      state.pending = false;
      state.duration = action.payload;
    },
    getAllRegisteredNurseSuccess: (state, action) => {
      state.pending = false;
      state.registeredNurse = action.payload;
    },
    getAllSocialWorkersSuccess: (state, action) => {
      state.pending = false;
      state.socialWorkers = action.payload;
    },
    getAllTodayStaffsSuccess: (state, action) => {
      state.pending = false;
      state.todayStaffs = action.payload;
    },
    getAllTodayShiftsSuccess: (state, action) => {
      state.pending = false;
      state.allShiftStaffs = action.payload;
    },
    getTodayRNSuccess: (state, action) => {
      state.pending = false;
      state.todayRN = action.payload;
    },
    getAllergyByPatientSuccess: (state, action) => {
      state.pending = false;
      state.allergyData = action.payload;
    },
    getPatientLastVisitSuccess: (state, action) => {
      state.pending = false;
      state.lastVisitId = action.payload;
    },
    getPatientAllVisitSuccess: (state, action) => {
      state.pending = false;
      state.patientVisits = action.payload;
    },
    getPatientProblemSuccess: (state, action) => {
      state.pending = false;
      state.patientProblem = action.payload;
    },
    getAllergyNamesSuccess: (state, action) => {
      state.pending = false;
      state.allergyNames = action.payload;
    },
    getNatureOfReactionSuccess: (state, action) => {
      state.pending = false;
      state.natureOfReactions = action.payload;
    },
    getSymptomsSuccess: (state, action) => {
      state.pending = false;
      state.symptoms = action.payload;
    },
    getProblemCategorySuccess: (state, action) => {
      state.pending = false;
      state.problemCategory = action.payload;
    },
    getProblemImmediacySuccess: (state, action) => {
      state.pending = false;
      state.problemImmediacy = action.payload;
    },
    getImmunizationSuccess: (state, action) => {
      state.pending = false;
      state.immunizationData = action.payload;
    },
    getProblemDescriptionSuccess: (state, action) => {
      state.pending = false;
      state.problemDescription = action.payload;
    },
    getImmunizationRouteSuccess: (state, action) => {
      state.pending = false;
      state.immunizationRoute = action.payload;
    },
    getAnatomicLocationSuccess: (state, action) => {
      state.pending = false;
      state.anatomicLocation = action.payload;
    },
    getLocationSuccess: (state, action) => {
      state.pending = false;
      state.location = action.payload;
    },
    getTreatmentFactorsSuccess: (state, action) => {
      state.pending = false;
      state.treatmentFactors = action.payload;
    },
     getPatientPositionSuccess: (state, action) => {
      state.pending = false;
     state.patientPosition = action.payload;
    },
  },
});

export const {
  allPatientsSuccess,
  apiCallError,
  apiCallStart,
  apiCallSuccess,
  forgotPasswordSuccess,
  getAllergyNamesSuccess,
  getAllRegisteredNurseSuccess,
  getAllSocialWorkersSuccess,
  getAllTodayStaffsSuccess,
  getAllTodayShiftsSuccess,
  getAnatomicLocationSuccess,
  getImmunizationRouteSuccess,
  getImmunizationSuccess,
  getProblemCategorySuccess,
  getProblemDescriptionSuccess,
  getProblemImmediacySuccess,
  getQ15ActivitySuccess,
  getCompletedQ15Success,
  getIncompletedQ15Success,
  getLocationSuccess,
  getTreatmentFactorsSuccess,
  getNatureOfReactionSuccess,
  getPatientAllVisitSuccess,
  getPatientLastVisitSuccess,
  getPatientProblemSuccess,
  getShiftStartTimesSuccess,
  getShiftDurationSuccess,
  getSymptomsSuccess,
  getQ15ConfigSuccess,
  getQ15LocationSuccess,
  getTodayRNSuccess,
  getVitalByPatientIdSuccess,
  loginSuccess,
  logoutSuccess,
  orgSuccess,
  postQ15EntrySuccess,
  getPatientPositionSuccess,
  retriveLoginSuccess,
  selectedOrg,
  sKeyVerifySuccess,
  getAllergyByPatientSuccess,
} = userSlice.actions;
export default userSlice.reducer;
