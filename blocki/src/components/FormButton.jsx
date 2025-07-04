    import React from 'react';
    import PropTypes from 'prop-types';

const FormButton = ({
    children,
    variant = 'primary',
    type = 'submit',
    style = {},
    className = '',
    ...rest
    }) => {

const commonButtonClasses =
        'w-full py-3 px-6 font-medium transition-all duration-200 transform ' +
        'font-roboto text-sm tracking-wide';

const variantClassMap = {
    primary: 'bg-primary hover:bg-[#4059e8] text-white shadow-lg hover:shadow-xl',
        blue: 'bg-primary hover:bg-[#4059e8] text-white shadow-lg hover:shadow-xl',
        green: 'bg-green hover:bg-[#3bc63a] text-white shadow-lg hover:shadow-xl',
        red: 'bg-red hover:bg-[#ff4444] text-white shadow-lg hover:shadow-xl',
        orange: 'bg-[#F38735] hover:bg-[#e07829] text-white shadow-lg hover:shadow-xl',
        dark: 'bg-[#0D122C] hover:bg-[#1a1f3a] border border-primary text-white shadow-lg hover:shadow-xl',
    'canvas-login': 'bg-white text-[#E72429] border border-white hover:shadow-lg hover:-translate-y-px',
        ghost: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
    };

const chosenVariantClasses =
        variantClassMap[variant] || variantClassMap.blue;

return (
        <button
        type={type}
        className={`${commonButtonClasses} ${chosenVariantClasses} ${className}`}
        style={style}
        {...rest}
        >
        {children}
        </button>
    );
    };

FormButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
    'primary',
    'blue',
    'green',
    'red',
    'orange',
    'dark',
    'canvas-login',
    'ghost',
    ]),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    style: PropTypes.object,
    className: PropTypes.string,
    };

FormButton.defaultProps = {
    variant: 'primary',
    type: 'submit',
    style: {},
    className: '',
    };

export default FormButton;
