import React, { useEffect, useState } from "react";
import Moment from 'react-moment';
import moment from 'moment';
import Modal from "@/Components/Modal";

export default function NewsTable({ news_list }) {

    const [moduleBtn, setModuleBtn] = useState(true);
    const [tableColumn, setTableColumn] = useState({
        image: true,
        source: true,
        title: true,
        content: true,
        date: true,
        author: true,
    });

    const handleOnChange = (event) => {
        tableColumn[event.target.name] = event.target.checked;
        setTableColumn(tableColumn);
    };

    const modalClose = e => {
        setModuleBtn(false)
    }

    return (

        <>
            <Modal show={moduleBtn}>
                <div
                    className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <header className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Coustomize Coloumns</h2>
                        <button type='button'
                            className='bg-red-600 text-white py-0 px-2 rounded-md border-0'
                            onClick={modalClose}>&times;</button>
                    </header>
                    <div className="pt-4">
                        <h4 className="mb-6 text-white px-3">Show/Hide Coloumns</h4>
                        <div className="flex flex-wrap">
                            {Object.entries(tableColumn).map((item, index) => {
                                console.log(item[1]);
                                return (
                                    <div key={index} className="w-1/2 px-3">
                                        <label className="inline-flex items-center mb-5 cursor-pointer">
                                            <input type="checkbox" value={item[0]} name={item[0]} checked={item[1]} className="sr-only peer" onChange={handleOnChange} />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">{item[0]}</span>
                                        </label>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </Modal>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        {tableColumn.image && (
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                        )}
                        {tableColumn.source && (
                            <th scope="col" className="px-6 py-3">
                                Source
                            </th>
                        )}
                        {tableColumn.title && (
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                        )}
                        {tableColumn.content && (
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                        )}
                        {tableColumn.date && (
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        )}
                        {tableColumn.author && (
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {news_list.data.map((item, index) => {
                        //console.log(item);
                        const dateToFormat = new Date(item.publishedAt);
                        return (
                            <tr key={index} className="bg-white border-b  hover:bg-gray-50">

                                {tableColumn.image && (
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <a href={item.url} target='_blank'>
                                            <img src={item.urlToImage ? item.urlToImage : '/images/demo_image.png'} className=' rounded w-100' />
                                        </a>
                                    </th>
                                )}
                                {tableColumn.source && (
                                    <th scope="row" className="px-6 py-4">
                                        {item.source.name}
                                    </th>
                                )}
                                {tableColumn.title && (
                                    <th scope="row" className="px-6 py-4">
                                        <a href={item.url} className=' font-bold text-black' target='_blank'>{item.title}</a>
                                    </th>
                                )}
                                {tableColumn.content && (
                                    <th scope="row" className="px-6 py-4">
                                        {item.description}
                                    </th>
                                )}
                                {tableColumn.date && (
                                    <th scope="row" className="px-6 py-4">
                                        <Moment className='first-letter:uppercase whitespace-nowrap' fromNow>{dateToFormat}</Moment>
                                    </th>
                                )}
                                {tableColumn.author && (
                                    <th scope="row" className="px-6 py-4">
                                        {item.author}
                                    </th>
                                )}


                                {/* <td className="px-6 py-4">
                                <div className='mb-3'><span className='bg-blue-200 rounded text-black px-2 py-1 text-sm'>{item.source.name}</span></div>
                                <h4 className='mb-3 text-lg'>
                                    <a href={item.url} className=' font-bold text-black' target='_blank'>{item.title}</a>
                                </h4>
                                <p>{item.description}</p>

                                <div className='flex space-x-2 items-center text-xs mt-6'>
                                    <Moment className='first-letter:uppercase' fromNow>{dateToFormat}</Moment>
                                    {item.author && (
                                        <>
                                            <span className='w-1 h-1 inline-block rounded-full bg-black'></span>
                                            <span>{item.author}</span>
                                        </>
                                    )}

                                </div>

                            </td> */}
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    );
}
