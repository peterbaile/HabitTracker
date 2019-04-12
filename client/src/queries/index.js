import gql from 'graphql-tag';

export const getUserQuery = gql`
query($userId: ID, $email: String, $password: String){
    users(filter:{id:{EQ: $userId}, email:{EQ: $email}, password:{EQ: $password}}){
        id
        email
        username
        password
    }
  }
`

export const addUserMutation = gql`
mutation($email: String, $password: String, $username: String){
  addUser(filter:{}, update:{set:{email:$email, password:$password, username: $username}}){
    id
    username
    email
    password
  }
}
`

export const updateUserMutation = gql`
mutation($userId: ID, $email: String, $password: String, $username: String) {
  updateUser(filter: {id: {EQ: $userId}}, update: {set: {email: $email, password:$password, username: $username}}) {
    id
    username
    email
    password
  }
}
`

export const getHabitsQuery = gql`
query($userId: ID){
  habits(filter:{userId:{EQ: $userId}}){
    habits{
      name
      status
      records{
        date
        times
      }
    }
  }
}
`

export const addHabitMutation = gql`
mutation($userId: ID, $habitName: String, $status: String){
  addHabit(filter:{userId:{EQ:$userId}}, update:{set:{habits:[{name:$habitName, status: $status}]}}){
    habits{
      name
      status
      records{
        date
        times
      }
    }
  }
}
`

