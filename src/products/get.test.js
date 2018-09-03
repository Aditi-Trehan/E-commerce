const functions = require ('./Products');

test('fetch data ',()=>{
    expect.assertions(1);
    functions.getAllProducts().then(data=>{
        expect(data.status).toEqual('OK');
    });
});
