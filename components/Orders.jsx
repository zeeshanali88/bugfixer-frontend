import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { ordersData } from '../lib/orders';
import OrdersTable from './OrdersTable';
import OrderDetailsTable from './OrderDetailsTable';
import DeleteOrder from './DeleteOrder';

const Orders = () => {

    const [state, setState] = useState({
        orders: ordersData,
        selectedOrder: null,
        displayDelete: false
    });

    const { displayDelete, orders, selectedOrder } = state;

    const selectOrder = (order) => setState({
        ...state,
        selectedOrder: order
    });

    const clearSelectedOrder = () => setState({
        ...state,
        selectedOrder: null
    });

    const deleteOrder = (order) => setState({
        ...state,
        selectedOrder: order,
        displayDelete: !displayDelete
    });

    const confirmDelete = () => {
        const updated = orders.filter(({ id }) => id !== selectedOrder.id);
        setState({
            orders: updated,
            selectedOrder: null,
            displayDelete: !displayDelete
        });
    }

    const ordersActions = {
        selectOrder: selectOrder,
        deleteOrder: deleteOrder
    };

    const detailsActions = {
        clearSelectedOrder: clearSelectedOrder
    };

    const deleteActions = {
        clearSelectedOrder: clearSelectedOrder,
        confirmDelete: confirmDelete,
        deleteOrder: deleteOrder
    }

    return (
        <div className="layout">
            {
                displayDelete ? <DeleteOrder data={selectedOrder} actions={deleteActions} /> :
                selectedOrder ? <OrderDetailsTable data={selectedOrder} actions={detailsActions} /> : 
                <OrdersTable data={orders} actions={ordersActions} />
            }
        </div>
    )
}

export default Orders
