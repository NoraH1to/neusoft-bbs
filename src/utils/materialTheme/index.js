import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
    palette: {
        primary: {
            contrastText: '#fff',
            dark: 'rgb(17, 82, 147)',
            light: 'rgb(71, 145, 219)',
            main: '#1976d2'
        },
        action: {
            activatedOpacity: 0.12,
            active: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(0, 0, 0, 0.12)',
            focusOpacity: 0.12,
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(0, 0, 0, 0.08)',
            selectedOpacity: 0.08
        },
        background: {
            default: '#fff',
            level1: '#fff',
            level2: '#f5f5f5',
            paper: '#fff'
        },
        common: {
            black: '#000',
            white: '#fff'
        },
        contrastThreshold: 3,
        divider: 'rgba(0, 0, 0, 0.12)',
        error: {
            contrastText: '#fff',
            dark: '#d32f2f',
            light: '#e57373',
            main: '#f44336'
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#d5d5d5',
            A200: '#aaaaaa',
            A400: '#303030',
            A700: '#616161'
        },
        info: {
            contrastText: '#fff',
            dark: '#1976d2',
            light: '#64b5f6',
            main: '#2196f3'
        },
        secondary: {
            contrastText: '#fff',
            dark: 'rgb(154, 0, 54)',
            light: 'rgb(227, 51, 113)',
            main: 'rgb(220, 0, 78)'
        },
        success: {
            contrastText: 'rgba(0, 0, 0, 0.87)',
            dark: '#388e3c',
            light: '#81c784',
            main: '#4caf50'
        },
        text: {
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)'
        },
        type: 'light',
        warning: {
            contrastText: 'rgba(0, 0, 0, 0.87)',
            dark: '#f57c00',
            light: '#ffb74d',
            main: '#ff9800'
        }
    }
})
