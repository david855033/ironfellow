/* parameters
hisID : str, ex:'12345678'
*/

export function admissionListRequest(query) {
    let returnRequest = { query, success: false };
    if (query.hisID) {
        returnRequest.url = "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findNicu&histno=" + query.hisID
        returnRequest.success = true;
    }
    return returnRequest
}
