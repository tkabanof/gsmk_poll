import {Button, Form, Input, Select, Switch} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTemplate} from "../../../features/templates";
import {createNewPoll} from "../../../features/polls";


const PollEdit = (props) => {
    function csvToArray(str, delimiter = ",") {
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });

        return arr;
    }

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

        dispatch(createNewPoll(newPoll.description, newPoll.templateId, newPoll.state, newPoll.dataSet))
        props.setIsModalVisible(false)
    };


    const handleChange = (e) => {
        try {
            let file = e.target.files[0]
            console.log(file.type)

            const reader = new FileReader();
            reader.onprogress = (event) => {
                console.log(event.loaded + '/' + event.total)
            }
            reader.onerror = () => {
                console.log('Ошибка чтения csv')
            }
            reader.onload = () => {
                const text = reader.result
                const data = csvToArray(text)
                console.log(data)
                dataset = data
            }
            reader.readAsText(file)
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