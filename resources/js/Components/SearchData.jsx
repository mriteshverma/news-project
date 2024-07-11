import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@/Components/InputLabel";
import InputSelect from "@/Components/InputSelect";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import {Link,router, useForm} from "@inertiajs/react";

export default function SearchData({params,project}) {

    let fromDate = typeof params.fromDate !== "undefined"?params.fromDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    let toDate = typeof params.toDate !== "undefined"?params.toDate:new Date();

    const {data, setData, post, processing, errors, reset} = useForm({
        fromDate: fromDate,
        toDate: toDate,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleOnDateChange = (name, date) => {
        setData(name, new Date(date).toISOString().split('T')[0]);
    };

    const clear = (event) => {
        event.preventDefault();

        const url = window.location.href.split("?");
        router.get(url[0]);
    }

    const searchForm = (event) => {

        event.preventDefault();
        router.get(route('news'), data);

        setData({
            fromDate:data.fromDate,
            toDate:data.toDate,
        });
    }

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
            <form onSubmit={searchForm}>
                <div className='md:flex space-x-3'>
                    <div className="mt-4 md:mt-0 w-auto flex items-center dark:text-white font-bold text-sm">
                        FILTER
                    </div>

                    <div className="mt-4 md:mt-0 w-[200px]">
                        <InputLabel htmlFor="fromDate" value="Date" className='sr-only'/>
                        <DatePicker className='rounded-lg w-full' selected={data.fromDate}
                                    onChange={(date) => handleOnDateChange('fromDate',date)} name={'fromDate'}/>
                        <InputError message={errors.fromDate} className="mt-2"/>
                    </div>

                    <div className="mt-4 md:mt-0 w-[200px]">
                        <InputLabel htmlFor="toDate" value="Date" className='sr-only'/>
                        <DatePicker className='rounded-lg w-full' selected={data.toDate}
                                    onChange={(date) => handleOnDateChange('toDate',date)} name={'toDate'} />
                        <InputError message={errors.toDate} className="mt-2"/>
                    </div>

                    <div className="flex items-center justify-end mt-4 md:mt-0">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Search
                        </PrimaryButton>
                        <PrimaryButton type={'button'} className="ml-4"  onClick={clear}>
                            Clear
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
