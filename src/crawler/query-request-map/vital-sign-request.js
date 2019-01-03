
export function vitalSignRequest(query) {
    let returnRequest = { query, success: false };
    if (query.hisID && query.caseNO && query.field) {
        //field可以是wd(病房)或是drid(醫師燈號))
        returnRequest.url = "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findVts&histno=" + query.hisID
            + "&caseno=" + query.caseNO
            + "&pbvtype=" + query.field;
        returnRequest.success = true;
    }
    return returnRequest
}

  // } else if (query.name == "vitalSign") {
  //     return {
  //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findVts&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&pbvtype=" + queryList[3],
  //         parser: "getVitalSign"
  //     };