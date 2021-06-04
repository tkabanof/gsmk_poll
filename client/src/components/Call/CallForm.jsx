import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, useLocation
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNewClient, getQuestionAnswer, setAnswers} from "../../features/client";
import {useEffect, useState} from "react";
import {Button, Descriptions, Form, Select, Tag} from "antd";
import {Option} from "antd/es/mentions";

const CallForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const pollId = query.get('pollId')

    let data = useSelector(state => state.client.data.client)
    let qa = useSelector(state => state.client.data.questions)


    useEffect(() => {
        if (data.id === 1) {
            dispatch(getNewClient(query))
        }
    }, [data])

    useEffect(() => {
        dispatch(getQuestionAnswer(pollId))
    }, [])


    let questions = (
        <div>
            {qa.map((q) => {
                let answers = q.answers
                answers = answers.map((a) => <Option value={a.id}>{a.text}</Option>)
                return (<Form.Item
                    label={q.text}
                    name={q.id}
                    rules={[{required: true}]}
                >
                    <Select
                        placeholder="Вырери ответ на вопрос"
                        allowClear
                    >
                        {answers}
                    </Select>
                </Form.Item>)
            })}
        </div>
    )
    const onFinish = (values) => {
        const client_data = {
            clientId: data.id,
            answers: values
        }
        dispatch(setAnswers(client_data))
        form.resetFields();
        console.log(client_data);
    }


    return (
        <div>
            <Descriptions
                title="Информация о человеке"
            >
                <Descriptions.Item label="ФИО">
                    <Tag color="blue">
                        {data.surname + ' ' + data.name1 + ' ' + data.name2}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                    <Tag color="blue">
                        {data.phone}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Дата рождения">{data.birthday}</Descriptions.Item>
                <Descriptions.Item label="MO">{data.mo}</Descriptions.Item>
            </Descriptions>

            <div>
                <Form onFinish={onFinish}
                      form={form}>
                    {questions}
                    <Form.Item>
                        <Button type="primary"
                                style={{background: "green"}}
                                htmlType="submit">
                            Отправить ответ
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default CallForm