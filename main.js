const {app, BrowserWindow, Menu} = require('electron')

// Set environment
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
let aboutWindow
let generateWindow

// For Main Window
function createMainWindow () {
     mainWindow = new BrowserWindow({
        title : 'Class Scheduling System',
        width : 700,
        height : 660,
        icon : './app/css/icons/Logo.png',
        resizable : isDev ? true : false,
    }
    )

    mainWindow.loadFile('index.html')
}
// For FAQs Window
    function createFaqsWindow () {
        aboutWindow = new BrowserWindow({
           title : 'Class Scheduling System FAQs',
           width : 300,
           height : 300,
           icon : './app/css/icons/Logo.png',
           resizable : false,
           movable: true,
       }
       )

       aboutWindow.loadFile('about.html')
}
app.on('ready', () =>{
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    mainWindow.on('ready', () => mainWindow = null)
})

// -----------------------MENU----------------------------

const menu = [
    ...(isMac ? [
        {
            label : app.name,
            submenu : [
                {
                    label : 'FAQs',
                    click : createFaqsWindow,
                }

    ] }] : []),
    {
       role : 'fileMenu',
    },
    ...(!isMac 
        ? [
        {
            label : 'Help',
            submenu : [
                {
                    label : 'FAQs',
                    click : createFaqsWindow, 
                }
            ]
        }
    ]:[]),
    ...(isDev ?[
        {
            label : 'Developer',
            submenu : [
                {role : 'reload' },
                {role : 'forcereload' },
                {type : 'separator' },
                {role : 'toggledevtools' },
            ]
        }
    ] : []),
]

//------------------- Button ------------------------
// ALGO //