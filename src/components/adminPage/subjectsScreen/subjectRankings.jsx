import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import SubjectInputModal from "./tableOperation/subjectAddModal";
import * as actionTypes from "../../../store/actions/actionTypes";
import * as tableProps from "./subjectsTableData";
import Table from "../../shared/unixForTable/table";
import * as loginTokenConstants from "../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../constants/shared/baseUrl"



function SubjectRankings(props) {
    const [modalState, setModalState] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [subject, setSubject] = useState();
    const { id } = useParams();
    const subjectId = id;

    // Fetch all subject rankings
    useEffect(() => {
        const fetchSubjectRankings = async () => {
        try {
            // /subjects/cm3y2h9g30002yfw251kcbt8y/rankings
            const res = await axios({
            method: 'get',
            url: `${baseUrl}/api/v1/subjects/${subjectId}/rankings`,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                loginTokenConstants.TOKEN
                )}`,
            }
            });

            console.log('YES', res.data.data)

            setSubject(res.data.data || null); // Assuming the response contains a `subjects` array
        } catch (error) {
            console.error("Error fetching subject rankings:", error);
            toast("Failed to fetch subject rankings.");
        }
        };

        fetchSubjectRankings();
    }, []);

    return (
        <div className='col-12 col-md-10 mx-auto'>
            <h1 className='mt-5 px-lg-5'>Rankings</h1>
            <div className="usersNav mt-md-5 px-lg-5" >
            </div>
            {subject.map((data) => (
                <>
                    <p>User ID : {data.userId}  - Completion : {data.completionRate}</p>
                </>
            ))}
        </div>
    )
}



// subscribing to redux store
const mapStateToProps = (state) => {
    return {
        subjectTableData: state.subjectTableRedUnixFor.subjectTableData,
        total: state.subjectTableRedUnixFor.total,
        currentPage: state.subjectTableRedUnixFor.currentPage,
        numberOfPages: state.subjectTableRedUnixFor.numberOfPages,
        pageSize: state.subjectTableRedUnixFor.pageSize,
        itemCountInCurrentPage: state.subjectTableRedUnixFor.itemCountInCurrentPage,
        orderBy: state.subjectTableRedUnixFor.orderBy,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching actions returned by action creators
        setTableData: (subjectTableData) => dispatch({ type: actionTypes.SET_SUBJECT_TABLE_DATA, subjectTableData: subjectTableData }),
        setTotal: (total) => dispatch({ type: actionTypes.SET_TOTAL, total: total }),
        setCurrentPage: (currentPage) => dispatch({ type: actionTypes.SET_CURRENT_PAGE, currentPage: currentPage }),
        setNumberOfPages: (numberOfPages) => dispatch({ type: actionTypes.SET_NUMBER_OF_PAGES, numberOfPages: numberOfPages }),
        setPageSize: (pageSize) => dispatch({ type: actionTypes.SET_PAGESIZE, pageSize: pageSize }),
        setItemCountInCurrentPage: (itemCountInCurrentPage) => dispatch({ type: actionTypes.SET_ITEM_COUNT_IN_CURRENT_PAGE, itemCountInCurrentPage: itemCountInCurrentPage }),
        setOrderBy: (orderBy) => dispatch({ type: actionTypes.SET_ORDER_BY, orderBy: orderBy }),

    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(SubjectRankings);
export default SubjectRankings
