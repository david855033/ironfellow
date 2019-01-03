new Promise((resolve) => {
    console.log(1)
    setTimeout(() => {
        resolve()
    }, 1000);
}).then(() => {
    return new Promise((resolve) => {
        console.log(2)
        setTimeout(() => {
            resolve()
        }, 1000);
    })
})