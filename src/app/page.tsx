
"use client"
import { Button } from "@fluentui/react-components";
import { horizontalStack } from "./styles";

export default function Home() {
    return (
        <div className={horizontalStack().root}>
            <Button>test</Button>
            <Button>test</Button>
        </div>
    );
}
