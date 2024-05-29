import { Canister, query, text } from 'azle';


export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),

    createRant: query([text], text, (content) => {
        return "dwasd"
    }),

    testPing: query([text], text, () => {
        return "test ping"
    })
})
