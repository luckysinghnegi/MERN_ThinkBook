import React, { useState } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router'
import { PlusIcon } from "lucide-react"
import toast from 'react-hot-toast';

function NavBar() {
    const { id } = useParams();
    const isEditPage = Boolean(id);
    const navigate = useNavigate()
    return (
        <header className='bg-base-300 border-b border-base-content/10'>

            <div className='mx-auto max-w=6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                        ThinkBoard
                    </h1>

                    <div>
                        <Link to={isEditPage ? "#" : '/create'} onClick={(e) => isEditPage && e.preventDefault()}
                            className={`btn btn-primary ${isEditPage ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}><PlusIcon className='size-5' /> <span>New Note</span> </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar