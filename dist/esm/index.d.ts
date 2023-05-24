import React from 'react';
interface IOtpInput {
    className?: string;
    containerStyle?: React.CSSProperties | string;
    disabledStyle?: React.CSSProperties | string;
    errorStyle?: React.CSSProperties | string;
    focusStyle?: React.CSSProperties | string;
    inputStyle?: React.CSSProperties | string;
    hasErrored?: boolean;
    isDisabled?: boolean;
    isInputNum?: boolean;
    isInputSecure?: boolean;
    numInputs: number;
    onChange: (otp: string) => void;
    placeholder?: string;
    separator?: React.ReactNode | string;
    shouldAutoFocus?: boolean;
    value?: string;
    'data-testid'?: string;
    'data-cy'?: string;
}
declare const OtpInput: (props: IOtpInput) => import("react/jsx-runtime").JSX.Element;
export { OtpInput };
