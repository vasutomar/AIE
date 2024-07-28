import React from "react";
import { getClassFromType } from "../../utils/util";
import './Button.scss';

function Button(buttonProps) {
    const {
        extraClass,
        buttonType,
        text
    } = buttonProps;

    return (
        <button className={`${extraClass} ${getClassFromType(buttonType)}`}>{text}</button>
    );
}

export default Button;