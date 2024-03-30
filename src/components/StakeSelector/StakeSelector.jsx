import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const stakeAmmounts = ["0.001", "0.002", "0.003", "0.004", "0.005"];

const StakeSelector = ({onChange}) => {
    const [selectedValue, setSelectedValue] = useState(stakeAmmounts[0]);
    useEffect(() => {
        onChange(selectedValue);
    }, [onChange, selectedValue])
    return (
        <div>
            {stakeAmmounts.map(stake => (
                <button 
                    className={selectedValue === stake ? "selected" : ""} 
                    key={stake}
                    onClick={() => setSelectedValue(stake)}
                >
                        {stake}
                </button>
            ))}
        </div>
    );
};

StakeSelector.propTypes = {
    onChange: PropTypes.func
}

export default StakeSelector;