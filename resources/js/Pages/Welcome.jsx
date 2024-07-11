import React from 'react';
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

import Paginate from '@/Components/Paginate';
import SearchData from '@/Components/SearchData';
import NewsTable from './Inc/NewsTable';

export default function Welcome(props) {
    return (
        <GuestLayout header={'Latest News'}>

            <div className="max-w-7xl mx-auto py-6 px-4 ">


                {/* Search Filters */}
                <div className="mb-6">
                    <SearchData params={props.params} />
                </div>



                {/* News table */}
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <NewsTable news_list={props.news_list} />
                    </div>

                    <div className='flex justify-end my-6'>
                        <Paginate data={props.news_list} />
                    </div>
                </div>
                
            </div>
        </GuestLayout>
    );
}
