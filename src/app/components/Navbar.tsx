import { makeStyles, Button, Title2, Divider, Tooltip } from "@fluentui/react-components"
import { WeatherSunnyRegular, WeatherMoonRegular } from "@fluentui/react-icons"
import Image from "next/image"
import { ThemeMode } from "../LayoutWrapper"

const useNavbarStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        padding: '20px'
    }
})

const useRightNavBarStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: 'center'
    }
})

const useLogoNavBarStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: 'center',
        '> :not(:first-child)': {
            marginLeft: '10px',
        },

    }
})

type NavbarProps = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {

    const navBarStyles = useNavbarStyles();
    const navBarRightStyles = useRightNavBarStyles();
    const logoNavBarStyles = useLogoNavBarStyles();

    return (
        <div>
            <div className={navBarStyles.root}>
                <div className={logoNavBarStyles.root}>
                    <Image
                        src="/logo.png"
                        alt="Vercel Logo"
                        width={35}
                        height={35}
                        priority
                    />
                    <Title2>Diabetes Predictor Application</Title2>
                </div>
                <div className={navBarRightStyles.root}>
                    <Tooltip relationship="label" content={theme === 'light' ? "Toggle Dark Theme" : "Toggle Light Theme"}>
                        <Button
                            onClick={() => {
                                if (theme === "light") {
                                    setTheme("dark")
                                } else {
                                    setTheme("light")
                                }
                            }}
                            icon={theme === "dark" ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
                        />
                    </Tooltip>
                </div>
            </div>
            <Divider />
        </div>
    )
}
