/* parameters
hisID : str, ex:'12345678'
*/

export function preSelectRequest(query) {
    let returnRequest = { query, success: false };
    if (query.hisID) {
        returnRequest.url = "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findEmr&histno=" + query.hisID
        returnRequest.success = true;
    }
    return returnRequest
}
