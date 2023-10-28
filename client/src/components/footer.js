import Link from "next/link";

const navigation = [
    { label : 'Home' , path : '/' } ,
    { label : 'About' , path : '/about' } ,
    { label : 'Gallery' , path : '/gallery/'},
    { label : 'Admin login' , path : '/login'}
]


export default function Footer() {
    return (
        <footer className={'absolute inset-x-0 bottom-0 bg-blue-400 text-white p-4'}>
            <div className="grid grid-flow-col auto-cols-max gap-5">
                <div className={'grid grid-flow-row auto-rows-auto gap-2.5 w-80'}>
                    <h1 className={'font-bold'}>LFSB Planes Pictures</h1>
                    <div>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </div>
                    <span>{new Date().getFullYear()} &copy; LFSB Planes Pictures</span>
                </div>
                <div className={'grid grid-flow-row auto-rows-auto gap-2.5 w-80'}>
                    <h1 className={'font-bold h-fit'}>Navigation</h1>
                    <ul>
                        {navigation.map ( item => (
                            <li key={item.label} className={'font-light hover:text-slate-300'}>
                                <Link href={item.path}>
                                    {item.label}
                                </Link>
                            </li>
                        ) )}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
