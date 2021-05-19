import {Button, DatePicker, Form, Input, Select, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createNewPoll, getAllPoll} from "../../../features/polls";
import {useEffect} from "react";
import {getAllTemplate} from "../../../features/templates";


const PollEdit = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getAllTemplate())
        },
        [])

    const templates = useSelector(state => state.template.data)

    const onFinish = (values) => {
        console.log(values)

        let file = values.dataSet
        console.log(file)

        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file)}

        const reader = new FileReader();

        reader.readAsDataURL(file);


        const newPoll = {
            description: values.name,
            templateId: values.template_id,
            state: values.state ? 'open' : 'close'
        }


       //dispatch(createNewPoll(newPoll.description, newPoll.templateId, newPoll.state))
        props.setIsModalVisible(false)
    };

    const handleChange = (e) => {

        let file = e.target.files[0]
        console.log(file.size)

        const reader = new FileReader();

        reader.readAsText(file);

        reader.onerror = () => {
            console.log('Ошибка чтения файла')
        }

        reader.onload = () => {
            console.log(reader.result)
        }

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
                    name="template_id">
                    <Select>
                        {templates.map((t)=><Select.Option value={t.id}>{t.description}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Показать"
                           name="state">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Данные"
                    name="dataSet">
                    <input type="file" accept=".csv"
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