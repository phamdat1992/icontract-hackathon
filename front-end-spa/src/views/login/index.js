
import React, { Fragment, useState } from 'react';
import Loader from '../../components/loader';
import Store from 'store';
import { isValidEmail, fetchWithUrl } from '../../utils';
import { Redirect } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [resp, setResp] = useState();
    const [valid, setValid] = useState({
        isInValid: false,
        message: ''
    });

    async function onBtnLoginClick() {
        if (!email.trim()) {
            setValid({
                isInValid: true,
                message: 'Vui lòng nhập email'
            });
            return;
        }

        if (!isValidEmail(email)) {
            setValid({
                isInValid: true,
                message: 'Email không hợp lệ'
            });
            return;
        }

        setLoading(true);

        // const data = await fetchWithUrl('http://localhost:1234/user/get_user?email=dat.pham@zalora.com');
        const data = await (new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id_icontract_user: "1",
                    email: "dat.pham@zalora.com"
                });
            }, 1000);
        }));

        if (data) {
            setResp(data);
            Store.set('email', { value: 'vinhmai079@gmail.com' });
        }

        setLoading(false);
    }

    function onEmailChange(evt) {
        const { value } = evt.currentTarget;
        setEmail(value);
    }

    if (resp) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <div className="form-login">
                <div className="form-frame form-login-inner">
                    <h1>iContract</h1>
                    <h5>Chào mừng đến với team iContract</h5>

                    <div className="form-group row align-items-center">
                        <div className="col-sm-2">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="col-sm">
                            <input
                                onChange={onEmailChange}
                                value={email}
                                type="text"
                                className={`form-control ${valid.isInValid ? 'is-invalid' : ''}`}
                                id="email" />
                            {valid.isInValid && <div className="invalid-feedback">{valid.message}</div>}
                        </div>
                    </div>

                    <a onClick={onBtnLoginClick} className="btn btn-yellow mt-2 mb-2" role="button" aria-disabled="true">
                        Login
                        <i className='icontract-arrow-right'></i>
                    </a>
                </div>
            </div>
            {isLoading && <Loader isFull={true} />}
        </Fragment>
    );
}

export default Login;