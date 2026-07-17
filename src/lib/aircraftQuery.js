import qs from "qs";

export function buildAircraftQuery(filters, pageIndex, pageSize = 12) {
    const apiFilters = {};

    if (filters.operator) {
        apiFilters.operator = {id: {$eq: filters.operator}};
    }

    if (filters.type) {
        apiFilters.type = {id: {$eq: filters.type}};
    }

    if (filters.registration?.trim()) {
        apiFilters.registration = {$containsi: filters.registration.trim()};
    }

    return qs.stringify({
        filters: apiFilters,
        populate: "*",
        sort: ["DateOfPictureShoot:desc"],
        pagination: {
            page: pageIndex,
            pageSize,
        },
    }, {
        encodeValuesOnly: true,
        skipNulls: true,
    });
}
