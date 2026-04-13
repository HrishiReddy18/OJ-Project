to handle async function we need to create
ex: child process exec is async, it will return something as output

1. using callbacks

function execte(callback){
exec( , (err, stdout,stderr)=>{

        return err ,===> callback(err)
        return stdout,  ===> callback(stdout)
        return stderr  ===> callback(stderr)
    })

}

execute((err,res)=>{
if(err){
//err
}
else{
//res
}
})

2.  using promise
    function execute(){
    const promise = new Promise((resolve, reject)=>{
    exec( , (err, stdout,stderr)=>{

                return err ,===> reject(err)
                return stdout,  ===> resolve(stdout)
                return stderr  ===> reject(stderr)
            })

        })

        return promise;

    }

execute().then(res=>{resolved}, err=>{rejected})

3.using async await
function execute(){
const promise = new Promise((resolve, reject)=>{
exec( , (err, stdout,stderr)=>{

                return err ,===> reject(err)
                return stdout,  ===> resolve(stdout)
                return stderr  ===> reject(stderr)
            })

        })

        return promise;

    }

(async ()=>{
const res = await execute();
})();
