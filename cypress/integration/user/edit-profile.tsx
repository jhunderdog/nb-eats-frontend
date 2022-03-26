describe("Edit profile", () => {
    const user = cy;
    beforeEach(() => {
        //@ts-ignore
        user.login("producer.vegabond@gmail.com", "123123123");
    })
    it("can go to /edit-profile using the header", () => {        
        user.get('a[href="/edit-profile"]').click();
        user.wait(2000)
        user.title().should("eq", "Edit Profile | Nuber Eats");
    
    });
    it("can change email", () => {
        // @ts-ignore
        user.intercept("POST", "http://localhost:4000/graphql", (req) => {
            if (req.body?.operationName === "editProfile"){
                //@ts-ignore
                req.body?.variables?.input?.email = "producer.vegabond@gmail.com";
            }
        })
        user.visit("/edit-profile")
        user.findByPlaceholderText(/email/i).clear().type("new@daum.net")
        user.findByRole("button").click();
    })
})