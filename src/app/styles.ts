import { makeStyles } from "@fluentui/react-components";

export const verticalStack = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: 'auto',
        height: 'auto',
        boxSizing: 'border-box',
        '> *': {
            textOverflow: 'ellipsis',
        },
        '> :not(:first-child)': {
            marginTop: '10px',
        },
        '> *:not(.ms-StackItem)': {
            flexShrink: 1,
        },
    },
})

export const horizontalStack = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
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

export const pageWrapper = makeStyles({
    root: {
        padding: "10px"
    }
})
