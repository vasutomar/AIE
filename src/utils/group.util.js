import text from '../assets/images/spellcheck.png';
import audio from '../assets/images/headset_mic.png';
import video from '../assets/images/play_circle.png';

const groupMapping = {
    'TEXT' : text,
    'AUDIO': audio,
    'VIDEO': video
}

const iconMapping = {
    'TEXT': [
        'remove'
    ],
    'AUDIO': [
        'mute',
        'remove'
    ],
    'VIDEO': [
        'mute',
        'camera-toggle',
        'remove'
    ]
}

export function getGroupImg(type) {
    return groupMapping[type];
}

export function getGroupName(type) {
    switch(type) {
        case 'TEXT': return 'Text';
        case 'AUDIO': return 'Audio';
        case 'VIDEO': return 'Video';
    }
}

export function getIcons(type) {
    return iconMapping[type];
}