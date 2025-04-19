"use client"

import Link from "next/link";
import {X} from "lucide-react";

const SearchFormReset = () => {

    // this is a reset function that is called when button is clicked
    const reset = () => {
        // selecting the form and then reseting it
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }

    return (
        <button type="reset" onClick={reset}>
            <Link href="/" className="search-btn text-white">
            <X className="size-5" />
            </Link>
        </button>
    )
}
export default SearchFormReset
