import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Scanner from '../compiler/scanner';
import Parser from '../compiler/parser';
import { sendCodes } from '../actions/index';

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '1vh',
        width: '96%',
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 5px 20px #999',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
                borderRadius: 10,
                color: '#888',
            },
            '&:hover fieldset': {
                borderColor: '#efefef',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3F51B5',
            },
        },
    },
    btn: {
        marginTop: '30px',
        marginLeft: '1%',
        width: '12%'
    }
};

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#3F51B5',
        '&:hover': {
            backgroundColor: '#3F56Be',
        },
    },
}))(Button);

const CodePane = (props) => {
    //const classes = useStyles();
    const { classes, sendCodes } = props;
    const [value, setValue] = React.useState('Controlled');

    const handleChange = event => {
        setValue(event.target.value);
        console.log(event.target.value)
    };

    const handleCompile = event => {
        const code = value;
        console.log("clicked")
        sendCodes(code);
       // let scanner = new Scanner(code);
        //scanner.printTokens();
        let parser = new Parser(code);
        parser.run();
    }

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-multiline-static"
                label="Coding Pane"
                placeholder="Please input your codes here."
                multiline
                rows="18"
                //defaultValue="Please input your codes here."
                onChange={handleChange}
                className={classes.textField}
                variant="outlined"
            />
            <ColorButton variant="outlined" className={classes.btn} onClick={handleCompile}>Compile</ColorButton>
        </div>

    );
}

CodePane.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

const stateMapToProps = (state) => {
    return {}
};
const dispatchMapToProps = dispatch => ({
    sendCodes: (codes) => dispatch(sendCodes(codes))
});

export default connect(stateMapToProps, dispatchMapToProps)(withStyles(styles)(CodePane));