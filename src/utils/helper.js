export const findValueByKey = (data, key, value) => {
    if (
        typeof data === "object" &&
        data !== null &&
        key in data &&
        data[key] === value
    ) {
        return data;
    }

    if (Array.isArray(data)) {
        for (let element of data) {
            const result = findValueByKey(element, key, value);
            if (result) {
                return result;
            }
        }
    }

    if (typeof data === "object" && data !== null) {
        for (let objValue of Object.values(data)) {
            const result = findValueByKey(objValue, key, value);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

export const QUERY_PARAMS = (params = {}) =>
    Object.entries(params)
        .filter(
            ([_, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");