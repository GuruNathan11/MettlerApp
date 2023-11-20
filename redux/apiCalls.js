import axios from 'axios';
import {
  allPatientsSuccess,
  apiCallError,
  apiCallStart,
  apiCallSuccess,
  getAllRegisteredNurseSuccess,
  getAllSocialWorkersSuccess,
  getAllTodayShiftsSuccess,
  getAllTodayStaffsSuccess,
  getAllergyByPatientSuccess,
  getProcedureByPatientSuccess,
  getAllergyNamesSuccess,
  getAnatomicLocationSuccess,
  getCompletedQ15Success,
  getImmunizationRouteSuccess,
  getImmunizationSuccess,
  getIncompletedQ15Success,
  getLocationSuccess,
  getUrgencySuccess,
  getNatureOfReactionSuccess,
  getPatientAllVisitSuccess,
  getPatientLastVisitSuccess,
  getPatientPositionSuccess,
  getPatientProblemSuccess,
  getProblemCategorySuccess,
  getProblemDescriptionSuccess,
  getProblemImmediacySuccess,
  getQ15ActivitySuccess,
  getQ15ConfigSuccess,
  getQ15LocationSuccess,
  getShiftDurationSuccess,
  getShiftStartTimesSuccess,
  getSymptomsSuccess,
  getTodayRNSuccess,
  getTreatmentFactorsSuccess,
  getVitalByPatientIdSuccess,
  loginSuccess,
  logoutSuccess,
  orgSuccess,
  postQ15EntrySuccess,
  retriveLoginSuccess,
  sKeyVerifySuccess,
  getprocedureDataSuccess,
  getUrgencyDataSuccess,
  
} from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
import {Alert} from 'react-native';

// const baseURL = BASE_URL;
const baseURL = 'http://web.mettlerhealth.com:7000/api';
const successCode = 'MHC - 0200';

export const GetOrganization = async dispatch => {
  // dispatch(apiCallStart());
  // console.log('Hello');
  // console.log(baseURL);
  try {
    const res = await axios.get(`${baseURL}/org/name`);
    console.log(res.data);
    // await AsyncStorage.setItem('organization', res.data);
    await dispatch(orgSuccess(res.data.data));
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    // console.log(error.response.data);
  }
};

export const Login2 = async (userInfo, dispatch, navigation) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/user/signin`, userInfo);
    // console.log(res.data);
    if (res.data.message.code === successCode) {
      // console.log(res.data.data.userDetail);
      dispatch(
        loginSuccess({
          username: userInfo.username,
          jwt: res.data.data.jwt.jwtToken,
        }),
      );
      navigation.navigate('SecretKey');
      await AsyncStorage.setItem('jwt', res.data.data.jwt.jwtToken);
      await AsyncStorage.setItem('username', userInfo.username);
      await AsyncStorage.setItem('role', res.data.data.userType[0]);
      await AsyncStorage.setItem('staffID', res.data.data.userDetail.id);
      await AsyncStorage.setItem(
        'name',
        res.data.data.userDetail.name[0].given +
          ' ' +
          res.data.data.userDetail.name[0].family,
      );
      await AsyncStorage.setItem(
        'expireTime',
        res.data.data.session.expireTime,
      );
      await AsyncStorage.setItem(
        'resetCount',
        JSON.stringify(res.data.data.resetCount),
      );
    } else {
      dispatch(apiCallError(res.data.message.description));
      // console.log(res.data.message.description);
    }
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response.data.errorMessage);
  }
};

export const SecretKeyVerify = async (userInfo, dispatch) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/user/verify`, userInfo);
    if (res.data.message.code === successCode) {
      dispatch(sKeyVerifySuccess());
    } else {
      dispatch(apiCallError(res.data.message.description));
    }

    // console.log(res.data);
  } catch (error) {
    // console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const Logout = async (userInfo, dispatch, navigation) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/user/signout`, userInfo);
    // if (res.data.message.code === successCode) {
    dispatch(logoutSuccess());
    await AsyncStorage.clear();
    // navigation.navigate('Login');
    // } else {
    //   dispatch(apiCallError(res.data.message.description));
    // }

    // console.log(res.data);
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response.data.errorMessage);
  }
};

export const RetriveLogin = async dispatch => {
  const jwt = await AsyncStorage.getItem('jwt');
  console.log('Hel');
  dispatch(apiCallStart());

  try {
    const res = await axios.get(`${baseURL}/user/check-login`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(res.data.message);
    if (res.data.message.code === successCode) {
      dispatch(retriveLoginSuccess());
      // console.log('hii');
      await AsyncStorage.setItem('retrive', 'true');
    } else {
      dispatch(apiCallError());
      console.log(res.data.message);
    }
  } catch (error) {
    dispatch(apiCallError());
    console.log(baseURL);
    console.log(error);
  }
};

export const ForgotPassword1 = async (email, dispatch, navigation) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/user/forgot-password`, {email});
    if (res.data.message.code === successCode) {
      dispatch(apiCallSuccess());
      navigation.navigate('OtpSuccess');
    } else {
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const VerifyOtp = async (otp, dispatch, navigation) => {
  dispatch(apiCallStart());
  const email = await AsyncStorage.getItem('email');
  try {
    const res = await axios.post(`${baseURL}/user/verify-otp`, {
      email,
      otp,
    });
    if (res.data.message.code === successCode) {
      dispatch(apiCallSuccess());
      navigation.navigate('ResetPassword');
    } else {
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const ResetPassword1 = async (
  password,
  cPassword,
  dispatch,
  navigation,
) => {
  dispatch(apiCallStart());
  const email = await AsyncStorage.getItem('email');
  try {
    const res = await axios.post(`${baseURL}/user/reset-password`, {
      newPassword: password,
      confirmNewPass: cPassword,
      email,
    });
    // console.log(res.data);
    if (res.data.code === successCode) {
      dispatch(apiCallSuccess());
      navigation.navigate('ResetSuccess');
    } else {
      dispatch(apiCallError(res.data.description));
    }
  } catch (error) {
    console.log(error.response.data.errorMessage);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const ResetSecretKey1 = async (email, dispatch, navigation) => {
  dispatch(apiCallStart());
  const jwt = await AsyncStorage.getItem('jwt');
  try {
    const res = await axios.post(`${baseURL}/user/resetSecretKey`, {
      email,
      jwt,
    });
    if (res.data.message.code === successCode) {
      navigation.navigate('ResetSecretKeySuccess');
      dispatch(apiCallSuccess());
    } else {
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    dispatch(apiCallError(error.response.data.message.errorMessage));
  }
};

export const getAllPatients = async dispatch => {
  const org = await AsyncStorage.getItem('org');
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/patient/get/activePatient/${org}`);
    // console.log(res.data);
    dispatch(allPatientsSuccess(res.data.data));
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response);
  }
};

export const getVitalByPatientId = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/vital/getByPatientId/${pid}`);
    console.log(res.data.data);
    if (res.data.message.code === successCode) {
      dispatch(getVitalByPatientIdSuccess(res.data.data));
    } else {
      dispatch(apiCallError(res.data.message.description));
      dispatch(getVitalByPatientIdSuccess({}));
      // console.log(pid);
    }
  } catch (error) {
    // dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response);
  }
};

export const getQ15Location = async dispatch => {
  dispatch(apiCallStart());
  // console.log('HEllo');
  try {
    const res = await axios.get(`${baseURL}/q15form/get/wg2rzH0Yjj`);
    // console.log(res.data);
    dispatch(getQ15LocationSuccess(res.data.data.location));
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response);
  }
};
export const getQ15Activity = async dispatch => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/q15form/get/l6gsqwczMR`);
    // console.log(res.data);
    dispatch(getQ15ActivitySuccess(res.data.data.activity));
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response);
  }
};
export const PostQ15Entry = async (
  pid,
  value,
  value1,
  q15Date,
  stamp,
  slot,
  username,
  breathCheck,
  text,
  shiftName,
  TodayRN,
  dispatch,
) => {
  dispatch(apiCallStart());
  try {
    // const q15Slot = await AsyncStorage.getItem('stamp');
    const res = await axios.post(`${baseURL}/config/register`, {
      pid,
      q15Date,
      breathing: breathCheck,
      remarks: text,
      q15Time: stamp,
      q15Slot: slot,
      location: value,
      activity: value1,
      enteredBy: username,
      shift: shiftName,
      shiftIncharge: TodayRN,
    });
    console.log(shiftName);
    // console.log(q15Slot);
    dispatch(postQ15EntrySuccess());
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response.data.errorMessage);
  }
};

export const getQ15Config = async (dispatch, pid, q15Date) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/config/getById/${pid}/date/${q15Date}`,
    );
    // console.log(res.data);
    dispatch(getQ15ConfigSuccess(res.data.data));
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response.data.errorMessage);
  }
};

export const getCompletedQ15 = async (dispatch, q15Slot, q15Date) => {
  const org = await AsyncStorage.getItem('org');
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/config/get/completed/${q15Slot}/${q15Date}/${org}`,
    );
    dispatch(getCompletedQ15Success(res.data.data));
    // console.log(res.data);
    console.log(org);
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response);
  }
};

export const getIncompletedQ15 = async (dispatch, q15Slot, q15Date) => {
  const org = await AsyncStorage.getItem('org');
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/config/get/notCompleted/${q15Slot}/${q15Date}/${org}`,
    );
    dispatch(getIncompletedQ15Success(res.data.data));
    // console.log(res.data);
  } catch (error) {
    dispatch(apiCallError(error.response.data.errorMessage));
    console.log(error.response.data.errorMessage);
  }
};

export const getShiftTimes = async dispatch => {
  dispatch(apiCallStart());
  const org = await AsyncStorage.getItem('org');
  try {
    const res = await axios.get(`${baseURL}/org/getById/${org}`);
    // console.log(res.data.data.organization.shift);
    if (res.data.data) {
      dispatch(getShiftStartTimesSuccess(res.data.data.shift.startTime));
      dispatch(getShiftDurationSuccess(res.data.data.shift.duration));
      // await AsyncStorage.setItem(
      //   'shiftDuration',
      //   res.data.data.organization.shift.duration,
      // );
      // await AsyncStorage.setItem(
      //   'shiftStartTime',
      //   res.data.data.organization.shift.startTime,
      // );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllRegisterNurse = async dispatch => {
  dispatch(apiCallStart());
  const org = await AsyncStorage.getItem('org');
  try {
    const res = await axios.get(
      `${baseURL}/staff/role/Registered Nurses/${org}`,
    );
    dispatch(getAllRegisteredNurseSuccess(res.data.data));
    // console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getAllSocialWorkers = async dispatch => {
  dispatch(apiCallStart());
  const org = await AsyncStorage.getItem('org');
  try {
    const res = await axios.get(`${baseURL}/staff/role/Social Workers/${org}`);
    dispatch(getAllSocialWorkersSuccess(res.data.data));
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const postQ15PSConfig = async (dispatch, data) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/PSConfig/register`, data);
    if (res.data.message.code === successCode) {
      Alert.alert('Mettler Health Care', 'Staffs Allocated Successfully');
      dispatch(apiCallSuccess());
    }
    // console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getAllTodayStaffs = async (dispatch, q15Date, shift) => {
  dispatch(apiCallStart());
  // console.log(q15Date, shift);
  try {
    const res = await axios.get(`${baseURL}/PSConfig/getByDate/${q15Date}`);
    if (res.data.data) {
      dispatch(getAllTodayStaffsSuccess(res.data.data.shift[shift]?.schedule));
      dispatch(getTodayRNSuccess(res.data.data.shift[shift].rnIncharge));
      // console.log(res.data.data[0].shift[shift]?.schedule[0]);
      // console.log(shift);
      console.log('hello');
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getAllTodayShifts = async (dispatch, RDate) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/PSConfig/getByDate/${RDate}`);
    if (res.data.data) {
      dispatch(getAllTodayShiftsSuccess(res.data.data.shift));
      // console.log('SUCEESSSSS', res.data.data.shift[0].rnIncharge);
    }
    if (res.data.message.code === 'MHC - 0093') {
      dispatch(getAllTodayShiftsSuccess([]));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getAllergyByPatient = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/Allergy/getByPatientId/${pid}`);
    // console.log(res.data.data);
    dispatch(getAllergyByPatientSuccess(res.data.data));
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getDropdowns = async (dispatch, name) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/dropdowns/getByDropdown?dropdown=${name}`,
    );
    console.log(res.data.data[0].list);
    if (name === 'allergyName') {
      dispatch(getAllergyNamesSuccess(res.data.data[0].list));
    } else if (name === 'natureOfReaction') {
      dispatch(getNatureOfReactionSuccess(res.data.data[0].list));
    } else if (name === 'symptoms') {
      dispatch(getSymptomsSuccess(res.data.data[0].list));
    } else if (name === 'problemCategory') {
      dispatch(getProblemCategorySuccess(res.data.data[0].list));
    } else if (name === 'immediacy') {
      dispatch(getProblemImmediacySuccess(res.data.data[0].list));
    } else if (name === 'ProblemDescription') {
      dispatch(getProblemDescriptionSuccess(res.data.data[0].list));
    } else if (name === 'Route') {
      dispatch(getImmunizationRouteSuccess(res.data.data[0].list));
    } else if (name === 'anatomicLocation') {
      dispatch(getAnatomicLocationSuccess(res.data.data[0].list));
    }
    else if (name === 'location') {
      dispatch(getLocationSuccess(res.data.data[0].list));
    }
    else if (name === ' Urgency') {
      console.log(res.data.data[0])
      dispatch(getUrgencyDataSuccess(res.data.data[0].list));
    }
    else if (name === 'TreatmentFactors') {
      dispatch(getTreatmentFactorsSuccess(res.data.data[0].list));
    }
    else if (name === 'patientPosition') {
       dispatch(getPatientPositionSuccess(res.data.data[0].list));
      //  console.log(res.data[0])
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error));
  }
};

export const postAllergy = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/Allergy/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'Allergy Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};
export const postProblem = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/Problem/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'Problem Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const postPatientVitals = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/vital/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'Vital Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};
export const postImmunization = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/Immunization/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'Immunization Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

//Last Visit
export const getPatientVisit = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/ptVisit/get/pid/${pid}`);
    if (res.data?.message.code === successCode) {
      dispatch(getPatientLastVisitSuccess(res.data.data[0].id));
      console.log(res.data.data[0].id);
    } else {
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

//Whole Visit
export const getPatientAllVisit = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/ptVisit/get/pid/${pid}`);
    if (res.data?.data) {
      //console.log(res.data.data);
      dispatch(getPatientAllVisitSuccess(res.data.data));
    } else {
      dispatch(getPatientAllVisitSuccess(null));
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getPatientProblem = async (dispatch, pid) => {
  try {
    const res = await axios.get(`${baseURL}/Problem/getByPatientId/${pid}`);
    if (res.data.message.code === successCode) {
      dispatch(getPatientProblemSuccess(res.data.data));
      // console.log(res.data.data);
    } else {
      dispatch(getPatientProblemSuccess(null));
      dispatch(apiCallError(res.data.message.description));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getImmunization = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/Immunization/getByPatientId/${pid}`,
    );
    if (res.data.message.code === successCode) {
      dispatch(getImmunizationSuccess(res.data.data));
    } else {
      dispatch(getImmunizationSuccess(null));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

// //procedure-order
export const labpro = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/labpro/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'Procedure Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};
// imaging procedures 
export const labimgpro = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/labimgpro/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'ImagingProcedure Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
    // Alert.alert(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

export const getImagingProceture = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(
      `${baseURL}/labimgpro/getAll`,
    );
    if (res.data.message.code === successCode) {
      Alert.alert(res.data.message.code)
      dispatch(getImmunizationSuccess(res.data.data));
    } else {
      dispatch(getImmunizationSuccess(null));
    }
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

// LabTest

export const labTest = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/labTest/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'labTest Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
     Alert.alert(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};
// get labtest
export const getlabTest= async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/labTest/ById/${pid}`);
     console.log(res.data.data);
    dispatch(Success(res.data.data));
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};
//labConsult
export const labConsult = async (dispatch, rObj) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.post(`${baseURL}/labConsult/register`, rObj);
    if (res.data?.message.code === successCode) {
      Alert.alert('METTLER HEALTH CARE', 'labConsult Added Successfully');
      dispatch(apiCallSuccess());
    } else {
      Alert.alert('METTLER HEALTH CARE', res.data.message.description);
    }
  } catch (error) {
    console.log(error);
    console.log(rObj);
     Alert.alert(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};

// getBY patientid 
export const getProcedurePatient = async (dispatch, pid) => {
  dispatch(apiCallStart());
  try {
    const res = await axios.get(`${baseURL}/labpro/getByPid/${pid}`);
    // console.log(res.data.data);
    dispatch(getProcedureByPatientSuccess(res.data.data));
    // Alert.alert(res.data.message.code)
    // Alert.alert(pid)
  } catch (error) {
    console.log(error);
    dispatch(apiCallError(error.response.data.errorMessage));
  }
};