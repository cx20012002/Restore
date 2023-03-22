import React from 'react';
import {MetaData} from "../models/pagination";
import {Box, Pagination, Typography} from "@mui/material";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

function AddPagination({metaData, onPageChange}: Props) {
    const {currentPage, totalCount, totalPages, pageSize} = metaData
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1} -
                {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color={'secondary'}
                size={'large'}
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    )
}

export default AddPagination;