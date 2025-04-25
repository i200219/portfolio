"use client";
import Link from 'next/link'
import {usePathname} from 'next/navigation'
const Nav = () => {
    const links = [
        {
            name: "home",
            path: "/"
        },
        {
            name:"services",
            path:"/services"
        },
        {
            name: "resume",
            path: "/resume"
        },
        {
            name: "contact",
            path: "/contact"
        },
        {
            name: "Work",
            path: "/work"
        }

    ]
    const pathname = usePathname();
  return (
    <nav className='flex gap-x-8 text-sm font-semibold leading-6 hover:cursor-pointer '>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className={`${
            pathname === link.path
              ? "text-pink-600 border-accent border-b-2"
              : "text-white hover:text-pink-600"
          } capitalize font-medium hover:text-pink-400 transition-all`}
          
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
