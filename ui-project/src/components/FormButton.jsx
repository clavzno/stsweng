    import React from 'react';
    import PropTypes from 'prop-types';

const FormButton = ({
    children,
    variant = 'blue',
    type = 'submit',
    style = {},
    className = '',
    ...rest
    }) => {

const commonButtonClasses =
        'w-full py-3 px-6 text-white font-medium transition-all duration-200 transform ' +
        'hover:scale-[1.02] active:scale-[0.98] font-roboto text-sm tracking-wide';

const variantClassMap = {
        blue: 'bg-primary hover:bg-[#4059e8] shadow-lg hover:shadow-xl',
        green: 'bg-green hover:bg-[#3bc63a] shadow-lg hover:shadow-xl',
        red: 'bg-red hover:bg-[#ff4444] shadow-lg hover:shadow-xl',
        orange: 'bg-[#F38735] hover:bg-[#e07829] shadow-lg hover:shadow-xl',
        dark:
        'bg-[#0D122C] hover:bg-[#1a1f3a] border border-primary shadow-lg hover:shadow-xl',
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
    variant: PropTypes.oneOf(['blue', 'green', 'red', 'orange', 'dark']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    style: PropTypes.object,
    className: PropTypes.string,
    };

FormButton.defaultProps = {
    variant: 'blue',
    type: 'submit',
    style: {},
    className: '',
    };

export default FormButton;
