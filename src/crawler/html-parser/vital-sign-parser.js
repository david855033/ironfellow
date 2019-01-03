import cheerio from 'cheerio'
import _ from 'lodash'
import { normDateTime } from './utils.js'

export function vitalSignParser(htmlText, query) {
    let $ = cheerio.load(htmlText)
    let structured = {
        vitalSign: {}
    }
    let trs = $('tbody tr')

    if (query.field == "HWS") {
        structured.vitalSign.height = []
        structured.vitalSign.weight = []
        _.forEach(trs, (tr, i) => {
            let tds = $('td', tr)
            // --for dev visualize
            // _.forEach(tds, (td, j) => {
            //     console.log(j + ":" + $(td).text().trim())
            // })
            let data = {
                datetime: normDateTime($(tds[0]).text().trim()),
                height: _.round($(tds[1]).text().trim().replace('cm', ''), 1),
                weight: _.round($(tds[2]).text().trim().replace('kg', ''), 3)
            }
            if (data.datetime) {
                if (Number(data.height) > 0) {
                    structured.vitalSign.height.push({
                        datetime: data.datetime,
                        value: data.height
                    })
                }
                if (Number(data.weight) > 0) {
                    structured.vitalSign.weight.push({
                        datetime: data.datetime,
                        value: data.weight
                    })
                }
            }
        })
    } else if (query.field == "TMP") {
        structured.vitalSign.temperature = []
        _.forEach(trs, (tr, i) => {
            let tds = $('td', tr)
            // --for dev visualize
            // _.forEach(tds, (td, j) => {
            //     console.log(j + ":" + $(td).text().trim())
            // })
            let data = {
                datetime: normDateTime($(tds[0]).text().trim()),
                temperature: _.round($(tds[1]).text().trim().replace('度C', ''), 1),
            }
            if (data.datetime) {
                if (Number(data.temperature) > 0) {
                    structured.vitalSign.temperature.push({
                        datetime: data.datetime,
                        value: data.temperature
                    })
                }
            }
        })
    }
    return structured
}