import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddAllergy,
  AddImmunization,
  AddProblem,
  AddVitals,
  AdmitPatient,
  AllActiveQ15,
  AllPatients,
  Allergy,
  AllergyDetails,
  AssignedPatients,
  Consult,
  CurrentPatients,
  ImagingProcedure,
  Immunization,
  ImmunizationDetails,
  LabTest,
  LabDetails,
  OverView,
  PatientData,
  PatientDetails,
  PatientProblem,
  PatientVitals,
  Patients,
  ProblemDetails,
  Procedure,
  Q15,
  Reports,
  TodayAdmitted,
  TreatmentPlan,
  VitalDetails,
  ProcedureDetails,
  ImagingDetails,
  ConsultDetails,
  AddAdmit,
  AddTest,
  AddTest2,
  AddTest3,
  AddTest4,
  PatientADT,
  BedAssignment,
  AddTransfer,
  AddDischarge,
  ADTContainer,
  Available,
} from '../../screens';
const Stack = createNativeStackNavigator();
const PatientsStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Patients">
      <Stack.Screen name="Patients" component={Patients} />
      <Stack.Screen
        name="AssignedPatients"
        component={AssignedPatients}
        options={{header: () => null}}
      />
      <Stack.Screen name="AllPatients" component={AllPatients} />
      <Stack.Screen name="CurrentPatients" component={CurrentPatients} />
      <Stack.Screen name="TodayAdmitted" component={TodayAdmitted} />
      <Stack.Screen name="AllActiveQ15" component={AllActiveQ15} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
      <Stack.Screen name="Q15" component={Q15} />

      {/* Tier-4 */}
      <Stack.Screen name="Overview" component={OverView} />
      <Stack.Screen name="AdmitPatient" component={AdmitPatient} />
      <Stack.Screen name="PatientData" component={PatientData} />
      {/* <Stack.Screen name="TreatmentPlan" component={TreatmentPlan} />
      <Stack.Screen name="Reports" component={Reports} /> */}
      <Stack.Screen name="PatientADT" component={PatientADT} />
      {/* Tier-5 */}
      <Stack.Screen name="Allergy" component={Allergy} />
      <Stack.Screen name="PatientProblem" component={PatientProblem} />
      <Stack.Screen name="PatientVitals" component={PatientVitals} />
      <Stack.Screen name="Immunization" component={Immunization} />
      {/* */}
      <Stack.Screen name="Procedure" component={Procedure} />
      <Stack.Screen name="ImagingProcedure" component={ImagingProcedure} />
      <Stack.Screen name="LabTest" component={LabTest} />
      <Stack.Screen name="Consult" component={Consult} />
      {/* Tier-6 */}
      <Stack.Screen name="AllergyDetails" component={AllergyDetails} />
      <Stack.Screen name="ProblemDetails" component={ProblemDetails} />
      <Stack.Screen
        name="ImmunizationDetails"
        component={ImmunizationDetails}
      />
      <Stack.Screen name="VitalDetails" component={VitalDetails} />
      <Stack.Screen name="AddAllergy" component={AddAllergy} />
      <Stack.Screen name="AddProblem" component={AddProblem} />
      <Stack.Screen name="AddImmunization" component={AddImmunization} />
      <Stack.Screen name="AddVitals" component={AddVitals} />
      <Stack.Screen name="AddProcedure" component={AddTest} />
      <Stack.Screen name="ProcedureDetails" component={ProcedureDetails} />
      <Stack.Screen name="AddTest2" component={AddTest2} />
      <Stack.Screen name="ImagingDetails" component={ImagingDetails} />
      <Stack.Screen name="AddTest3" component={AddTest3} />
      <Stack.Screen name="LabDetails" component={LabDetails} />
      <Stack.Screen name="AddTest4" component={AddTest4} /> 
      <Stack.Screen name="AddAdmit" component={AddAdmit} /> 
      <Stack.Screen name="Available" component={Available} /> 
      <Stack.Screen name="ConsultDetails" component={ConsultDetails} />
      <Stack.Screen name="BedAssignment" component={BedAssignment} /> 
      <Stack.Screen name="AddTransfer" component={AddTransfer} /> 
      <Stack.Screen name="AddDischarge" component={AddDischarge} /> 
      <Stack.Screen name="ADTContainer" component={ADTContainer} /> 
    </Stack.Navigator>
  );
};

export default PatientsStacks;