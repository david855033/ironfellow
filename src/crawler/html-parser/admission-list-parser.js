import cheerio from 'cheerio'
import _ from 'lodash'
import { remove, normDate } from './utils.js'

export function admissionListParser(htmlText) {
    let $ = cheerio.load(htmlText)
    let structured = {
        admissionList: []
    }
    let trs = $('table tr')
    _.forEach(trs, (tr, i) => {
        if (i > 0) {  //跳過header
            let tds = tr.children
            //for dev visualize
            // _.forEach(tds, (td, j) => {
            //     console.log(j + ":" + $(td).text().trim())
            // })
            structured.admissionList.push({
                caseNO: $(tds[1]).text().trim(),
                admissionDate: normDate($(tds[2]).text().trim()),
                dischargeDate: normDate($(tds[3]).text().trim()),
                section: $(tds[4]).text().trim(),
                indentity: $(tds[5]).text().trim(),
            })
        }
    })
    return structured
}

