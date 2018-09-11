import { signInAsync } from './crawler/auth'
import { requestAsync } from './crawler/server'
import pw from './env/pw'

signInAsync(pw.account, pw.password)
    .then(() => {
        return requestAsync({ name: 'PatientList', doctorID: '3972' });
    })
    .then((passResult)=>{
        console.log(passResult.structured)
    })