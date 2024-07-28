const buttonClassMappings = {
    pb: 'primary-brown'
}

export const getClassFromType = (type) => {
    return buttonClassMappings[type];
};