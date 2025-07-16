import UserMenu from './UserMenu'

export default function NavBar() {
  return (
    <nav className='w-full p-4 flex items-center justify-end'>
      <UserMenu fullName='Maria Eduarda Pereira' avatarUrl='/vercel.svg' />
    </nav>
  )
}
