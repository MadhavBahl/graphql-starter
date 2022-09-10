# Mini LinkedIn GraphQL Project

This is a mini project to teach GraphQL. 

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

```ts
query {
  user(id: "4102") {
    id
    firstName
    lastName
  }
}
```

**2. Get all Users**

```ts
{
  users {
    id
    firstName
    lastName
    description
  }
}
```

## Credits

I heavily used GitHub's copilot to write this code. It's a great tool to write code faster. You can try it out [here](https://copilot.github.com/). Trust me, you'll love it ;)

This project is **heavily inspired** by [@Stephen Grider's](https://github.com/StephenGrider/) GraphQL user project: https://github.com/StephenGrider/GraphQLCasts/tree/master/users - Thanks Stephen for the awesome course!

If you're checking out this repo, you should definitely follow him on GitHub!

