
"use client"
import { Button } from "@fluentui/react-components";
import { pageWrapper, verticalStack } from "./styles";

export default function Home() {

    return (
        <div className={`${verticalStack().root} ${pageWrapper().root}`}>
            <Button>test</Button>
            <Button>test</Button>
        </div>
    );
}
