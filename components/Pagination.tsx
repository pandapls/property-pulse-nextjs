import React from 'react'
type Props = {
    page: number;
    pageSize: number;
    total: number;
}
const Pagination = ({ page, pageSize, total }: Props) => {
    const totalPages = Math.ceil(total / pageSize);
    const prePage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1 < totalPages ? page + 1 : totalPages;

    return (
        <section className='container mx-auto flex justify-center items-center my-8'>
            <a href={`/properties?page=${prePage}&pageSize=${pageSize}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
                Previous
            </a>
            <span className='mx-2'>Page {page} of {totalPages}</span>
            <a href={`/properties?page=${nextPage}&pageSize=${pageSize}`} className="ml-2 px-2 py-1 border border-gray-300 rounded">
                Next
            </a>
        </section>
    )
}

export default Pagination
