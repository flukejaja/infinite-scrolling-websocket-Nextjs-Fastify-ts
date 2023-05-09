
import { BsPersonCircle } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { FaFan } from 'react-icons/fa'
export default function Sidebar() {
    const categories = [
        {
            id: 0,
            label: 'Home',
            icon: AiFillHome,
            function: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        }, {
            id: 1,
            label: 'Refresh',
            icon: FaFan,
            function: () => window.location.reload()
        }
    ]
    return (
        <div className='w-full flex flex-col justify-center items-center h-full space-y-5 border-r  '>

            {
                categories.map((category) => (
                    <div onClick={category.function} key={category.id} className='cursor-pointer flex flex-row space-x-2 border px-10 py-2 rounded-2xl hover:shadow-pink-700 shadow-md' >
                        <div><category.icon size={25} /></div>
                        <div>{category.label}</div>
                    </div>
                ))
            }

        </div>
    );
}