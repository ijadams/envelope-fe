/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { get, map, replace, set } from 'lodash';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/InputsIndex';

// Utils
import auth from '../../utils/auth';
import request from '../../utils/request';

import form from './forms.json';
import './styles.css';

import {navService} from "../../services";

class AuthPage extends React.Component {
    state = { value: {}, errors: [], didCheckErrors: false };

    componentDidMount() {
        this.generateForm(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.authType !== this.props.match.params.authType) {
            this.generateForm(nextProps);
        }
    }

    getRequestURL = () => {
        let requestURL;

        switch (this.props.match.params.authType) {
            case 'login':
                requestURL = process.env.REACT_APP_BACKEND_URL + '/auth/local';
                break;
            case 'register':
                requestURL = process.env.REACT_APP_BACKEND_URL + '/auth/local/register';
                break;
            case 'reset-password':
                requestURL = process.env.REACT_APP_BACKEND_URL + '/auth/reset-password';
                break;
            case 'forgot-password':
                requestURL = process.env.REACT_APP_BACKEND_URL + 'auth/forgot-password';
                break;
            default:
        }

        return requestURL;
    };

    generateForm = props => {
        const params = props.location.search
            ? replace(props.location.search, '?code=', '')
            : props.match.params.id;
        this.setForm(props.match.params.authType, params);
    };

    handleChange = ({ target }) =>
        this.setState({
            value: { ...this.state.value, [target.name]: target.value },
        });

    handleSubmit = e => {
        e.preventDefault();
        const body = this.state.value;
        const requestURL = this.getRequestURL();

        // This line is required for the callback url to redirect your user to app
        if (this.props.match.params.authType === 'forgot-password') {
            set(body, 'url', process.env.REACT_APP_BACKEND_URL + '/auth/reset-password');
        }

        request(requestURL, { method: 'POST', body: this.state.value })
            .then(response => {
                auth.setToken(response.jwt, body.rememberMe);
                auth.setUserInfo(response.user, body.rememberMe);
                navService.setUser(response.user);
                this.redirectUser();
            })
            .catch(err => {
                if (err) {
                    const errors = [
                        { name: 'identifier', errors: [err.response.payload.message] },
                    ];
                    this.setState({ didCheckErrors: !this.state.didCheckErrors, errors });
                }
            });
    };

    redirectUser = () => {
        this.props.history.push('/');
    };

    /**
     * Function that allows to set the value to be modified
     * @param {String} formType the auth view type ex: login
     * @param {String} email    Optionnal
     */
    setForm = (formType, email) => {
        const value = get(form, ['data', formType], {});

        if (formType === 'reset-password') {
            set(value, 'code', email);
        }
        this.setState({ value });
    };

    /**
     * Check the URL's params to render the appropriate links
     * @return {Element} Returns navigation links
     */
    renderLink = () => {
        if (this.props.match.params.authType === 'login') {
            return (
                <div>
                    <Link to="/auth/forgot-password">Forgot Password</Link>
                    &nbsp;or&nbsp;
                    <Link to="/auth/register">register</Link>
                </div>
            );
        }

        return (
            <div>
                <Link to="/auth/login">Ready to signin</Link>
            </div>
        );
    };

    render() {
        const divStyle =
            this.props.match.params.authType === 'register'
                ? { marginTop: '3.2rem' }
                : { marginTop: '.9rem' };
        const inputs = get(form, ['views', this.props.match.params.authType], []);

        return (
            <div className="authPage">
                <div className="wrapper">
                    <div className="headerDescription">
                        <img alt="Logo" src="https://ijadams.s3.amazonaws.com/4forty/logo_horz.png"/>
                    </div>
                    <div className="formContainer" style={divStyle}>
                        <div className="container-fluid">
                            <form onSubmit={this.handleSubmit}>
                                <fieldset className="uk-fieldset">
                                    <legend className="uk-legend">Sign In</legend>
                                    <div className="uk-grid-row-large" style={{ textAlign: 'start' }}>
                                        {map(inputs, (input, key) => (
                                            <Input
                                                autoFocus={key === 0}
                                                key={get(input, 'name')}
                                                label={get(input, 'label')}
                                                name={get(input, 'name')}
                                                onChange={this.handleChange}
                                                placeholder={get(input, 'placeholder')}
                                                type={get(input, 'type')}
                                                validations={{ required: true }}
                                                value={get(this.state.value, get(input, 'name'), '')}
                                            />
                                        ))}
                                        <p className="uk-text-danger">{this.state.errors.length ? 'Invalid username and/or password please try again.' : ''}</p>
                                        <div className="">
                                            <Button
                                                label="Submit"
                                                style={{ width: '100%' }}
                                                primary
                                                className="uk-button uk-button-primary"
                                                type="submit"
                                            />
                                        </div>
                                    </div>

                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div className="linkContainer">{this.renderLink()}</div>
                </div>
            </div>
        );
    }
}

AuthPage.defaultProps = {};
AuthPage.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default AuthPage;
