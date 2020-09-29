users = [];

const addUser = ({id, username, room}) => {

    // Clean up data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate data


    if (!username || !room) {

        return {

            error: "Username and room required"
        }
    }

    // Check for existing users
    
    const existingUser = users.find((user) => {

        return user.room === room && user.username === username
    })

    // Validate username

    if (existingUser) {

        return {

            error: "User already exists!"
        }
    }

    // Store User

    const user = {id, username, room};
    users.push(user);
    return { user };

}

const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {

        return users.splice(index,1)[0];

    }

}

addUser({

    id: 22,
    username: "Bertil",
    room: "coolroom"
})

addUser({

    id: 23,
    username: "Rudolf",
    room: "coolroom"
})


const getUser = (id) => {

    const user = users.find((user) => user.id === id)
    return user;

}

const getUsersInRoom = (room) => {

    return users.filter((user) => user.room === room);
    

}


module.exports = {

    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}