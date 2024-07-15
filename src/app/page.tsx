"use client"

import { Button, Field, makeStyles, SpinButton, Spinner } from "@fluentui/react-components";
import { horizontalStack, pageWrapper, verticalStack } from "./styles";
import { useState } from "react";
import IPredictPatientDiabetesRequestModel from "./api/models/predict-patient-diabetes.model";
import LoadingStatus from "./api/LoadingStatus";
import PredictPatientDiabetesResponse from "./api/models/predict-patient-diabetes-response.model";
import { predictDiabetesForPatient } from "./api/machine-learning.api";
import { DeleteRegular } from "@fluentui/react-icons";

const useActionButtonStyles = makeStyles({
    root: {
        justifyContent: "space-between"
    }
})

export default function Home() {
    const [patientData, setPatientData] = useState<IPredictPatientDiabetesRequestModel>({});

    const _horizontalStack = horizontalStack();
    const actionButtonStyles = useActionButtonStyles();

    const [loadingPrediction, setLoadingPrediction] = useState<LoadingStatus>(LoadingStatus.Idle);
    const [predictionResponse, setPredictionResponse] = useState<PredictPatientDiabetesResponse>();
    const isLoadingPrediction = loadingPrediction === LoadingStatus.Pending;

    function _setPatientData(path: keyof IPredictPatientDiabetesRequestModel, value: number | null | undefined) {
        setPatientData({ ...patientData, [path]: value });
    }

    function _clearAllPatientData() {
        setPatientData({});
    }

    async function _getPrediction() {
        try {
            setLoadingPrediction(LoadingStatus.Pending)

            const response = await predictDiabetesForPatient(patientData);

            setLoadingPrediction(LoadingStatus.Completed)

            if (response)
                setPredictionResponse(response);
        } catch (e) {
            setLoadingPrediction(LoadingStatus.Failed);
        }
    }

    return (
        <div className={`${verticalStack().root} ${pageWrapper().root}`}>
            <Field label="Pregnancies">
                <SpinButton
                    onChange={(_, { value }) => {
                        _setPatientData("pregnancies", value)
                    }}
                    value={patientData?.pregnancies ?? 0}
                    min={0}
                    max={30}
                />
            </Field>
            <Field label="Glucose Level">
                <SpinButton
                    onChange={(_, { value }) => {
                        _setPatientData("glucose", value)
                    }}
                    value={patientData?.glucose ?? 0}
                    min={0}
                    max={500}
                />
            </Field>
            <Field label="BMI (Body Mass Index)">
                <SpinButton
                    onChange={(_, { value }) => {
                        _setPatientData("bmi", value)
                    }}
                    value={patientData?.bmi ?? 0}
                    precision={1}
                    min={0}
                    max={500}
                />
            </Field>
            <Field label="Age">
                <SpinButton
                    onChange={(_, { value }) => {
                        _setPatientData("age", value)
                    }}
                    value={patientData?.age ?? 0}
                    min={0}
                    max={150}
                />
            </Field>
            <div className={`${_horizontalStack.root} ${actionButtonStyles.root}`}>
                <div className={_horizontalStack.root}>
                    <Button disabled={isLoadingPrediction} onClick={_getPrediction} appearance="primary">Predict</Button>
                    {isLoadingPrediction && (
                        <Spinner size="small" labelPosition="after" label="Loading Results..." />
                    )}
                </div>
                <div>
                    <Button
                        icon={<DeleteRegular />}
                        disabled={isLoadingPrediction}
                        onClick={_clearAllPatientData}
                    >
                        Clear All Information
                    </Button>
                </div>
            </div>
            {predictionResponse}
        </div>
    );
}
