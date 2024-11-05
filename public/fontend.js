fetch('https://reqres.in/api/users',{

    method:'POST',
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify({

        name:'user 6'
    })
}).then(res => {
    return res.json()
})
.then(data => console.log(data))
    .catch(error => console.log('ERROR'))