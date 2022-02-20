const getBrowserPushSettings = (permission) => {
    console.log({ permission });
    let permissionState = permission;
    let isPushAllowed = false;
    let isSafari = false;
    if ('Notification' in window) {
        isPushAllowed = true;
        if ('safari' in window && 'pushNotification' in window.safari) {
            const permissionData = window.safari.pushNotification.permission(
                'web.app.simpplr'
            );
            isSafari = true;
            permissionState = permissionData.permission;
            console.log('Inside getBrowserPush Notification', permissionState);
        } else {
            permissionState = Notification.permission;
            console.log('Inside getBrowserPush Notification else', permissionState);
        }
    }

    return {
        isPushAllowed,
        isSafari,
        permissionState
    };
};

export default getBrowserPushSettings;