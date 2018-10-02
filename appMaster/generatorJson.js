const faker = require('faker');
module.exports = (obj)=>{
    for(let i=0; i<faker.random.number(100); i++) {
        obj[faker.commerce.department()] = faker.random.number(5000);
    }
    return JSON.stringify(obj);
}