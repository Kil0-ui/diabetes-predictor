import { Button, Card, CardFooter, CardHeader, CardPreview, createMotionComponent, Link, makeStyles, MessageBar, MessageBarActions, MessageBarBody, MessageBarIntent, MessageBarTitle, Title3, tokens } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { DiabetesRisk } from "../api/models/predict-patient-diabetes-response.model";

const useClasses = makeStyles({
    messageBar: {
        flexGrow: 1
    }
})

const DropIn = createMotionComponent({
    keyframes: [
        { transform: "translateY(-5%)", opacity: 0 },
        { transform: "translateY(0%)", opacity: 1 },
    ],
    duration: 400,
    iterations: 1,
});

const messageBarState = {
    [DiabetesRisk.AtRisk]: {
        intent: "warning",
        title: "At Risk",
        message: "This patient is likely to be at risk for diabetes.",
    },
    [DiabetesRisk.NotAtRisk]: {
        intent: "success",
        title: "Not at Risk",
        message: "This patient is not likely to be at risk for diabetes.",
    }
}

export default function ResultsCard({ results, clearPredictionResults }: { results: DiabetesRisk | undefined, clearPredictionResults: () => void }) {
    const { messageBar } = useClasses();

    if (results === undefined) return null

    const { intent, title, message } = messageBarState[results]

    return (
        <DropIn>
            <MessageBar className={messageBar} intent={intent as MessageBarIntent}>
                <MessageBarBody className={messageBar}>
                    <MessageBarTitle>{title}</MessageBarTitle>
                    {message}
                </MessageBarBody>
                <MessageBarActions>
                    <Button onClick={clearPredictionResults} icon={<DismissRegular />}>Close</Button>
                </MessageBarActions>
            </MessageBar>
        </DropIn>
    )
}
