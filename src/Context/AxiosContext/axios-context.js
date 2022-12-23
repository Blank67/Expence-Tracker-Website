import React from "react";

const AxiosContext = React.createContext({
    items: [],
    totalAmount: 0,
    post: (item) => {},
    get: () => {},
    put: (id) => {},
    delete: (id) => {}
});

export default AxiosContext;