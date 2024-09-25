import React from 'react'
import "./breadcrumbs.css";

export default function Breadcrumbs({ path = [] }) {

    return (
        <div>
            <ul className="breadcrumbs bc3" role="menubar" aria-label="breadcrumbs">
                <li className='liBred'><a href="/web/">Home</a>{" "}&raquo;</li>
                {(path || []).map((obj, i) => {
                    if ((path.length - 1) == i) return <li key={i} className='liBred ml-2'><a href="#">{obj}</a></li>
                    return <li key={i} className='liBred ml-2'><a href="#">{obj}</a>&raquo;</li>
                })}
            </ul>
        </div>
    )
}
