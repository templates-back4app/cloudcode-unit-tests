const { startParseServer, stopParseServer, dropDB } = require('parse-server-test-runner');

describe('registerUser', () => {
    beforeAll((done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL= 120000;
        const appId = "APLICATION_ID"; //Replace with app Id
        const masterKey = "MASTER_KEY"; //Replace with master key
        const javascriptKey = "JAVASCRIPT_KEY"; //Replace with javascript key

        startParseServer({ appId, javascriptKey, masterKey })
        .then(() => {
            Parse.initialize(appId, javascriptKey, masterKey);
            Parse.serverURL = 'https://parseapi.back4app.com/';
        })
        .then(done).catch(done.fail);
    }, 300 * 60 * 2);

    afterAll((done) => {
        stopParseServer()
        .then(done).catch(done.fail);
    });

    beforeEach((done) => {
        dropDB()
        .then(done).catch(done.fail);
    });

    it('calling CC', async (done) => {
        let user = {
            email: 'test@test.com',
            password: '123',
            username: 'test',
            position: 'test',
            department: 'test',
            shift: 'test'
        }

        let result = await Parse.Cloud.run("registerUser", user);
        console.log(`\n\n${JSON.stringify(result)}\n\n`);
        done();
    });



    it('should work', (done) => {
        const q = new Parse.Query('_User')
        q.limit(5)
        .find({ useMasterKey: true })
        .then(console.log)
        .then(done).catch(done.fail);
    });
});