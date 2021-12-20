const axios=require('axios');
const {addOrUpdateCharacter}=require('./dynamo');
const seedData=async() =>{
    const url='http://hp-api.herokuapp.com/api/characters';
    try {
       const{data:charcters}= await axios.get(url);
        const charcterPromises=charcters.map((charcter,i) => addOrUpdateCharacter({...charcter,id: i+''}));
        await Promise.all(charcterPromises);
        
    } catch (error) {
        console.error(err);
        console.log('AHHH');
    }

};

seedData();