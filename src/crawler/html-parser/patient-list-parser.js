import cheerio from 'cheerio'
import _ from 'lodash'
import { remove, normDate } from './utils.js'

export function patientListParser(htmlText) {
    let $ = cheerio.load(htmlText)
    let structured = {
        patientList: []
    }
    let trs = $('table tr')
    _.forEach(trs, (tr, i) => {
        if (i > 0) {  //跳過header
            let tds = tr.children
            //for dev visualize
            // _.forEach(tds, (td, j) => {
            //     console.log(j + ":" + $(td).text().trim())
            // })
            //用wd查詢
            if (tds.length == 8) {
                remove($(tds[1]), 'span')
                remove($(tds[5]), 'a')
                let bed = _.replace($(tds[1]).text(), /\s+/g, '')
                let name = $(tds[2]).text().trim()
                let critical = false
                if (name.match(/@/g)) {
                    critical = true
                    name = name.replace(/@/g, "")
                }
                if (name.match(/E/g)) {
                    name = name.replace(/E/g, "")
                }
                let isolation = false
                if (name.match(/\sI/g)) {
                    isolation = true
                    name = name.replace(/\sI/g, "")
                }
                let patient = {
                    ward: bed.split('-')[0],
                    bedno: bed.split('-')[1],
                    name,
                    critical,
                    isolation,
                    hisid: $(tds[3]).text().trim(),
                    gender: $(tds[4]).text() == "男" ? 1 : 0,
                    section: $(tds[5]).text().trim(),
                    admissionDate: normDate($(tds[7]).text().trim())
                }
                structured.patientList.push(patient);
            }
            //空床
            else if (tds.length == 3) {
                let bed = _.replace($(tds[1]).text(), /\s+/g, '')
                let patient = {
                    ward: bed.split('-')[0],
                    bedno: bed.split('-')[1],
                    isEmpty: true
                }
                structured.patientList.push(patient);
            }
            //用doctorID查詢
            else if (tds.length == 6) {
                let bed = _.replace($(tds[1]).text(), /\s+/g, '')
                let patient = {
                    ward: bed.split('-')[0],
                    bedno: bed.split('-')[1],
                    hisid: $(tds[2]).text().trim(),
                    name: $(tds[3]).text().trim(),
                    gender: $(tds[4]).text() == "男" ? 1 : 0,
                    admissionDate: normDate($(tds[5]).text().trim())
                }
                structured.patientList.push(patient);
            }
        }
    })
    return structured
}

