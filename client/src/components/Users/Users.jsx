import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../features/users";

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)

    useEffect(()=> {
        dispatch(getAllUsers())
    }, [])
    const list = (users.map((u)=><a>{u.id}</a> ))
    return (
        <div>
            {list}
        </div>
    )
}

export default Users