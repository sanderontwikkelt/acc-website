import React from 'react'

const Counter = ({ max = 100, value, onChange }: { max?: number; value: number; onChange: (n: number) => void }) => {
  return (
    
<form className="max-w-xs h-16">
    <div className="relative flex items-center max-w-[8rem] border border-main h-full">
        <button type="button" onClick={() => onChange(Math.min(Math.max(0, value - 1), max))} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600  hover:bg-gray-200 border-r border-main p-3 h-full">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
        </button>
        <input value={value} onChange={(e) => {
            onChange(e.target.value && !isNaN(+e.target.value) ? +e.target.value:1)
        }} min="1" step="1" type="numeric" name="quantity" className="bg-gray-50 border-x-0 border-main h-full text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
        <button type="button" onClick={() => onChange(Math.min(Math.max(0, value + 1), max))} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 border-l border-main p-3 h-full">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
</form>

  )
}

export default Counter