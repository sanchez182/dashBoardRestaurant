import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';
import './login.css';
import LoadingButton from '../../components/LoadingButton';
import { useEffect } from 'react';

const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loadingRequest } = useSelector(state => state.requestReducer);

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'sachez.arisan@gmail.com',
        lPassword: '1234'
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Nando',
        rEmail: 'nando@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }
        dispatch(startRegister(rEmail, rPassword1, rName));
    }


    useEffect(() => {
        localStorage.clear()
    })
    return (
        <div className="container login-container">
            <div className="row">

                <div className="col-md-6 login-form-2">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <LoadingButton
                                isLoading={loadingRequest}
                                textButton="Login"
                                type="sumbit"
                                classButton=""
                                handleSubmit={() => { }}
                                icon=""
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen