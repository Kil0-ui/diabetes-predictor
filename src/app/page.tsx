"use client"

import { Button, Field, SpinButton } from "@fluentui/react-components";
import { pageWrapper, verticalStack } from "./styles";

export default function Home() {

    return (
        <div className={`${verticalStack().root} ${pageWrapper().root}`}>
            <Field label="Pregnancies">
                <SpinButton min={0} max={30} />
            </Field>
            <Field label="Glucose Level">
                <SpinButton min={0} max={500} />
            </Field>
            <Field label="BMI (Body Mass Index)">
                <SpinButton precision={1} min={0} max={500} />
            </Field>
            <Field label="Age">
                <SpinButton min={0} max={150} />
            </Field>
            <div>
                <Button appearance="primary">Predict</Button>
            </div>
        </div>
    );
}
