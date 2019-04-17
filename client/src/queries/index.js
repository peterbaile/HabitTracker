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
      goalPeriod
      target
      message
      records{
        date
        times
      }
    }
  }
}
`

export const addHabitMutation = gql`
mutation($userId: ID, $name: String, $status: String, $goalPeriod: String, $target: Int, $message: String){
  addHabit(filter:{userId:{EQ:$userId}}, update:{set:{habits:[{name:$name, status: $status, goalPeriod: $goalPeriod, target: $target, message: $message}]}}){
    habits{
      name
      status
      goalPeriod
      target
      message
      records{
        date
        times
      }
    }
  }
}
`

export const updateHabitMutation = gql`
mutation ($userId: ID, $oldName: String, $name: String, $status: String, $goalPeriod: String, $target: Int, $message: String, $date: DateTime, $times: Int){
  updateHabit(filter: {userId: {EQ: $userId}, habits: {name: {EQ: $oldName}}}, update: {set: {habits: [{name:$name, status:$status, goalPeriod: $goalPeriod, target: $target, message: $message, records: {date: $date, times: $times}}]}}) {
    habits {
      name
      status
      goalPeriod
      target
      message
      records{
        date
        times
      }
    }
  }
}
`

export const removeHabitMutation = gql`
mutation($userId: ID, $name: String) {
  removeHabit(filter: {userId: {EQ: $userId}, habits: {name: {EQ: $name}}}, update:{}) {
    userId
    habits {
      name
      status
      goalPeriod
      target
      message
      records{
        date
        times
      }
    }
  }
}
`

