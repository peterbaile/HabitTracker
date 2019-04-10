import gql from 'graphql-tag';

export const getUserQuery = gql`
query($userId: ID, $email: String, $password: String){
    users(filter:{id:{EQ: $userId}, email:{EQ: $email}, password:{EQ: $password}}){
        id
        email
        password
    }
  }
`

export const addUserMutation = gql`
mutation($email: String, $password: String){
  addUser(filter:{}, update:{set:{email:$email, password:$password}}){
    id
    email
    password
  }
}
`