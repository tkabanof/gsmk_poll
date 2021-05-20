import {Button, Form, Input, Select, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTemplate} from "../../../features/templates";
import {createNewPoll} from "../../../features/polls";
import {checkAndPrepareRequiredFields, csvToArray} from "./pollEditor";


const PollEdit = (props) => {

    let dataset = null

    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getAllTemplate())
        },
        [])

    const templates = useSelector(state => state.template.data)

    const onFinish = (values) => {

        const newPoll = {
            description: values.name,
            templateId: values.template_id,
            state: values.state ? 'open' : 'close',
            dataSet: dataset
        }

        console.log(newPoll)

        //dispatch(createNewPoll(newPoll.description, newPoll.templateId, newPoll.state, newPoll.dataSet))
        props.setIsModalVisible(false)
    };


    const handleChange = (e) => {
        try {
            let file = e.target.files[0]
            console.log(file.type)

            const reader = new FileReader();
            reader.onprogress = (event) => {
                //console.log(event.loaded + '/' + event.total)
            }
            reader.onerror = () => {
                console.log('Ошибка чтения csv')
            }
            reader.onload = () => {
                const text = reader.result
                let data = csvToArray(text)
                console.log(data)
                data = checkAndPrepareRequiredFields(data)

                if (data) {
                    console.log(data)
                    dataset = data
                }else {
                    alert('Ошибка! Проверь поля')
                }

            }
            reader.readAsText(file, 'CP1251')
        } catch (e) {
            console.log(e)
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
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Нужно ввести название опроса!'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Шаблон опроса"
                    name="template_id"
                    rules={[
                        {
                            required: true,
                            message: 'Нужно указать шаблон опроса!'
                        }
                    ]}>
                    <Select>
                        {templates.map((t) => <Select.Option value={t.id}>{t.description}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Показать"
                           name="state">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Данные"
                           name="dataSet"
                           rules={[
                               {required: true,
                                   message: 'Выберете фаил с данными для опроса!'}
                           ]}>
                    <input type="file" accept=".csv"
                           onChange={handleChange}/>
                    <a>Кодировка CP1251 разделитель ';'</a>
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