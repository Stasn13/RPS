import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {weapons} from "../../helpers/constants";

const WeaponsSelector = ({onChange}) => {
    const [selectedValue, setSelectedValue] = useState(weapons[0]);

    useEffect(() => {
        onChange(selectedValue);
    }, [onChange, selectedValue])
    return (
        <fieldset>
            <legend>Choose your weapon:</legend>
            {weapons.map((weapon) => (
                    <Fragment key={weapon.value}>
                        <input 
                            type="radio" 
                            name={weapon.name} 
                            id={weapon.name} 
                            checked={weapon.value === selectedValue.value} 
                            onChange={() => setSelectedValue(weapon)}
                        />
                        <label htmlFor={weapon.name}>{weapon.name}</label>
                    </Fragment>
            ))}
        </fieldset>
    );
};

WeaponsSelector.propTypes = {
    onChange: PropTypes.func
}

export default WeaponsSelector;