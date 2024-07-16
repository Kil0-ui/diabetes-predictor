"use client"

import { Button, Field, makeStyles, SpinButton, Spinner } from "@fluentui/react-components";
import { horizontalStack, pageWrapper, verticalStack } from "./styles";
import { useMemo, useState } from "react";
import IPredictPatientDiabetesRequestModel from "./api/models/predict-patient-diabetes.model";
import LoadingStatus from "./api/LoadingStatus";
import PredictPatientDiabetesResponse from "./api/models/predict-patient-diabetes-response.model";
import { predictDiabetesForPatient } from "./api/machine-learning.api";
import { DeleteRegular } from "@fluentui/react-icons";
import ResultsCard from "./components/ResultsCard";

const useActionButtonStyles = makeStyles({
    root: {
        justifyContent: "space-between"
    }
})

type ValidationItem = {
    fieldName: string;
    value: number;
}

function useRequiredValidation({ submit, validationItems }: { submit: () => unknown, validationItems: ValidationItem[] }) {
    const [errorFields, setErrorFields] = useState<Set<string>>(new Set());

    function onSubmit() {
        //if valid
        cleanupErrors();
        if (!getValidationErrors().length)
            submit();
    }

    function getValidationErrors() {
        const errorItems = validationItems.filter(item => {
            return !item.value
        }).map(item => {
            return item.fieldName;
        });
        setErrorFields(new Set(errorItems))
        return errorItems
    }

    function cleanupErrors() {
        setErrorFields(new Set())
    }

    return { errorFields, onSubmit, cleanupErrors }
}

export default function Home() {
    const [patientData, setPatientData] = useState<IPredictPatientDiabetesRequestModel>({
        pregnancies: 0,
        glucose: 0,
        age: 0,
        bmi: 0
    });

    const _horizontalStack = horizontalStack();
    const actionButtonStyles = useActionButtonStyles();

    const [loadingPrediction, setLoadingPrediction] = useState<LoadingStatus>(LoadingStatus.Idle);
    const [predictionResponse, setPredictionResponse] = useState<PredictPatientDiabetesResponse>();
    const isLoadingPrediction = loadingPrediction === LoadingStatus.Pending;

    const { onSubmit, errorFields, cleanupErrors } = useRequiredValidation({
        submit: _getPrediction, validationItems: [
            {
                fieldName: "Glucose Level",
                value: patientData.glucose ?? 0
            },
            {
                fieldName: "BMI (Body Mass Index)",
                value: patientData.bmi ?? 0
            },
            {
                fieldName: "Age",
                value: patientData.age ?? 0
            }
        ]
    })

    function _setPatientData(path: keyof IPredictPatientDiabetesRequestModel, value: number | string | null | undefined) {
        const newValue = typeof value === "string" ? isNaN(+value) ? patientData[path] : +value : value;

        setPatientData({ ...patientData, [path]: newValue });
    }

    function _clearPredictionResponse() {
        setPredictionResponse(undefined);
    }

    function _clearAllPatientData() {
        setPatientData({});
        cleanupErrors();
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
                    onChange={(_, { value, displayValue }) => {
                        _setPatientData("pregnancies", value ?? displayValue)
                    }}
                    value={patientData?.pregnancies ?? 0}
                    min={0}
                    max={30}
                />
            </Field>
            <Field label="Glucose Level" validationMessage={errorFields.has("Glucose Level") ? "Glucose Level is a required field." : undefined} required>
                <SpinButton
                    onChange={(_, { value, displayValue }) => {
                        _setPatientData("glucose", value ?? displayValue)
                    }}
                    value={patientData?.glucose ?? 0}
                    min={0}
                    max={500}
                />
            </Field>
            <Field label="BMI (Body Mass Index)" validationMessage={errorFields.has("BMI (Body Mass Index)") ? "BMI (Body Mass Index) is a required field." : undefined} required>
                <SpinButton
                    onChange={(_, { value, displayValue }) => {
                        _setPatientData("bmi", value ?? displayValue)
                    }}
                    value={patientData?.bmi ?? 0}
                    precision={1}
                    min={0}
                    max={500}
                />
            </Field>
            <Field label="Age" validationMessage={errorFields.has("Age") ? "Age is a required field." : undefined} required>
                <SpinButton
                    onChange={(_, { value, displayValue }) => {
                        _setPatientData("age", value ?? displayValue)
                    }}
                    value={patientData?.age ?? 0}
                    min={0}
                    max={150}
                    required
                />
            </Field>
            <div className={`${_horizontalStack.root} ${actionButtonStyles.root}`}>
                <div className={_horizontalStack.root}>
                    <Button disabled={isLoadingPrediction} onClick={onSubmit} appearance="primary">Predict</Button>
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
            {predictionResponse?.length && <ResultsCard clearPredictionResults={_clearPredictionResponse} results={predictionResponse[0]} />}
        </div>
    );
}
