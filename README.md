# Introduction to GraphQL

1. Let's take some REST!
2. Let's create a mini-LinkedIn model?
3. But wait, we shouldn't always REST!
4. Well then, what's the solution?
5. Let's take a look at our Graphical tool (ah well, that's GraphiQL)
6. Let's create our own server first
7. It's time to write some queries
8. GETing that was cool, but what about POSTing that?
9. Let's write some mutations
10. But wait, we can't ship the GraphiQL to users, right?
11. Can I try hitting a GQL query with Postman REST request :0
12. Doing that would become a mess in the frontend, so we have these clients.

## Problem with RESTing too much

1. Under-fetching (If you need more data than what the single endpoint supports, you'll have to call multiple APIs)
2. Over-fetching (If you need less data than what the endpoint is giving, you're just wasting your users data pack)

## Check out the slides

Download the slides [here](http://madhavbahl.tech/graphql-starter/slides.pptx)

## How to run

- Clone this repo: `git clone https://github.com/MadhavBahl/graphql-starter`
- `cd graphql-starter/miniLinkedin`
- `npm install`
- If you're developing, run `npm run dev` to start the server and enable hot reload
- If you just want to start the server, run `npm start`
- Run the JSON-Server using `npm run serve-json`
- Go to `localhost:4000/graphql` to see the GraphQL Playground

## Real data schemas used in this project - 

**1. User**

```js
{
    id: Id,
    firstName: String,
    lastName: String,
    email: String,
    description: String,
    location: Id<Location>,
    posts: List[Id<Posts>],
    company: Id<Company>,
    position: Id<Position>,
    connections: List[Id<User>]
}
```

**2. Company**

```js
{
    id: Id,
    name: String,
    description: String,
    location: Id<Location>,
    employees: List[Id<User>]
}
```

**3. Post**

```js
{
    id: Id,
    author: Id<User>,
    content: String,
    likedBy: List[Id<User>],
    comments: List[Id<Post>],
    isComment: Boolean,
    parentPost: Id<Post>
}
```

**4. Position**

```js
{
    id: Id,
    name: String
}
```

**5. Location**

```js
{
    id: Id,
    name: String
}
```

## Samples GraphQL Queries

**1. Get User by id**

```gql
query {
  user(id: "4102") {
    id
    firstName
    lastName
    description
    email
    location{
      name
    }
  }
}
```

**2. Get all Users**

```gql
{
  users {
    id
    firstName
    lastName
    description
  }
}
```

**3. Get Location By ID**

```gql
{
  location (id: "1") {
    id
    name
  }
}
```

**4. Get all Users at a Location**

```gql
{
  location (id: "1") {
    name
    users{
      id
      firstName
      lastName
      description
      email
      location {
        name
      }
    }
  }
}
```

**5. Find company information from id**

```gql
{
  company(id: "210"){
    id
    name
    description
    location {
      name
    }
    users {
      id
      firstName
      lastName
      description
      email
    }
  }
}
```

**6. Get all companies**

```gql
{
  companies {
    id
    name
    location {
      name
    }
    description
  }
}
```

**7. Get Post by ID without comments**

```gql
{
  post(id: "12") {
    id
    author {
      firstName
      lastName
    }
    content
    likedBy {
      firstName
      lastName
    }
  }
}
```

**8. Get Post by ID with comments**

```gql
{
  post(id: "12") {
    id
    author {
      firstName
      lastName
    }
    content
    likedBy {
      firstName
      lastName
    }
    comments {
      id
      author {
        firstName
        lastName
      }
      isComment
      likedBy{
        firstName
        lastName
      }
    }
  }
}
```

**9. Get all Posts**

```gql
{
  posts{
    id
    content
    author {
      firstName
      lastName
    }
    comments{
      content
      author {
        firstName
        lastName
      }
    }
    likedBy {
      firstName
      lastName
    }
  }
}
```

**10. Get Position by ID**

```gql
{
  position (id: "2") {
    title
    employees {
      firstName
      lastName
    }
  }
}
```

**11. Get all positions**

```gql
{
  positions {
    id
    title
    employees{
      firstName
      lastName
      description
      email
    }
  }
}
```

**12. Get complete information about any user**

```gql
{
  user (id: "4102") {
    id
    firstName
    lastName
    email
    description
    position{
      title
    }
    location {
      name
    }
    company {
      name
    }
    posts{
      id
      content
      likedBy{
        firstName
        lastName
      }
    }
    connections{
      firstName
      lastName
      email
      description
      location{
        name
      }
      company {
        name
      }
    }
  }
}
```

**13. Fetching multiple Users at the same time**

```gql
{
	user1: user(id: "4102") {
    firstName
    lastName
    description
    position {
      title
    }
  }
  user2: user(id: "4103") {
    firstName
    lastName
    description
    position {
      title
    }
  }
  
}
```

**14. Fetching multiple users with code re-use**

```gql
fragment userFields on User{
  firstName
  lastName
  description
  position {
    title
  }
}

{
	user1: user(id: "4102") {
    ...userFields
  }
  user2: user(id: "4103") {
    ...userFields
  }
}
```

## Mutations

**1. Create a new User**

```gql
mutation {
  addUser(
    firstName: "Jimmy",
    lastName: "Carter",
    email: "JimmyCarter@minilinkedin.com",
    description: "I love developing softwares"
    locationId: "1"
  ) {
    id
    firstName
    lastName
    location {
      id
      name
    }
  }
}
```

**2. Edit an existing User**

```gql
mutation {
  modifyUser (id: "8xJRV_D", firstName: "James") {
    firstName
    lastName
    email
    description
  }
}
```

**3. Delete a User**

```gql
mutation {
  deleteUser (id: "xWVUlsB") {
    firstName
    lastName
  }
}
```

**4. Add a Company**

```gql
mutation {
	addCompany (
    name: "Company ABC",
    description: "We deal with fuels",
    locationId: "1"
  ) {
  	id
    name
    description
    location {
      name
    }
  }
}
```

**5. Modify a Company**

```gql
mutation {
  modifyCompany (
    id: "fKtixV8"
    name: "Company1"
  ) {
    id
    name
    description
    location {
      name
    }
  }
}
```

**6. Delete a Company**

```gql
mutation {
  deleteCompany(id: "fKtixV8") {
    id
  }
}
```

**7. Add a Location**

```gql
mutation {
  addLocation (name: "Pune, India") {
    id
    name
  }
}
```

**8. Modify a Location**

```gql
mutation {
  modifyLocation (id: "v2b20i4", name: "Mumbai, India") {
    id
    name
  }
}
```

**9. Delete a Location**

```gql
mutation {
  deleteLocation (id: "v2b20i4") {
    id
  }
}
```

**10. Add a Position**

```gql
mutation{
  addPosition (title: "Senior Program Manager") {
    id
    title
  }
}
```

**11. Modify a Position**

```gql
mutation{
  modifyPosition (id: "tBymKr2", title: "Program Manager 2") {
    id
    title
  }
}
```

**13. Delete a Position**

```gql
mutation{
  deletePosition (id: "tBymKr2") {
    id
    title
  }
}
```

**14. Add a post**

```gql
mutation {
  addPost(
    author: "4102",
    content: "This is the most amazing post ever",
    isComment: false
  ) {
  	id
    author {
      firstName
      lastName
    }
    content
    isComment
  }
}
```

**15. Add a comment**

```gql
mutation {
  addPost(
    author: "4103",
    content: "Loved it bro!",
    isComment: true
    parentPost: "14"
  ) {
  	id
    author {
      firstName
      lastName
    }
    content
    isComment
    parentPost {
      author {
        firstName
        lastName
      }
      content
      isComment
    }
  }
}
```

## Reference links and Credits

I heavily used GitHub's copilot to write this code. It's a great tool to write code faster. You can try it out [here](https://copilot.github.com/). Trust me, you'll love it ;)

This project is **heavily inspired** by [@Stephen Grider's](https://github.com/StephenGrider/) GraphQL user project: https://github.com/StephenGrider/GraphQLCasts/tree/master/users - Thanks Stephen for the awesome course!

If you're checking out this repo, you should definitely follow him on GitHub!

Few more places where I got some inspiration from:

1. https://www.youtube.com/watch?v=ZQL7tL2S0oQ
2. https://www.youtube.com/watch?v=eIQh02xuVw4
3. https://www.youtube.com/watch?v=-2bbLuW8lmk
