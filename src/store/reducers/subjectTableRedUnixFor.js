import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
    subjectTableData: [],
    total: 10,
    currentPage: 1,
    numberOfPages: 1,
    pageSize: 5,
    itemCountInCurrentPage: 5,
    orderBy: "id desc",

}

const subjectTableRedUnixFor = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUBJECT_TABLE_DATA:
            return {
                ...state,
                subjectTableData: [...action.subjectTableData]
            };
        case actionTypes.SET_TOTAL:
            return {
                ...state,
                total: action.total,
            };
        case actionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case actionTypes.SET_NUMBER_OF_PAGES:
            return {
                ...state,
                numberOfPages: action.numberOfPages,
            };
        case actionTypes.SET_PAGESIZE:
            return {
                ...state,
                pageSize: action.pageSize,
            };
        case actionTypes.SET_ITEM_COUNT_IN_CURRENT_PAGE:
            return {
                ...state,
                itemCountInCurrentPage: action.itemCountInCurrentPage,
            };
        case actionTypes.SET_ORDER_BY:
            return {
                ...state,
                orderBy: action.orderBy,
            };
        case actionTypes.DELETE_SUBJECT:
            return state;
        default:
            return state;
    }
}

export default subjectTableRedUnixFor;
