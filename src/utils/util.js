const buttonClassMappings = {
    pb: 'primary-brown',
    py: 'primary-yellow',
    inpGray: 'input-gray'

}

export const getClassFromType = (type) => {
    return buttonClassMappings[type];
};