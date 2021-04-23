import {Button, DatePicker, Form, Input, Select, Switch} from "antd";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createNewPoll} from "../../../features/polls";


const PollEdit = (props) => {

    const dispacth = useDispatch()

    const onFinish = (values) => {
        const newPoll = {
            description: values.name,
            template: values.template,
            state: values.state ? 'open' : 'close'
        }

        dispacth(createNewPoll(newPoll.description, newPoll.template, newPoll.state))
        props.setIsModalVisible(false)
    };

    const handleChange = () => {
        console.log('file picked')
    }
    return (
        <div>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'default',
                }}
                size={'middle'}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Название"
                    name="name">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Шаблон опроса"
                    name="template">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
{/*                <Form.Item label="Дата опроса"
                           name="dateCreate">
                    <DatePicker/>
                </Form.Item>*/}
                <Form.Item label="Показать"
                           name="state">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Данные"
                    name="dataSet">
                    <input type="file" accept="text/plain, text/x-csv"
                           onChange={handleChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}
export default PollEdit