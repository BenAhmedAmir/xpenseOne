import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {Controller} from 'react-hook-form';

import {makeStyles} from '@material-ui/core/styles';
import styles from "../../../template/assets/jss/nextjs-material-dashboard/components/customInputStyle.js";
import classNames from 'classnames';

// @ts-ignore
const useStyles = makeStyles(styles);
export interface SelectTypeProps{
    name: string;
    label: string;
    defaultValue?: string;
    children : any
}
const ReactHookFormSelect = ({
     name,
     label,
     defaultValue,
     children,
     ...props}) => {
    const labelId = `${name}-label`;
    const classes = useStyles();
    return (
        <FormControl {...props} className={classNames(
            props.className,
            classes.formControl
        )}>
            <InputLabel id={labelId} className={classes.labelRoot}>{label}</InputLabel>
            <Controller
                as={
                    <Select labelId={labelId} label={label}>
                        {children}
                    </Select>
                }
                name={name}
                // control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};
export default ReactHookFormSelect;
