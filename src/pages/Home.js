import React, { useEffect } from "react";

function Home() {
    const userObj = [
        {
            id: '',
            name: '',
            email: '',
            username: '',
        },
    ];
    const [user, setUser] = React.useState(userObj);
    const [userList, setUserList] = React.useState([]);
    const [edit, setEdit] = React.useState(false)
    const [editObj, setEditObj] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState()

    useEffect(() => {
        if (userList.length === 0) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    setUserList(res)
                })
        }
        console.log(userList);
    }, [userList])

    const handleInput = event => {
        if (edit) {
            setEditObj({ ...editObj, [event.target.name]: event.target.value })
        } else {
            console.log('set to User');
            setUser({ ...user, [event.target.name]: event.target.value })
        }
    }

    const addData = () => {
        if (edit) {
            let temp = [...userList]
            temp[selectedIndex] = editObj
            console.log(temp);
            setUserList(temp)
            document.getElementById('form').reset()
        } else {
            console.log('22222');
            userObj.id = user.id
            userObj.name = user.name
            userObj.email = user.email
            userObj.username = user.username
            user.length = user.length + 1
            setUserList([...userList, user])
            document.getElementById("form").reset()
        }
    }

    const editUser = (user, index) => {
        console.log(user, index);
        setEditObj(user)
        setSelectedIndex(index)
        setEdit(true)
        document.getElementById("form").reset()
    }

    const deleteUser = (index) => {
        console.log(index);
        const newArray = [...userList]
        newArray.splice(index, 1)
        setUserList([...newArray])
    }

    return (
        <div className="min-h-screen bg-blue-200">

            <div className='h-full w-6/12 shadow-3xl  border-4 border-red-500 ml-96 mt-5 bg-pink-200'>
                <h1 className='text-3xl text-center font-serif pt-4 font-bold'>CRUD Operation(Employee Detail)</h1>
                <form id="form">

                    <input type="text" placeholder='ID' className='h-10 w-7/12 ml-40  border-double border-4 border-sky-500 mt-5 pl-2 font-normal shadow-2xl ' name="id" onChange={handleInput} value={edit ? (editObj.id ? editObj.id : "") : (user.id ? user.id : "")} /><br />

                    <input type="text" placeholder='Name' className='h-10 w-7/12 ml-40  border-double border-4 border-sky-500 mt-5 pl-2 font-normal shadow-2xl' name="name" onChange={handleInput} value={edit ? (editObj.name ? editObj.name : "") : (user.name ? user.name : "")} />

                    <input type="text" placeholder='Email' className='h-10 w-7/12 ml-40  border-double border-4 border-sky-500 mt-5 pl-2 font-normal shadow-2xl' name="email" onChange={handleInput} value={edit ? (editObj.email ? editObj.email : "") : (user.email ? user.email : "")} />

                    <input type="text" placeholder='Username' className='h-10 w-7/12 ml-40 border-double border-4 border-sky-500 mt-5 pl-2 font-normal shadow-2xl' name="username" onChange={handleInput} value={edit ? (editObj.username ? editObj.username : "") : (user.username ? user.username : "")} />

                    <button type="button" className='h-10 w-28 m-6 ml-80  text-center  bg-blue-500 font-serif font-bold font-3xl text-stone-100 shadow-2xl' onClick={addData}>Add</button>

                </form>
            </div>

            <UserList userList={userList} editUser={editUser} deleteUser={deleteUser} />
        </div>
    )
}

function UserList({ userList, editUser, deleteUser }) {
    return (
        <div>
            <h1 className='my-10 text-center font-serif font-bold text-3xl'>Show Table(Employee Detail)</h1>
            <div className='ml-96'>
                <table className='border-separate border-spacing-4'>
                    <thead>
                        <tr>
                            <th className='text-lg bg-white border-double border-4 border-sky-500'>Id</th>
                            <th className='text-lg border-double border-4 border-sky-500 bg-white'>Name</th>
                            <th className='text-lg border-double border-4 border-sky-500 bg-white'>Email</th>
                            <th className='text-lg border-double border-4 border-sky-500 bg-white'>Username</th>
                            <th className='text-lg border-double border-4 border-sky-500 bg-white'>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map((user, index) => (
                                <tr key={index}>
                                    <td className='border-separate border-spacing-4 text-center border-double border-4 border-sky-500 bg-white'>{user.id}</td>
                                    <td className='border-separate border-spacing-4  text-center bg-white border-double border-4 border-sky-500 '>{user.name}</td>
                                    <td className='border-separate border-spacing-4 border-double border-4 border-sky-500 text-center bg-white'>{user.email}</td>
                                    <td className='border-separate border-spacing-4 border-double border-4 border-sky-500 text-center bg-white'>{user.username}</td>
                                    <button type="button" className='border-separate border-spacing-4 border-double border-4 border-sky-500  bg-blue-900 h-10 w-9 text-yellow-50' onClick={() => editUser(user, index)}>Edit</button>
                                    <button type="button" className='border-separate border-spacing-4 border-double border-4 border-sky-500  bg-red-900 h-10 text-yellow-50' onClick={() => deleteUser(index)}>Delete</button>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;