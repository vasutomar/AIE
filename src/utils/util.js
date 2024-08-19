const buttonClassMappings = {
    pb: 'primary-brown',
    py: 'primary-yellow',
    inpGray: 'input-gray'
}

const bgColorMapping = {
    Shares: {
        title: "A3CEF1",
        body: "274C77"
    }, 
    Celebrates: {
        title: "9DD68F",
        body: "D8FCCF"
    },
    Advice: {
        title: "DBB6C2",
        body: "F0D8E0"   
    }
}

const fontColorMapping = {
    Shares: "white", 
    Celebrates: "black",
    Advice: "black"
}

export const getClassFromType = (type) => {
    return buttonClassMappings[type];
};

export const getbgColorFromType = (type) => {
    return bgColorMapping[type];
}

export const getFontColorFromType = (type) => {
    return fontColorMapping[type];
}