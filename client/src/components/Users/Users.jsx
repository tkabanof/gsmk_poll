import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../features/users";
import {Table} from "antd";

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    const paginator = useSelector(state => state.user.paginator)

    const defaultPaginator = {
        current: 1,
        pageSize: 10,
    }


    const pagination = {
        total: paginator.total,
        current: paginator.current,
        pageSize: paginator.pageSize
    }

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(getAllUsers(pagination))
        console.log(pagination)
    };
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


    let list = (
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={users}
            pagination={pagination}
            //loading={loading}
            onChange={handleTableChange}
        />
    )


    useEffect(()=> {
        dispatch(getAllUsers(defaultPaginator))
    }, [])

    useEffect(()=> {
        console.log(paginator)
        list = (
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={users}
                pagination={pagination}
                //loading={loading}
                onChange={handleTableChange}
            />
        )

    },[pagination])







    return (
        <div>
            {list}
        </div>
    )
}

export default Users