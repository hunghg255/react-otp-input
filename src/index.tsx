import React, { useEffect, useMemo, useRef, useState } from 'react';

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const isStyleObject = (obj: any) => typeof obj === 'object';

interface ISingleOtpInput {
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
  numInputs?: number;
  onChange: any;
  onKeyDown: any;
  onInput: any;
  onPaste: any;
  onFocus: any;
  onBlur: any;
  placeholder?: string;
  separator?: React.ReactNode | string;
  shouldAutoFocus?: boolean;
  value?: string;
  'data-testid'?: string;
  'data-cy'?: string;
  index: number;
  isLastChild: boolean;
  focus: boolean;
}

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

const getClasses = (...classes: any) => classes.filter((c: any) => !isStyleObject(c) && c !== false).join(' ');

const SingleOtpInput = (props: ISingleOtpInput) => {
  const {
    placeholder,
    separator,
    isLastChild,
    inputStyle,
    focus,
    isDisabled,
    hasErrored,
    errorStyle,
    focusStyle,
    disabledStyle,
    shouldAutoFocus,
    isInputNum,
    index,
    value,
    className,
    isInputSecure,
    ...rest
  } = props;
  const input = useRef<HTMLInputElement>(null);

  // Focus on first render
  // Only when shouldAutoFocus is true
  useEffect(() => {
    const { current: inputEl } = input;

    if (inputEl && focus && shouldAutoFocus) {
      inputEl.focus();
    }
  }, []);

  useEffect(() => {
    const { current: inputEl } = input;

    if (focus && inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  }, [focus]);

  const typeInput = useMemo(() => {
    if (isInputSecure) {
      return 'password';
    }

    if (isInputNum) {
      return 'tel';
    }

    return 'text';
  }, [isInputSecure, isInputNum]);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${isInputNum ? 'Digit' : 'Character'} ${
          index + 1
        }`}
        autoComplete="off"
        style={Object.assign(
          { width: '1em', textAlign: 'center' },
          isStyleObject(inputStyle) && inputStyle,
          focus && isStyleObject(focusStyle) && focusStyle,
          isDisabled && isStyleObject(disabledStyle) && disabledStyle,
          hasErrored && isStyleObject(errorStyle) && errorStyle
        )}
        placeholder={placeholder}
        className={getClasses(inputStyle, focus && focusStyle, isDisabled && disabledStyle, hasErrored && errorStyle)}
        type={typeInput}
        ref={input}
        disabled={isDisabled}
        value={value ? value : ''}
        {...rest}
      />
      {!isLastChild && <>{separator}</>}
    </div>
  );
};

const OtpInput = (props: IOtpInput) => {
  const {
    numInputs = 4,
    onChange = (otp: string) => console.log(otp),
    isDisabled = false,
    shouldAutoFocus = false,
    value = '',
    isInputSecure = false,
    placeholder,
    isInputNum,
    containerStyle,
    inputStyle,
    focusStyle,
    separator,
    disabledStyle,
    hasErrored,
    errorStyle,
    className,
  } = props;
  const dataCy = props['data-cy'];
  const dataTestId = props['data-testid'];

  const [activeInput, setActiveInput] = useState(0);

  const valueOtp = useMemo(() => {
    return value ? value.toString().split('') : [];
  }, [value]);

  const valuePlaceholder = useMemo(() => {
    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error('Length of the placeholder should be equal to the number of inputs.');
        return '';
      }
    }

    return '';
  }, [placeholder]);

  // Helper to return OTP from input
  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join('');

    onChange(otpValue);
  };

  const isInputValueValid = (value: string) => {
    const isTypeValid = isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string';

    return isTypeValid && value.trim().length === 1;
  };

  // Focus on input by index
  const focusInput = (input: number) => {
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);

    setActiveInput(activeInput);
  };

  // Focus on next input
  const focusNextInput = () => {
    focusInput(activeInput + 1);
  };

  // Focus on previous input
  const focusPrevInput = () => {
    focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  const changeCodeAtFocus = (value: string) => {
    valueOtp[activeInput] = value[0];

    handleOtpChange(valueOtp);
  };

  // Handle pasted OTP
  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    let nextActiveInput = activeInput;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        valueOtp[pos] = pastedData.shift() as string;
        nextActiveInput++;
      }
    }

    setActiveInput(nextActiveInput);
    focusInput(nextActiveInput);
    handleOtpChange(valueOtp);
  };

  const handleOnChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Fix Fill value
    if (idx === 0 && value.length === numInputs) {
      handleOtpChange(value.split(''));
      return;
    }

    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow, space
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      changeCodeAtFocus('');
      focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      focusNextInput();
    } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
      e.preventDefault();
    }
  };

  // The content may not have changed, but some input took place hence change the focus
  const handleOnInput = (e: any) => {
    if (isInputValueValid(e.target.value)) {
      focusNextInput();
    } else {
      // This is a workaround for dealing with keyCode "229 Unidentified" on Android.

      if (!isInputNum) {
        const { nativeEvent } = e;

        if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
          e.preventDefault();
          changeCodeAtFocus('');
          focusPrevInput();
        }
      }
    }
  };

  const handleOnFocus = (i: number) => (e: React.FocusEvent<HTMLInputElement>) => {
    setActiveInput(i);
    e.target.select();
  };

  const onBlur = () => setActiveInput(-1);

  return (
    <div
      style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
      className={!isStyleObject(containerStyle) ? (containerStyle as string) : ''}
    >
      {new Array(numInputs).fill(null).map((_, i) => {
        return (
          <SingleOtpInput
            key={i}
            placeholder={valuePlaceholder[i] ?? ''}
            index={i}
            focus={activeInput === i}
            value={valueOtp[i]}
            onChange={handleOnChange(i)}
            onKeyDown={handleOnKeyDown}
            onInput={handleOnInput}
            onPaste={handleOnPaste}
            onFocus={handleOnFocus(i)}
            onBlur={onBlur}
            separator={separator}
            inputStyle={inputStyle}
            focusStyle={focusStyle}
            isLastChild={i === numInputs - 1}
            isDisabled={isDisabled}
            disabledStyle={disabledStyle}
            hasErrored={hasErrored}
            errorStyle={errorStyle}
            shouldAutoFocus={shouldAutoFocus}
            isInputNum={isInputNum}
            isInputSecure={isInputSecure}
            className={className}
            data-cy={dataCy && `${dataCy}-${i}`}
            data-testid={dataTestId && `${dataTestId}-${i}`}
          />
        );
      })}
    </div>
  );
};

export { OtpInput };
