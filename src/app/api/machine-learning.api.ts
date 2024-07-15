import PredictPatientDiabetesResponse from "./models/predict-patient-diabetes-response.model";
import IPredictPatientDiabetesRequestModel from "./models/predict-patient-diabetes.model";

const requestHeaders = new Headers({ "Content-Type": "application/json" });

// Replace this with the primary/secondary key, AMLToken, or Microsoft Entra ID token for the endpoint
const apiKey = "Zgaw0ZZROKWgbP3oN3ezShPn2Ub8lm3f";

requestHeaders.append("Authorization", "Bearer " + apiKey)

// This header will force the request to go to a specific deployment.
// Remove this line to have the request observe the endpoint traffic rules
requestHeaders.append("azureml-model-deployment", "diabetes-risk-predictor-1");

const url = "https://diabetes-predictor.eastus2.inference.ml.azure.com/score";

export async function predictDiabetesForPatient(patientPredictData: IPredictPatientDiabetesRequestModel): Promise<PredictPatientDiabetesResponse | undefined> {
    const requestBody = JSON.stringify({ data: [[patientPredictData.pregnancies, patientPredictData.glucose, patientPredictData.bmi, patientPredictData.age]] });

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: requestHeaders
        })

        return response.json();
    } catch (e) {
        console.log(e)
    }
}

