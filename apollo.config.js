module.exports = {
    client: {
        includes: ["./src/**/*.tsx"],
        tagName: "gql",        
        service: {
            name: "nuber-eats-backend-master",
            url: "http://localhost:4000/graphql"
        }
    }
}