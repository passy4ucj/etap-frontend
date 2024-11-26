import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import TopicInputModal from "./tableOperation/topicAddModal";
import * as actionTypes from "../../../store/actions/actionTypes";
import * as tableProps from "./topicsTableData";
import Table from "../../shared/unixForTable/table";



function Topics(props) {
    const [modalState, setModalState] = useState(false);
    const [spinner, setSpinner] = useState(false);



    // Backend call to update table data
    React.useEffect(() => {
        const temp = async () => {
            // fetch topic data api call
            setSpinner(true);
            let res = await tableProps.fetchTopicsData(props.pageSize, props.currentPage, props.orderBy);
            // setting topics list to tableData props
            if (res.status === 200) {
                // props.setTableData(res.data.payload.items);
                props.setTableData(res.data.data);
                props.setTotal(res.data.data.length);
                props.setCurrentPage(1);
                props.setNumberOfPages(5);
                props.setPageSize(100);
                props.setItemCountInCurrentPage(5);

            }
            else {
                (toast.error('server is not respondng!, try in moment', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: "",
                    theme: "light",
                }))
            }
            setSpinner(false);
        };
        temp();
    }, [props.pageSize, props.currentPage, props.orderBy]);

    return (
        <div className='col-12 col-md-10 mx-auto'>
            <h1 className='mt-5 px-lg-5'>Topics</h1>
            <div className="usersNav mt-md-5 px-lg-5" >
                <button
                    onClick={() => setModalState(true)}
                >
                    Add New</button>

                {spinner && <svg width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>}
            </div>

            <Table
                className="px-lg-5"
                tableData={props.topicTableData}
                Columns={tableProps.Columns}
                total={props.total}
                currentPage={props.currentPage}
                numberOfPages={props.numberOfPages}
                pageSize={props.pageSize}
                itemCountInCurrentPage={props.itemCountInCurrentPage}
                orderBy={props.orderBy}
                // passing the table pagination set functions
                setPageSize={props.setPageSize}
                setCurrentPage={props.setCurrentPage}
                setOrderBy={props.setOrderBy}

            />


            {
                modalState && <TopicInputModal setModalState={setModalState} />
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}



// subscribing to redux store
const mapStateToProps = (state) => {
    return {
        topicTableData: state.topicTableRedUnixFor.topicTableData,
        total: state.topicTableRedUnixFor.total,
        currentPage: state.topicTableRedUnixFor.currentPage,
        numberOfPages: state.topicTableRedUnixFor.numberOfPages,
        pageSize: state.topicTableRedUnixFor.pageSize,
        itemCountInCurrentPage: state.topicTableRedUnixFor.itemCountInCurrentPage,
        orderBy: state.topicTableRedUnixFor.orderBy,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching actions returned by action creators
        setTableData: (topicTableData) => dispatch({ type: actionTypes.SET_TOPIC_TABLE_DATA, topicTableData: topicTableData }),
        setTotal: (total) => dispatch({ type: actionTypes.SET_TOTAL, total: total }),
        setCurrentPage: (currentPage) => dispatch({ type: actionTypes.SET_CURRENT_PAGE, currentPage: currentPage }),
        setNumberOfPages: (numberOfPages) => dispatch({ type: actionTypes.SET_NUMBER_OF_PAGES, numberOfPages: numberOfPages }),
        setPageSize: (pageSize) => dispatch({ type: actionTypes.SET_PAGESIZE, pageSize: pageSize }),
        setItemCountInCurrentPage: (itemCountInCurrentPage) => dispatch({ type: actionTypes.SET_ITEM_COUNT_IN_CURRENT_PAGE, itemCountInCurrentPage: itemCountInCurrentPage }),
        setOrderBy: (orderBy) => dispatch({ type: actionTypes.SET_ORDER_BY, orderBy: orderBy }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topics);
// export default Dashboard
