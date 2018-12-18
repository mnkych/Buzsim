export  const  UserProvider = {
    user : undefined,
    setUserOnLog : (newUser) => {
        this.user = newUser
    },
    getUserOnLog : () => {
        return this.user
    }
}
export  const  UserSelectedProvider = {
    setUserSelected : (selected) => {
        sessionStorage.setItem('userSelected',JSON.stringify(selected))
    },
    getUserSelected : () => {
        return JSON.parse(sessionStorage.getItem('userSelected'))
    }
}