export function createFilterObject(query) {
    console.log(query)
    let filter = {}
    for (let key in query) {
        if (key.endsWith('Min')) {
            //meselen sozun sonu ramMin olsa biz oradan ram secilir.
            filter[`additionalFields.${key.slice(0, -3)}`] = { $gte: query[key.slice(0, -3) + 'Min'] }
        }
        else if (key.endsWith('Max')) {
            filter[`additionalFields.${key.slice(0, -3)}`] = { $lte: query[key.slice(0, -3) + 'Max'] }
        }
        else{
            filter[`additionalFields.${key}`] = query[key]
        }
    }

    console.log(filter)
    return filter;
}
