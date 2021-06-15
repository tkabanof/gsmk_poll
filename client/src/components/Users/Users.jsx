import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../features/users";
import {Table} from "antd";

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    useEffect(()=> {
        dispatch(getAllUsers())
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            //render: name => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            title: 'ФИО',
            dataIndex: 'fio',
            // filters: [
            //     { text: 'Male', value: 'male' },
            //     { text: 'Female', value: 'female' },
            // ],
            width: '20%',
        },
        {
            title: 'РОЛЬ',
            dataIndex: 'role',
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={users}
                //pagination={pagination}
                //loading={loading}
                //onChange={this.handleTableChange}
            />
        </div>
    )
}

export default Users