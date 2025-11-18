
import React, { Suspense } from "react";

export default function withLoading  (Component){
    return function(props)
    {
           return <Suspense fallback={<div>Loading...</div>}><Component {...props}/></Suspense>
    }
}