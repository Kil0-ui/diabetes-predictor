import { makeStyles } from "@fluentui/react-components";

export const horizontalStack = makeStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 'auto',
            height: 'auto',
            boxSizing: 'border-box',
            '> *': {
                textOverflow: 'ellipsis',
            },
            '> :not(:first-child)': {
                marginLeft: '10px',
            },
            '> *:not(.ms-StackItem)': {
                flexShrink: 1,
            },
        },
    })
