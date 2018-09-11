export function parseQuery(query) {
    var result = getServerRequest(query);
    result.query = query;
    return result;
}

//mapping to different query
let getServerRequest = function (query) {
    let returnRequest = { query, success: false };
    if (query.name == "PatientList") {
        patientListRequest(returnRequest)
    }
    return returnRequest;
}

let patientListRequest = function (returnRequest) {
    let query = returnRequest.query
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
}

// else if (query.name == "preSelectPatient") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findEmr&histno=" + queryList[1]
    //     };
    // } else if (query.name == "admissionList") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findNicu&histno=" + queryList[1],
    //         parser: "getAdmissionList"
    //     };
    // } else if (query.name == "patientData") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPba&histno=" + queryList[1],
    //         parser: "getPatientData"
    //     };
    // } else if (query.name == "changeBedSection") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPlocs&histno=" + queryList[1],
    //         parser: "getChangeBedSection"
    //     };
    // } else if (query.name == "consultation") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=find",
    //         method: "POST",
    //         form: { cpscwd: '', cpsrsect: '', cpsdept: '', cpsdoc: '', cpshist: queryList[1], month: '', bgndt: '', enddt: '' },
    //         parser: "getConsultation"
    //     };
    // } else if (query.name == "consultationReply") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=find&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&oseq=" + queryList[3],
    //         parser: "getConsultationReply"
    //     };
    // } else if (query.name == "consultationPending") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=add",
    //         method: "POST",
    //         form: { cpscwd: '', cpsrsect: '', cpsdept: '', cpsdoc: '', cpshist: queryList[1], cstype: "adm" },
    //         parser: "getConsultationPending"
    //     };
    // } else if (query.name == "surgery") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findOpn&histno=" + queryList[1],
    //         parser: "getSurgery"
    //     };
    // } else if (query.name == "order") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findOrd&histno=" + queryList[1] + "&tday=" + queryList[2] + "&tdept=ALL",
    //         parser: "getOrder"
    //     };
    // } else if (query.name == "report") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findRes&histno=" + queryList[1] + "&tmonth=" + queryList[2] + "&tdept=ALL",
    //         parser: "getReport"
    //     };
    // } else if (query.name == "reportContent") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findRes&partno=" + queryList[2] + "&histno=" + queryList[1] + "&caseno=" + queryList[3] + "&ordseq=" + queryList[4] + "&tmonth=" + queryList[5],
    //         parser: "getReportContent"
    //     };
    // } else if (query.name == "cummulative") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findResd&histno=" + queryList[1] + "&resdtmonth=" + queryList[2] + "&resdtype=" + queryList[3],
    //         parser: "getCummulative"
    //     };
    // } else if (query.name == "vitalSign") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findVts&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&pbvtype=" + queryList[3],
    //         parser: "getVitalSign"
    //     };
    // } else if (query.name == "treatment") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findTrt&histno=" + queryList[1] + "&caseno=" + queryList[2],
    //         parser: "getTreatment"
    //     };
    // } else if (query.name == "transfusion") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findBcst&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&admdt=00010101",
    //         parser: "getTransfusion"
    //     };
    // } else if (query.name == "medication") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findUd&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&dt=0&type=I&dept=0&dt1=" + queryList[3] || 0,
    //         parser: "getMedication"
    //     };
    // } else if (query.name == "medicationInfo") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findUd&caseno=" + queryList[1] + "&ordseq=" + queryList[2],
    //         parser: "getMedicationInfo"
    //     };
    // } else if (query.name == "admissionNote") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findAdm&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&adidate=" + queryList[3],
    //         parser: "getAdmissionNote"
    //     };
    // } else if (query.name == "dischargeNote") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findDis&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&admdate=" + queryList[3],
    //         parser: "getDischargeNote"
    //     };
    // } else if (query.name == "progressNote") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPrg&histno=" + queryList[1] + "&caseno=" + queryList[2] + "&prgpart=" + queryList[3],
    //         parser: "getProgressNote"
    //     };
    // } else if (query.name == "erNote") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findErn&histno=" + queryList[1] + "&caseno=" + queryList[2],
    //         parser: "getERNote"
    //     };
    // }
    // else if (query.name == "preSelectBirthSheet") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/OBSTS/nurlist?caseno=" + queryList[2] + "&histno=" + queryList[1],
    //         parser: "getPreSelectBirthSheet"
    //     };
    // } else if (query.name == "birthSheet") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/OBSTS/pedlist",
    //         method: "POST",
    //         form: { caseno: queryList[1], histno: queryList[2], 'struts.token.name': queryList[3], token: queryList[4] },
    //         parser: "getBirthSheet"
    //     };
    // } else if (query.name == "preSelectNIS") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/emr.jsp?hisid=" + queryList[1] + "&caseno=" + queryList[2]
    //     };
    // } else if (query.name == "preSelectNIS2") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/reportForEmr.do"
    //     };
    // } else if (query.name == "NISHandOverPatientInfo") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/patinfo.do?reqtype=rpt",
    //         //parser:"NISHandOverPatientInfo"
    //     };
    // } else if (query.name == "NISHandOverHistory") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/history.do?reqtype=rpt",
    //         //parser:"NISHandOverHistory"
    //     };
    // } else if (query.name == "NISHandOverHealth") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/helth.do?reqtype=rpt",
    //         //parser:"NISHandOverHealth"
    //     };
    // } else if (query.name == "NISHandOverLine") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/canlskin.do?reqtype=rpt",
    //         //parser:"NISHandOverLine"
    //     };
    // } else if (query.name == "NISHandOverNote") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/note.do?reqtype=rpt",
    //         //parser:"NISHandOverNote"
    //     };
    // } else if (query.name == "preSelectFlowSheet") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/nicuflowsheet.jsp?hisid=" + queryList[1] + "&caseno=" + queryList[2]
    //     };
    // } else if (query.name == "flowSheet") {
    //     return {
    //         url: "https://web9.vghtpe.gov.tw/NIS/report/FlowSheet/main.do?gaugeDate1=" + queryList[3] + "&r_ser_num=" + queryList[2] + "&r_his_id=" + queryList[1],
    //         parser: "flowSheet"
    //     };
    // }