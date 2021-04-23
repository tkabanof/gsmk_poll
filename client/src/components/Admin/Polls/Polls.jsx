import {Button, Space, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import PollEdit from "../../Call/NewCall/PollEdit";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllPoll} from "../../../features/polls";

export const Polls = () => {

    const dataPoll = useSelector(state => state.poll.data)
    console.log(dataPoll)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPoll())
        },
        [])

    const columns = [
        {
            title: 'Навзание',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Шаблон',
            dataIndex: 'template',
            key: 'template',
        },
        {
            title: 'Состояние',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Дата создания',
            key: 'dateCraete',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Удалить</a>
                    <a>Скрыть</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'Опрос о прохождении диспансеризации 1',
            state: 'close',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
        },
        {
            key: '2',
            name: 'Опрос о прохождении диспансеризации 2',
            state: 'open',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
        },
        {
            key: '3',
            name: 'Опрос о прохождении диспансеризации 3',
            state: 'open',
            dateCreate: '2021-01-01',
            userCreate: 'Иванов И. И.',
        },
    ]
    console.log(data)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Table columns={columns} dataSource={dataPoll}/>
            <Button onClick={showModal}>Создать новый опрос</Button>

            <Modal title="Новый опрос" visible={isModalVisible}
                   //onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>
                <PollEdit/>
            </Modal>
        </div>
    )
}