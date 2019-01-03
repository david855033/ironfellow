import { signInAsync } from './crawler/auth'
import { requestAsync } from './crawler/server'
import _ from 'lodash'
import pw from './env/pw'
import * as fs from 'fs';


let list = fs.readFileSync('D:\\hislist2.csv', 'utf8').split('\n')
let hisIDs = []
_.forEach(list, x => { x && hisIDs.push(x.split(',')[4].replace('-', '')) })

let resultBank = []


// hisIDs = hisIDs.slice(0, 5)
signInAsync(pw.account, pw.password)
    .then(() => {
        var reduced = hisIDs.reduce((promise, currendHisID) => {
            return promise
                .then(() => {
                    return getID(currendHisID)
                }).then(() => {
                    console.log(currendHisID + ' done')
                })
        }, Promise.resolve())
        return reduced
    }).then(() => {
        console.log(resultBank)
        let output = ""
        _.forEach(resultBank, x => {
            output += x.hisID + "\t"
            output += ((x.values[0] || {}).value || "") + "\t"
            output += ((x.values[1] || {}).value || "") + "\t"
            output += ((x.values[2] || {}).value || "") + "\t"
            output += ((x.values[3] || {}).value || "") + "\t"
            output += ((x.values[4] || {}).value || "") + "\t"
            output += ((x.values[0] || {}).datetime || "") + "\t"
            output += ((x.values[1] || {}).datetime || "") + "\t"
            output += ((x.values[2] || {}).datetime || "") + "\t"
            output += ((x.values[3] || {}).datetime || "") + "\t"
            output += ((x.values[4] || {}).datetime || "") + "\n"
        })
        fs.writeFileSync('D:\\output.txt', output)
    })


let getID = function (hisID) {
    return new Promise((resolve) => {
        let passResult = { structured: {} }
        return requestAsync({ queryName: 'PreSelect', hisID: hisID }, passResult)
            .then((passResult) => {
                return requestAsync({ queryName: 'VitalSign', hisID: hisID, caseNO: 'all', field: 'TMP' }, passResult)
            }).then((passResult) => {
                let values = passResult.structured.vitalSign.temperature.slice()
                values.sort((a, b) => { return new Date(a.datetime) - new Date(b.datetime) })
                values = values.slice(0, 5)
                resultBank.push({ hisID: hisID, values: values })
                resolve()
            })
    })
}