import React from 'react';
import {Link} from "@inertiajs/react";

export default function Paginate({data, className = 'my-4'}) {

    if(data.data !== "undefined" && data.data.length > 0 && data.per_page < data.total) {
        return (
            <nav aria-label="Page navigation">
                <ul className={'inline-flex items-center -space-x-px ' + className}>
                    {data.links.map((item,i) => {
                        let itemClassName = 'mr-1 py-2 px-3 leading-tight border rounded-lg shadow ';
                        if(item.active === true) {
                            itemClassName += 'z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700';
                        } else {
                            itemClassName += 'text-gray-500 bg-white  border-gray-300 hover:bg-gray-100 hover:text-gray-700';
                        }
                        return <li key={i}>
                            <Link href={item.url}
                                  className={itemClassName}>{item.label}</Link>
                        </li>
                    })}
                </ul>
            </nav>
        );
    }
}
