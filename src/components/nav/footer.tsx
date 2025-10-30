import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full py-12 dark:bg-zinc-900 bg-white'>
        <div className="max-w-7xl mx-auto">
            <p className='text-center text-sm text-zinc-700 dark:text-zinc-400 '>
                Built with 💙 by {" "}
                <Link href="https://bnoje.com" target="_blank" rel="noopener noreferrer" className='hover:underline font-semibold'>
                    Beni Noje
                </Link>
            </p>
        </div>
    </footer>
  )
}

export default Footer
