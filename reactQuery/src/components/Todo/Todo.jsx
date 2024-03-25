/* eslint-disable no-unused-vars */
import React from "react";
import {
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Todo() {
    const queryClient = useQueryClient()
    const {isLoading,error,data:products} = useQuery({ queryKey: ['todos'], queryFn: getTodos,staleTime:10000})
   

    async function getTodos() {
        const response = await fetch('https://dummyjson.com/products');
       
        const json = await response.json();
        return json.products;
    }

    return (
        <>
        <React.Suspense fallback={isLoading}>
            <div>Todo</div>
            <div>{error && 'Error fetching data'}</div>
            <ul role="list" className="divide-y divide-gray-100">
                {products && products.map((pro, ind) => (
                    <li key={pro.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={pro.thumbnail} alt={pro.title} />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{pro.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{pro.brand}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{pro.category}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">{pro.description}<time dateTime="2023-01-23T13:23Z">{pro.price}</time></p>
                        </div>
                    </li>
                ))}
            </ul>
        </React.Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
}

export default Todo;
