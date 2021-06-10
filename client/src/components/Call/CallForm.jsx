import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, useLocation, useHistory
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {delayClient, getNewClient, getQuestionAnswer, refuseClient, setAnswers, setData} from "../../features/client";
import {useEffect, useState} from "react";
import {Button, Descriptions, Form, Select, Space, Tag} from "antd";
import {Option} from "antd/es/mentions";
import {CALL_ROUTE, CALL_SUCCESS_ROUTE} from "../utils/consts";

const CallForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const history = useHistory()

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const pollId = query.get('pollId')

    let data = useSelector(state => state.client.data.client)
    let qa = useSelector(state => state.client.data.questions)
    let counter  = useSelector(state => state.client.data.count)

    const redirect = () => {
        history.push(CALL_SUCCESS_ROUTE)
    }

    // useEffect(() => {
    //     if (data.id === 1) {
    //         dispatch(getNewClient(query, redirect))
    //
    //     }
    // }, [data])

    useEffect(() => {
            dispatch(getNewClient(query, redirect))
    }, [counter])

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
    }

    const onRefuse = () => {
        const client_data = {
            clientId: data.id
        }
        dispatch(refuseClient(client_data))
        form.resetFields();
    }
    const onDelay = () => {
        const client_data = {
            clientId: data.id
        }
        dispatch(delayClient(client_data))
        form.resetFields();
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
                        <Space>
                        <Button type="primary"
                                style={{background: "green"}}
                                htmlType="submit">
                            Отправить ответ
                        </Button>
                            <Button type="dashed"
                                    style={{background: "yellow"}}
                                    onClick={()=> {onDelay()}}
                            >
                                Позвонить попозже
                            </Button>
                        <Button type="primary"
                                style={{background: "red"}}
                                onClick={()=> {onRefuse()}}
                                >
                            Не звонить ему больше
                        </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default CallForm