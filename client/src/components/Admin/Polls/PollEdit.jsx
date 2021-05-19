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

        // return the array
        return arr;
    }

    const handleChange = (e) => {

        let file = e.target.files[0]
        console.log(file.name)

        const reader = new FileReader();
        reader.onprogress = (event) => {
            console.log(event.loaded + '/' + event.total)
        }
        reader.onerror = ()=>{
            console.log('Ошибка чтения csv')
        }
        reader.onload = () => {
            const text = reader.result
            const data = csvToArray(text)
            console.log(data)
        }
        reader.readAsText(file)


        // const reader = new FileReader();
        // reader.readAsText(file);
        // reader.onerror = () => {
        //     console.log('Ошибка чтения файла')
        // }
        // reader.onload = () => {
        //     console.log(reader.result)
        // }

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