export const tizenCloseApp = () => {
    window.tizen.application.getCurrentApplication().exit();
}