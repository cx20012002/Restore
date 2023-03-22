import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

function RadioButtonGroup({options, onChange, selectedValue}: Props) {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({value, label}) => (
                    <FormControlLabel value={value} control={<Radio/>} label={label} key={value}/>
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup;