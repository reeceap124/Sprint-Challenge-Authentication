const request = require('supertest');
const server = require('./server');


describe('server', function(){
    test("runs server", function (){
        expect(true).toBe(true);
    })

    describe('GET /api/jokes', function (){
        test('should return 200 OK', function(){
            return request(server).get('/api/jokes')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoidGVzdDMiLCJpYXQiOjE1ODA0OTIxNDcsImV4cCI6MTU4MDU3ODU0N30.2iLAx75l0hRhYl0fb4yEcpDOq0J5HNqmFTupneaHdGY')
            .set('accept', 'application/json')
            .then(res => {
                expect(res.status).toBe(200);
            })
        })

        test('should return 401 user error', function(){
            return request(server).get('/api/jokes').then(res=>{
                expect(res.status).toBe(401)
            })
        })
    })

    describe('POST /api/auth/register', function (){
        test('should return 500 error', function(){
            return request(server).post('/api/auth/register').catch(res=>{
                expect(res.status).toBe(500)
            })
        })
        test('should return 500 error', function(){
            return request(server).post('/api/auth/register')
                .send({
                    username: 'test',
                    password: 'testpass'
                })
                .then(res=>{
                    expect(res.status).toBe(500)
                })
        })
    })

    describe('POST /api/auth/login', function (){
        test('should return 200 OK', function (){
            return request(server).post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .then(res=>{
                    expect(res.status).toBe(200)
                })
        })
        test('should return 401 error', function (){
            return request(server).post('/api/auth/login')
                .send({
                    username: 'test',
                    password: 'nottestpassword'
                })
                .then(res=>{
                    expect(res.status).toBe(401)
                })
        })
    })
})