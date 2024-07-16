export enum DiabetesRisk {
    NotAtRisk = 0,
    AtRisk = 1,
}

type PredictPatientDiabetesResponse = DiabetesRisk[];

export default PredictPatientDiabetesResponse;
