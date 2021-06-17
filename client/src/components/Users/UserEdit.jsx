import {Button, Form, Input, Select, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import generator from 'generate-password'
import {RedoOutlined} from "@ant-design/icons";
import {createUser} from "../../features/users";


const UserEdit = (props) => {

    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const newPass = () => {
        return generator.generate({length: 6})
    }
    let [password, setPassword] = useState(newPass())

    const setNewPass = () => {
        setPassword(newPass())
        form.setFieldsValue({
            password: password
        })
    }

    useEffect(() => {

            //dispatch(getAllTemplate())
        },
        [])


    const onFinish = (values) => {

        const newUser = {
            fio: values.fio,
            email: values.email,
            password: values.password,
            role: values.role
        }
        console.log(newUser)

        dispatch(createUser(newUser))
        props.setIsModalVisible(false)

    };

    return (
        <div>
            <Form
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                initialValues={{
                    password: password,
                    role: 'oper'
                }}
                size={'middle'}
                onFinish={onFinish}
            >
                <Form.Item
                    label="ФИО"
                    name="fio"
                    rules={[
                        {
                            required: true,
                            message: 'Введите фио нового пользователя!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="email (login)"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введите email (логин) нового пользователя!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="ПАРОЛЬ"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пароль не может быть пустым!'
                        }
                    ]}
                >
                    <Input suffix={<RedoOutlined onClick = {setNewPass}/>}
                    />

                </Form.Item>

                <Form.Item label="РОЛЬ"
                           name="role"
                           rules={[
                               {
                                   required: true,
                                   message: 'Укажите роль пользователя'
                               }
                           ]}
                >
                    <Select>
                        <Select.Option value="admin">АДМИН</Select.Option>
                        <Select.Option value="oper">ОПЕРАТОР</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}
export default UserEdit