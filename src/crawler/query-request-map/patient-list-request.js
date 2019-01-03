/* parameters
ward : str, ex:'NICU'
doctorID: stor, ex:'3972'
*/
export function patientListRequest(query) {
    let returnRequest = { query, success: false };
    if (query.ward || query.doctorID) {
        //field可以是wd(病房)或是drid(醫師燈號))
        var form = { wd: "0", histno: "" };
        if (query.ward) {
            form['wd'] = query.ward;
        } else {
            form['drid'] = query.doctorID;
        }
        returnRequest.url = "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPatient"
        returnRequest.method = "POST"
        returnRequest.form = form
        returnRequest.success = true;
    }
    return returnRequest
}