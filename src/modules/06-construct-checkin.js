const constructKrs = krs => krs.map(({ pk, name, url, ...kr }) => ({
    id: pk,
    name,
    url: url,
    key_result: url,
    current_value: kr.currentValue,
    starting_value: kr.startingValue,
    target_value: kr.targetValue,
    measurement_type: kr.measurementType,
}));

export default (message, objective, assessmentStatus, krs) => ({
    objective,
    message,
    assessment_status: assessmentStatus,
    key_results: constructKrs(krs),
    //  TODO: later we should prompt for if they are trying to close the objective
    close_objective: false,
    final_assessment: false,
});
