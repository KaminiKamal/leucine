var Promise = require('promise');

const fetchData = {    
    getJson: function(url){
        return new Promise(function(resolve, reject){
            fetch(url)
            .then(function(res){
                resolve(res.json())
            })
            .catch(function(err){
                reject(err);
            })
        })
    }
}

module.exports = fetchData;