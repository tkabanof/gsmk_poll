import s from './Login.module.css'
import {message, Form, Input, Button} from 'antd'
import {useDispatch, useSelector} from "react-redux"
import {setAuthData} from "../../features/auth";
import {authAPI} from "../Api/Api";
import {Redirect, useHistory} from "react-router-dom";
import {ADMIN_ROUTE} from "../utils/consts";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const errorMessage = useSelector(state => state.auth.errorMessage)

    const onFinish = async (values) => {
        let {email, password} = values

        await authAPI.login(email, password)
            .then((response) => {

                dispatch(setAuthData(response.data))
                history.push(ADMIN_ROUTE)

            })
            .catch((error) => {
                if (error.response) {
                    message.error(error.response.data.message);
                }
            })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={s.login}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {errorMessage}
        </div>
    )
}
export default Login