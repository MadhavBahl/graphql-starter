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

## Reference links and Credits

I heavily used GitHub's copilot to write this code. It's a great tool to write code faster. You can try it out [here](https://copilot.github.com/). Trust me, you'll love it ;)

This project is **heavily inspired** by [@Stephen Grider's](https://github.com/StephenGrider/) GraphQL user project: https://github.com/StephenGrider/GraphQLCasts/tree/master/users - Thanks Stephen for the awesome course!

If you're checking out this repo, you should definitely follow him on GitHub!

Few more places where I got some inspiration from:

1. https://www.youtube.com/watch?v=ZQL7tL2S0oQ
2. https://www.youtube.com/watch?v=eIQh02xuVw4
3. https://www.youtube.com/watch?v=-2bbLuW8lmk
